-- ============================================================
-- AACE Project Dashboard — Supabase setup (run ONCE)
-- ============================================================
-- How to run: Supabase Dashboard > your project > SQL Editor >
--   New query > paste all of this > Run.
-- This creates the shared tables and the security rules (Row
-- Level Security) that protect your data.

-- 1) App user profiles (roles, display info, permissions).
--    Passwords are NOT stored here — Supabase Auth hashes them
--    with industry-standard password hashing on the server.
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (char_length(trim(username)) between 3 and 50),
  display_name text not null default '',
  role text not null default 'User' check (lower(role) in ('user', 'administrator')),
  department text default '',
  status text not null default 'Active' check (lower(status) in ('active', 'inactive')),
  perms jsonb not null default '{"view":true,"add":false,"edit":false}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Shared projects (one row per project, stored as JSON).
create table if not exists public.projects (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.user_profiles enable row level security;

-- Helper: is the signed-in user an active app Administrator?
create or replace function public.is_cloud_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_profiles up
    where up.id = auth.uid()
      and lower(up.role) = 'administrator'
      and lower(up.status) = 'active'
  )
$$;

-- Helper: user may manage their own profile or an admin may manage any profile.
create or replace function public.is_self_or_admin(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() = p_user_id or public.is_cloud_admin();
$$;

create or replace function public.touch_user_profile_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_user_profile_updated_at on public.user_profiles;
create trigger trg_user_profile_updated_at
before update on public.user_profiles
for each row
execute function public.touch_user_profile_updated_at();

-- --- user_profiles rules -------------------------------------------------
-- Everyone can read only their own row; administrators read everyone.
drop policy if exists "user_profiles_select" on public.user_profiles;
create policy "user_profiles_select" on public.user_profiles
  for select to authenticated using (id = auth.uid() or public.is_cloud_admin());

-- A user may create their own profile row; admins may create any profile.
-- There is no first-user fallback or self-promotion path.
drop policy if exists "user_profiles_insert" on public.user_profiles;
create policy "user_profiles_insert" on public.user_profiles
  for insert to authenticated with check (id = auth.uid() or public.is_cloud_admin());

-- Users may update only their own profile; admins update any profile.
drop policy if exists "user_profiles_update" on public.user_profiles;
create policy "user_profiles_update" on public.user_profiles
  for update to authenticated
  using (public.is_self_or_admin(id))
  with check (
    (
      id = auth.uid()
      and role = (select role from public.user_profiles where id = auth.uid())
      and status = (select status from public.user_profiles where id = auth.uid())
    )
    or public.is_cloud_admin()
  );

drop policy if exists "user_profiles_delete" on public.user_profiles;
create policy "user_profiles_delete" on public.user_profiles
  for delete to authenticated using (public.is_cloud_admin());

-- --- projects rules -------------------------------------------------------
-- Any signed-in account may read/add/edit/delete projects. The finer
-- add/edit/view permissions for each user are enforced by the app.
drop policy if exists "projects_select" on public.projects;
create policy "projects_select" on public.projects
  for select to authenticated using (true);

drop policy if exists "projects_insert" on public.projects;
create policy "projects_insert" on public.projects
  for insert to authenticated with check (true);

drop policy if exists "projects_update" on public.projects;
create policy "projects_update" on public.projects
  for update to authenticated using (true);

drop policy if exists "projects_delete" on public.projects;
create policy "projects_delete" on public.projects
  for delete to authenticated using (true);

-- --- permissions ----------------------------------------------------------
grant execute on function public.is_cloud_admin() to authenticated;
grant execute on function public.is_self_or_admin(uuid) to authenticated;

-- Anonymous access remains blocked because every policy targets authenticated users only.
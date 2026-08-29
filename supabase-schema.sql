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
  username text not null unique,
  display_name text,
  role text not null default 'User',
  department text,
  status text not null default 'Active',
  perms jsonb not null default '{"view":true,"add":false,"edit":false}',
  created_at timestamptz not null default now()
);

-- 2) Shared projects (one row per project, stored as JSON).
create table if not exists public.projects (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.user_profiles enable row level security;

-- Helper: is the signed-in user an app Administrator?
create or replace function public.is_cloud_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.user_profiles
    where id = auth.uid() and lower(role) = 'administrator'
  )
$$;

-- Helper: is this the very first account ever? (lets the first
-- user bootstrap as Administrator)
create or replace function public.is_first_user()
returns boolean language sql stable security definer set search_path = public as $$
  select not exists (select 1 from public.user_profiles)
$$;

-- --- user_profiles rules -------------------------------------------------
-- Everyone can read only their own row; administrators read everyone.
drop policy if exists "user_profiles_select" on public.user_profiles;
create policy "user_profiles_select" on public.user_profiles
  for select to authenticated using (id = auth.uid() or public.is_cloud_admin());

-- Only administrators (or the very first account) can create profiles.
drop policy if exists "user_profiles_insert" on public.user_profiles;
create policy "user_profiles_insert" on public.user_profiles
  for insert to authenticated with check (public.is_cloud_admin() or public.is_first_user());

-- Only administrators can edit or delete profiles.
drop policy if exists "user_profiles_update" on public.user_profiles;
create policy "user_profiles_update" on public.user_profiles
  for update to authenticated using (public.is_cloud_admin()) with check (public.is_cloud_admin());

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
grant execute on function public.is_cloud_admin to authenticated;
grant execute on function public.is_first_user to authenticated;

-- Also disable the anon role writing to these tables by default is
-- handled by RLS: every policy above targets "authenticated" (signed in)
-- users only, so anonymous visitors cannot read or write anything.
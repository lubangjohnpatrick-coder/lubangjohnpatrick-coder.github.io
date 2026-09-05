-- AACE Project Dashboard — secure Supabase baseline
-- For an EXISTING deployment, run supabase-production-hardening.sql instead.
-- For a NEW deployment, this file creates the same secured data model.

create extension if not exists pgcrypto;

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

create table if not exists public.projects (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.project_number_counters (
  year integer primary key,
  last_no integer not null check (last_no >= 0)
);

create table if not exists public.activity_trail (
  id uuid primary key default gen_random_uuid(),
  project_id text not null,
  actor_id uuid references auth.users(id) on delete set null,
  actor_username text not null default 'system',
  action text not null,
  note text not null default '',
  source text not null default 'system' check (source in ('system', 'manual')),
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_activity_trail_project_created on public.activity_trail(project_id, created_at desc);
create index if not exists idx_projects_updated_at on public.projects(updated_at desc);

alter table public.user_profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_number_counters enable row level security;
alter table public.activity_trail enable row level security;

create or replace function public.is_cloud_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and lower(up.role) = 'administrator'
      and lower(up.status) = 'active'
  );
$$;

create or replace function public.has_project_permission(permission_name text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.user_profiles up
    where up.id = auth.uid()
      and lower(up.status) = 'active'
      and (
        lower(up.role) = 'administrator'
        or coalesce((up.perms ->> permission_name)::boolean, false)
      )
  );
$$;

create or replace function public.touch_user_profile_updated_at()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_user_profile_updated_at on public.user_profiles;
create trigger trg_user_profile_updated_at before update on public.user_profiles
for each row execute function public.touch_user_profile_updated_at();

-- Profile policies: no self-promotion. Admin users are provisioned by a trusted
-- operator / the server-side admin-users Edge Function.
drop policy if exists "user_profiles_select" on public.user_profiles;
create policy "user_profiles_select" on public.user_profiles for select to authenticated
  using (id = auth.uid() or public.is_cloud_admin());

drop policy if exists "user_profiles_insert" on public.user_profiles;
create policy "user_profiles_insert" on public.user_profiles for insert to authenticated
  with check (public.is_cloud_admin());

drop policy if exists "user_profiles_update" on public.user_profiles;
create policy "user_profiles_update" on public.user_profiles
  for update to authenticated
  using (public.is_cloud_admin())
  with check (public.is_cloud_admin());

drop policy if exists "user_profiles_delete" on public.user_profiles;
create policy "user_profiles_delete" on public.user_profiles for delete to authenticated
  using (public.is_cloud_admin());

-- Project authorization is enforced in the database, not only by hidden UI.
drop policy if exists "projects_select" on public.projects;
create policy "projects_select" on public.projects for select to authenticated
  using (public.has_project_permission('view'));

drop policy if exists "projects_insert" on public.projects;
create policy "projects_insert" on public.projects for insert to authenticated
  with check (public.has_project_permission('add'));

drop policy if exists "projects_update" on public.projects;
create policy "projects_update" on public.projects for update to authenticated
  using (public.has_project_permission('edit'))
  with check (public.has_project_permission('edit'));

drop policy if exists "projects_delete" on public.projects;
create policy "projects_delete" on public.projects for delete to authenticated
  using (public.is_cloud_admin());

-- Counter rows are private implementation details.
drop policy if exists "project_counters_no_direct_access" on public.project_number_counters;
create policy "project_counters_no_direct_access" on public.project_number_counters
  for all to authenticated using (false) with check (false);

create or replace function public.create_aace_project(p_data jsonb)
returns text language plpgsql security definer set search_path = public as $$
declare
  v_year integer := extract(year from (now() at time zone 'Asia/Manila'))::integer;
  v_existing_max integer := 0;
  v_no integer;
  v_id text;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if not public.has_project_permission('add') then raise exception 'Add-project permission required'; end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' then raise exception 'Project payload must be a JSON object'; end if;

  select coalesce(max(nullif(substring(id from ('^AACE-' || v_year || '-([0-9]+)$')), '')::integer), 0)
    into v_existing_max from public.projects;

  insert into public.project_number_counters(year, last_no)
  values (v_year, v_existing_max)
  on conflict (year) do update
    set last_no = greatest(public.project_number_counters.last_no, excluded.last_no);

  update public.project_number_counters set last_no = last_no + 1
  where year = v_year returning last_no into v_no;

  v_id := 'AACE-' || v_year || '-' || lpad(v_no::text, 3, '0');
  insert into public.projects(id, data, updated_at)
  values (v_id, (p_data - 'id') || jsonb_build_object('id', v_id), now());
  return v_id;
end;
$$;

create or replace function public.stamp_manual_activity_actor()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.source <> 'manual' then raise exception 'Only manual audit notes may be inserted directly'; end if;
  if auth.uid() is null or not public.has_project_permission('edit') then raise exception 'Edit permission required'; end if;
  new.actor_id := auth.uid();
  select coalesce(up.username, 'unknown') into new.actor_username from public.user_profiles up where up.id = auth.uid();
  new.actor_username := coalesce(new.actor_username, 'unknown');
  new.action := coalesce(nullif(new.action, ''), 'manual_note');
  new.created_at := now();
  return new;
end;
$$;

drop trigger if exists trg_activity_manual_actor on public.activity_trail;
create trigger trg_activity_manual_actor before insert on public.activity_trail
for each row when (new.source = 'manual') execute function public.stamp_manual_activity_actor();

create or replace function public.log_project_change()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_actor uuid := auth.uid();
  v_username text := 'system';
  v_changed text;
begin
  if v_actor is not null then
    select coalesce(up.username, 'unknown') into v_username from public.user_profiles up where up.id = v_actor;
    v_username := coalesce(v_username, 'unknown');
  end if;

  if tg_op = 'INSERT' then
    insert into public.activity_trail(project_id, actor_id, actor_username, action, note, source, before_data, after_data)
    values (new.id, v_actor, v_username, 'project_created', 'Project created.', 'system', null, new.data);
    return new;
  elsif tg_op = 'UPDATE' then
    select string_agg(k, ', ' order by k) into v_changed
    from jsonb_object_keys(coalesce(old.data, '{}'::jsonb) || coalesce(new.data, '{}'::jsonb)) as t(k)
    where old.data -> k is distinct from new.data -> k;

    insert into public.activity_trail(project_id, actor_id, actor_username, action, note, source, before_data, after_data)
    values (new.id, v_actor, v_username, 'project_updated',
      case when coalesce(v_changed, '') = '' then 'Project updated.' else 'Updated fields: ' || v_changed || '.' end,
      'system', old.data, new.data);
    return new;
  else
    insert into public.activity_trail(project_id, actor_id, actor_username, action, note, source, before_data, after_data)
    values (old.id, v_actor, v_username, 'project_deleted', 'Project deleted.', 'system', old.data, null);
    return old;
  end if;
end;
$$;

drop trigger if exists trg_projects_audit on public.projects;
create trigger trg_projects_audit after insert or update or delete on public.projects
for each row execute function public.log_project_change();

drop policy if exists "activity_select" on public.activity_trail;
create policy "activity_select" on public.activity_trail for select to authenticated
  using (public.has_project_permission('view'));

drop policy if exists "activity_insert_manual" on public.activity_trail;
create policy "activity_insert_manual" on public.activity_trail for insert to authenticated
  with check (source = 'manual' and public.has_project_permission('edit'));

drop policy if exists "activity_update" on public.activity_trail;
drop policy if exists "activity_delete" on public.activity_trail;

revoke all on function public.create_aace_project(jsonb) from public;
grant execute on function public.create_aace_project(jsonb) to authenticated;
grant execute on function public.is_cloud_admin() to authenticated;
grant execute on function public.has_project_permission(text) to authenticated;

-- First Administrator bootstrap: create the Auth user in Supabase Authentication,
-- then insert that user's profile once from SQL Editor. Self-promotion is never
-- permitted by the browser-facing policies.

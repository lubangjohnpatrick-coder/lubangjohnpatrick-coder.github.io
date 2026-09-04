-- AACE Project Dashboard — user-management hardening
-- Run once in Supabase SQL Editor after deploying the matching frontend change.
-- This keeps the service-role key out of the browser while allowing an active
-- Administrator to permanently remove another dashboard account.

create or replace function public.admin_delete_dashboard_user(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if not public.is_cloud_admin() then
    raise exception 'Administrator access required';
  end if;

  if p_user_id = auth.uid() then
    raise exception 'You cannot delete your own signed-in account';
  end if;

  if not exists (select 1 from public.user_profiles where id = p_user_id) then
    raise exception 'Dashboard user not found';
  end if;

  -- user_profiles.id references auth.users(id) ON DELETE CASCADE, so removing
  -- the Auth row also removes the matching dashboard profile atomically.
  delete from auth.users where id = p_user_id;

  if not found then
    raise exception 'Supabase Auth user not found';
  end if;
end;
$$;

revoke all on function public.admin_delete_dashboard_user(uuid) from public;
grant execute on function public.admin_delete_dashboard_user(uuid) to authenticated;

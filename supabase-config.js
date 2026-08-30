/* ============================================================
   AACE PROJECT DASHBOARD — Supabase cloud connection settings
   ============================================================
   This file is MEANT to be committed and uploaded with the app.
   Values below are PUBLIC by design:
     - Project URL is not sensitive
     - "anon" / "publishable" key lets anyone send requests,
       but Row-Level Security (RLS) rules block unauthorized access.
   NEVER use the service_role key in frontend code.
   ============================================================ */

import { createClient } from '@supabase/supabase-js'

const AACE_CLOUD = {
  url: "https://fmoxsqgnvfyszxcsypgb.supabase.co",
  anonKey: "sb_publishable_7t0973gQ1FjqXdsjXLhrOw_toMu8dwM"
}

// Create Supabase client instance
export const supabase = createClient(AACE_CLOUD.url, AACE_CLOUD.anonKey)

/* ============================================================
   IMPORTANT SETUP NOTES
   ============================================================
   1. Run the setup SQL (supabase-schema.sql) in Supabase > SQL Editor.
   2. Enable Row Level Security (RLS) on tables like user_profiles.
   3. Create proper policies, e.g.:

      alter table user_profiles enable row level security;

      drop policy if exists "user_profiles_insert" on user_profiles;

      create policy "user_profiles_insert"
      on user_profiles
      for insert
      to authenticated
      with check (
        is_cloud_admin()
        or is_first_user()
        or id = auth.uid()
      );

   4. Turn OFF email confirmation so new accounts can sign in immediately:
      Supabase Dashboard → Authentication → Providers → Email → "Confirm email" = OFF

   5. Make sure your user_profiles table has a UUID column (id or user_id)
      that matches auth.uid() from Supabase Auth.
   ============================================================ */

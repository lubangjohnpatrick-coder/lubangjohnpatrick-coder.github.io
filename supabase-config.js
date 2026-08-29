/* ============================================================
   AACE PROJECT DASHBOARD — cloud connection settings
   ============================================================
   This file is MEANT to be committed and uploaded with the app
   (e.g. to GitHub Pages). The values below are PUBLIC by design:
     - the Project URL is not sensitive;
     - the "anon" / "publishable" key lets anyone send requests,
       but the Row-Level Security rules in supabase-schema.sql
       block anonymous reads/writes.
   NEVER replace the anon key with the service_role secret key —
   that one must stay in the Supabase dashboard only.

   STEP 1 — Sign up and create a free project
     1. Open https://supabase.com and click "Start your project"
        (free tier is fine; no credit card needed).
     2. Name it something like "aace-dashboard".
     3. Choose a region close to you (e.g. Singapore) and pick a
        strong database password. Save that password somewhere safe.

   STEP 2 — Get your URL + anon key
     4. In your Supabase project, go to  Settings > API.
     5. Copy the "Project URL"
        (looks like:  https://abcdefghijkl.supabase.co)
     6. Copy the "anon public" key
        (looks like:  eyJhbGciOiJIUzI1NiIs...
        — this key is MEANT to be public; security comes from the
        Row Level Security rules in supabase-schema.sql.)

   STEP 3 — Paste them below  (keep the quotes!)
   ============================================================ */
var AACE_CLOUD = {
  url: "https://fmoxsqgnvfyszxcsypgb.supabase.co",
  anonKey: "sb_publishable_7t0973gQ1FjqXdsjXLhrOw_toMu8dwM"
};

/* After saving: run the setup SQL once (supabase-schema.sql) in
   Supabase > SQL Editor, then turn OFF email confirmation so new
   accounts can sign in immediately:
   Authentication > Providers > Email > "Confirm email" = OFF.    */
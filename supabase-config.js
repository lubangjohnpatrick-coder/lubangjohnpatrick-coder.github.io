/* ============================================================
   AACE PROJECT DASHBOARD — Supabase cloud connection settings
   ============================================================
   This file is loaded as a PLAIN, CLASSIC <script> in index.html
   (there is no `type="module"` on that tag). That means:

     ⚠ DO NOT add `import` / `export` statements to this file.
       A classic script can't parse ES module syntax — the browser
       throws a SyntaxError at load time, the whole file fails to
       run, and window.AACE_CLOUD is silently never set. From the
       app's point of view that looks identical to "not configured
      yet", so the cloud-only app cannot start and reports the
      configuration problem visibly instead of exposing local data.

     If you ever need the official `@supabase/supabase-js` NPM
     package instead of the bundled `supabase-lib.js`, either:
       a) keep using the UMD build (like supabase-lib.js) and a
          classic <script> tag, or
       b) switch BOTH <script> tags in index.html to
          type="module" and update script.js's cloud layer to
          `import` the client instead of reading window.supabase.
     Don't mix the two — pick one loading style per file.

   Values below are PUBLIC by design:
     - The project URL is not sensitive.
     - The "anon" / "publishable" key only lets a browser send
       requests — Row-Level Security policies in
       supabase-schema.sql decide what it's actually allowed to
       read or write. Anonymous (signed-out) visitors are blocked
       entirely; see the policies at the bottom of that file.

   NEVER put the service_role secret key here, or anywhere in the
   frontend — it bypasses Row-Level Security completely and must
   only ever live inside the Supabase dashboard / server-side code.
   ============================================================ */

window.AACE_CLOUD = {
  url: "https://fmoxsqgnvfyszxcsypgb.supabase.co",
  anonKey: "sb_publishable_7t0973gQ1FjqXdsjXLhrOw_toMu8dwM"
};

/* Load user-management hardening before script.js is parsed at the end of
   index.html. document.write is intentional here because this config file is
   parser-loaded synchronously in <head>; it preserves deterministic ordering. */
document.write('<script src="user-management-fix.js?v=33"><\/script>');

/* ============================================================
   ONE-TIME SUPABASE SETUP CHECKLIST
   ============================================================
   1. SQL Editor → New query → paste the entire contents of
      supabase-schema.sql → Run.
      This creates the `projects` / `user_profiles` tables and
      the Row-Level Security policies for authenticated users,
      including the helper function is_cloud_admin().

   2. Authentication → Providers → Email → set "Confirm email"
      to OFF, so new accounts can sign in immediately without
      clicking a confirmation link first.

   3. Settings → API → confirm the "Project URL" and the
      "anon / publishable" key above match this Supabase project.
      (Project Settings → API → Project API keys.)

   4. In the app: sign in with a Supabase-authenticated account,
      then use the app normally. Admin access is granted only to
      users explicitly assigned the Administrator role in the
      profile table.

   5. For permanent Admin-side user deletion, run
      supabase-user-management.sql once in the SQL Editor.

   Quick self-check after setup — open the browser console and
   look for a line starting with "[AACE Cloud]". No such line
   means this file loaded and parsed correctly; a warning there
   tells you exactly what's still missing.
   ============================================================ */

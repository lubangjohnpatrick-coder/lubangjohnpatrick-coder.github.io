/* ============================================================
   AACE PROJECT DASHBOARD — Supabase cloud connection settings
   ============================================================
   Browser-safe values only. The publishable key is intentionally public;
   authorization is enforced by Supabase Row-Level Security.

   NEVER put a service_role key or Gemini secret in this file. Privileged Auth
   administration and AI calls belong in Supabase Edge Functions.
   ============================================================ */

window.AACE_CLOUD = {
  url: "https://fmoxsqgnvfyszxcsypgb.supabase.co",
  anonKey: "sb_publishable_7t0973gQ1FjqXdsjXLhrOw_toMu8dwM"
};

/* Migration bridge: index.html currently parser-loads this classic script from
   <head>, while script.js is loaded later in <body>. These helpers register
   DOMContentLoaded hooks before script.js boots. A future module-build migration
   should replace document.write with normal defer/module imports. */
document.write('<script src="production-hardening.js?v=40"><\/script>');
document.write('<script src="user-management-fix.js?v=40"><\/script>');
document.write('<script src="dashboard-enhancements.js?v=40"><\/script>');

/* ============================================================
   PRODUCTION SETUP CHECKLIST
   ============================================================
   1. Run supabase-production-hardening.sql in Supabase SQL Editor BEFORE
      deploying this frontend. It closes browser-bypass permission gaps,
      creates the immutable activity trail, and enables server project numbers.

   2. Deploy the Supabase Edge Function at:
        supabase/functions/admin-users/index.ts
      The service-role key remains server-side and is never placed in GitHub
      Pages. User creation/password reset/deletion uses this function.

   3. If server-side AI is enabled, deploy the `gemini` Edge Function and store
      GEMINI_API_KEY only as an Edge Function secret. Do not restore browser
      localStorage API-key handling.

   4. In Supabase Authentication, disable public user sign-up if your deployment
      is administrator-provisioned only. A random Auth account receives no
      dashboard access without an active user_profiles row, but disabling public
      sign-up further reduces attack surface.

   5. Keep Email authentication enabled. Existing dashboard users must have a
      matching Supabase Auth user and user_profiles row.
   ============================================================ */

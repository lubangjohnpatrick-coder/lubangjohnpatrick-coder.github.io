/* ============================================================
   AACE PROJECT DASHBOARD — Supabase cloud connection settings
   ============================================================
   Browser-safe values only. The publishable key is intentionally public;
   authorization is enforced by Supabase Row-Level Security.

   NEVER put a service_role key, provider secret, or password in this file.
   Privileged Auth administration belongs in Supabase Edge Functions.
   ============================================================ */

window.AACE_CLOUD = {
  url: "https://fmoxsqgnvfyszxcsypgb.supabase.co",
  anonKey: "sb_publishable_7t0973gQ1FjqXdsjXLhrOw_toMu8dwM"
};

/* Scripts are loaded explicitly with ordered `defer` tags in index.html:
   supabase-lib -> config -> production-hardening -> user-management-fix ->
   dashboard-enhancements -> script.js. Do not reintroduce document.write. */

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

   3. The `gemini` Edge Function is fail-closed by default. Do not restore
      browser localStorage API-key handling. Implement an approved server-side
      provider integration only after external CAPEX-data processing is cleared.

   4. In Supabase Authentication, disable public user sign-up if this internal
      deployment is administrator-provisioned only. A random Auth account still
      receives no dashboard access without an active user_profiles row.
   ============================================================ */

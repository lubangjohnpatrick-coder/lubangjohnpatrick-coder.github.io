# AACE Project Dashboard — Developer Guide

This guide is for maintainers working on the GitHub Pages frontend and Supabase backend.

## 1. Architecture at a glance

The application is intentionally cloud-only:

- **Frontend:** static HTML/CSS/JavaScript on GitHub Pages
- **Authentication:** Supabase Auth
- **Authorization:** PostgreSQL Row-Level Security (RLS)
- **Project storage:** `public.projects`
- **Profiles/roles:** `public.user_profiles`
- **Audit history:** append-only `public.activity_trail`
- **Project numbering:** server-side `public.create_aace_project(jsonb)`
- **Privileged Auth changes:** `admin-users` Supabase Edge Function
- **AI:** server gateway only; current `gemini` function is intentionally fail-closed

Never treat hidden/disabled frontend controls as authorization. The database is the security boundary.

## 2. Script loading order

`index.html` loads classic scripts with `defer` in this order:

1. `supabase-lib.js`
2. `supabase-config.js`
3. `production-hardening.js`
4. `user-management-fix.js`
5. `dashboard-enhancements.js`
6. `script.js`

Do not reintroduce `document.write()` or duplicate script loaders.

`production-hardening.js` is a compatibility bridge around the legacy monolithic `script.js`. New large features should preferentially be extracted into modules/services rather than adding more monkey patches indefinitely.

## 3. Local development

From the repository root:

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

For JavaScript checks:

```bash
npm run check
npm test
```

No production secret should be required to run static checks.

## 4. Supabase migrations

For an existing production database, use:

```text
supabase-production-hardening.sql
```

For a new environment, use:

```text
supabase-schema.sql
```

Database migrations must be applied **before** deploying frontend code that depends on the new policies/functions/tables.

After a migration, verify:

- Administrator can read/add/edit/delete projects.
- View-only user cannot insert/update/delete through direct Supabase calls.
- Add-only user can create but cannot edit existing projects.
- Edit user can update but cannot delete projects.
- Activity records appear after create/update/delete.
- Activity records cannot be updated or deleted by browser roles.
- Two concurrent project creations get different project numbers.

## 5. User administration

The browser must not use a service-role key or Supabase Admin API directly.

Deploy:

```bash
supabase functions deploy admin-users
```

The function validates the caller's Auth token and active Administrator profile before performing:

- account creation
- password change
- account deletion

If the function is unavailable, the Users UI should fail closed with an error rather than performing a local-only change.

## 6. AI integration

The browser no longer stores a Gemini key in `localStorage`.

`supabase/functions/gemini/index.ts` currently returns a controlled unavailable response. Keep it that way unless external AI processing of project/CAPEX information is formally approved.

If AI is approved later:

- keep the provider key in Edge Function secrets;
- authenticate every request;
- enforce rate/size limits;
- log only non-sensitive operational metadata;
- do not log raw project prompts unless explicitly approved;
- document the provider/data-retention policy.

## 7. Pull-request workflow

Recommended workflow:

```bash
git checkout -b feature/short-description
git add .
git commit -m "Describe the change"
git push origin feature/short-description
```

Then open a PR into `main`.

Before merge, require the **Quality Gate** workflow to pass. For backend-dependent changes, include the exact SQL/Edge Function rollout order in the PR description.

## 8. Release and rollback

GitHub Pages deploys `main` automatically.

A safe release order is:

1. Back up/export critical production data.
2. Apply backward-compatible Supabase migration.
3. Deploy required Edge Functions.
4. Merge the tested frontend PR.
5. Verify GitHub Pages deployment succeeds.
6. Smoke-test Auth, permissions, CRUD, audit, and user administration.
7. Tag the known-good commit.

Rollback frontend regressions with a Git revert of the merge commit. Do **not** blindly roll back a database migration if newer data may depend on it; use a forward corrective migration instead.

## 9. Security checklist

Before approving changes, verify that they do not:

- add `service_role` or provider secrets to browser code;
- weaken RLS to `using (true)` / `with check (true)` for sensitive writes;
- allow user self-promotion or permission mutation;
- make audit rows mutable/deletable;
- generate project IDs exclusively in browser memory;
- report success before a cloud write is confirmed;
- send CAPEX data to an external AI provider without approved server-side controls.

## 10. Refactor roadmap

The next maintainability phase should move away from the legacy single-file `script.js` toward ES modules, for example:

```text
src/
  config/
  services/
    auth.js
    projects.js
    users.js
    audit.js
  components/
  utils/
  app.js
```

Prioritize extraction by risk rather than aesthetics: Auth/permissions first, project persistence second, audit third, then UI components.

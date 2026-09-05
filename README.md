# AACE Project Dashboard

Online-only CAPEX (Capital Expenditure) project monitoring for **Purefoods Hormel Plant 3**. The browser UI is hosted on GitHub Pages and uses Supabase for authentication, authorization, project storage, audit history, and privileged server-side user administration.

## Production architecture

```text
GitHub Pages
  index.html / CSS / browser JavaScript
                |
                v
        Supabase publishable client
                |
        +-------+------------------+
        |                          |
        v                          v
   Postgres + RLS            Edge Functions
   projects                  admin-users
   user_profiles             gemini (fail-closed by default)
   activity_trail
   project counters
```

The browser never receives a Supabase `service_role` key. Project permissions are enforced by PostgreSQL Row-Level Security, not merely by hidden buttons.

## Key features

- Executive CAPEX dashboard and project register
- AACE approval workflow and completion tracking
- Role-based `view`, `add`, and `edit` permissions enforced in Supabase RLS
- Administrator-only destructive project deletion
- Collision-safe server-generated project numbers such as `AACE-2026-044`
- Cloud-persisted, append-only Activity Trail with before/after project snapshots
- Optimistic concurrency checks so one browser does not silently overwrite a newer edit
- Server-side Supabase Auth administration for account creation, password changes, and deletion
- Responsive desktop/tablet/mobile layout
- AI drafting hooks that no longer store an API key in browser `localStorage`

## Existing deployment upgrade

**Do this before deploying the production-hardening frontend.**

1. Open **Supabase → SQL Editor → New query**.
2. Paste the entire contents of `supabase-production-hardening.sql`.
3. Run the migration and confirm it completes without errors.
4. Deploy the Auth administration Edge Function:

```bash
supabase functions deploy admin-users
```

5. Confirm the function has access to Supabase's server-managed `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment values. Never copy the service-role value into the frontend.
6. Keep the `gemini` Edge Function disabled/fail-closed until external AI processing is approved and a server-side provider implementation is added.
7. Merge/deploy the matching frontend only after the SQL migration is live.

## New Supabase project setup

For a brand-new environment, run `supabase-schema.sql` instead of the upgrade migration. It creates the hardened schema directly.

### First Administrator bootstrap

The schema intentionally has **no first-user self-promotion path**.

1. Create the first Auth user in **Supabase → Authentication → Users**.
2. Copy that user's UUID.
3. Insert the first trusted Administrator profile from SQL Editor:

```sql
insert into public.user_profiles (
  id, username, display_name, role, department, status, perms
) values (
  '<AUTH-USER-UUID>',
  'your.username',
  'Your Name',
  'Administrator',
  'Plant 3',
  'Active',
  '{"view":true,"add":true,"edit":true}'::jsonb
);
```

After that, Administrators can provision other dashboard users through the Users screen and the `admin-users` Edge Function.

For an administrator-provisioned internal application, disable public Auth sign-up in Supabase after bootstrapping the environment.

## Authorization model

| Operation | Required authorization |
| --- | --- |
| Read projects | Active profile + `view`, or Administrator |
| Add projects | Active profile + `add`, or Administrator |
| Edit projects | Active profile + `edit`, or Administrator |
| Delete projects | Administrator only |
| Read audit trail | `view`, or Administrator |
| Add manual audit note | `edit`, or Administrator |
| Alter/delete audit history | Not permitted from browser roles |
| Manage roles/status/permissions | Administrator |
| Create/delete Auth users | `admin-users` Edge Function + Administrator caller |

The database policies are the security boundary. Client-side permission checks exist for UX only.

## Project IDs and concurrency

New project numbers are allocated inside PostgreSQL by `create_aace_project(jsonb)`. This avoids two simultaneous browsers producing the same next number and automatically rolls the year based on the **Asia/Manila** calendar year.

Existing project numbers are immutable in the hardened frontend. This preserves stable audit references.

Project edits use the row's `updated_at` revision. If another browser saves a newer version first, the stale editor is rejected and must refresh instead of silently overwriting the other user's work.

## Activity Trail

The Activity Trail is persisted in `public.activity_trail`. A PostgreSQL trigger records project create/update/delete operations regardless of whether a change originated from this webpage or another authorized Supabase client.

Audit rows are append-only for browser users. Manual notes are allowed for editors but previous history cannot be rewritten or removed through normal dashboard permissions.

## AI and data governance

The hardened browser no longer stores a Gemini API key in `localStorage` and no longer calls a provider directly with a browser-owned secret.

`supabase/functions/gemini/index.ts` is intentionally fail-closed. The existing UI falls back to deterministic/offline templates when the server AI gateway is unavailable.

If external AI processing is later approved, implement the provider call **inside that Edge Function**, keep the provider key in Edge Function secrets, authenticate every request, and confirm that sending CAPEX/project information to the external provider complies with company policy.

## Local development

This is currently a classic static application rather than a framework build.

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

Do not test privileged production Auth changes against a production Supabase environment unless that is intentional.

## Quality checks

The repository includes a GitHub Actions quality workflow and static regression tests.

```bash
npm run check
npm test
```

The checks verify JavaScript syntax and important security invariants such as hardened RLS, server project numbering, audit persistence, and server-side Auth administration.

## Deployment

GitHub Pages deploys the static frontend from `main`. The Pages deployment succeeding only proves that GitHub could publish the files; application regressions are caught by the separate quality workflow.

Recommended release process:

1. Create a feature/hardening branch.
2. Run SQL/Edge Function migrations in the target Supabase environment when required.
3. Run the quality workflow.
4. Review the PR.
5. Merge to `main`.
6. Verify GitHub Pages deployment.
7. Smoke-test sign-in, project CRUD, permissions, audit history, and user administration.
8. Tag known-good releases so rollback is a Git revert/redeploy instead of an emergency manual edit.

## Security rules

- `supabase-config.js` may contain only the public project URL and publishable/anon key.
- Never commit `service_role`, provider secrets, passwords, or private company credentials.
- Do not rely on `display:none`, disabled buttons, or JavaScript `canEdit()` checks for authorization.
- Keep audit history append-only.
- Treat project exports/backups as sensitive company data.
- Review external AI use separately from normal Supabase data processing.

## Important files

| File | Purpose |
| --- | --- |
| `index.html` | Application structure and views |
| `style.css` | Executive design system and responsive layout |
| `script.js` | Legacy application logic pending modular refactor |
| `production-hardening.js` | Security/data-integrity bridge around the legacy application |
| `dashboard-enhancements.js` | Dashboard drill-down and branding enhancements |
| `user-management-fix.js` | Secure Users UI integration with server-side Auth administration |
| `supabase-config.js` | Browser-safe Supabase URL/publishable key and migration loaders |
| `supabase-schema.sql` | Hardened new-install database schema |
| `supabase-production-hardening.sql` | Existing-database upgrade migration |
| `supabase/functions/admin-users/index.ts` | Privileged Supabase Auth administration |
| `supabase/functions/gemini/index.ts` | Fail-closed server AI gateway placeholder |
| `aace_logo.png` | Current application logo |

## Known migration debt

`script.js` is still a large classic-script file and `supabase-config.js` temporarily uses parser-time helper loading so fixes can be deployed safely without rewriting the entire application at once. The next architectural phase should move the app to ES modules/services/components and normal `defer`/module imports, then remove the compatibility loaders.

# AACE Project Dashboard

Online-only CAPEX (Capital Expenditure) project dashboard for **Purefoods Hormel Plant 3** using AACE International cost-estimating practice. The app requires a live Supabase cloud connection for login, data access, and project synchronization.

- Static app: no build step, no install. Open `index.html` and it runs when Supabase is configured.
- Login is cloud-based only. There is no local/offline account fallback.
- The app starts empty until the Supabase project is connected and the user signs in.

## Features

- **Executive dashboard** — KPI cards, CAPEX by department, portfolio status donut, management attention, largest allocations, and an **AI status update** generated from live project data
- **AACE Creation toolkit** — per-project checklist for Justification Support, Scope of Work, and related documentation
- **Activity Trail** — audit log of creates, edits, and status changes
- **Project register** — AACE IDs, department, budget, PIC, completion %, workflow stage, approval dates
- **Role-based permissions** — administrators and user profiles are managed in the cloud-backed Users area
- **Cloud sync** — shared projects and user data are stored and accessed through Supabase
- **AI assistant** — Gemini-based summaries, notes, and drafting, using a key stored only in the browser

## Run it

1. Open the project in a browser.
2. Make sure the Supabase project is configured in `supabase-config.js`.
3. Sign in using the Supabase cloud account created for that project.
4. The dashboard loads only after a valid cloud session is available.

Optional: in **Settings → AI Assistant**, add your Gemini API key. The key is saved only in the browser's localStorage and is never committed to the repo.

## Deploy to GitHub (GitHub Pages)

1. Create a repository.
2. Upload these files to the repo root:
   - `index.html`
   - `script.js`
   - `style.css`
   - `supabase-lib.js`
   - `supabase-config.js`
   - `supabase-schema.sql`
   - `aace_logo.png`
3. Open the repo → **Settings → Pages** → Source: **Deploy from a branch** → `main` / root.
4. The app is served at `https://<your-user>.github.io/<repo>/`.

The Supabase client is bundled locally in `supabase-lib.js`, and the app uses it in classic script mode.

## Set up Supabase (once)

1. Go to [supabase.com](https://supabase.com) → **Start your project**.
2. In the project: **SQL Editor → New query** → paste the entire contents of `supabase-schema.sql` → **Run**.
3. **Settings → API**: copy the **Project URL** and the **anon (publishable) key** into `supabase-config.js`.
4. **Authentication → Providers → Email**: set **Confirm email = OFF** so new accounts can sign in immediately.
5. Create the Supabase users and sign in through the app. The dashboard performs all login checks through the cloud.

## Security notes

- The anon key is a **publishable** key and is meant to be committed. Access is still limited by the Row-Level Security policies in `supabase-schema.sql`.
- **Never** commit the `service_role` secret key — it belongs only in the Supabase dashboard server-side environment.
- The Gemini API key is stored only in the browser's localStorage and is never saved in the repo.
- All project and user access is expected to go through the Supabase cloud, not the browser's local storage.

## Troubleshooting

**The app says it is online-only and won’t load.**
Check that `supabase-config.js` is present and valid. It must be loaded as a classic script with no `import` or `export` statements. If it fails to parse, `window.AACE_CLOUD` is never set and the app will refuse to continue.

**Cloud sign-in fails.**
Confirm:
- the URL and anon key match the live Supabase project,
- Email authentication is enabled,
- the username matches the cloud email mapping used by the app,
- the user exists in Supabase Auth and has a valid password.

**Logo or asset broken after deployment.**
Use exact filenames and avoid spaces in the asset names. This project uses `aace_logo.png` intentionally.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App structure and views |
| `script.js` | All app logic — login, permissions, data flow, AI, cloud sync |
| `style.css` | Theme and design system |
| `supabase-lib.js` | Bundled Supabase browser client |
| `supabase-config.js` | Cloud connection settings (URL + anon key) |
| `supabase-schema.sql` | Supabase tables and Row-Level Security rules |
| `aace_logo.png` | App logo |
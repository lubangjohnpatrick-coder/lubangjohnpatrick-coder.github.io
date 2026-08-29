# AACE Project Dashboard

Offline-first CAPEX (Capital Expenditure) project dashboard for **Purefoods Hormel Plant 3** using AACE International cost-estimating practice. Tracks the asset-acquisition lifecycle from creation through approval and procurement, with AI-assisted drafting and optional cloud sync via Supabase.

- Static app: no build step, no install. Open `index.html` and it runs.
- Works 100% offline in the browser. Cloud sync and AI are optional add-ons.
- Seed data (8 projects, AACE-2026-009 through 016) loads on first run so the app is usable immediately; once you sign in, the Supabase project list becomes the source of truth.

## Features

- **Executive dashboard** — KPI cards, CAPEX by department, portfolio status donut, management attention, largest allocations, and an **AI Status Update** (Generate / Copy / Save as PDF) written from live project statuses
- **AACE Creation toolkit** — per-project 5-document checklist (Justification Support, Scope of Work, etc.), AI drafts in the company house format from your sample templates
- **Activity Trail** — audit log of creates, edits, and status changes
- **Project register** — AACE IDs, department, budget, PIC, completion %, workflow stage, approval dates
- **Role-based permissions** — Administrator / Editor / Viewer (viewing is open, editing is permission-gated)
- **Optional cloud sync** — shared projects and accounts across devices via Supabase with Row-Level Security
- **Optional AI assistant** — Google Gemini summaries, notes, and drafting (key stored only in that browser)

## Run it locally

Just open `index.html` in any browser. Everything persists in browser storage.

Optional: in **Settings → AI Assistant**, add your Gemini API key (saved only in that browser's localStorage — never in code, never uploaded).

## Deploy to GitHub (GitHub Pages)

Recommended: make the repository **private** — the seed and future data are company CAPEX information.

1. Create a repository.
2. Upload these files to the repo root:
   - `index.html`
   - `script.js`
   - `style.css`
   - `supabase-lib.js`
   - `supabase-config.js`
   - `supabase-schema.sql`
   - `aace logo.png`
3. Open the repo → **Settings → Pages** → Source: **Deploy from a branch** → `main` / root. You can also *Preview* under "Actions" to confirm the build.
4. The app will be served at `https://<your-user>.github.io/<repo>/`.

The Supabase client is bundled locally (`supabase-lib.js`), so the app needs no external CDN — it works offline except for the actual cloud/AI network calls.

## Set up Supabase (once)

1. Go to [supabase.com](https://supabase.com) → **Start your project** (free tier is fine). Name it e.g. `aace-dashboard`, choose a nearby region, and save the database password.
2. In your project: **SQL Editor → New query** → paste the entire contents of `supabase-schema.sql` → **Run**. This creates the tables and the Row-Level Security rules.
3. **Settings → API**: copy the **Project URL** and the **anon (publishable) key** into `supabase-config.js` (`url` and `anonKey` fields).
4. **Authentication → Providers → Email**: set **Confirm email = OFF** so new accounts can sign in immediately.
5. In the app: sign in with a local account (or create one), then turn on the cloud toggle. The first account to sync is automatically provisioned as **Administrator**.

## Security notes

- The anon key is a **publishable** key and is meant to be committed. Your data is protected by the Row-Level Security rules in `supabase-schema.sql`: only signed-in users can read or write projects, and profiles are restricted to their owner or administrators.
- **Never** commit the `service_role` secret key — it exists only in the Supabase dashboard.
- The Gemini API key lives only in your browser's localStorage; it is never stored in the repo.
- Because RLS grants access to any signed-in account, if the repo is public, change the seed user passwords after the first cloud sign-in.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App structure and views |
| `script.js` | All logic — data, permissions, AI, cloud sync, audit trail |
| `style.css` | Theme and design system |
| `supabase-lib.js` | Bundled Supabase JS client (no external CDN needed) |
| `supabase-config.js` | Cloud connection settings (URL + anon key) |
| `supabase-schema.sql` | Supabase tables + Row-Level Security (run once) |
| `aace logo.png` | App logo |
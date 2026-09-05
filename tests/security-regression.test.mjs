import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function text(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("database permissions are enforced by RLS instead of using(true)", async () => {
  const sql = await text("supabase-schema.sql");
  assert.match(sql, /has_project_permission\('view'\)/);
  assert.match(sql, /has_project_permission\('add'\)/);
  assert.match(sql, /has_project_permission\('edit'\)/);
  assert.match(sql, /projects_delete[\s\S]*is_cloud_admin\(\)/);
  assert.doesNotMatch(sql, /projects_(?:select|insert|update|delete)[\s\S]{0,180}(?:using|with check)\s*\(true\)/i);
});

test("profile creation and authorization mutation are Administrator-only", async () => {
  const sql = await text("supabase-schema.sql");
  const profileInsert = sql.match(/drop policy if exists "user_profiles_insert"[\s\S]*?create policy "user_profiles_insert"[\s\S]*?;/i)?.[0] ?? "";
  const profileUpdate = sql.match(/drop policy if exists "user_profiles_update"[\s\S]*?create policy "user_profiles_update"[\s\S]*?;/i)?.[0] ?? "";
  assert.match(profileInsert, /is_cloud_admin\(\)/);
  assert.match(profileUpdate, /using \(public\.is_cloud_admin\(\)\)/);
  assert.match(profileUpdate, /with check \(public\.is_cloud_admin\(\)\)/);
  assert.doesNotMatch(profileInsert, /id\s*=\s*auth\.uid\(\)/);
});

test("activity trail is persisted and append-only", async () => {
  const sql = await text("supabase-schema.sql");
  assert.match(sql, /create table if not exists public\.activity_trail/i);
  assert.match(sql, /create trigger trg_projects_audit/i);
  assert.match(sql, /after insert or update or delete on public\.projects/i);
  assert.doesNotMatch(sql, /create policy "activity_delete"/i);
  assert.doesNotMatch(sql, /create policy "activity_update"/i);
});

test("new project numbers are allocated atomically by the database", async () => {
  const sql = await text("supabase-schema.sql");
  const hardening = await text("production-hardening.js");
  assert.match(sql, /create or replace function public\.create_aace_project\(p_data jsonb\)/i);
  assert.match(sql, /project_number_counters/i);
  assert.match(sql, /Asia\/Manila/);
  assert.match(hardening, /rpc\("create_aace_project"/);
  assert.doesNotMatch(hardening, /AACE-2026-/);
});

test("project edits use optimistic concurrency and project IDs are immutable", async () => {
  const hardening = await text("production-hardening.js");
  assert.match(hardening, /eq\("updated_at", expectedRevision\)/);
  assert.match(hardening, /Someone else updated this project/);
  assert.match(hardening, /Project numbers are immutable/);
});

test("privileged Auth administration is server-side", async () => {
  const users = await text("user-management-fix.js");
  const edge = await text("supabase/functions/admin-users/index.ts");
  assert.match(users, /functions\.invoke\("admin-users"/);
  assert.doesNotMatch(users, /admin_delete_dashboard_user/);
  assert.doesNotMatch(users, /auth\.signUp/);
  assert.match(edge, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(edge, /Administrator access required/);
});

test("browser AI no longer stores an API key", async () => {
  const hardening = await text("production-hardening.js");
  const gateway = await text("supabase/functions/gemini/index.ts");
  assert.match(hardening, /functions\.invoke\("gemini"/);
  assert.doesNotMatch(hardening, /localStorage\.setItem/);
  assert.match(gateway, /fail-closed|disabled until an approved server-side provider integration/i);
});

test("application scripts use deterministic defer loading and a direct favicon", async () => {
  const html = await text("index.html");
  const config = await text("supabase-config.js");
  const order = [
    "supabase-lib.js",
    "supabase-config.js",
    "production-hardening.js",
    "user-management-fix.js",
    "dashboard-enhancements.js",
    "script.js"
  ];

  let previous = -1;
  for (const name of order) {
    const token = `<script defer src="${name}?v=40"></script>`;
    const index = html.indexOf(token);
    assert.ok(index > previous, `${name} must be loaded once and in the expected order`);
    previous = index;
  }

  assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="favicon\.svg\?v=40">/);
  assert.doesNotMatch(config, /document\.write/);
  assert.doesNotMatch(config, /service_role/i);
});

test("legacy Sync Now UI is removed and primary navigation is semantic", async () => {
  const html = await text("index.html");
  assert.doesNotMatch(html, /id="syncNowBtn"/);
  assert.match(html, /<button type="button" class="nav-link active" data-view="dashboard">/);
  assert.match(html, /aria-label="Primary navigation"/);
});

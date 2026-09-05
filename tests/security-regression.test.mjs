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

test("profile creation cannot self-promote a random signed-in user", async () => {
  const sql = await text("supabase-schema.sql");
  const profileInsert = sql.match(/drop policy if exists "user_profiles_insert"[\s\S]*?create policy "user_profiles_insert"[\s\S]*?;/i)?.[0] ?? "";
  assert.match(profileInsert, /is_cloud_admin\(\)/);
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

test("new project numbers are allocated by the database", async () => {
  const sql = await text("supabase-schema.sql");
  const hardening = await text("production-hardening.js");
  assert.match(sql, /create or replace function public\.create_aace_project\(p_data jsonb\)/i);
  assert.match(sql, /Asia\/Manila/);
  assert.match(hardening, /rpc\("create_aace_project"/);
  assert.doesNotMatch(hardening, /AACE-2026-/);
});

test("project edits use optimistic concurrency", async () => {
  const hardening = await text("production-hardening.js");
  assert.match(hardening, /eq\("updated_at", expectedRevision\)/);
  assert.match(hardening, /Someone else updated this project/);
});

test("privileged Auth administration is server-side", async () => {
  const users = await text("user-management-fix.js");
  assert.match(users, /functions\.invoke\("admin-users"/);
  assert.doesNotMatch(users, /admin_delete_dashboard_user/);
  assert.doesNotMatch(users, /auth\.signUp/);
});

test("browser AI no longer stores an API key", async () => {
  const hardening = await text("production-hardening.js");
  assert.match(hardening, /functions\.invoke\("gemini"/);
  assert.doesNotMatch(hardening, /localStorage\.setItem/);
});

test("production hardening loader is enabled", async () => {
  const config = await text("supabase-config.js");
  assert.match(config, /production-hardening\.js\?v=40/);
  assert.match(config, /user-management-fix\.js\?v=40/);
});

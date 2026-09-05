import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const LIVE_ORIGIN = "https://lubangjohnpatrick-coder.github.io";

function cors(origin: string | null) {
  const allowed = origin === LIVE_ORIGIN || origin?.startsWith("http://localhost:") || origin?.startsWith("http://127.0.0.1:");
  return {
    "Access-Control-Allow-Origin": allowed ? (origin ?? LIVE_ORIGIN) : LIVE_ORIGIN,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors(origin) },
  });
}

function dashboardEmail(username: string) {
  return `${username.trim().toLowerCase().replace(/\s+/g, ".")}@aace.local`;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(origin) });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return json({ error: "Server configuration is incomplete" }, 500, origin);

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return json({ error: "Authentication required" }, 401, origin);

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: authData, error: authError } = await admin.auth.getUser(token);
  const caller = authData?.user;
  if (authError || !caller) return json({ error: "Invalid or expired session" }, 401, origin);

  const { data: callerProfile, error: profileError } = await admin
    .from("user_profiles")
    .select("id, role, status")
    .eq("id", caller.id)
    .maybeSingle();

  if (
    profileError ||
    !callerProfile ||
    String(callerProfile.role).toLowerCase() !== "administrator" ||
    String(callerProfile.status).toLowerCase() !== "active"
  ) {
    return json({ error: "Administrator access required" }, 403, origin);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400, origin);
  }

  const action = String(body.action ?? "");

  if (action === "create") {
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const profile = (body.profile ?? {}) as Record<string, unknown>;

    if (!/^[A-Za-z0-9._ -]{3,50}$/.test(username)) {
      return json({ error: "Username must be 3-50 characters and contain only letters, numbers, spaces, dot, underscore, or hyphen" }, 400, origin);
    }
    if (password.length < 8) return json({ error: "Password must contain at least 8 characters" }, 400, origin);

    const role = String(profile.role ?? "User");
    const status = String(profile.status ?? "Active");
    if (!["user", "administrator"].includes(role.toLowerCase())) return json({ error: "Invalid role" }, 400, origin);
    if (!["active", "inactive"].includes(status.toLowerCase())) return json({ error: "Invalid status" }, 400, origin);

    const perms = profile.perms && typeof profile.perms === "object"
      ? profile.perms
      : { view: true, add: false, edit: false };

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email: dashboardEmail(username),
      password,
      email_confirm: true,
      user_metadata: { dashboard_username: username },
    });

    if (createError || !created.user) {
      return json({ error: createError?.message ?? "Could not create Auth user" }, 400, origin);
    }

    const { error: insertError } = await admin.from("user_profiles").insert({
      id: created.user.id,
      username,
      display_name: String(profile.display_name ?? username).trim() || username,
      role,
      department: String(profile.department ?? ""),
      status,
      perms,
    });

    if (insertError) {
      await admin.auth.admin.deleteUser(created.user.id).catch(() => undefined);
      return json({ error: insertError.message }, 400, origin);
    }

    return json({ ok: true, user_id: created.user.id }, 200, origin);
  }

  if (action === "set_password") {
    const userId = String(body.user_id ?? "");
    const password = String(body.password ?? "");
    if (!userId) return json({ error: "user_id is required" }, 400, origin);
    if (password.length < 8) return json({ error: "Password must contain at least 8 characters" }, 400, origin);

    const { error } = await admin.auth.admin.updateUserById(userId, { password });
    if (error) return json({ error: error.message }, 400, origin);
    return json({ ok: true }, 200, origin);
  }

  if (action === "delete") {
    const userId = String(body.user_id ?? "");
    if (!userId) return json({ error: "user_id is required" }, 400, origin);
    if (userId === caller.id) return json({ error: "You cannot delete your own signed-in account" }, 400, origin);

    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) return json({ error: error.message }, 400, origin);
    return json({ ok: true }, 200, origin);
  }

  return json({ error: "Unsupported action" }, 400, origin);
});

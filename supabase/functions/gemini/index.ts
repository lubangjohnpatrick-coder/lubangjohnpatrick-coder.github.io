/* AACE server-side AI gateway placeholder.
 *
 * Intentionally fail-closed. The production frontend no longer stores or sends
 * a Gemini API key from localStorage. Enable external AI processing only after
 * company approval, then implement the provider call here using an Edge Function
 * secret (never a browser-exposed key).
 */

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

Deno.serve((req) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(origin) });

  return new Response(JSON.stringify({
    error: "External AI processing is disabled until an approved server-side provider integration is configured."
  }), {
    status: 503,
    headers: { "Content-Type": "application/json", ...cors(origin) },
  });
});

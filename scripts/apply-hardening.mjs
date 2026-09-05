import { readFile, writeFile } from "node:fs/promises";

const VERSION = "40";

async function hardenHtml() {
  const path = new URL("../index.html", import.meta.url);
  let html = await readFile(path, "utf8");

  // Remove legacy application script tags so the ordered defer block below is
  // the single source of truth. This makes parser ordering explicit and removes
  // the need for document.write in supabase-config.js.
  const scriptNames = [
    "supabase-lib.js",
    "supabase-config.js",
    "production-hardening.js",
    "user-management-fix.js",
    "dashboard-enhancements.js",
    "script.js"
  ];
  for (const name of scriptNames) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    html = html.replace(new RegExp(`\\s*<script(?:\\s+defer)?\\s+src=["']${escaped}(?:\\?v=\\d+)?["']><\\/script>`, "gi"), "");
  }

  html = html.replace(/<link rel="stylesheet" href="style\.css\?v=\d+">/i,
    `<link rel="stylesheet" href="style.css?v=${VERSION}">`);

  if (!/rel=["']icon["']/i.test(html)) {
    html = html.replace(/<title>([\s\S]*?)<\/title>/i,
      `<title>$1</title>\n<link rel="icon" type="image/svg+xml" href="favicon.svg?v=${VERSION}">\n<link rel="apple-touch-icon" href="aace_logo.png?v=${VERSION}">`);
  }

  const orderedScripts = [
    `<script defer src="supabase-lib.js?v=${VERSION}"></script>`,
    `<script defer src="supabase-config.js?v=${VERSION}"></script>`,
    `<script defer src="production-hardening.js?v=${VERSION}"></script>`,
    `<script defer src="user-management-fix.js?v=${VERSION}"></script>`,
    `<script defer src="dashboard-enhancements.js?v=${VERSION}"></script>`,
    `<script defer src="script.js?v=${VERSION}"></script>`
  ].join("\n");
  html = html.replace(/<\/head>/i, `${orderedScripts}\n</head>`);

  html = html.replace(/aace_logo\.png\?v=\d+/g, `aace_logo.png?v=${VERSION}`);
  html = html.replace('<aside class="sidebar" id="sidebar">', '<aside class="sidebar" id="sidebar" aria-label="Primary sidebar">');
  html = html.replace('<ul class="sidebar-nav">', '<ul class="sidebar-nav" aria-label="Primary navigation">');
  html = html.replace(/<div class="nav-section">([\s\S]*?)<\/div>/g, '<li class="nav-section" role="presentation">$1</li>');

  html = html.replace(/<a class="nav-link( active)?" data-view="([^"]+)">([\s\S]*?)<\/a>/g,
    (_match, active = "", view, body) => `<button type="button" class="nav-link${active || ""}" data-view="${view}">${body}</button>`);

  html = html.replace('<button class="icon-btn" id="sidebarToggle" title="Toggle sidebar">',
    '<button type="button" class="icon-btn" id="sidebarToggle" title="Toggle sidebar" aria-label="Toggle sidebar">');
  html = html.replace('<button class="icon-btn" id="logoutBtn" title="Sign out">',
    '<button type="button" class="icon-btn" id="logoutBtn" title="Sign out" aria-label="Sign out">');

  html = html.replace(/\s*<button class="btn btn-sm" id="syncNowBtn"[\s\S]*?<\/button>/i, "");
  html = html.replace("Cloud changes are saved after confirmation", "Cloud-only · writes are confirmed by Supabase");

  await writeFile(path, html);
}

async function hardenCss() {
  const path = new URL("../style.css", import.meta.url);
  let css = await readFile(path, "utf8");
  css = css.replace("Offline-first progressive web dashboard.", "Cloud-first project dashboard.");

  const marker = "/* ---------- Production accessibility hardening ---------- */";
  if (!css.includes(marker)) {
    css += `\n\n${marker}\n.nav-link[type=\"button\"] {\n  width: 100%;\n  background: transparent;\n  text-align: left;\n  font: inherit;\n}\n.nav-link[type=\"button\"].active {\n  background: linear-gradient(90deg, var(--blue-600), var(--blue-700));\n}\nbutton:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {\n  outline: 3px solid rgba(37, 99, 235, .32);\n  outline-offset: 2px;\n}\n@media (hover: none) {\n  .card:hover { transform: none; }\n}\n@media (max-width: 760px) {\n  button, .nav-link { min-height: 44px; }\n}\n`;
  }
  await writeFile(path, css);
}

await hardenHtml();
await hardenCss();

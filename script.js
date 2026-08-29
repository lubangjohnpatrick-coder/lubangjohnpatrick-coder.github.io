/* =========================================================================
   AACE PROJECT DASHBOARD — Capital Expenditure Monitoring System
   Approval-flow data below is transcribed from the official AACE approval
   matrix (AACE_Project_Status workbook, "Approval" tab). Project rows are
   placeholder/dummy data — replace them with real projects via
   "Add New Project" or by editing seedProjects() below.
   ========================================================================= */

// ---------------------------------------------------------------------
// 1. APPROVAL WORKFLOW DEFINITIONS
// Each tier has an ordered list of stages. A stage's "percent" is the
// cumulative completion once that stage is reached.
// ---------------------------------------------------------------------
const approvalFlows = {
  tier1: {
    key: "tier1", label: "<1M", min: 0, max: 1,
    stages: [
      { responsible: "Proponent", status: "AACE Creation", percent: 5 },
      { responsible: "Proponent", status: "Pre-Bidding Request", percent: 10 },
      { responsible: "Proponent", status: "Technical Evaluation", percent: 15 },
      { responsible: "Procurement", status: "Released SPQF", percent: 20 },
      { responsible: "Proponent", status: "Financials Evaluation", percent: 25 },
      { responsible: "Proponent", status: "Uploading", percent: 30 },
      { responsible: "Bernard B. Buenavista", status: "Plant Manager Approval", percent: 35 },
      { responsible: "IETS", status: "Plant AACE Coordinator", percent: 40 },
      { responsible: "Christopher M. Pascual", status: "IETS Manager", percent: 45 },
      { responsible: "Angelo P. Alvarez", status: "Supply Chain Technical and Support Services Manager", percent: 50 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level", percent: 55 },
      { responsible: "Sheila R. Rodil", status: "Budget Finance Manager - Financial Planning", percent: 60 },
      { responsible: "Noemi R. Angeles", status: "Budget Finance Manager - Processed Meats Finance", percent: 65 },
      { responsible: "Jose Gabriel S. Cruz", status: "General Manager", percent: 70 },
      { responsible: "Charissa Mae J. Duncil", status: "CAPEX Coordinator, Div Level", percent: 75 },
      { responsible: "Erickson C. Bengat", status: "Financial Planning Manager", percent: 80 },
      { responsible: "Mauvir C. Buzon", status: "AVP Controllership, Planning and Budget", percent: 85 },
      { responsible: "Florence P. Pavon", status: "Chief Finance Officer", percent: 90 },
      { responsible: "Elizabeth R. Bay", status: "Chief Operating Officer", percent: 95 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level - Fully Approved", percent: 100 }
    ]
  },
  tier2: {
    key: "tier2", label: ">=P1M to <P50M", min: 1, max: 50,
    stages: [
      { responsible: "Proponent", status: "AACE Creation", percent: 4 },
      { responsible: "Proponent", status: "Pre-Bidding Request", percent: 7 },
      { responsible: "Proponent", status: "Technical Evaluation", percent: 11 },
      { responsible: "Procurement", status: "Released SPQF", percent: 14 },
      { responsible: "Proponent", status: "Financials Evaluation", percent: 18 },
      { responsible: "Proponent", status: "Uploading", percent: 21 },
      { responsible: "Bernard B. Buenavista", status: "Plant Manager Approval", percent: 25 },
      { responsible: "IETS", status: "Plant AACE Coordinator", percent: 29 },
      { responsible: "Christopher M. Pascual", status: "IETS Manager", percent: 32 },
      { responsible: "Angelo P. Alvarez", status: "Supply Chain Technical and Support Services Manager", percent: 36 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level", percent: 39 },
      { responsible: "Sheila R. Rodil", status: "Budget Finance Manager - Financial Planning", percent: 43 },
      { responsible: "Noemi R. Angeles", status: "Budget Finance Manager - Processed Meats Finance", percent: 46 },
      { responsible: "Jose Gabriel S. Cruz", status: "General Manager", percent: 50 },
      { responsible: "Charissa Mae J. Duncil", status: "CAPEX Coordinator, Div Level", percent: 54 },
      { responsible: "Erickson C. Bengat", status: "Financial Planning Manager", percent: 57 },
      { responsible: "Mauvir C. Buzon", status: "AVP Controllership, Planning and Budget", percent: 61 },
      { responsible: "Florence P. Pavon", status: "Chief Finance Officer", percent: 64 },
      { responsible: "Elizabeth R. Bay", status: "Chief Operating Officer", percent: 68 },
      { responsible: "Emmanuel B. Macalalag", status: "San Miguel Foods President", percent: 71 },
      { responsible: "CAPEX Coordinator Corporate", status: "CAPEX Coordinator, Corporate", percent: 75 },
      { responsible: "CFPAD Analyst", status: "CFPAD Analyst", percent: 79 },
      { responsible: "Leah Corazon I. Artuz", status: "CFPAD Manager", percent: 82 },
      { responsible: "Chesca B. Tenorio", status: "CFPAD Head", percent: 86 },
      { responsible: "Bryan U. Villanueva", status: "SMC CFO", percent: 89 },
      { responsible: "Alliah Marj M. Medallo", status: "OTP 1", percent: 93 },
      { responsible: "Monica L. Ang", status: "SMFB CFO - OTP 2", percent: 96 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level - Fully Approved", percent: 100 }
    ]
  },
  tier3: {
    key: "tier3", label: ">=P50M to <P100M", min: 50, max: 100,
    stages: [] // filled below (same steps/percentages as tier2)
  },
  tier4: {
    key: "tier4", label: ">=P100M to <P200M", min: 100, max: 200,
    stages: [
      { responsible: "Proponent", status: "AACE Creation", percent: 3 },
      { responsible: "Proponent", status: "Pre-Bidding Request", percent: 7 },
      { responsible: "Proponent", status: "Technical Evaluation", percent: 10 },
      { responsible: "Procurement", status: "Released SPQF", percent: 14 },
      { responsible: "Proponent", status: "Financials Evaluation", percent: 17 },
      { responsible: "Proponent", status: "Uploading", percent: 21 },
      { responsible: "Bernard B. Buenavista", status: "Plant Manager Approval", percent: 24 },
      { responsible: "IETS", status: "Plant AACE Coordinator", percent: 28 },
      { responsible: "Christopher M. Pascual", status: "IETS Manager", percent: 31 },
      { responsible: "Angelo P. Alvarez", status: "Supply Chain Technical and Support Services Manager", percent: 34 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level", percent: 38 },
      { responsible: "Sheila R. Rodil", status: "Budget Finance Manager - Financial Planning", percent: 41 },
      { responsible: "Noemi R. Angeles", status: "Budget Finance Manager - Processed Meats Finance", percent: 45 },
      { responsible: "Jose Gabriel S. Cruz", status: "General Manager", percent: 48 },
      { responsible: "Charissa Mae J. Duncil", status: "CAPEX Coordinator, Div Level", percent: 52 },
      { responsible: "Erickson C. Bengat", status: "Financial Planning Manager", percent: 55 },
      { responsible: "Mauvir C. Buzon", status: "AVP Controllership, Planning and Budget", percent: 59 },
      { responsible: "Florence P. Pavon", status: "Chief Finance Officer", percent: 62 },
      { responsible: "Elizabeth R. Bay", status: "Chief Operating Officer", percent: 66 },
      { responsible: "Emmanuel B. Macalalag", status: "San Miguel Foods President", percent: 69 },
      { responsible: "CAPEX Coordinator Corporate", status: "CAPEX Coordinator, Corporate", percent: 72 },
      { responsible: "CFPAD Analyst", status: "CFPAD Analyst", percent: 76 },
      { responsible: "Leah Corazon I. Artuz", status: "CFPAD Manager", percent: 79 },
      { responsible: "Chesca B. Tenorio", status: "CFPAD Head", percent: 83 },
      { responsible: "Monica L. Ang", status: "SMFB CFO - OTP 2", percent: 86 },
      { responsible: "Bryan U. Villanueva", status: "SMC CFO", percent: 90 },
      { responsible: "Alliah Marj M. Medallo", status: "OTP 1", percent: 93 },
      { responsible: "John Paul L. Ang", status: "Vice Chairman, President and COO", percent: 97 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level - Fully Approved", percent: 100 }
    ]
  },
  tier4Con: {
    key: "tier4Con", label: ">=P100M to <P200M (with construction)", min: 100, max: 200,
    stages: [
      { responsible: "Proponent", status: "AACE Creation", percent: 3 },
      { responsible: "Proponent", status: "Pre-Bidding Request", percent: 6 },
      { responsible: "Proponent", status: "Technical Evaluation", percent: 9 },
      { responsible: "Procurement", status: "Released SPQF", percent: 13 },
      { responsible: "Proponent/ IETS/ Finance", status: "Financials Evaluation", percent: 16 },
      { responsible: "Proponent", status: "Uploading", percent: 19 },
      { responsible: "Bernard B. Buenavista", status: "Plant Manager Approval", percent: 22 },
      { responsible: "IETS", status: "Plant AACE Coordinator", percent: 25 },
      { responsible: "Christopher M. Pascual", status: "IETS Manager", percent: 28 },
      { responsible: "Angelo P. Alvarez", status: "Supply Chain Technical and Support Services Manager", percent: 31 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level", percent: 34 },
      { responsible: "Sheila R. Rodil", status: "Budget Finance Manager - Financial Planning", percent: 38 },
      { responsible: "Noemi R. Angeles", status: "Budget Finance Manager - Processed Meats Finance", percent: 41 },
      { responsible: "Jose Gabriel S. Cruz", status: "General Manager", percent: 44 },
      { responsible: "Charissa Mae J. Duncil", status: "CAPEX Coordinator, Div Level", percent: 47 },
      { responsible: "Erickson C. Bengat", status: "Financial Planning Manager", percent: 50 },
      { responsible: "Mauvir C. Buzon", status: "AVP Controllership, Planning and Budget", percent: 53 },
      { responsible: "Florence P. Pavon", status: "Chief Finance Officer", percent: 56 },
      { responsible: "Elizabeth R. Bay", status: "Chief Operating Officer", percent: 59 },
      { responsible: "Emmanuel B. Macalalag", status: "San Miguel Foods, President", percent: 63 },
      { responsible: "Carlos O. Tan", status: "Archen Coordinator", percent: 66 },
      { responsible: "Kathleen Teresa S. Epino", status: "Archen Coordinator", percent: 69 },
      { responsible: "Alliah Marj M. Medallo", status: "OTP 1", percent: 72 },
      { responsible: "Ramon S. Ang", status: "Chairman and Chief Executive Officer", percent: 75 },
      { responsible: "CAPEX Coordinator, Corporate", status: "CAPEX Coordinator, Corporate", percent: 78 },
      { responsible: "CFPAD Analyst", status: "CFPAD Analyst", percent: 81 },
      { responsible: "Leah Corazon I. Artuz", status: "CFPAD Manager", percent: 84 },
      { responsible: "Chesca B. Tenorio", status: "CFPAD Head", percent: 88 },
      { responsible: "Bryan U. Villanueva", status: "SMC CFO", percent: 88 },
      { responsible: "Alliah Marj M. Medallo", status: "OTP 1", percent: 91 },
      { responsible: "Monica L. Ang", status: "SMFB CFO - OTP 2", percent: 94 },
      { responsible: "John Paul L. Ang", status: "Vice Chairman President and Chief Operating Officer", percent: 97 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level", percent: 100 }
    ]
  },
  tier5: {
    key: "tier5", label: ">=P200M", min: 200, max: Infinity,
    stages: [
      { responsible: "Proponent", status: "AACE Creation", percent: 3 },
      { responsible: "Proponent", status: "Pre-Bidding Request", percent: 7 },
      { responsible: "Proponent", status: "Technical Evaluation", percent: 10 },
      { responsible: "Procurement", status: "Released SPQF", percent: 14 },
      { responsible: "Proponent", status: "Financials Evaluation", percent: 17 },
      { responsible: "Proponent", status: "Uploading", percent: 21 },
      { responsible: "Bernard B. Buenavista", status: "Plant Manager Approval", percent: 24 },
      { responsible: "IETS", status: "Plant AACE Coordinator", percent: 28 },
      { responsible: "Christopher M. Pascual", status: "IETS Manager", percent: 31 },
      { responsible: "Angelo P. Alvarez", status: "Supply Chain Technical and Support Services Manager", percent: 34 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level", percent: 38 },
      { responsible: "Sheila R. Rodil", status: "Budget Finance Manager - Financial Planning", percent: 41 },
      { responsible: "Noemi R. Angeles", status: "Budget Finance Manager - Processed Meats Finance", percent: 45 },
      { responsible: "Jose Gabriel S. Cruz", status: "General Manager", percent: 48 },
      { responsible: "Charissa Mae J. Duncil", status: "CAPEX Coordinator, Div Level", percent: 52 },
      { responsible: "Erickson C. Bengat", status: "Financial Planning Manager", percent: 55 },
      { responsible: "Mauvir C. Buzon", status: "AVP Controllership, Planning and Budget", percent: 59 },
      { responsible: "Florence P. Pavon", status: "Chief Finance Officer", percent: 62 },
      { responsible: "Elizabeth R. Bay", status: "Chief Operating Officer", percent: 66 },
      { responsible: "Emmanuel B. Macalalag", status: "San Miguel Foods President", percent: 69 },
      { responsible: "CAPEX Coordinator Corporate", status: "CAPEX Coordinator, Corporate", percent: 72 },
      { responsible: "CFPAD Analyst", status: "CFPAD Analyst", percent: 76 },
      { responsible: "Leah Corazon I. Artuz", status: "CFPAD Manager", percent: 79 },
      { responsible: "Chesca B. Tenorio", status: "CFPAD Head", percent: 83 },
      { responsible: "Monica L. Ang", status: "SMFB CFO - OTP 2", percent: 86 },
      { responsible: "Bryan U. Villanueva", status: "SMC CFO", percent: 90 },
      { responsible: "Alliah Marj M. Medallo", status: "OTP 1", percent: 93 },
      { responsible: "Ramon S. Ang", status: "SMC President", percent: 97 },
      { responsible: "Deborah B. Guimpayan", status: "CAPEX Coordinator, BU Level 2 - Fully Approved", percent: 100 }
    ]
  }
};
approvalFlows.tier3.stages = approvalFlows.tier2.stages.map(s => ({ ...s }));

function getWorkflow(costM, withConstruction) {
  const c = Number(costM) || 0;
  if (c < 1) return approvalFlows.tier1;
  if (c < 50) return approvalFlows.tier2;
  if (c < 100) return approvalFlows.tier3;
  if (c < 200) return withConstruction ? approvalFlows.tier4Con : approvalFlows.tier4;
  return approvalFlows.tier5;
}

function constructionChecked() {
  if (modalMode === "edit" && editingId) {
    const p = projects.find(x => x.id === editingId);
    if (p) return !!p.withConstruction;
  }
  const cb = document.getElementById("f_construction");
  return cb ? cb.checked : false;
}

function findStageIndex(workflow, responsible, status) {
  return workflow.stages.findIndex(s => s.responsible === responsible && s.status === status);
}

function findProjectStageIndex(workflow, p) {
  const matches = [];
  workflow.stages.forEach((s, i) => {
    if (s.responsible === p.personInCharge && s.status === p.currentStatus) matches.push(i);
  });
  if (matches.length <= 1) return matches[0] === undefined ? -1 : matches[0];
  let best = matches[0];
  let bestDiff = Infinity;
  const comp = Number(p.completion) || 0;
  matches.forEach(i => {
    const diff = Math.abs(Number(workflow.stages[i].percent) - comp);
    if (diff < bestDiff) { bestDiff = diff; best = i; }
  });
  return best;
}

// ---------------------------------------------------------------------
// 2. STATE
// ---------------------------------------------------------------------
let projects = [];
let sortState = { key: "projectNo", dir: "asc" };
let selectedId = null;
let projectCounter = 1;

const STORAGE_KEY = "aace_dashboard_projects_v1";

function timeNow() {
  return new Date().toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
}

function saveProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    flashSaveStatus("⚠ Could not save to this browser's storage — export a backup to be safe", true);
    return;
  }
  syncProjectsToCloud();
}

function pendingCloudDeletes() {
  try {
    const raw = localStorage.getItem(PENDING_DEL_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (e) { return new Set(); }
}
function addPendingCloudDelete(ids) {
  const s = pendingCloudDeletes();
  (Array.isArray(ids) ? ids : [ids]).forEach(id => s.add(id));
  try { localStorage.setItem(PENDING_DEL_KEY, JSON.stringify([...s])); } catch (e) { /* ignore */ }
}
function clearPendingCloudDeletes() {
  try { localStorage.removeItem(PENDING_DEL_KEY); } catch (e) { /* ignore */ }
}
function computeProjectCounter(list) {
  const maxNum = (list || []).reduce((m, p) => {
    const n = parseInt(String(p.id).split("-").pop(), 10);
    return isNaN(n) ? m : Math.max(m, n);
  }, 0);
  return maxNum + 1;
}

// Push the local project list to the shared database (and pull anything we missed).
function syncProjectsToCloud() {
  if (!db || !cloudReady) {
    flashSaveStatus("Saved " + (cloudConfigured ? "offline — will sync when back online" : "in this browser") + " · " + timeNow(), !!cloudConfigured);
    return;
  }
  (async () => {
    try {
      const deleted = pendingCloudDeletes();
      const { data, error } = await db.from("projects").select("id, data");
      if (error) throw error;
      const localMap = new Map(projects.map(p => [p.id, p]));
      const finalMap = new Map();
      (data || []).forEach(r => {
        if (!r || !r.data) return;
        const pid = r.data.id || r.id;
        if (deleted.has(pid)) return;
        finalMap.set(pid, localMap.has(pid) ? localMap.get(pid) : r.data);
      });
      projects.forEach(p => { if (p && p.id && !finalMap.has(p.id) && !deleted.has(p.id)) finalMap.set(p.id, p); });
      projects = [...finalMap.values()].sort((a, b) => String(a.id).localeCompare(String(b.id)));
      projectCounter = computeProjectCounter(projects);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      const rows = projects.map(p => ({ id: p.id, data: p, updated_at: new Date().toISOString() }));
      const { error: upErr } = await db.from("projects").upsert(rows, { onConflict: "id" });
      if (upErr) throw upErr;
      if (deleted.size) {
        const { error: delErr } = await db.from("projects").delete().in("id", [...deleted]);
        if (delErr) throw delErr;
        clearPendingCloudDeletes();
      }
      flashSaveStatus("Saved to shared cloud · " + timeNow());
      renderFilterOptions();
      renderCards();
      renderTable();
    } catch (e) {
      flashSaveStatus("Kept locally — will sync when back online", true);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); } catch (x) { /* ignore */ }
    }
  })();
}
function flashSaveStatus(msg, isWarning) {
  const el = document.getElementById("saveStatus");
  if (!el) return;
  el.textContent = msg;
  el.style.color = isWarning ? "var(--red-600)" : "var(--green-600)";
}
function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { projects = JSON.parse(raw); return true; }
  } catch (e) { /* ignore */ }
  return false;
}

// ---------------------------------------------------------------------
// 2.5 AUTH, SESSION & USERS
// ---------------------------------------------------------------------
const DEFAULT_ADMIN = { username: "JapongTheGreat", password: "AACEUpdate" };
const SESSION_KEY = "aace_session_v1";
const USERS_KEY = "aace_users_v1";

let users = [];
let editingUserId = null;
let modalMode = "add";
let editingId = null;

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      users = JSON.parse(raw);
      if (!Array.isArray(users)) users = [];
    }
  } catch (e) { /* ignore */ }
  const hasAdmin = users.some(u => u.username && u.username.toLowerCase() === DEFAULT_ADMIN.username.toLowerCase());
  if (users.length === 0 || !hasAdmin) {
    users.unshift({
      username: DEFAULT_ADMIN.username,
      password: DEFAULT_ADMIN.password,
      displayName: DEFAULT_ADMIN.username,
      role: "Administrator",
      department: "AACE",
      status: "Active"
    });
  }
  // Migrate older stored records that have no password field.
  users.forEach(u => {
    if (!u.username) return;
    if (u.password === undefined || u.password === null) u.password = "";
    if (!u.password && u.username.toLowerCase() === DEFAULT_ADMIN.username.toLowerCase()) u.password = DEFAULT_ADMIN.password;
    if (u.status !== "Active" && u.status !== "Inactive") u.status = "Active";
    if (!u.perms || typeof u.perms !== "object") u.perms = { view: true, add: true, edit: true };
  });
  saveUsers();
}
function saveUsers() {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (e) { /* ignore */ }
  if (!db || !cloudReady || !isAdmin()) return;
  (async () => {
    try {
      const rows = users
        .filter(u => u && u.id)
        .map(u => ({
          id: u.id,
          username: u.username,
          display_name: u.displayName || u.username,
          role: u.role || "User",
          department: u.department || "",
          status: u.status || "Active",
          perms: u.perms || { view: true, add: false, edit: false }
        }));
      if (rows.length) {
        const { error } = await db.from("user_profiles").upsert(rows, { onConflict: "id" });
        if (error) throw error;
      }
    } catch (e) { /* cloud down — saved locally, will sync when back online */ }
  })();
}

function getSessionUser() {
  const s = sessionStorage.getItem(SESSION_KEY);
  return s || null;
}
function setSessionUser(username) {
  sessionStorage.setItem(SESSION_KEY, username);
}
function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
function findUserByLogin(username, password) {
  const uname = username.trim();
  const user = users.find(u =>
    u.username && u.username.toLowerCase() === uname.toLowerCase() && u.status === "Active"
  );
  if (!user) return null;
  return (String(user.password || "") === password) ? user : null;
}
function findUserByUsername(username) {
  return users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase()) || null;
}
function currentUser() {
  return findUserByUsername(getSessionUser());
}
function isAdmin() {
  const u = currentUser();
  return !!u && u.role === "Administrator";
}
function permsOf(u) {
  return u && u.perms && typeof u.perms === "object" ? u.perms : { view: false, add: false, edit: false };
}
function canAdd() { return isAdmin() || !!permsOf(currentUser()).add; }
function canEdit() { return isAdmin() || !!permsOf(currentUser()).edit; }
function canView() { return isAdmin() || !!permsOf(currentUser()).view; }
function applyPermissions() {
  const usersLink = document.querySelector('.nav-link[data-view="users"]');
  if (usersLink) usersLink.style.display = isAdmin() ? "" : "none";
  const addBtn = document.getElementById("addProjectBtn");
  if (addBtn) addBtn.style.display = canAdd() ? "" : "none";
}

// ---------------------------------------------------------------------
// 2.6 CLOUD LAYER (Supabase) — shared projects & accounts across devices
// Config lives in supabase-config.js. Security rules live in
// supabase-schema.sql (Row Level Security). Without the config file the
// app keeps working 100% offline in this browser.
// ---------------------------------------------------------------------
let db = null;
let cloudConfigured = false;
let cloudReady = false;
let cloudSyncTimer = null;
const PENDING_DEL_KEY = "aace_pending_deletes_v1";

function isCloudConfigured() {
  return typeof window.AACE_CLOUD === "object" && !!window.AACE_CLOUD && !!window.AACE_CLOUD.url && !!window.AACE_CLOUD.anonKey
    && typeof window.supabase === "function" && !!window.supabase.createClient;
}

function initCloud() {
  cloudConfigured = isCloudConfigured();
  if (cloudConfigured) {
    try {
      db = window.supabase.createClient(window.AACE_CLOUD.url, window.AACE_CLOUD.anonKey, {
        auth: { persistSession: true, autoRefreshToken: true }
      });
    } catch (e) { db = null; cloudConfigured = false; }
  }
  setCloudStatus(cloudReady, cloudConfigured ? "offline" : "local only");
}

function cloudEmail(username) {
  return (username || "").trim().toLowerCase().replace(/\s+/g, ".") + "@aace.local";
}

async function hashPassword(pwd) {
  try {
    if (window.crypto && crypto.subtle && crypto.subtle.digest) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("aace::" + pwd));
      return "aace$" + Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
  } catch (e) { /* fall back to the simple hash below */ }
  let h = 5381;
  const s = String(pwd);
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return "fnv$" + h.toString(16);
}
function isHashedPassword(p) {
  return typeof p === "string" && (p.startsWith("aace$") || p.startsWith("fnv$"));
}
async function verifyAndMigrateUserPassword(u, password) {
  if (!u) return false;
  const stored = String(u.password || "");
  if (!isHashedPassword(stored)) {
    if (stored === password) { u.password = await hashPassword(password); saveUsers(); return true; }
    return false;
  }
  return stored === await hashPassword(password);
}

async function cloudGetAuthUser() {
  try {
    const { data, error } = await db.auth.getSession();
    if (error || !data.session) return null;
    return data.session.user;
  } catch (e) { return null; }
}

function setCloudStatus(on, label) {
  const el = document.getElementById("cloudStatus");
  if (!el) return;
  el.textContent = "● " + label;
  el.className = "cloud-dot " + (on ? "on" : "off");
}

async function cloudConnect() {
  if (!db) { cloudReady = false; return false; }
  try {
    await cloudGetAuthUser();
    const probe = await db.from("projects").select("id").limit(1);
    if (probe.error) throw probe.error;
    cloudReady = true;
    setCloudStatus(true, "shared cloud");
    return true;
  } catch (e) {
    cloudReady = false;
    setCloudStatus(false, "offline (retrying)");
    return false;
  }
}

async function cloudHasProfiles() {
  try {
    const { data } = await db.from("user_profiles").select("id").limit(1);
    return !!(data && data.length);
  } catch (e) { return true; }
}

async function cloudProvisionProfile(authUser, username) {
  if (!db || !authUser || !authUser.id) return;
  try {
    const { data: existing } = await db.from("user_profiles").select("id").eq("id", authUser.id).maybeSingle();
    if (existing) return;
    const localUser = findUserByUsername(username);
    const first = !(await cloudHasProfiles());
    const role = (localUser && localUser.role) || (first ? "Administrator" : "User");
    const { error } = await db.from("user_profiles").insert({
      id: authUser.id,
      username: username.trim(),
      display_name: (localUser && localUser.displayName) || username.trim(),
      role: role,
      department: (localUser && localUser.department) || "",
      status: "Active",
      perms: (localUser && localUser.perms) || { view: true, add: false, edit: false }
    });
    if (error) throw error;
  } catch (e) { /* non-admins cannot create profiles — Row Level Security blocks it by design */ }
}

// Returns true when this username/password has a working cloud session.
// New accounts are only auto-created when the password also matches a
// known local user (authorizedLocally), so random guesses can't create users.
async function ensureCloudSession(username, password, authorizedLocally) {
  if (!db) return false;
  const email = cloudEmail(username);
  try {
    const signIn = await db.auth.signInWithPassword({ email, password });
    if (!signIn.error) {
      const u = await cloudGetAuthUser();
      if (u) await cloudProvisionProfile(u, username);
      return true;
    }
  } catch (e) { /* no session yet */ }
  if (!authorizedLocally) return false;
  try {
    const up = await db.auth.signUp({ email, password });
    if (up.error && !/already_?registered|already exists/i.test(up.error.message)) return false;
    const signIn2 = await db.auth.signInWithPassword({ email, password });
    if (signIn2.error) return false;
    const u = await cloudGetAuthUser();
    if (u) await cloudProvisionProfile(u, username);
    return true;
  } catch (e) { return false; }
}

// Pull the shared user list (admins see everyone, others just themselves).
async function pullCloudUsers() {
  if (!db || !cloudReady) return false;
  try {
    const au = await cloudGetAuthUser();
    if (!au) return false;
    const saved = users.slice();
    const isLocalAdmin = isAdmin();
    let q = db.from("user_profiles").select("id, username, display_name, role, department, status, perms");
    if (!isLocalAdmin) q = q.eq("id", au.id);
    const { data, error } = await q;
    if (error) throw error;
    const mapped = (data || []).map(r => {
      const local = saved.find(x => x.username === r.username) || null;
      return {
        id: r.id,
        username: r.username,
        displayName: r.display_name || r.username,
        role: r.role || "User",
        department: r.department || "",
        status: r.status || "Active",
        perms: r.perms && typeof r.perms === "object" ? r.perms : { view: true, add: false, edit: false },
        password: local ? local.password : ""
      };
    });
    users = mapped;
    const me = findUserByUsername(getSessionUser());
    if (me && !users.some(u => u.username === me.username)) users.push(me);
    saveUsers();
    return true;
  } catch (e) { return false; }
}

// Pull the shared project list into this browser.
async function pullCloudProjects() {
  if (!db || !cloudReady) return;
  try {
    const deleted = pendingCloudDeletes();
    const { data, error } = await db.from("projects").select("id, data, updated_at");
    if (error) throw error;
    const rows = (data || []).map(r => r.data).filter(r => r && r.id);
    if (rows.length) {
      const map = new Map();
      rows.forEach(p => { if (!deleted.has(p.id)) map.set(p.id, p); });
      projects.forEach(p => { if (p && p.id && !map.has(p.id) && !deleted.has(p.id)) map.set(p.id, p); });
      projects = [...map.values()].sort((a, b) => String(a.id).localeCompare(String(b.id)));
      projectCounter = computeProjectCounter(projects);
    } else if (projects.length) {
      await cloudUpsertProjects(projects); // first-time migration: push local data up
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); } catch (x) { /* ignore */ }
    renderFilterOptions();
    renderCards();
    renderTable();
  } catch (e) { /* stay on the local copy */ }
}

async function cloudUpsertProjects(list) {
  if (!db || !list.length) return;
  const rows = list.map(p => ({ id: p.id, data: p, updated_at: new Date().toISOString() }));
  const { error } = await db.from("projects").upsert(rows, { onConflict: "id" });
  if (error) throw error;
}

function startCloudSyncTimer() {
  if (!cloudConfigured) return;
  clearInterval(cloudSyncTimer);
  cloudSyncTimer = setInterval(() => { if (db && cloudReady) pullCloudProjects(); }, 30000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && db && cloudReady) pullCloudProjects();
  });
}

// ---------------------------------------------------------------------
// 3. SEED / PLACEHOLDER DATA
// ---------------------------------------------------------------------
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
function inDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function makeProject(opts) {
  const workflow = getWorkflow(opts.budget, opts.withConstruction);
  const idx = findStageIndex(workflow, opts.responsible, opts.status);
  const stage = idx >= 0 ? workflow.stages[idx] : workflow.stages[0];
  return {
    id: "AACE-2026-" + String(projectCounter++).padStart(3, "0"),
    title: opts.title,
    department: opts.department,
    budget: opts.budget,
    requestor: opts.requestor,
    personInCharge: stage.responsible,
    currentStatus: stage.status,
    completion: stage.percent,
    statusLabel: opts.statusLabel,
    targetCompletion: opts.targetCompletion,
    lastMovementDate: opts.lastMovementDate,
    lastMovementNote: opts.lastMovementNote,
    dateSubmitted: opts.dateSubmitted || opts.lastMovementDate
  };
}

function seedProjects() {
  projects = [
    {
      id: "AACE-2026-016",
      title: "Plant 3 Racking System for Meat Preparation Cut Floor",
      department: "Meat Preparation",
      budget: 4,
      requestor: "John Patrick Lubang",
      personInCharge: "Charissa Mae J. Duncil",
      currentStatus: "CAPEX Coordinator, Div Level",
      completion: 54,
      statusLabel: "Ongoing Project Review",
      targetCompletion: "2027-01-29",
      lastMovementDate: "2026-08-29",
      lastMovementNote: "Ongoing project review of Division Finance",
      withConstruction: false,
      dateSubmitted: "2026-08-29"
    },
    {
      id: "AACE-2026-015",
      title: "Plant 3 Colloid Mill for Spread Line",
      department: "Hotline Kitchen",
      budget: 3,
      requestor: "John Patrick Lubang",
      personInCharge: "Charissa Mae J. Duncil",
      currentStatus: "CAPEX Coordinator, Div Level",
      completion: 54,
      statusLabel: "Ongoing Project Review",
      targetCompletion: "2026-12-28",
      lastMovementDate: "2026-08-29",
      lastMovementNote: "Ongoing project review of Division Finance",
      withConstruction: false,
      dateSubmitted: "2026-08-29"
    },
    {
      id: "AACE-2026-014",
      title: "Plant 3 WWTP Improvement and Broth Discharge Management System",
      department: "Admin",
      budget: 200.7,
      requestor: "John Patrick Lubang",
      personInCharge: "CFPAD Analyst",
      currentStatus: "CFPAD Analyst",
      completion: 76,
      statusLabel: "Pending",
      targetCompletion: "2026-10-28",
      lastMovementDate: "2026-08-29",
      lastMovementNote: "For alignment of financials",
      withConstruction: true,
      dateSubmitted: "2026-08-29"
    },
    {
      id: "AACE-2026-013",
      title: "Plant 3 Transfer Pump for Spread and Sauce line with accessories",
      department: "Hotline Fill Seam",
      budget: 3.5,
      requestor: "John Patrick Lubang",
      personInCharge: "Charissa Mae J. Duncil",
      currentStatus: "CAPEX Coordinator, Div Level",
      completion: 54,
      statusLabel: "Ongoing Project Review",
      targetCompletion: "2027-01-28",
      lastMovementDate: "2026-08-30",
      lastMovementNote: "With Updated SPQF",
      withConstruction: false,
      dateSubmitted: "2026-08-30"
    },
    {
      id: "AACE-2026-012",
      title: "Plant 3 One (1) unit of Sausage Decasing Machine",
      department: "Meat Preparation",
      budget: 15,
      requestor: "John Patrick Lubang",
      personInCharge: "Mauvir C. Buzon",
      currentStatus: "AVP Controllership, Planning and Budget",
      completion: 61,
      statusLabel: "Pending",
      targetCompletion: "2027-01-28",
      lastMovementDate: "2026-07-09",
      lastMovementNote: "For updating of Financials excluding the PCL",
      withConstruction: false,
      dateSubmitted: "2026-07-09"
    },
    {
      id: "AACE-2026-011",
      title: "Plant 3 Tri Blender for Coldline Processing",
      department: "Coldline Processing",
      budget: 3,
      requestor: "Renel Gallardo",
      personInCharge: "CFPAD Analyst",
      currentStatus: "CFPAD Analyst",
      completion: 79,
      statusLabel: "Ongoing Project Review",
      targetCompletion: "2026-12-28",
      lastMovementDate: "2026-08-20",
      lastMovementNote: "Ongoing review and approval of corporate finance c/o HB  Coronado;",
      withConstruction: false,
      dateSubmitted: "2026-08-20"
    },
    {
      id: "AACE-2026-010",
      title: "Plant 3 Additional Meat Band Saw for Meat Preparation Area",
      department: "Meat Preparation",
      budget: 3,
      requestor: "Mher Gerald De Soza",
      personInCharge: "Chesca B. Tenorio",
      currentStatus: "CFPAD Head",
      completion: 86,
      statusLabel: "Ongoing Project Review",
      targetCompletion: "2026-12-15",
      lastMovementDate: "2026-08-20",
      lastMovementNote: "On going review and approval of project c/o Corporate CAPEX Finance",
      withConstruction: false,
      dateSubmitted: "2026-08-20"
    },
    {
      id: "AACE-2026-009",
      title: "Plant 3 One (1) unit of Emulsifier for Coldline",
      department: "Coldline Processing",
      budget: 15,
      requestor: "Charles Lawrence Gozo",
      personInCharge: "Chesca B. Tenorio",
      currentStatus: "CFPAD Head",
      completion: 86,
      statusLabel: "Ongoing Project Review",
      targetCompletion: "2026-11-01",
      lastMovementDate: "2026-08-27",
      lastMovementNote: "Ongoing Review of Corporate Finance",
      withConstruction: false,
      dateSubmitted: "2026-08-27"
    }
  ];
  projectCounter = computeProjectCounter(projects);
  saveProjects();
}

// ---------------------------------------------------------------------
// 4. HELPERS
// ---------------------------------------------------------------------
function fmtPhp(n) {
  return "₱" + Number(n).toLocaleString("en-PH", { maximumFractionDigits: 2 });
}
function fmtBudgetM(n) {
  return "₱" + Number(n).toLocaleString("en-PH", { maximumFractionDigits: 2 }) + "M";
}
function fmtDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-PH", { month: "short", day: "2-digit", year: "numeric" });
}
function daysPending(iso) {
  if (!iso) return 0;
  const then = new Date(iso + "T00:00:00");
  const now = new Date();
  now.setHours(0,0,0,0);
  return Math.max(0, Math.round((now - then) / 86400000));
}
function badgeClass(label) {
  const map = {
    "AACE Creation": "badge-gray",
    "Pre Bidding Request": "badge-blue",
    "Waiting for Technical Bid": "badge-amber",
    "Ongoing Technical Evaluation": "badge-blue",
    "Waiting for SPQF": "badge-amber",
    "Ongoing Project Review": "badge-blue",
    "Approved": "badge-green",
    "Procurement": "badge-green",
    "Rejected": "badge-red",
    "Pending": "badge-amber"
  };
  return map[label] || "badge-gray";
}
function actionColor(label) {
  if (label === "Rejected") return "red";
  if (["Pending", "Waiting for Technical Bid", "Waiting for SPQF"].includes(label)) return "amber";
  return "green";
}
// Labels that count as "needing attention" for the summary cards / notifications
const ATTENTION_LABELS = ["Rejected", "Pending", "Waiting for Technical Bid", "Waiting for SPQF"];
function progressColor(pct) {
  if (pct >= 70) return "green";
  if (pct >= 35) return "amber";
  return "red";
}

// ---------------------------------------------------------------------
// 5. RENDER: SUMMARY CARDS
// ---------------------------------------------------------------------
function renderCards() {
  const total = projects.length;
  const completed = projects.filter(p => p.completion >= 100).length;
  const delayed = projects.filter(p => ATTENTION_LABELS.includes(p.statusLabel)).length;
  const ongoing = total - completed - delayed;
  const budget = projects.reduce((s, p) => s + Number(p.budget), 0);

  document.getElementById("statTotal").textContent = total;
  document.getElementById("statCompleted").textContent = completed;
  document.getElementById("statOngoing").textContent = Math.max(ongoing, 0);
  document.getElementById("statDelayed").textContent = delayed;
  document.getElementById("statBudget").textContent = fmtBudgetM(budget);

  const pct = (n) => total ? Math.round((n / total) * 100) : 0;
  document.getElementById("statCompletedPct").textContent = pct(completed) + "% of total";
  document.getElementById("statOngoingPct").textContent = pct(Math.max(ongoing,0)) + "% of total";
  document.getElementById("statDelayedPct").textContent = pct(delayed) + "% of total";

  document.getElementById("notifCount").textContent = delayed;
}

// ---------------------------------------------------------------------
// 6. RENDER: FILTER DROPDOWNS
// ---------------------------------------------------------------------
function renderFilterOptions() {
  const statusSel = document.getElementById("filterStatus");
  const deptSel = document.getElementById("filterDept");
  const picSel = document.getElementById("filterPIC");

  const statuses = [...new Set(projects.map(p => p.statusLabel))].sort();
  const depts = [...new Set(projects.map(p => p.department))].sort();
  const pics = [...new Set(projects.map(p => p.personInCharge))].sort();

  const fill = (sel, items, allLabel) => {
    const current = sel.value;
    sel.innerHTML = `<option value="">${allLabel}</option>` + items.map(i => `<option value="${i}">${i}</option>`).join("");
    if (items.includes(current)) sel.value = current;
  };
  fill(statusSel, statuses, "All Status");
  fill(deptSel, depts, "All Departments");
  fill(picSel, pics, "All PIC");
}

// ---------------------------------------------------------------------
// 7. RENDER: TABLE
// ---------------------------------------------------------------------
function getFilteredSorted() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const fStatus = document.getElementById("filterStatus").value;
  const fDept = document.getElementById("filterDept").value;
  const fPIC = document.getElementById("filterPIC").value;

  let list = projects.filter(p => {
    if (q && !(p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.personInCharge.toLowerCase().includes(q))) return false;
    if (fStatus && p.statusLabel !== fStatus) return false;
    if (fDept && p.department !== fDept) return false;
    if (fPIC && p.personInCharge !== fPIC) return false;
    return true;
  });

  const key = sortState.key;
  const dir = sortState.dir === "asc" ? 1 : -1;
  list.sort((a, b) => {
    let av, bv;
    if (key === "projectNo") { av = a.id; bv = b.id; }
    else if (key === "statusLabel") { av = a.statusLabel; bv = b.statusLabel; }
    else if (key === "personInCharge") { av = a.personInCharge; bv = b.personInCharge; }
    else if (key === "budget" || key === "completion") { av = a[key]; bv = b[key]; }
    else if (key === "targetCompletion" || key === "lastMovementDate") { av = a[key]; bv = b[key]; }
    else if (key === "daysPending") { av = daysPending(a.lastMovementDate); bv = daysPending(b.lastMovementDate); }
    else { av = a[key]; bv = b[key]; }
    if (typeof av === "string") { av = av.toLowerCase(); bv = String(bv).toLowerCase(); }
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
  return list;
}

function renderTable() {
  const list = getFilteredSorted();
  const body = document.getElementById("tableBody");

  if (list.length === 0) {
    body.innerHTML = `<tr><td colspan="11"><div class="empty-state"><div class="big">&#128193;</div>No projects match your filters.</div></td></tr>`;
  } else {
    body.innerHTML = list.map(p => {
      const dp = daysPending(p.lastMovementDate);
      const pcolor = progressColor(p.completion);
      const acolor = actionColor(p.statusLabel);
      let actions = "";
      if (canView()) actions += `<button class="action-dot ${acolor}" data-view="${p.id}" title="View details">&#128065;</button>`;
      if (canEdit()) actions += `<button class="action-dot blue" data-edit="${p.id}" title="Edit project">&#9998;</button><button class="action-dot gray" data-del="${p.id}" title="Delete">&#128465;</button>`;
      if (!actions) actions = '<span class="muted">-</span>';
      return `
      <tr data-id="${p.id}" class="${p.id === selectedId ? 'selected' : ''}">
        <td><span class="proj-no" data-view="${p.id}">${p.id}</span></td>
        <td>
          <div class="proj-title">${p.title}</div>
        </td>
        <td class="proj-dept">${p.department}</td>
        <td>${fmtBudgetM(p.budget)}</td>
        <td><span class="badge ${badgeClass(p.statusLabel)}">${p.statusLabel}</span></td>
        <td>${p.personInCharge}</td>
        <td>
          <div class="progress-wrap">
            <div class="progress-track"><div class="progress-fill ${pcolor}" style="width:${p.completion}%"></div></div>
            <div class="progress-pct">${p.completion}%</div>
          </div>
        </td>
        <td>${fmtDate(p.targetCompletion)}</td>
        <td>${dp}</td>
        <td class="last-move">
          <div class="date">${fmtDate(p.lastMovementDate)}</div>
          <span class="note" title="${p.lastMovementNote || ''}">${p.lastMovementNote || ''}</span>
        </td>
        <td>
          <div class="actions-cell">${actions}</div>
        </td>
      </tr>`;
    }).join("");
  }

  document.getElementById("tableCount").textContent = `Showing ${list.length} of ${projects.length} projects`;
  document.getElementById("lastUpdated").textContent = new Date().toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" });

  // sort arrows
  document.querySelectorAll("thead th[data-sort]").forEach(th => {
    th.innerHTML = th.textContent.replace(/\s*[▲▼]$/, "");
    if (th.dataset.sort === sortState.key) {
      th.innerHTML += `<span class="arrow">${sortState.dir === "asc" ? "▲" : "▼"}</span>`;
    }
  });
}

// ---------------------------------------------------------------------
// 8. RENDER: DETAILS PANEL
// ---------------------------------------------------------------------
function openDetails(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  selectedId = id;
  const panel = document.getElementById("detailsPanel");
  panel.classList.remove("hidden");
  document.getElementById("dpEdit").style.display = canEdit() ? "" : "none";

  document.getElementById("dpProjectNo").textContent = p.id;
  document.getElementById("dpTitle").textContent = p.title;
  const badge = document.getElementById("dpStatusBadge");
  badge.textContent = p.statusLabel;
  badge.className = "badge " + badgeClass(p.statusLabel);

  document.getElementById("dpDept").textContent = p.department;
  document.getElementById("dpBudget").textContent = fmtBudgetM(p.budget);
  document.getElementById("dpRequestor").textContent = p.requestor;
  document.getElementById("dpPIC").textContent = p.personInCharge;
  document.getElementById("dpSubmitted").textContent = fmtDate(p.dateSubmitted);
  document.getElementById("dpDaysPending").textContent = daysPending(p.lastMovementDate) + " days";
  document.getElementById("dpCurrentStage").textContent = p.currentStatus + " (" + p.completion + "%)";

  const workflow = getWorkflow(p.budget, p.withConstruction);
  const idx = findProjectStageIndex(workflow, p);
  const nextStage = idx >= 0 && idx < workflow.stages.length - 1 ? workflow.stages[idx + 1] : null;
  document.getElementById("dpNextStage").textContent = nextStage ? `${nextStage.status} (${nextStage.responsible})` : "Fully Approved";

  const tl = document.getElementById("dpTimeline");
  tl.innerHTML = workflow.stages.map((s, i) => {
    let cls = "pending";
    if (i < idx) cls = "done";
    else if (i === idx) cls = "current";
    return `<li class="${cls}">
      <div class="st">${s.status}</div>
      <div class="who">${s.responsible} · ${s.percent}%</div>
    </li>`;
  }).join("");

  renderTable(); // refresh selected row highlight
}

function closeDetails() {
  selectedId = null;
  document.getElementById("detailsPanel").classList.add("hidden");
  renderTable();
}

// ---------------------------------------------------------------------
// 9. MODAL: ADD PROJECT
// ---------------------------------------------------------------------
function populatePersonOptions() {
  const cost = parseFloat(document.getElementById("f_cost").value);
  const personSel = document.getElementById("f_person");
  const hint = document.getElementById("workflowHint");
  const hintText = document.getElementById("workflowHintText");

  if (isNaN(cost)) {
    personSel.innerHTML = `<option value="">-- Enter cost first --</option>`;
    hint.style.display = "none";
    document.getElementById("stageSubselectWrap").style.display = "none";
    return;
  }
  const workflow = getWorkflow(cost, constructionChecked());
  hint.style.display = "block";
  hintText.textContent = `Approval flow: ${workflow.label} (${workflow.stages.length} stages)`;

  const uniqueNames = [...new Set(workflow.stages.map(s => s.responsible))];
  personSel.innerHTML = `<option value="">-- Select Person --</option>` +
    uniqueNames.map(n => `<option value="${n}">${n}</option>`).join("");
  updateStageSubselect();
}

function updateStageSubselect() {
  const cost = parseFloat(document.getElementById("f_cost").value);
  const person = document.getElementById("f_person").value;
  const wrap = document.getElementById("stageSubselectWrap");
  const sub = document.getElementById("f_stageSub");
  if (!person || isNaN(cost)) { wrap.style.display = "none"; return; }

  const workflow = getWorkflow(cost, constructionChecked());
  const matches = workflow.stages.filter(s => s.responsible === person);
  if (matches.length > 1) {
    wrap.style.display = "block";
    sub.innerHTML = matches.map(s => `<option value="${s.status}">${s.status} (${s.percent}%)</option>`).join("");
  } else {
    wrap.style.display = "none";
  }
}

function resetModal() {
  document.getElementById("projectForm").reset();
  document.getElementById("workflowHint").style.display = "none";
  document.getElementById("stageSubselectWrap").style.display = "none";
  document.getElementById("f_person").innerHTML = `<option value="">-- Enter cost first --</option>`;
  document.getElementById("f_target").value = inDays(60);
  document.getElementById("f_lastDate").value = new Date().toISOString().slice(0, 10);
}

function openModal(id) {
  modalMode = id ? "edit" : "add";
  editingId = id || null;
  resetModal();
  document.getElementById("projectModalTitle").textContent = modalMode === "edit" ? "Edit Project" : "Add New Project";
  document.getElementById("projectModalDesc").textContent = modalMode === "edit"
    ? "Update the project details — completion % is recalculated from the selected approval stage."
    : "Enter project cost first — the approval workflow and completion % are set automatically.";
  document.getElementById("projectModalSubmit").textContent = modalMode === "edit" ? "Save Changes" : "Save Project";

  const noField = document.getElementById("projectNoField");
  const noInput = document.getElementById("f_projectNo");
  noField.style.display = modalMode === "edit" ? "block" : "none";
  noInput.value = "";

  if (modalMode === "edit") {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    noInput.value = p.id;
    document.getElementById("f_title").value = p.title;
    document.getElementById("f_construction").checked = !!p.withConstruction;
    document.getElementById("f_dept").value = p.department;
    document.getElementById("f_cost").value = p.budget;
    document.getElementById("f_requestor").value = p.requestor;
    document.getElementById("f_target").value = p.targetCompletion;
    document.getElementById("f_lastDate").value = p.lastMovementDate;
    document.getElementById("f_lastNote").value = p.lastMovementNote;
    document.getElementById("f_statusLabel").value = p.statusLabel;
    populatePersonOptions();
    document.getElementById("f_person").value = p.personInCharge;
    updateStageSubselect();
    const sub = document.getElementById("f_stageSub");
    if (sub && sub.options.length) sub.value = p.currentStatus;
  }
  document.getElementById("projectModal").classList.remove("hidden");
}
function closeModal() {
  document.getElementById("projectModal").classList.add("hidden");
}

function handleFormSubmit(e) {
  e.preventDefault();
  const cost = parseFloat(document.getElementById("f_cost").value);
  const workflow = getWorkflow(cost, constructionChecked());
  const person = document.getElementById("f_person").value;

  const matches = workflow.stages.filter(s => s.responsible === person);
  let stage = matches[0];
  if (matches.length > 1) {
    const chosenStatus = document.getElementById("f_stageSub").value;
    stage = matches.find(s => s.status === chosenStatus) || matches[0];
  }
  if (!stage) {
    if (modalMode !== "edit") { alert("Please select a valid person / stage."); return; }
  }

  const shared = {
    title: document.getElementById("f_title").value,
    department: document.getElementById("f_dept").value,
    budget: cost,
    requestor: document.getElementById("f_requestor").value,
    personInCharge: stage ? stage.responsible : "",
    currentStatus: stage ? stage.status : "",
    completion: stage ? stage.percent : 0,
    statusLabel: document.getElementById("f_statusLabel").value,
    targetCompletion: document.getElementById("f_target").value,
    lastMovementDate: document.getElementById("f_lastDate").value,
    lastMovementNote: document.getElementById("f_lastNote").value,
    withConstruction: constructionChecked()
  };

  if (modalMode === "edit") {
    const existing = projects.find(p => p.id === editingId);
    if (!existing) return;
    const oldId = existing.id;
    const newNo = document.getElementById("f_projectNo").value.trim();
    if (newNo && newNo.toLowerCase() !== oldId.toLowerCase()) {
      const clash = projects.find(x => x.id !== oldId && x.id.toLowerCase() === newNo.toLowerCase());
      if (clash) { alert("That project number is already used by another project."); return; }
      existing.id = newNo;
    }
    if (!stage) {
      shared.personInCharge = existing.personInCharge;
      shared.currentStatus = existing.currentStatus;
      shared.completion = existing.completion;
    } else {
      shared.personInCharge = stage.responsible;
      shared.currentStatus = stage.status;
      shared.completion = stage.percent;
    }
    Object.assign(existing, shared);
    if (selectedId === oldId) selectedId = existing.id;
  } else {
    const newProject = Object.assign({}, shared, {
      id: "AACE-2026-" + String(projectCounter++).padStart(3, "0"),
      dateSubmitted: document.getElementById("f_lastDate").value
    });
    projects.unshift(newProject);
  }
  saveProjects();
  closeModal();
  renderFilterOptions();
  renderCards();
  renderTable();
  if (selectedId) openDetails(selectedId);
}

// ---------------------------------------------------------------------
// 10. EXPORT / IMPORT (offline backup & restore)
// ---------------------------------------------------------------------
function exportProjects() {
  const blob = new Blob([JSON.stringify(projects, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aace_projects_backup_" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
}

function importProjects(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!Array.isArray(data)) throw new Error("File does not contain a project list.");
      const replace = confirm(
        `This file has ${data.length} project(s).\n\nClick OK to REPLACE your current ${projects.length} project(s),\nor Cancel to MERGE them in as additional projects.`
      );
      if (replace) {
        const oldIds = new Set(projects.map(p => p.id));
        const newIds = new Set(data.map(p => p.id));
        addPendingCloudDelete([...oldIds].filter(id => !newIds.has(id)));
        projects = data;
      } else {
        const existingIds = new Set(projects.map(p => p.id));
        data.forEach(p => { if (existingIds.has(p.id)) p.id = p.id + "-imp"; });
        projects = projects.concat(data);
      }
      projectCounter = computeProjectCounter(projects);
      saveProjects();
      renderFilterOptions();
      renderCards();
      renderTable();
      alert("Backup imported successfully.");
    } catch (err) {
      alert("Could not read this file as a project backup: " + err.message);
    }
  };
  reader.readAsText(file);
}

// ---------------------------------------------------------------------
// 11. SIDEBAR NAV / VIEW SWITCHING / LOGIN / USERS / SETTINGS
// ---------------------------------------------------------------------
function showView(view) {
  const map = { dashboard: "viewDashboard", projects: "viewDashboard", users: "viewUsers", settings: "viewSettings" };
  if (view === "users" && !isAdmin()) { showView("dashboard"); document.querySelector('.nav-link[data-view="dashboard"]').classList.add("active"); return; }
  ["viewDashboard", "viewUsers", "viewSettings"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", id !== map[view]);
  });
  if (view === "users") renderUsers();
  if (view === "settings") loadSettings();
}

function isMobileView() {
  return window.matchMedia("(max-width: 760px)").matches;
}
function closeMobileNav() {
  document.getElementById("sidebar").classList.remove("mobile-open");
  document.getElementById("scrim").classList.add("hidden");
}
function setupSidebarNav() {
  document.querySelectorAll(".nav-link[data-view]").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link[data-view]").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      showView(link.dataset.view);
      closeMobileNav();
    });
  });
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    if (isMobileView()) {
      const open = sidebar.classList.toggle("mobile-open");
      document.getElementById("scrim").classList.toggle("hidden", !open);
    } else {
      sidebar.classList.toggle("collapsed");
    }
  });
  document.getElementById("scrim").addEventListener("click", closeMobileNav);
}

// ---- Login / logout / profile ----
function setupLogin() {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const u = document.getElementById("loginUser").value.trim();
    const p = document.getElementById("loginPass").value;
    const err = document.getElementById("loginError");
    if (!u || !p) { err.textContent = "Please enter both username and password."; return; }
    const localUser = findUserByUsername(u);
    const localOk = await (localUser ? verifyAndMigrateUserPassword(localUser, p) : false);
    if (cloudConfigured && db) {
      const cloudOk = await ensureCloudSession(u, p, localOk);
      if (cloudOk) {
        await pullCloudUsers();
        const again = findUserByUsername(u);
        if (again && again.status === "Active") { setSessionUser(u); location.reload(); return; }
        await db.auth.signOut().catch(() => {});
        err.textContent = "Your account is not active or not set up yet. Ask the administrator for help.";
        return;
      }
    }
    if (localOk && localUser && localUser.status === "Active") {
      setSessionUser(u);
      location.reload();
      return;
    }
    err.textContent = "Invalid username or password. Please try again.";
  });
  document.getElementById("logoutBtn").addEventListener("click", async () => {
    clearSession();
    if (db) await db.auth.signOut().catch(() => {});
    location.reload();
  });
}

function refreshProfile() {
  const name = getSessionUser() || DEFAULT_ADMIN.username;
  const u = findUserByUsername(name) || { username: name };
  document.getElementById("userAvatar").textContent = initials(u.username);
  document.getElementById("userName").textContent = u.username;
  document.getElementById("userRole").textContent = u.role || "User";
}
function initials(name) {
  const parts = name.trim().split(/[\s.]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.trim().slice(0, 2).toUpperCase();
}

// ---- Users view ----
function renderUsers() {
  const body = document.getElementById("usersTableBody");
  if (!body) return;
  const me = getSessionUser();
  body.innerHTML = users.map(u => {
    const isSelf = u.username === me;
    const perms = permsOf(u);
    const tag = (label, on) => `<span class="perm-tag ${on ? "on" : "off"}">${label}</span>`;
    return `
    <tr>
      <td><span class="proj-no">${u.username}</span>${isSelf ? ' <span class="badge badge-blue">you</span>' : ''}</td>
      <td class="proj-dept">${u.displayName}</td>
      <td>${u.role || "-"}</td>
      <td class="proj-dept">${u.department || "-"}</td>
      <td><span class="badge ${u.status === "Active" ? "badge-green" : "badge-gray"}">${u.status}</span></td>
      <td class="perms-cell">${tag("View", perms.view)}${tag("Add", perms.add)}${tag("Edit", perms.edit)}</td>
      <td>
        <div class="actions-cell">
          <button class="action-dot blue" data-uedit="${u.username}" title="Edit user">&#9998;</button>
          ${isSelf ? "" : `<button class="action-dot gray" data-udel="${u.username}" title="Delete user">&#128465;</button>`}
        </div>
      </td>
    </tr>`;
  }).join("");
}

function resetUserModal() {
  document.getElementById("userForm").reset();
  document.getElementById("u_username").disabled = false;
  document.getElementById("u_status").value = "Active";
  document.getElementById("u_password").placeholder = "Set a password to allow this user to sign in";
  document.getElementById("u_perm_view").checked = true;
  document.getElementById("u_perm_add").checked = false;
  document.getElementById("u_perm_edit").checked = false;
}
function openUserModal(username) {
  editingUserId = username || null;
  document.getElementById("userModalTitle").textContent = username ? "Edit User" : "Add User";
  resetUserModal();
  if (username) {
    const u = findUserByUsername(username);
    if (!u) return;
    const isSelf = u.username === getSessionUser();
    document.getElementById("u_username").value = u.username;
    document.getElementById("u_username").disabled = isSelf;
    document.getElementById("u_displayName").value = u.displayName;
    document.getElementById("u_role").value = u.role || "";
    document.getElementById("u_dept").value = u.department || "";
    document.getElementById("u_status").value = u.status;
    document.getElementById("u_password").placeholder = "Leave blank to keep the current password";
    const perms = permsOf(u);
    document.getElementById("u_perm_view").checked = !!perms.view;
    document.getElementById("u_perm_add").checked = !!perms.add;
    document.getElementById("u_perm_edit").checked = !!perms.edit;
  }
  document.getElementById("userModal").classList.remove("hidden");
}
function closeUserModal() {
  editingUserId = null;
  document.getElementById("userModal").classList.add("hidden");
}
async function handleUserFormSubmit(e) {
  e.preventDefault();
  const username = document.getElementById("u_username").value.trim();
  if (!username) { alert("Username is required."); return; }
  const pwd = document.getElementById("u_password").value;
  const rec = {
    displayName: document.getElementById("u_displayName").value.trim() || username,
    role: document.getElementById("u_role").value.trim(),
    department: document.getElementById("u_dept").value.trim(),
    status: document.getElementById("u_status").value,
    perms: {
      view: document.getElementById("u_perm_view").checked,
      add: document.getElementById("u_perm_add").checked,
      edit: document.getElementById("u_perm_edit").checked
    }
  };

  if (editingUserId) {
    const i = users.findIndex(x => x.username.toLowerCase() === editingUserId.toLowerCase());
    if (i < 0) return;
    const existing = users[i];
    const isCloudUser = !!(db && cloudReady && existing.id);
    if (pwd) {
      if (isCloudUser) {
        alert("Cloud accounts change their own password in Settings. Password changes for other cloud users can only be done in the Supabase dashboard. No password change was applied.");
      } else {
        rec.password = await hashPassword(pwd);
      }
    } else {
      rec.password = existing.password || "";
    }
    Object.assign(existing, rec);
    await saveUsers();
    renderUsers();
    closeUserModal();
    return;
  }

  if (findUserByUsername(username)) { alert("That username already exists."); return; }
  if (!pwd) { alert("A password is required for new users so they can sign in."); return; }

  if (db && cloudReady && isAdmin()) {
    try {
      const email = cloudEmail(username);
      const beforeSess = (await db.auth.getSession()).data.session;
      const { data: su, error } = await db.auth.signUp({ email, password: pwd });
      if (beforeSess) {
        // signUp switched the browser session to the new account; restore the admin.
        await db.auth.setSession({ access_token: beforeSess.access_token, refresh_token: beforeSess.refresh_token }).catch(() => {});
      }
      if (error) {
        if (/already_?registered|already exists/i.test(error.message)) {
          alert("A cloud account already exists for '" + username + "'. Choose a different username or reuse the existing account.");
        } else {
          alert("Could not create the cloud account: " + error.message);
        }
        return;
      }
      rec.username = username;
      rec.id = (su && su.user && su.user.id) || null;
      if (!rec.id) { alert("Cloud account was created but we could not link it. Please try again."); return; }
      users.push(rec);
      await saveUsers();
      renderUsers();
      closeUserModal();
      return;
    } catch (e) {
      alert("Could not set up the cloud account: " + e.message);
      return;
    }
  }

  rec.username = username;
  rec.password = await hashPassword(pwd);
  users.push(rec);
  await saveUsers();
  renderUsers();
  closeUserModal();
}
function setupUserEvents() {
  document.getElementById("addUserBtn").addEventListener("click", () => { if (isAdmin()) openUserModal(null); });
  document.getElementById("cancelUserBtn").addEventListener("click", closeUserModal);
  document.getElementById("userModal").addEventListener("click", (e) => {
    if (e.target.id === "userModal") closeUserModal();
  });
  document.getElementById("userForm").addEventListener("submit", (e) => {
    if (!isAdmin()) { e.preventDefault(); return; }
    handleUserFormSubmit(e);
  });
  document.getElementById("usersTableBody").addEventListener("click", (e) => {
    if (!isAdmin()) return;
    const editUser = e.target.closest("[data-uedit]")?.dataset.uedit;
    const delUser = e.target.closest("[data-udel]")?.dataset.udel;
    if (editUser) openUserModal(editUser);
    if (delUser) {
      if (delUser === getSessionUser()) { alert("You cannot delete your own account while signed in."); return; }
      if (confirm(`Delete user "${delUser}"?`)) {
        const target = findUserByUsername(delUser);
        if (target && target.id && db && cloudReady) {
          db.from("user_profiles").update({ status: "Inactive" }).eq("id", target.id).then(() => {});
        }
        users = users.filter(x => x.username !== delUser);
        saveUsers();
        renderUsers();
      }
    }
  });
}

// ---- Settings view ----
function loadSettings() {
  const me = getSessionUser() || DEFAULT_ADMIN.username;
  const account = findUserByUsername(me) || { username: me, password: "" };
  const u = document.getElementById("setUsername");
  const p = document.getElementById("setPassword");
  if (u) u.value = account.username;
  if (p) { p.value = ""; p.placeholder = "Enter a new password to change it"; }
  const msg = document.getElementById("credsMsg");
  if (msg) msg.style.display = "none";
}
function setupSettingsEvents() {
  document.getElementById("saveCredsBtn").addEventListener("click", async () => {
    const u = document.getElementById("setUsername").value.trim();
    const p = document.getElementById("setPassword").value;
    if (!u) { alert("Username is required."); return; }
    const me = getSessionUser() || DEFAULT_ADMIN.username;
    const target = findUserByUsername(me);
    if (!target) { alert("Your account was not found in the Users list."); return; }
    const clash = users.find(x => x.username.toLowerCase() === u.toLowerCase() && x !== target);
    if (clash) { alert("That username is already taken by another user."); return; }
    const oldName = target.username;
    const emailChanged = u.toLowerCase() !== oldName.toLowerCase();
    const isCloudUser = !!(db && cloudReady && target.id);
    if (isCloudUser) {
      const updates = {};
      if (p) updates.password = p;
      if (emailChanged) updates.email = cloudEmail(u);
      const { error } = await db.auth.updateUser(updates);
      if (!error && emailChanged) {
        alert("Your cloud username was changed. If Supabase asks you to confirm the new email, click the link in that email once.");
      } else if (error) {
        alert("Cloud update failed: " + error.message + "\n(Your local login below is still updated.)");
      }
    }
    target.username = u;
    if (p) target.password = await hashPassword(p);
    await saveUsers();
    renderUsers();
    if (getSessionUser() === oldName) setSessionUser(u);
    refreshProfile();
    loadSettings();
    const msg = document.getElementById("credsMsg");
    msg.textContent = "Credentials updated. Use the new username/password on the next sign-in.";
    msg.style.display = "block";
  });
  document.getElementById("settingsExportBtn").addEventListener("click", exportProjects);
  document.getElementById("settingsImportBtn").addEventListener("click", () => document.getElementById("importFile").click());
  document.getElementById("clearDataBtn").addEventListener("click", () => {
    if (confirm("Delete ALL projects from this browser and the shared cloud? This cannot be undone.\n\nTip: use Export Backup first to be safe.")) {
      addPendingCloudDelete(projects.map(p => p.id));
      projects = [];
      saveProjects();
      renderFilterOptions();
      renderCards();
      renderTable();
      alert("All project data has been cleared.");
    }
  });
}

// ---------------------------------------------------------------------
// 12. EVENT WIRING
// ---------------------------------------------------------------------
function setupEvents() {
  document.getElementById("addProjectBtn").addEventListener("click", () => openModal());
  document.getElementById("cancelModalBtn").addEventListener("click", closeModal);
  document.getElementById("projectModal").addEventListener("click", (e) => {
    if (e.target.id === "projectModal") closeModal();
  });
  document.getElementById("projectForm").addEventListener("submit", handleFormSubmit);
  document.getElementById("f_cost").addEventListener("input", populatePersonOptions);
  document.getElementById("f_person").addEventListener("change", updateStageSubselect);
  document.getElementById("f_construction").addEventListener("change", () => {
    populatePersonOptions();
    if (modalMode === "edit" && editingId) {
      const p = projects.find(x => x.id === editingId);
      if (p) {
        document.getElementById("f_person").value = p.personInCharge;
        updateStageSubselect();
        const sub = document.getElementById("f_stageSub");
        if (sub && sub.options.length) sub.value = p.currentStatus;
      }
    }
  });

  document.getElementById("downloadBtn").addEventListener("click", exportProjects);
  document.getElementById("importBtn").addEventListener("click", () => document.getElementById("importFile").click());
  document.getElementById("importFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) importProjects(file);
    e.target.value = "";
  });

  document.getElementById("searchInput").addEventListener("input", renderTable);
  document.getElementById("filterStatus").addEventListener("change", renderTable);
  document.getElementById("filterDept").addEventListener("change", renderTable);
  document.getElementById("filterPIC").addEventListener("change", renderTable);
  document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("filterStatus").value = "";
    document.getElementById("filterDept").value = "";
    document.getElementById("filterPIC").value = "";
    renderTable();
  });

  document.querySelectorAll("thead th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (sortState.key === key) sortState.dir = sortState.dir === "asc" ? "desc" : "asc";
      else { sortState.key = key; sortState.dir = "asc"; }
      renderTable();
    });
  });

  document.getElementById("tableBody").addEventListener("click", (e) => {
    const editId = e.target.closest("[data-edit]")?.dataset.edit;
    const viewId = e.target.closest("[data-view]")?.dataset.view;
    const delId = e.target.closest("[data-del]")?.dataset.del;
    if (editId && canEdit()) { openModal(editId); return; }
    if (viewId && canView()) openDetails(viewId);
    if (delId && canEdit()) {
      if (confirm("Delete this project?")) {
        projects = projects.filter(p => p.id !== delId);
        if (selectedId === delId) closeDetails();
        addPendingCloudDelete(delId);
        saveProjects();
        renderFilterOptions();
        renderCards();
        renderTable();
      }
    }
  });

  document.getElementById("dpClose").addEventListener("click", closeDetails);
  document.getElementById("dpEdit").addEventListener("click", () => {
    if (selectedId) openModal(selectedId);
  });
}

// ---------------------------------------------------------------------
// 13. INIT
// ---------------------------------------------------------------------
async function bootApp() {
  if (!loadProjects() || projects.length === 0) {
    seedProjects();
  } else {
    // keep counter ahead of existing IDs
    projectCounter = computeProjectCounter(projects);
  }
  setupSidebarNav();
  setupEvents();
  setupUserEvents();
  setupSettingsEvents();
  if (cloudConfigured && db) {
    if (await cloudConnect()) await pullCloudUsers();
    await pullCloudProjects();
  }
  refreshProfile();
  applyPermissions();
  renderFilterOptions();
  renderCards();
  renderTable();
  startCloudSyncTimer();
}

async function init() {
  initCloud();
  loadUsers();
  setupLogin();
  // Migrate the old "ok"-style session marker to the default admin.
  if (getSessionUser() === "ok") setSessionUser(DEFAULT_ADMIN.username);
  if (!getSessionUser() || !findUserByUsername(getSessionUser())) {
    document.getElementById("loginOverlay").classList.remove("hidden");
    return;
  }
  await bootApp();
}

window.addEventListener("DOMContentLoaded", init);

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
  if (!db) {
    flashSaveStatus("Saved in this browser · " + timeNow());
    return;
  }
  (async () => {
    try {
      const sess = await db.auth.getSession();
      if (sess.error || !sess.data.session) {
        flashSaveStatus("Saved in this browser — sign in (or reconnect the cloud toggle) to share across devices · " + timeNow(), true);
        return;
      }
      if (!cloudReady) {
        cloudReady = true;
        setCloudStatus(true, "shared cloud");
      }
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
  if (el) { el.textContent = msg; el.style.color = isWarning ? "var(--red-600)" : "var(--green-600)"; }
  let toast = document.getElementById("saveToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "saveToast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = "save-toast show " + (isWarning ? "warn" : "ok");
  clearTimeout(toast._hide);
  toast._hide = setTimeout(() => { toast.classList.remove("show"); }, 4200);
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

function loadSupabaseLib() {
  return new Promise((resolve, reject) => {
    if (window.supabase && window.supabase.createClient) return resolve(true);
    const s = document.createElement("script");
    s.src = "supabase-lib.js";
    s.onload = () => resolve(!!(window.supabase && window.supabase.createClient));
    s.onerror = () => reject(new Error("cdn-failed"));
    document.head.appendChild(s);
  });
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
  el.title = "Cloud connection: " + label + ". Click to sign in again / reconnect.";
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
// 2.7 AI LAYER (optional Google Gemini summaries & notes)
// ----------------------------------------------------------------
// The API key is stored only in this browser (localStorage) — never in
// code, and never uploaded to GitHub. AI only runs when the user clicks
// a "Generate" button; nothing is sent automatically.
// ---------------------------------------------------------------------
const AI_KEY_STORAGE = "aace_ai_key_v1";
const AI_MODEL_STORAGE = "aace_ai_model_v3";
const DEFAULT_AI_MODEL = "gemini-3.5-flash";

function getAIKey() { try { return localStorage.getItem(AI_KEY_STORAGE) || ""; } catch (e) { return ""; } }
function getAIModel() { try { return localStorage.getItem(AI_MODEL_STORAGE) || DEFAULT_AI_MODEL; } catch (e) { return DEFAULT_AI_MODEL; } }

async function aiCall(prompt, maxTokens) {
  const key = getAIKey();
  if (!key) return { error: "no-api-key" };
  const model = getAIModel();
  let url;
  try {
    url = "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent?key=" + encodeURIComponent(key);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: Math.max(maxTokens || 180, 60), thinkingConfig: { thinkingBudget: 0 } }
      })
    });
    if (!res.ok) {
      const raw = await res.text().catch(() => "");
      return { error: "HTTP " + res.status + (raw ? " — " + raw.slice(0, 140) : "") };
    }
    const j = await res.json();
    const text = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts || [])
      .map(p => p.text || "").join("").trim();
    if (!text) return { error: "The AI returned an empty response." };
    return { text: text };
  } catch (e) {
    return { error: e.message || "Network error" };
  }
}

function aiButtonText(btnId, busy) {
  const el = document.getElementById(btnId);
  if (el) { el.disabled = busy; el.innerHTML = busy ? "&#8987; Generating..." : "&#10024; AI Note"; }
}

async function aiGenerateNote() {
  const title = document.getElementById("f_title").value.trim();
  if (!title) { alert("Enter the project title first."); return; }
  const cost = parseFloat(document.getElementById("f_cost").value);
  const workflow = getWorkflow(cost, constructionChecked());
  const cur = document.getElementById("f_lastNote").value.trim();
  const prompt =
    "You write progress notes for a capital expenditure (CAPEX) monitoring dashboard used by a plant AACE team. " +
    "Write ONE short, professional 'last movement' update (1-2 sentences, at most 40 words). Use ONLY the facts below; do not invent numbers, names or dates.\n" +
    "Project: " + title + "\n" +
    "Department: " + document.getElementById("f_dept").value + "\n" +
    "Budget: PHP " + (isNaN(cost) ? "?" : cost.toLocaleString("en-PH")) + "M\n" +
    "Approval flow tier: " + workflow.label + "\n" +
    "Current approval stage: " + (document.getElementById("f_person").value || "?") + " / " + (document.getElementById("f_stageSub").value || document.getElementById("f_person").value || "?") + "\n" +
    "Note so far (you may continue it): " + (cur || "(empty)");
  document.getElementById("aiNoteHint").style.display = "block";
  aiButtonText("aiGenNoteBtn", true);
  const r = await aiCall(prompt, 120);
  aiButtonText("aiGenNoteBtn", false);
  if (r.error) { alert(r.error === "no-api-key" ? "Add your Google Gemini API key in Settings → AI Assistant first." : "AI error: " + r.error); return; }
  const ta = document.getElementById("f_lastNote");
  ta.value = cur ? cur.trim().replace(/[.;]$/, "") + ". " + r.text : r.text;
}

async function aiSummarizeProject(id) {
  const p = projects.find(x => x.id === id);
  const out = document.getElementById("dpAISummary");
  if (!p || !out) return;
  const daysToTarget = Math.max(0, Math.round((new Date(p.targetCompletion + "T00:00:00") - new Date()) / 86400000));
  const prompt =
    "You write executive summaries for a capital expenditure (CAPEX) monitoring dashboard. " +
    "Write a concise 3-4 sentence executive summary using ONLY these facts; do not invent anything.\n" +
    "Project: " + p.title + "\n" +
    "Department: " + p.department + "\n" +
    "Budget: PHP " + Number(p.budget).toLocaleString("en-PH") + "M\n" +
    "Status: " + p.statusLabel + "\n" +
    "Current stage: " + p.currentStatus + " (" + p.completion + "% complete)\n" +
    "Person in charge: " + p.personInCharge + "\n" +
    "Days pending since last movement: " + daysPending(p.lastMovementDate) + "\n" +
    "Days until target completion: " + daysToTarget + "\n" +
    "Last movement note: " + (p.lastMovementNote || "none");
  const btn = document.getElementById("dpAISummaryBtn");
  if (btn) { btn.disabled = true; btn.innerHTML = "&#8987; Generating..."; }
  out.textContent = "Generating summary...";
  const r = await aiCall(prompt, 220);
  if (btn) { btn.disabled = false; btn.innerHTML = "&#10024; Generate"; }
  if (r.error) { out.textContent = ""; alert(r.error === "no-api-key" ? "Add your Google Gemini API key in Settings → AI Assistant first." : "AI error: " + r.error); return; }
  out.textContent = r.text;
}

// ---------------------------------------------------------------------
// 2.8 WHAT TO DO? (AI next-actions with follow-up emails)
// ----------------------------------------------------------------
// Lists every non-approved project, sorted by days pending, and on
// click generates a recommended next action + a short follow-up email
// (Gemini when configured, otherwise sensible coordinator suggestions).
// ----------------------------------------------------------------
const todoCache = {}; // id -> { action, email }

function nextStageOf(p) {
  try {
    const wf = getWorkflow(p.budget, p.withConstruction);
    const idx = findProjectStageIndex(wf, p);
    if (idx >= 0 && idx < wf.stages.length - 1) return wf.stages[idx + 1];
  } catch (e) { /* ignore */ }
  return null;
}

function todoCandidates() {
  return projects
    .filter(p => p.statusLabel !== "Approved" && p.statusLabel !== "Procurement" && (Number(p.completion) || 0) < 100)
    .sort((a, b) => daysPending(b.lastMovementDate) - daysPending(a.lastMovementDate))
    .slice(0, 12);
}

function ruleAction(p) {
  const dp = daysPending(p.lastMovementDate);
  const next = nextStageOf(p);
  if (p.statusLabel === "Rejected") {
    return "Prepare a corrective plan with " + (p.requestor || "the proponent") + " and revise the project so it can be re-submitted for approval.";
  }
  if (p.statusLabel === "Pending") {
    return "Send a follow-up to " + (p.personInCharge || "the current approver") + " asking for the missing requirements / updated financials so the approval can move forward.";
  }
  if (/Wait/i.test(p.statusLabel)) {
    const what = /SPQF/i.test(p.statusLabel) ? "SPQF" : /Bid/i.test(p.statusLabel) ? "technical bid" : "pending items";
    return "Escalate with Procurement to follow up the " + what + " for " + p.id + ".";
  }
  if (next) {
    return "Coordinate hand-over to " + next.responsible + " for the next step: \"" + next.status + "\" — confirm all documents are complete first.";
  }
  return dp >= 10
    ? "Contact " + (p.personInCharge || "the current approver") + " — " + dp + " days since the last movement; request a status update."
    : "Keep the file moving: update the movement note and confirm the next approval step.";
}

function todoPrompt(p) {
  const next = nextStageOf(p);
  return "You are a CAPEX coordinator for a food plant. Given the facts below, reply EXACTLY in this format, nothing else:\n" +
    "ACTION: <one imperative sentence starting with a verb, naming the responsible person/title and the single best next step>\n" +
    "EMAIL: <a short professional plain-text email (2-4 sentences, no subject line) from the coordinator to that person/team asking for that specific next step>\n\n" +
    "Facts:\n" +
    "Project: " + p.title + " (" + p.id + ")\n" +
    "Department: " + p.department + "\n" +
    "Budget: PHP " + Number(p.budget).toLocaleString("en-PH") + "M\n" +
    "Status: " + p.statusLabel + "\n" +
    "Current approval stage: " + p.currentStatus + " (" + p.completion + "% complete)\n" +
    "Person in charge: " + (p.personInCharge || "none") + "\n" +
    (next ? "Next approval step: " + next.responsible + " — " + next.status + "\n" : "") +
    "Requestor: " + (p.requestor || "not stated") + "\n" +
    "Days pending since last movement: " + daysPending(p.lastMovementDate) + "\n" +
    "Target completion: " + p.targetCompletion + "\n" +
    "Last movement note: " + (p.lastMovementNote || "none") + "\n" +
    "Use ONLY these facts; invent no names, titles or numbers. Address the person by plain name or minimize 'Ms./Mr.'."
}

async function aiGenAction(p) {
  const cached = todoCache[p.id];
  if (cached) return cached;
  const r = await aiCall(todoPrompt(p), 260);
  if (r.error) {
    const fallback = { action: ruleAction(p), email: "", offline: true };
    todoCache[p.id] = fallback;
    return fallback;
  }
  const lines = r.text.split(/\n/).map(l => l.trim());
  const aLine = lines.find(l => /^ACTION:/i.test(l));
  const m = r.text.match(/EMAIL:\s*([\s\S]+)$/i);
  const out = {
    action: (aLine ? aLine.replace(/^ACTION:\s*/i, "") : r.text).trim(),
    email: (m ? m[1].trim() : ""),
    offline: false
  };
  todoCache[p.id] = out;
  return out;
}

function copyText(txt) {
  const done = () => { const n = document.getElementById("todoNote"); if (n) { const old = n.textContent; n.textContent = "✔ Email copied to your clipboard — paste it into Outlook."; setTimeout(() => { n.textContent = old; }, 2500); } };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(done).catch(() => fallbackCopy(txt, done));
  } else fallbackCopy(txt, done);
}
function fallbackCopy(txt, done) {
  const ta = document.createElement("textarea");
  ta.value = txt;
  ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
  document.body.removeChild(ta);
}

function renderTodoList() {
  const list = todoCandidates();
  const el = document.getElementById("todoList");
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="panel"><div class="insight-empty">&#9989; Nothing needs action right now — approved and completed projects are excluded.</div></div>`;
    return;
  }
  el.innerHTML = list.map(p => `
    <div class="todo-item">
      <div class="todo-head">
        <span class="proj-no">${p.id}</span>
        <span class="todo-title">${esc(p.title)}</span>
        <span class="badge ${badgeClass(p.statusLabel)}">${esc(p.statusLabel)}</span>
      </div>
      <div class="todo-meta">
        <span>${esc(p.department)}</span> &middot;
        <span class="todo-days ${daysPending(p.lastMovementDate) >= 20 ? "warn" : ""}">&#9200; ${daysPending(p.lastMovementDate)} days pending</span> &middot;
        <span>PIC: ${esc(p.personInCharge)}</span> &middot;
        <span>Next: ${esc(nextStageOf(p) ? nextStageOf(p).responsible + " — " + nextStageOf(p).status : "Fully Approved")}</span>
      </div>
      <div class="todo-body">
        <div class="todo-action ${todoCache[p.id] ? "" : "empty"}" id="todoOut_${p.id}">
          ${todoCache[p.id] ? (todoCache[p.id].offline ? "(offline suggestion) " : "") + esc(todoCache[p.id].action) : "Click Generate for a suggested next action and follow-up email."}
          ${todoCache[p.id] && todoCache[p.id].email ? `<div class="todo-mail">${esc(todoCache[p.id].email)}</div>` : ""}
        </div>
        <div class="todo-btns">
          <button class="btn btn-sm btn-gold btn-gen-one" data-id="${p.id}">&#128161; Generate</button>
          <button class="btn btn-sm btn-ghost btn-copy-mail" data-id="${p.id}" style="${todoCache[p.id] && todoCache[p.id].email ? "" : "display:none"}">&#128203; Copy email</button>
        </div>
      </div>
    </div>`).join("");
}

async function generateTodoFor(id, btn) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  const out = document.getElementById("todoOut_" + id);
  if (!out) return;
  if (btn) { btn.disabled = true; btn.innerHTML = "&#8987; Writing..."; }
  out.className = "todo-action empty";
  out.textContent = "Generating...";
  const res = await aiGenAction(p);
  if (btn) { btn.disabled = false; btn.innerHTML = "&#128161; Generate"; }
  out.className = "todo-action";
  out.innerHTML = (res.offline ? '<span class="offline-tag">OFFLINE SUGGESTION</span> ' : "") + esc(res.action) + (res.email ? `<div class="todo-mail">${esc(res.email)}</div>` : "");
  const cb = document.querySelector(`.btn-copy-mail[data-id="${id}"]`);
  if (cb) cb.style.display = res.email ? "" : "none";
  renderTodoList(); // persist cached state into other rendered buttons safely
}

function setupTodoEvents() {
  document.getElementById("genTodoAllBtn").addEventListener("click", async () => {
    const btn = document.getElementById("genTodoAllBtn");
    const list = todoCandidates();
    if (!list.length) { alert("Nothing needs action right now."); return; }
    btn.disabled = true;
    const note = document.getElementById("todoNote");
    const old = note ? note.textContent : "";
    for (let i = 0; i < list.length; i++) {
      if (note) note.textContent = "Generating actions... " + (i + 1) + " of " + list.length;
      await generateTodoFor(list[i].id, null);
    }
    if (note) note.textContent = old;
    btn.disabled = false;
    renderTodoList();
    alert("Done — generated " + list.length + " next actions.");
  });
  document.getElementById("todoList").addEventListener("click", (e) => {
    const gen = e.target.closest(".btn-gen-one");
    const cpy = e.target.closest(".btn-copy-mail");
    if (gen) generateTodoFor(gen.dataset.id, gen);
    if (cpy) {
      const cached = todoCache[cpy.dataset.id];
      if (cached && cached.email) copyText(cached.email);
    }
  });
}

// ---------------------------------------------------------------------
// 2.9 ACTIVITY TRAIL (audit log per project)
// ----------------------------------------------------------------
// Every create/edit is recorded automatically (who, when, what changed).
// Admins/editors can also add entries manually and delete any entry,
// so history for projects that were moving before can be backfilled.
// ----------------------------------------------------------------
const AUDIT_KEY = "aace_audit_v1";
let auditLog = [];

function loadAudit() {
  try {
    const raw = localStorage.getItem(AUDIT_KEY);
    auditLog = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(auditLog)) auditLog = [];
  } catch (e) { auditLog = []; }
}
function saveAudit() {
  try { localStorage.setItem(AUDIT_KEY, JSON.stringify(auditLog)); } catch (e) { /* ignore */ }
}
function addAudit(projectId, text, source) {
  auditLog.unshift({
    id: "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    projectId: projectId,
    ts: new Date().toISOString(),
    user: getSessionUser() || DEFAULT_ADMIN.username,
    text: text,
    source: source || "auto"
  });
  saveAudit();
}
function auditFor(projectId) {
  return auditLog.filter(e => e.projectId === projectId);
}
function fmtAuditTime(iso) {
  const d = new Date(iso);
  return isNaN(d) ? "" : d.toLocaleString("en-PH", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function describeChanges(oldP, newVals) {
  const map = {
    title: "title", department: "department", budget: "budget",
    personInCharge: "person in charge", currentStatus: "approval stage",
    statusLabel: "status label", targetCompletion: "target date",
    lastMovementDate: "last movement date", lastMovementNote: "last note",
    withConstruction: "construction scope"
  };
  const parts = [];
  Object.keys(map).forEach(k => {
    const a = oldP[k], b = newVals[k];
    if (String(a) !== String(b)) {
      let fa = a, fb = b;
      if (k === "budget") { fa = fmtBudgetM(a); fb = fmtBudgetM(b); }
      if (k === "withConstruction") { fa = a ? "yes" : "no"; fb = b ? "yes" : "no"; }
      parts.push(map[k] + ": " + ((a === "" || a == null) ? "(empty)" : fa) + " → " + ((b === "" || b == null) ? "(empty)" : fb));
    }
  });
  return parts;
}

function renderAudit(id) {
  const el = document.getElementById("dpAudit");
  if (!el) return;
  const entries = auditFor(id);
  if (!entries.length) {
    el.innerHTML = `<li class="audit-empty">No trail entries yet. Edit a project to log it automatically, or click "+ Add entry" to record past movements.</li>`;
    return;
  }
  el.innerHTML = entries.map(e => `
    <li class="audit-entry" data-audit="${e.id}">
      <div class="ae-head">
        <span class="ae-user">${esc(e.user || "-")}</span>
        <span class="ae-time">${fmtAuditTime(e.ts)}</span>
        <span class="ae-src ${e.source === "auto" ? "auto" : "manual"}">${e.source === "auto" ? "auto" : "manual"}</span>
        ${canEdit() ? `<button class="ae-del" data-auditdel="${e.id}" title="Delete entry">&#10005;</button>` : ""}
      </div>
      <div class="ae-text">${esc(e.text)}</div>
    </li>`).join("");
}

function setupAuditEvents() {
  document.getElementById("dpAuditAddBtn").addEventListener("click", () => {
    if (!(canEdit() && selectedId)) return;
    document.getElementById("dpAuditAdd").classList.remove("hidden");
    document.getElementById("dpAuditText").value = "";
    document.getElementById("dpAuditText").focus();
  });
  document.getElementById("dpAuditCancel").addEventListener("click", () => {
    document.getElementById("dpAuditAdd").classList.add("hidden");
  });
  document.getElementById("dpAuditSave").addEventListener("click", () => {
    const txt = document.getElementById("dpAuditText").value.trim();
    if (!selectedId) return;
    if (!txt) { alert("Write a short note for this entry first."); return; }
    addAudit(selectedId, txt, "manual");
    document.getElementById("dpAuditAdd").classList.add("hidden");
    renderAudit(selectedId);
  });
  document.getElementById("dpAudit").addEventListener("click", (e) => {
    const del = e.target.closest("[data-auditdel]");
    if (!del) return;
    if (!confirm("Delete this trail entry? This cannot be undone.")) return;
    auditLog = auditLog.filter(x => x.id !== del.dataset.auditdel);
    saveAudit();
    renderAudit(selectedId);
  });
}

// ---------------------------------------------------------------------
// 2.10 AACE CREATION DOCUMENTS (submission checklist + AI drafts)
// ----------------------------------------------------------------
// Five documents are completed before the Pre Bidding Request. Status is
// kept per project (aaceDocs) and AI drafts are saved per document
// (aaceDrafts). Status changes are logged in the Activity Trail.
// ----------------------------------------------------------------
const AACE_DOCS_ORDER = ["Justification Support", "Scope of Work", "Technical Operating Requirements", "Pre Bidding Request", "CEPG Checklist"];
const AACE_DOC_AI = {
  "Justification Support": true,
  "Scope of Work": true,
  "Technical Operating Requirements": true
};

const AACE_JS_EXAMPLES = [
`Buggy Carts serve as the primary heavy-duty transport solution for raw materials and finished goods within the manufacturing environment. Specifically engineered for durability and hygiene, these vehicles feature food-grade stainless steel or aluminum frames designed to support the significant weight of meat products. At Purefoods Hormel Plant 3, these carts are essential for continuous operational flow, facilitating the efficient transfer of Work-In-Progress (WIP) materials between critical production stages.

Currently, the Purefoods Hormel Plant 3 utilizes ninety-six (96) units of buggy carts. To maintain food safety standards in material handling, ensure transport efficiency, and optimize turnaround flow between production stages, the baseline requirement is one hundred twelve (112) units. Moreover, to support the additional refrigerated blender, sausage de-casing, and de-linker machine for meat processing this year 2026, twenty-four (24) buggy carts are required to facilitate the material transport of the new machines. To meet both existing operational standards and the specific requirements of the additional equipment, a procurement of additional units are necessary to bridge the equipment deficit. With this, we need to acquire a total of forty (40) additional units of buggy carts to sustain operational efficiency and continuous turnaround flow between processes, and to support the required material transport for the new machines.`,
`Drip Pans for Meat Trolleys are accessories used to collect meat juices and residues during the transport and staging of meat materials. They are installed beneath meat trolleys to catch drippings while the meat is being moved or temporarily stored on the cut floor.

Currently, meat trolleys in Plant 3 do not have dedicated drip pans, resulting in meat juices and residues dripping onto the cut floor during transport and staging of meat materials. This condition leads to wet and slippery floors, increased cleaning frequency, and potential hygiene and safety risks for personnel. The absence of drip pans may also increase the risk of cross-contamination and non-compliance with GMP and food safety standards, while causing minor process interruptions for cleaning and sanitation. With this, we need to acquire drip pans for meat trolleys to properly collect meat drippings, maintain a clean and dry cut floor, and enhance overall operational safety and efficiency in Plant 3.`,
`A Frozen Meat Block Cutter is a heavy-duty industrial machine designed to break down solid, fully frozen meat blocks into smaller, more manageable pieces for further processing. It consists of a high-strength cutting assembly, a heavy-duty hydraulic system, and a stainless steel body with a secure feeding chamber designed for safe and efficient handling of frozen blocks.

Currently, the Marination Area performs a meat-reducing process to achieve the required size of corned beef meat materials for uniform cooking and consistent shredding quality. However, this process creates bottlenecking due to slicer capacity limitations and requires high manpower due to the semi-manual transport process prior slicing. To improve this process, the Product Development and Production team proposed automating the slicing process and relocating the meat-cutting activity to the Meat Preparation Area through the use of a Frozen Meat Block Cutter. This will debottleneck the slicing process, reduce manpower and increase yield. With this, acquiring a Frozen Meat Block Cutter is essential to debottleneck the slicing process, reduce manpower from 12 to 4 heads per day and will also increase yield by 2%.`,
`Racking System is equipment used to store and organize materials on the storage. It consists of shelves or racks that hold materials on pallets or vats, allowing easy access and improving workflow and safety.

Currently, Meat Preparation cut floor does not have a racking system, resulting in inefficient use of space, longer time handling and organizing meat materials, and potential safety risks. This can cause delays and bottlenecks in meat preparation, affecting overall production efficiency. With this, we need to acquire a racking system to maximize available floor space, improve organization, and maintain safe, orderly, and efficient operations during meat preparation.`
];

const AACE_SOW_TEMPLATE_MACHINE = `1. MACHINE/EQUIPMENT DELIVERY & INSTALLATION
1.a Machine/Equipment must be delivered and received in good condition, fully functional after installation and test operation.
1.b Internal site transportation from the staging area to the designated installation area using suitable means.
1.c Installation of electrical dropline, wiring, and all required utilities (compressed air, water, steam, drainage, etc.) needed for full functionality of the equipment, along with insulation resistance testing and the necessary calculations for circuit breaker sizing, wire sizing, and voltage drop.
1.d Mechanical and electrical integration of the [listed components], ensuring proper alignment, connectivity and operational synchronization; all components shall be installed, configured and delivered fully functional as part of a complete turnkey system.
1.e Execution of civil works as required for the installation and operation of the machine/equipment, if needed.
1.f Calibration and alignment of the machine/equipment.

2. SERVICES AND WARRANTY
2.a After-sales service technician availability; provide three (3) soft copies of the operation manual (Adobe format) on top of the hard copy of the manual (Operations manual, Electrical block diagram and Parts list number).
2.b Supplier shall provide cost for the spare parts and consumables.
2.c Supplier shall provide calibration certificate/sticker and standard test piece.
2.d Supplier shall provide material specifications and certification indicating the use of materials.
2.e [12] months warranty on mechanical parts, spare parts and consumables (fast moving) of the equipment.

3. COMMISSIONING AND TRAINING
3.a Actual training and classroom discussion on the operation of the equipment, maintenance cleaning and basic troubleshooting.`;

const AACE_SOW_TEMPLATE_FABRICATION = `1. FABRICATION, DELIVERY, AND INSTALLATION
1.a The [asset] shall be locally fabricated using heavy-duty galvanized steel, with all cutting, drilling, and fabrication works completed prior to the galvanizing process.
1.b Galvanizing shall be applied after fabrication to ensure full corrosion protection on all surfaces, including cut edges and drilled areas.
1.c Design and fabrication shall ensure adequate load capacity, corrosion resistance, and smooth, safe surfaces suitable for use on the [area].
1.d Delivery, positioning, anchoring (if required), and installation of the [asset] on the [area] are included.

2. MATERIAL AND WORKMANSHIP WARRANTY
2.a Supplier shall provide material specifications and documentation confirming the use of galvanized steel.
2.b Provide a list and cost of replacement parts or components, if applicable.
2.c Minimum twelve (12) months warranty on materials and workmanship of the [asset].

3. TURNOVER AND ORIENTATION
3.a Conduct on-site orientation on the proper use, loading limits, and basic inspection of the [asset] to ensure safe and efficient operation.`;

const AACE_SOW_TEMPLATE = {
  fabrication: AACE_SOW_TEMPLATE_FABRICATION,
  machine: AACE_SOW_TEMPLATE_MACHINE
};

function docStatus(p, name) {
  return (p && p.aaceDocs && p.aaceDocs[name]) || "todo";
}
function docDraft(p, name) {
  return (p && p.aaceDrafts && p.aaceDrafts[name]) || "";
}

function renderAACEDocs(id) {
  const p = projects.find(x => x.id === id);
  const el = document.getElementById("dpAACEDocs");
  if (!p || !el) return;
  const editable = canEdit();
  el.innerHTML = AACE_DOCS_ORDER.map(name => {
    const st = docStatus(p, name);
    const hasAI = !!(AACE_DOC_AI[name]);
    const draft = docDraft(p, name);
    const label = st === "todo" ? "To Do" : st === "doing" ? "Doing" : "Done";
    return `
    <div class="doccard ${st}">
      <div class="docrow">
        <div class="docname"><span class="dot"></span>${name}</div>
        <div class="docstatus">
          ${editable ? `
            <button class="ds ${st === "todo" ? "on todo" : ""}" data-doc="${name}" data-set="todo" title="Not started">To Do</button>
            <button class="ds ${st === "doing" ? "on doing" : ""}" data-doc="${name}" data-set="doing" title="In progress">Doing</button>
            <button class="ds ${st === "done" ? "on done" : ""}" data-doc="${name}" data-set="done" title="Completed">Done</button>`
          : `<span class="ds static ${st}">${label}</span>`}
        </div>
      </div>
      ${hasAI ? `
      <div class="docbtns">
        <button class="btn btn-sm btn-gold da-draft" data-doc="${name}" title="Draft this document with AI">&#10024; AI Draft</button>
        <button class="btn btn-sm btn-ghost da-copy" data-doc="${name}" style="${draft ? "" : "display:none"}" title="Copy the text">&#128203; Copy</button>
        <button class="btn btn-sm btn-ghost da-save" data-doc="${name}" style="${draft ? "" : "display:none"}" title="Save your edits">Save</button>
        <span class="da-status" id="dastatus_${name.replace(/\W/g, "")}"></span>
      </div>
      <textarea class="da-ta" data-doc="${name}" rows="6" placeholder="Click AI Draft or type the document here...">${esc(draft)}</textarea>` : ""}
    </div>`;
  }).join("");
}

function saveAACEDraft(id, name, txt) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  if (!p.aaceDrafts) p.aaceDrafts = {};
  p.aaceDrafts[name] = txt;
  saveProjects();
}
function docStatusMsg(id, name, msg) {
  const el = document.getElementById("dastatus_" + name.replace(/\W/g, ""));
  if (el) { el.textContent = msg; setTimeout(() => { el.textContent = ""; }, 3000); }
}

function setAACEDocStatus(id, name, st) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  const before = docStatus(p, name);
  if (before === st) return;
  if (!p.aaceDocs) p.aaceDocs = {};
  p.aaceDocs[name] = st;
  saveProjects();
  addAudit(id, "AACE Creation document \u0022" + name + "\u0022 marked as " + (st === "todo" ? "To Do" : st === "doing" ? "Doing" : "Done") + ".", "auto");
  renderAACEDocs(id);
}

function docPrompt(p, name) {
  const facts =
    "Project: " + p.title + " (" + p.id + ")\n" +
    "Department: " + p.department + "\n" +
    "Budget: PHP " + Number(p.budget).toLocaleString("en-PH") + "M (approval tier: " + (getWorkflow(p.budget, p.withConstruction).label) + ")\n" +
    "Requestor: " + (p.requestor || "not stated") + "\n" +
    "Target completion: " + p.targetCompletion + "\n" +
    "Last movement note: " + (p.lastMovementNote || "none") + "\n" +
    (p.quantityNeeded ? "Quantity needed (as declared): " + p.quantityNeeded + "\n" : "") +
    (p.baselineExisting ? "Baseline vs existing (as declared): " + p.baselineExisting + "\n" : "") +
    (p.expectedBenefit ? "Expected benefit (as declared): " + p.expectedBenefit + "\n" : "") +
    (p.riskIfNotApproved ? "Risk if not approved (as declared): " + p.riskIfNotApproved + "\n" : "") +
    "Use ONLY the facts above. Write nothing that is not supportable from them.";
  if (name === "Justification Support") {
    return "You are a CAPEX Justification Support writer for Purefoods Hormel Plant 3. Below are four REAL Justification Support documents from this plant, used as the required style reference. WRITE A NEW DOCUMENT FOR THIS PROJECT that reads like these examples: same tone, same three-part flow, same phrasing patterns, but with the facts of the project below.\n" +
      "REQUIRED FLOW (mirror the examples exactly):\n" +
      "Para 1 - WHAT IT IS: one or two sentences describing the asset, its standard construction (heavy-duty, food-grade stainless steel, etc.) and its role at Purefoods Hormel Plant 3.\n" +
      "Para 2 - CURRENT SITUATION: one or two sentences opening with \u0022Currently, \u2026\u0022 describing today's operation, the shortfall / limitation, and its downstream effects (hygiene / food safety / GMP risk, wet and slippery floors, manpower, bottlenecking, turnaround flow, cleaning interruptions).\n" +
      "Para 3 - RECOMMENDATION: opening with \u0022With this, we need to acquire\u0022 and ending with the expected benefits (sustain operational efficiency, debottlenecking, manpower reduction, yield, safety, compliance).\n" +
      "STYLE RULES: formal procurement English; capitalize the asset name at the start of the document exactly like the examples; no headings, no signature, no facts list; do NOT mention AACE, approval stages, pre-bidding or the tracking dashboard; do NOT copy the examples verbatim.\n" +
      "NUMBERS: use ONLY the facts in context and never manufacture figures. If the context declares a quantity or a savings figure, state it in number form (e.g. ninety-six (96) units); otherwise leave an underlined blank (___ units) for the writer to fill by hand.\n" +
      "REFERENCE EXAMPLES (all three are written this way):\n" +
      AACE_JS_EXAMPLES.join("\n\n---\n\n") +
      "\n\nNOW WRITE THE JUSTIFICATION SUPPORT FOR THIS PROJECT:\n" + facts;
  }
  if (name === "Scope of Work") {
    const isFabrication = /fabricat|rack|pallet|vat|storage|galvaniz|shelv/i.test(p.title);
    const template = isFabrication ? AACE_SOW_TEMPLATE_FABRICATION : AACE_SOW_TEMPLATE_MACHINE;
    return "You are the plant engineering writer for Purefoods Hormel Plant 3 writing a Scope of Work in the company's standard house format. Below is the exact SOW clause template used by the company. Produce the Scope of Work for this project by REPRODUCING that numbered clause structure (section title, then 1.a / 1.b / ... sub-clauses) and adapting every clause to the project's facts.\n" +
      "RULES:\n" +
      "- Keep the same section grouping and numbering style as the template.\n" +
      "- Replace [listed components], [asset], [area] and [12] with real project details when the facts support them; otherwise keep a short named blank like \u0022[component]\u0022 for the writer to fill.\n" +
      "- Keep the standing clauses (delivery in good condition, internal site transportation, utilities/electrical with breaker and wire sizing, civil works if required, calibration/alignment, after-sales service, soft/hard copies of manuals, spare parts cost, 12-month warranty, training and classroom discussion) worded as the template.\n" +
      "- Never invent brand names, models, quantities, prices or specifications.\n" +
      "HOUSE TEMPLATE TO FOLLOW:\n" + template + "\n\nNOW WRITE THE SCOPE OF WORK FOR THIS PROJECT:\n" + facts;
  }
  if (name === "Technical Operating Requirements") {
    return "You are a process/utilities engineer. Write a Technical Operating Requirements specification from the facts below with these exact headings:\n" +
      "1. CAPACITY & PERFORMANCE\n2. MATERIALS OF CONSTRUCTION\n3. UTILITIES & SITE DEMAND\n4. PRODUCT CONTACT & HYGIENE (GMP)\n5. SAFETY & COMPLIANCE\n6. TESTING & ACCEPTANCE\n" +
      facts;
  }
  return ""; // no AI for the two process items
}

function docFallback(p, name) {
  const h = (t) => t.toUpperCase() + "\n" + "-".repeat(t.length);
  const base = (headerLines, items) =>
    h(headerLines[0]) + "\n" + items.join("\n") + "\n\n" +
    h(headerLines[1]) + "\nProject: " + p.title + " (" + p.id + ")\nDepartment: " + p.department + "\nBudget: PHP " + Number(p.budget).toLocaleString("en-PH") + "M\nRequestor: " + (p.requestor || "-") + "\n[Edit the body below with your details.]";
  if (name === "Justification Support") {
    const qty = p.quantityNeeded || "___ units";
    const benefit = p.expectedBenefit
      ? ". Expected benefits: " + p.expectedBenefit + "."
      : ". Expected benefits: [state them, e.g. efficiency, safety, debottlenecking, manpower reduction, yield, compliance].";
    const risk = p.riskIfNotApproved ? " Risk if not approved: " + p.riskIfNotApproved + "." : "";
    return [
      "[Para 1 - WHAT IT IS: one short paragraph, neutral third person. Describe the asset \u0022" + p.title + "\u0022 and its role in " + p.department + ": its type, standard construction (heavy-duty, stainless steel, etc.) and what it carries, holds or processes.]",
      "[Para 2 - CURRENT SITUATION: one short paragraph, neutral third person. Open with \u0022Currently, \u2026\u0022 and state today's operation, the shortfall or limitation, and its downstream effects: hygiene / food safety / GMP risk, wet and slippery floors, manpower, bottlenecking, turnaround flow, cleaning interruptions.]",
      "[Para 3 - RECOMMENDATION: one short paragraph, first person \u0022we\u0022. Open with \u0022With this, we need to acquire\u0022 and state " + qty + (p.baselineExisting ? " (baseline vs existing: " + p.baselineExisting + ")" : "") + benefit + risk + "]"
    ].join("\n\n");
  }
  if (name === "Scope of Work") {
    const isFabrication = /fabricat|rack|pallet|vat|storage|galvaniz|shelv/i.test(p.title);
    const tpl = isFabrication ? AACE_SOW_TEMPLATE_FABRICATION : AACE_SOW_TEMPLATE_MACHINE;
    return ["SCOPE OF WORK", tpl].join("\n\n") +
      "\n\nFill the bracketed items from the project: " + p.title +
      (p.department ? " (" + p.department + ")" : "") +
      ", target completion " + p.targetCompletion + ".";
  }
  return base(["TECHNICAL OPERATING REQUIREMENTS", "PROJECT FACTS"], [
    "CAPACITY & PERFORMANCE: [Required throughput / capacity with units.]",
    "MATERIALS OF CONSTRUCTION: [Product-contact materials and finishes.]",
    "UTILITIES & SITE DEMAND: [Electric, steam, water, air requirements.]",
    "PRODUCT CONTACT & HYGIENE (GMP): [Sanitary design, cleanability, corrosion resistance.]",
    "SAFETY & COMPLIANCE: [Guarding, standards, permits.]",
    "TESTING & ACCEPTANCE: [Performance trials and acceptance method.]"
  ]);
}

async function aiDraftDoc(id, name, btn) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  const ta = document.querySelector(`.da-ta[data-doc="${name}"]`);
  const st = document.getElementById("dastatus_" + name.replace(/\W/g, ""));
  if (!ta) return;
  if (btn) { btn.disabled = true; btn.innerHTML = "&#8987; Drafting..."; }
  if (st) st.textContent = "Generating...";
  try {
    const r = await aiCall(docPrompt(p, name), 1100);
    if (btn) { btn.disabled = false; btn.innerHTML = "&#10024; AI Draft"; }
    if (r.error) {
      if (r.error === "no-api-key") {
        ta.value = docFallback(p, name);
        if (st) st.textContent = "Offline template — add a Gemini key in Settings for AI drafting.";
      } else {
        ta.value = docFallback(p, name);
        if (st) st.textContent = "AI unavailable (" + r.error + ") — template shown instead.";
      }
    } else {
      ta.value = r.text;
      if (st) st.textContent = "Draft ready — refine and Save.";
    }
    saveAACEDraft(id, name, ta.value);
  } catch (err) {
    if (btn) { btn.disabled = false; btn.innerHTML = "&#10024; AI Draft"; }
    if (st) st.textContent = "Error: " + (err && err.message ? err.message : err);
  }
  renderAACEDocs(id);
}

// Guide-panel AI drafter (AACE Guide page + topbar shortcut).
// Each card gets its own panel, addressed by prefix (guide = Justification Support, gsow = Scope of Work).
const GUIDE_PANELS = { guide: "Justification Support", gsow: "Scope of Work" };
const guideSelCache = { guide: "", gsow: "" };

function guideGrab(prefix, suffix) {
  return document.getElementById(prefix + suffix);
}
function guideDraftNote(prefix, msg) {
  const st = guideGrab(prefix, "DraftStatus");
  if (st) { st.textContent = msg; setTimeout(() => { st.textContent = ""; }, 4000); }
}

function renderGuideDraft() {
  Object.keys(GUIDE_PANELS).forEach(prefix => {
    const sel = guideGrab(prefix, "ProjSel");
    const ta = guideGrab(prefix, "DraftTa");
    if (!sel || !ta) return;
    const doc = GUIDE_PANELS[prefix];
    const prev = sel.value || guideSelCache[prefix];
    const aace = projects.filter(p => p.statusLabel === "AACE Creation");
    const list = (aace.length ? aace : projects).concat();
    if (!list.length) {
      sel.innerHTML = `<option value="">No projects yet</option>`;
      ta.value = "";
      return;
    }
    sel.innerHTML = list.map(p => `<option value="${p.id}">${esc(p.id)} — ${esc(p.title)}</option>`).join("");
    if (prev && projects.some(p => p.id === prev)) sel.value = prev;
    guideSelCache[prefix] = sel.value;
    const p = projects.find(x => x.id === sel.value);
    ta.value = p ? docDraft(p, doc) : "";
    guideGrab(prefix, "CopyBtn").style.display = ta.value ? "" : "none";
    guideGrab(prefix, "SaveBtn").style.display = ta.value ? "" : "none";
  });
}

async function generateGuideDraft(prefix) {
  const sel = guideGrab(prefix, "ProjSel");
  const ta = guideGrab(prefix, "DraftTa");
  const doc = GUIDE_PANELS[prefix];
  if (!sel || !ta || !sel.value) { guideDraftNote(prefix, "Select a project first."); return; }
  const id = sel.value;
  const p = projects.find(x => x.id === id);
  if (!p) return;
  const btn = guideGrab(prefix, "DraftBtn");
  btn.disabled = true; btn.innerHTML = "&#8987; Drafting...";
  guideDraftNote(prefix, "Generating...");
  try {
    const r = await aiCall(docPrompt(p, doc), 1100);
    btn.disabled = false; btn.innerHTML = "&#10024; AI Draft";
    if (r.error) {
      ta.value = docFallback(p, doc);
      guideDraftNote(prefix, r.error === "no-api-key"
        ? "Offline template — add a Gemini key in Settings for AI drafting."
        : "AI unavailable (" + r.error + ") — template shown instead.");
    } else {
      ta.value = r.text;
      guideDraftNote(prefix, "Draft ready — refine and Save.");
    }
    saveAACEDraft(id, doc, ta.value);
  } catch (err) {
    btn.disabled = false; btn.innerHTML = "&#10024; AI Draft";
    guideDraftNote(prefix, "Error: " + (err && err.message ? err.message : err));
  }
  guideGrab(prefix, "CopyBtn").style.display = "";
  guideGrab(prefix, "SaveBtn").style.display = "";
}

function setupGuideDraftPanel(prefix) {
  const sel = guideGrab(prefix, "ProjSel");
  if (sel) sel.addEventListener("change", () => renderGuideDraft());
  guideGrab(prefix, "DraftBtn").addEventListener("click", () => generateGuideDraft(prefix));
  guideGrab(prefix, "SaveBtn").addEventListener("click", () => {
    const ta = guideGrab(prefix, "DraftTa");
    const id = sel ? sel.value : "";
    if (!id || !ta) return;
    saveAACEDraft(id, GUIDE_PANELS[prefix], ta.value);
    guideDraftNote(prefix, "Saved to " + id + ".");
  });
  guideGrab(prefix, "CopyBtn").addEventListener("click", () => {
    copyText(guideGrab(prefix, "DraftTa").value);
  });
  const open = guideGrab(prefix, "OpenBtn");
  if (open) open.addEventListener("click", () => {
    const id = sel ? sel.value : "";
    if (!id) { guideDraftNote(prefix, "Select a project first."); return; }
    showView("projects");
    openDetails(id);
    document.getElementById("detailsPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupGuideEvents() {
  document.getElementById("topAIDraftBtn").addEventListener("click", () => {
    showView("guide");
    renderGuideDraft();
    const panel = document.querySelector(".js-draft-panel");
    if (panel) panel.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  setupGuideDraftPanel("guide");
  setupGuideDraftPanel("gsow");
}

function setupAACEDocsEvents() {
  const cont = document.getElementById("dpAACEDocs");
  if (!cont) return;
  cont.addEventListener("click", (e) => {
    if (!selectedId) return;
    const setBtn = e.target.closest("[data-set]");
    if (setBtn && canEdit()) { setAACEDocStatus(selectedId, setBtn.dataset.doc, setBtn.dataset.set); return; }
    const draftBtn = e.target.closest(".da-draft");
    if (draftBtn) { aiDraftDoc(selectedId, draftBtn.dataset.doc, draftBtn); return; }
    const saveBtn = e.target.closest(".da-save");
    if (saveBtn) {
      const ta = document.querySelector(`.da-ta[data-doc="${saveBtn.dataset.doc}"]`);
      saveAACEDraft(selectedId, saveBtn.dataset.doc, ta ? ta.value : "");
      docStatusMsg(selectedId, saveBtn.dataset.doc, "Saved");
      renderAACEDocs(selectedId);
      return;
    }
    const copyBtn = e.target.closest(".da-copy");
    if (copyBtn) {
      const ta = document.querySelector(`.da-ta[data-doc="${copyBtn.dataset.doc}"]`);
      if (ta) copyText(ta.value);
    }
  });
}

// ---------------------------------------------------------------------
// 2.11 AI PORTFOLIO STATUS UPDATE (dashboard)
// ----------------------------------------------------------------
function summaryBucket(p) {
  if (ATTENTION_LABELS.includes(p.statusLabel)) return "NEEDS ATTENTION";
  if (p.statusLabel === "Approved" || p.statusLabel === "Procurement") return "APPROVED / PROCUREMENT";
  if (p.statusLabel === "Pre Bidding Request" || p.statusLabel === "Waiting for Technical Bid" || p.statusLabel === "Ongoing Technical Evaluation") return "PRE-BIDDING & TECHNICAL EVALUATION";
  if (p.statusLabel === "AACE Creation") return "AACE CREATION";
  return "REVIEW & WAITING";
}
const SUMMARY_BUCKET_ORDER = ["AACE CREATION", "PRE-BIDDING & TECHNICAL EVALUATION", "REVIEW & WAITING", "APPROVED / PROCUREMENT", "NEEDS ATTENTION"];

function portfolioHeadline() {
  const total = projects.length;
  const ap = projects.filter(p => ["Approved", "Procurement"].includes(p.statusLabel));
  const attn = projects.filter(p => ATTENTION_LABELS.includes(p.statusLabel));
  const com = ap.reduce((s, p) => s + Number(p.budget), 0);
  return total + " project(s) in the portfolio — " + ap.length + " in approved/procurement (Php " + com.toLocaleString("en-PH", { maximumFractionDigits: 1 }) + "M committed), " + attn.length + " requiring attention, " + Math.max(total - ap.length - attn.length, 0) + " moving through evaluation.";
}

function summaryFacts() {
  return projects.map(p =>
    "[" + p.id + "] " + p.title + " | Dept: " + p.department +
    " | Budget: Php " + Number(p.budget).toLocaleString("en-PH") + "M" +
    " | Status: " + p.statusLabel +
    " | Stage: " + p.currentStatus + " (" + (p.completion || 0) + "%)" +
    " | PIC: " + p.personInCharge +
    " | Days no movement: " + daysPending(p.lastMovementDate) +
    (p.lastMovementNote ? " | Note: " + p.lastMovementNote : "")
  ).join("\n");
}

function summaryPrompt() {
  return "You are the CAPEX coordinator of Purefoods Hormel Plant 3. Write a concise portfolio status update using ONLY the facts below — never invent numbers, dates, names or approvals.\n" +
    "Use EXACTLY this structure in plain text, short lines, no markdown stars:\n" +
    "PORTFOLIO STATUS UPDATE - <today as DD MMMM YYYY>\n" +
    "HEADLINE: <one line: portfolio totals, committed CAPEX, count needing attention>\n" +
    "AACE CREATION: <one line per project>\n" +
    "PRE-BIDDING & TECHNICAL EVALUATION: <one line per project>\n" +
    "REVIEW & WAITING: <one line per project>\n" +
    "APPROVED / PROCUREMENT: <one line per project>\n" +
    "NEEDS ATTENTION: <one line per project; include every project labelled " + ATTENTION_LABELS.map(l => "\u0022" + l + "\u0022").join(" or ") + ">\n" +
    "Per-project line format: \u0022AACE-2026-016 - Racking System - Ongoing Project Review (54%) - PIC Charissa Mae J. Duncil - 0 days no movement.\u0022\n" +
    "MANAGEMENT FLAGS: <bulleted lines for any project with more than 14 days no movement or needing attention; state why and the next step>\n" +
    "Omit any group that has no projects. Keep the whole update tight and ready to paste into a report or email.\n\n" +
    "FACTS:\n" + summaryFacts();
}

function fallbackSummary() {
  const d = new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
  const lines = ["PORTFOLIO STATUS UPDATE", d, "", "HEADLINE: " + portfolioHeadline(), ""];
  SUMMARY_BUCKET_ORDER.forEach(b => {
    const list = projects.filter(p => summaryBucket(p) === b);
    if (!list.length) return;
    lines.push(b);
    list.forEach(p => lines.push(
      "  - " + p.id + " — " + p.title + " — " + p.statusLabel + " (" + p.currentStatus + ", " + (p.completion || 0) + "%) — PIC " + p.personInCharge + " — " + daysPending(p.lastMovementDate) + " days no movement"
    ));
    lines.push("");
  });
  lines.push("MANAGEMENT FLAGS");
  const flags = projects.filter(p => ATTENTION_LABELS.includes(p.statusLabel) || daysPending(p.lastMovementDate) > 14);
  if (!flags.length) {
    lines.push("  None — the portfolio is moving as expected.");
  } else {
    flags.forEach(p => lines.push(
      "  - " + p.id + " (" + p.statusLabel + ") — " + daysPending(p.lastMovementDate) + " days no movement." + (p.lastMovementNote ? " Note: " + p.lastMovementNote : "")
    ));
  }
  return lines.join("\n");
}

async function genPortfolioSummary() {
  const btn = document.getElementById("genSummaryBtn");
  const out = document.getElementById("summaryOut");
  const hint = document.getElementById("summaryHint");
  if (!btn || !out) return;
  if (!projects.length) { out.textContent = "No projects yet — add a project first."; return; }
  btn.disabled = true; btn.innerHTML = "&#8987; Writing...";
  if (hint) hint.textContent = "Reading project statuses and writing the update...";
  try {
    const r = await aiCall(summaryPrompt(), 1600);
    if (r.error) {
      out.textContent = fallbackSummary();
      if (hint) hint.textContent = r.error === "no-api-key"
        ? "Offline update shown (built from current statuses). Add a Gemini key in Settings for AI-written prose."
        : "AI unavailable (" + r.error + ") — offline update shown instead.";
    } else {
      out.textContent = r.text;
      if (hint) hint.textContent = "AI update ready — review, then Copy or paste into your report.";
    }
  } catch (err) {
    out.textContent = fallbackSummary();
    if (hint) hint.textContent = "Error: " + (err && err.message ? err.message : err) + " — offline update shown.";
  }
  btn.disabled = false; btn.innerHTML = "&#10024; Generate";
  const copyBtn = document.getElementById("copySummaryBtn");
  if (copyBtn) copyBtn.style.display = "";
  const pdfBtn = document.getElementById("pdfSummaryBtn");
  if (pdfBtn) pdfBtn.style.display = "";
}

function setupSummaryEvents() {
  const gen = document.getElementById("genSummaryBtn");
  if (gen) gen.addEventListener("click", genPortfolioSummary);
  const copy = document.getElementById("copySummaryBtn");
  if (copy) copy.addEventListener("click", () => {
    copyText(document.getElementById("summaryOut").textContent);
  });
  const pdfBtn = document.getElementById("pdfSummaryBtn");
  if (pdfBtn) pdfBtn.addEventListener("click", exportSummaryPDF);
}

function pdfRenderSummary(txt) {
  const isBucket = (t) => SUMMARY_BUCKET_ORDER.indexOf(t.toUpperCase()) >= 0;
  let html = "";
  (txt.split("\n")).forEach(raw => {
    const t = raw.trim();
    if (!t) { html += `<div class="gap"></div>`; return; }
    if (/^PORTFOLIO STATUS UPDATE/i.test(t)) html += `<div class="doctitle">${esc(t)}</div>`;
    else if (/^HEADLINE:/i.test(t)) html += `<div class="headline">${esc(t)}</div>`;
    else if (isBucket(t)) html += `<h3>${esc(t)}</h3>`;
    else if (/^MANAGEMENT FLAGS$/i.test(t)) html += `<div class="flagshead">MANAGEMENT FLAGS</div>`;
    else if (/^-\s/.test(t)) html += `<div class="li">● ${esc(t.replace(/^-\s+/, ""))}</div>`;
    else html += `<p>${esc(t)}</p>`;
  });
  return html;
}

function exportSummaryPDF() {
  const out = document.getElementById("summaryOut");
  const txt = out && out.textContent && out.textContent.trim() && !out.textContent.startsWith("No update generated") ? out.textContent : "";
  if (!txt) { alert("Generate the status update first, then Save as PDF."); return; }
  const today = new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
  const title = "AACE Portfolio Status Update - " + today;
  const body = `
<!doctype html>
<html><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>
  @page { size: A4 portrait; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Arial, sans-serif; color: #1f2937; font-size: 11.5px; line-height: 1.55; margin: 0; }
  .hdr { border-bottom: 3px solid #b7791f; padding-bottom: 10px; margin-bottom: 14px; }
  .hdr .t { font-size: 19px; font-weight: 800; color: #0a1830; letter-spacing: 0.3px; }
  .hdr .s { font-size: 10.5px; color: #4b5563; margin-top: 3px; }
  .doctitle { font-size: 15px; font-weight: 800; color: #0a1830; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
  .gap { height: 6px; }
  .headline { font-weight: 700; color: #354052; margin: 4px 0 10px; }
  h3 { font-size: 11.5px; font-weight: 800; color: #b7791f; text-transform: uppercase; letter-spacing: 0.6px; margin: 12px 0 4px; }
  p { margin: 2px 0; }
  .li { margin: 2px 0 2px 18px; }
  .flagshead { font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: #b91c1c; margin: 14px 0 4px; border-top: 1px dashed #e2e7f0; padding-top: 10px; }
  .foot { margin-top: 22px; padding-top: 8px; border-top: 1px solid #e2e7f0; font-size: 9.5px; color: #66718a; }
</style></head>
<body>
  <div class="hdr">
    <div class="t">AACE Portfolio Status Update</div>
    <div class="s">Purefoods Hormel Plant 3 &middot; Capital Expenditure Project Dashboard &middot; ${esc(today)}</div>
  </div>
  ${pdfRenderSummary(txt)}
  <div class="foot">Generated by the AACE Project Dashboard on ${today}. Approval stages, completion % and pending days reflect project records as of ${today}.</div>
</body></html>`;
  const w = window.open("", "_blank", "width=900,height=1100");
  if (!w) { alert("Your browser blocked the pop-up. Allow pop-ups for this page to use Save as PDF."); return; }
  w.document.write(body);
  w.document.close();
  w.focus();
  setTimeout(() => {
    w.print();
    setTimeout(() => w.close(), 800);
  }, 350);
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
const lastKpi = {};
function setKpi(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  const key = String(val);
  if (lastKpi[id] === key) { el.textContent = key; return; }
  lastKpi[id] = key;
  const m = key.match(/^([^\d]*)([\d][\d.,]*)(.*)$/);
  if (m) {
    const target = parseFloat(m[2].replace(/,/g, "")) || 0;
    const prefix = m[1], suffix = m[3];
    const dur = 700, t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString("en-PH") + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  } else {
    el.textContent = key;
  }
}

function renderCards() {
  const total = projects.length;
  const completed = projects.filter(p => p.completion >= 100).length;
  const delayed = projects.filter(p => ATTENTION_LABELS.includes(p.statusLabel)).length;
  const ongoing = total - completed - delayed;
  const budget = projects.reduce((s, p) => s + Number(p.budget), 0);
  const committed = projects.filter(p => ["Approved", "Procurement"].includes(p.statusLabel)).reduce((s, p) => s + Number(p.budget), 0);

  setKpi("statTotal", total);        setKpi("statTotal2", total);
  setKpi("statCompleted", completed); setKpi("statCompleted2", completed);
  setKpi("statOngoing", Math.max(ongoing, 0)); setKpi("statOngoing2", Math.max(ongoing, 0));
  setKpi("statDelayed", delayed);     setKpi("statDelayed2", delayed);
  setKpi("statBudget", fmtBudgetM(budget)); setKpi("statBudget2", fmtBudgetM(budget));
  setKpi("statCommitted", fmtBudgetM(committed)); setKpi("statCommitted2", fmtBudgetM(committed));

  const pct = (n) => total ? Math.round((n / total) * 100) : 0;
  setKpi("statCompletedPct", pct(completed) + "% of total"); setKpi("statCompletedPct2", pct(completed) + "% of total");
  setKpi("statOngoingPct", pct(Math.max(ongoing,0)) + "% of total"); setKpi("statOngoingPct2", pct(Math.max(ongoing,0)) + "% of total");
  setKpi("statDelayedPct", pct(delayed) + "% of total"); setKpi("statDelayedPct2", pct(delayed) + "% of total");

  document.getElementById("notifCount").textContent = delayed;
  const bell = document.querySelector(".bell-wrap");
  if (bell) bell.classList.toggle("alert", delayed > 0);
  renderExecutive();
}

// ---------------------------------------------------------------------
// 5.5 RENDER: EXECUTIVE CHARTS & MANAGEMENT INSIGHTS (offline, no libraries)
// ---------------------------------------------------------------------
function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function renderExecutive() {
  const td = document.getElementById("topbarDate");
  if (td) td.textContent = new Date().toLocaleDateString("en-PH", { weekday: "short", month: "short", day: "2-digit", year: "numeric" });

  // --- CAPEX by department (horizontal bars) ---
  const deptChart = document.getElementById("chartDeptBars");
  if (deptChart) {
    const byDept = new Map();
    projects.forEach(p => {
      const k = p.department || "Unassigned";
      const cur = byDept.get(k) || { budget: 0, count: 0 };
      cur.budget += Number(p.budget) || 0;
      cur.count++;
      byDept.set(k, cur);
    });
    const rows = [...byDept.entries()].sort((a, b) => b[1].budget - a[1].budget).slice(0, 6);
    if (!rows.length) {
      deptChart.innerHTML = `<div class="insight-empty">No data to chart yet — add a project to begin.</div>`;
    } else {
      const maxB = rows[0][1].budget || 1;
      deptChart.innerHTML = rows.map(([name, d]) => `
        <div class="hbar">
          <div class="lbl"><div class="name">${esc(name)}</div><div class="sub">${d.count} project${d.count !== 1 ? "s" : ""}</div></div>
          <div class="track"><div class="fill" style="width:${Math.max(3, Math.round(d.budget / maxB * 100))}%"></div></div>
          <div class="val">₱${Number(d.budget).toLocaleString("en-PH", { maximumFractionDigits: 1 })}M</div>
        </div>`).join("");
    }
  }

  // --- Portfolio status mix (SVG donut) ---
  const donut = document.getElementById("chartStatusDonut");
  if (donut) {
    const buckets = [
      { key: "Approved", label: "Approved / Procurement", color: "#16a34a", test: p => ["Approved", "Procurement"].includes(p.statusLabel) },
      { key: "onReview", label: "In Review", color: "#3b82f6", test: p => ["AACE Creation", "Pre Bidding Request", "Waiting for Technical Bid", "Ongoing Technical Evaluation", "Waiting for SPQF", "Ongoing Project Review"].includes(p.statusLabel) },
      { key: "pending", label: "Pending / Needs Action", color: "#d97706", test: p => p.statusLabel === "Pending" },
      { key: "rejected", label: "Rejected", color: "#dc2626", test: p => p.statusLabel === "Rejected" }
    ];
    const counts = buckets.map(b => projects.filter(b.test).length);
    const total = projects.length;
    const C = 2 * Math.PI * 54;
    let offset = 0;
    const segs = counts.map((c, i) => {
      const seg = { ...buckets[i], count: c, frac: total ? c / total : 0 };
      return seg;
    }).filter(s => s.count > 0);

    let inner = "";
    if (total && segs.length) {
      inner = `<svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="54" fill="none" stroke="#eef1f7" stroke-width="22"/>` +
        segs.map(s => {
          const dash = Math.max(s.frac * C - 2.5, 0.5);
          const el = `<circle cx="75" cy="75" r="54" fill="none" stroke="${s.color}" stroke-width="22"
            stroke-dasharray="${dash.toFixed(2)} ${(C - dash).toFixed(2)}"
            stroke-dashoffset="${(-offset).toFixed(2)}" transform="rotate(-90 75 75)" stroke-linecap="butt"/>`;
          offset += s.frac * C;
          return el;
        }).join("") +
        `</svg>
        <div class="center"><div class="v">${total}</div><div class="l">Projects</div></div>`;
    } else {
      inner = `<div class="insight-empty">No status data yet.</div>`;
    }

    const legend = segs.map(s => `
      <div class="li">
        <span class="sw" style="background:${s.color}"></span>
        <span class="n">${s.label}</span>
        <span class="cnt">${s.count}</span>
        <span class="pct">${total ? Math.round(s.frac * 100) : 0}%</span>
      </div>`).join("");

    donut.innerHTML = inner + (segs.length ? `<div class="legend">${legend}</div>` : "");
  }

  // --- Management attention ---
  const attn = document.getElementById("insightList");
  if (attn) {
    const list = projects
      .filter(p => ATTENTION_LABELS.includes(p.statusLabel))
      .sort((a, b) => daysPending(b.lastMovementDate) - daysPending(a.lastMovementDate))
      .slice(0, 6);
    if (!list.length) {
      attn.innerHTML = `<div class="insight-empty">&#9989; All clear — no projects currently require management action.</div>`;
    } else {
      attn.innerHTML = list.map(p => `
        <div class="insight-item" data-view="${p.id}" style="cursor:pointer">
          <div class="ih">
            <div class="t">${esc(p.title)}</div>
            <div class="d">${esc(p.department)} &middot; ${fmtDate(p.lastMovementDate)} &middot; ${esc(p.personInCharge)}</div>
          </div>
          <div class="val">
            <span class="badge ${badgeClass(p.statusLabel)}">${esc(p.statusLabel)}</span>
            <span class="s">${daysPending(p.lastMovementDate)} days pending</span>
            <div class="mini-track"><i style="width:${Math.max(4, Number(p.completion) || 0)}%;background:${p.completion >= 70 ? "var(--green-600)" : p.completion >= 35 ? "var(--amber-600)" : "var(--red-600)"}"></i></div>
          </div>
        </div>`).join("");
      attn.querySelectorAll(".insight-item").forEach(el => {
        el.addEventListener("click", () => { openDetails(el.dataset.view); });
      });
    }
  }

  // --- Largest allocations ---
  const top = document.getElementById("topList");
  if (top) {
    const list = projects.slice().sort((a, b) => Number(b.budget) - Number(a.budget)).slice(0, 5);
    if (!list.length) {
      top.innerHTML = `<div class="insight-empty">No commitments recorded yet.</div>`;
    } else {
      const maxB = Math.max(...list.map(p => Number(p.budget) || 0), 1);
      top.innerHTML = list.map(p => `
        <div class="insight-item" data-view="${p.id}" style="cursor:pointer">
          <div class="ih">
            <div class="t">${esc(p.title)}</div>
            <div class="d">${esc(p.department)} &middot; <span class="badge ${badgeClass(p.statusLabel)}">${esc(p.statusLabel)}</span></div>
          </div>
          <div class="val">
            <span class="v">₱${Number(p.budget).toLocaleString("en-PH", { maximumFractionDigits: 1 })}M</span>
            <div class="mini-track"><i style="width:${Math.max(4, Number(p.budget) / maxB * 100)}%"></i></div>
          </div>
        </div>`).join("");
      top.querySelectorAll(".insight-item").forEach(el => {
        el.addEventListener("click", () => { openDetails(el.dataset.view); });
      });
    }
  }
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

  renderAudit(id);
  renderAACEDocs(id);

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
    const changes = describeChanges(existing, shared);
    Object.assign(existing, shared);
    if (selectedId === oldId) selectedId = existing.id;
    if (existing.id !== oldId) auditLog.forEach(e => { if (e.projectId === oldId) e.projectId = existing.id; });
    addAudit(existing.id, changes.length ? "Updated: " + changes.join("; ") : "Project details updated.", "auto");
  } else {
    const newProject = Object.assign({}, shared, {
      id: "AACE-2026-" + String(projectCounter++).padStart(3, "0"),
      dateSubmitted: document.getElementById("f_lastDate").value
    });
    projects.unshift(newProject);
    addAudit(newProject.id, "Project created at stage \u0022" + (stage ? stage.status : "") + "\u0022 (" + (stage ? stage.percent : 0) + "%), budget " + fmtBudgetM(cost) + ".", "auto");
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
  const map = { dashboard: "viewDashboard", projects: "viewProjects", todo: "viewTodo", guide: "viewGuide", users: "viewUsers", settings: "viewSettings" };
  if (view === "users" && !isAdmin()) { showView("dashboard"); document.querySelector('.nav-link[data-view="dashboard"]').classList.add("active"); return; }
  ["viewDashboard", "viewProjects", "viewTodo", "viewGuide", "viewUsers", "viewSettings"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", id !== map[view]);
  });
  if (view === "projects" && selectedId) openDetails(selectedId);
  if (view === "todo") renderTodoList();
  if (view === "guide") renderGuideDraft();
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
    const isCloudProfile = !!u.id && !!(db && cloudReady);
    document.getElementById("u_username").value = u.username;
    document.getElementById("u_username").disabled = isSelf || isCloudProfile;
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
    const newName = document.getElementById("u_username").value.trim() || existing.username;
    if (newName.toLowerCase() !== existing.username.toLowerCase()) {
      const clash = users.find(x => x !== existing && x.username.toLowerCase() === newName.toLowerCase());
      if (clash) { alert("That username is already taken by another user."); return; }
      if (isCloudUser) {
        alert("Cloud accounts are tied to their sign-in email, so their username can't be renamed here. Delete the user and create a new one if you need to change it.");
        return;
      }
      existing.username = newName;
      if (editingUserId === getSessionUser()) setSessionUser(newName);
    }
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
  const aiKey = document.getElementById("aiKey");
  const aiModel = document.getElementById("aiModel");
  const aiMsg = document.getElementById("aiMsg");
  if (aiKey) aiKey.value = getAIKey();
  if (aiModel) aiModel.value = getAIModel();
  if (aiMsg) aiMsg.style.display = "none";
}
function aiSettingsMessage(txt, isError) {
  const el = document.getElementById("aiMsg");
  if (!el) return;
  el.textContent = txt;
  el.style.color = isError ? "var(--red-600)" : "var(--green-600)";
  el.style.display = "block";
}
function saveAISettings() {
  const key = document.getElementById("aiKey").value.trim();
  const model = document.getElementById("aiModel").value.trim();
  if (!key) { aiSettingsMessage("Please paste your Gemini API key.", true); return; }
  try { localStorage.setItem(AI_KEY_STORAGE, key); } catch (e) { /* ignore */ }
  try { localStorage.setItem(AI_MODEL_STORAGE, model || DEFAULT_AI_MODEL); } catch (e) { /* ignore */ }
  aiSettingsMessage("AI settings saved. Tip: your key is stored only in this browser, never uploaded to GitHub.");
}
async function testAIConnection() {
  const key = document.getElementById("aiKey").value.trim();
  if (!key) { aiSettingsMessage("Paste your API key first.", true); return; }
  aiSettingsMessage("Testing connection...");
  const r = await aiCall("Reply with exactly: OK", 5);
  if (r.error) { aiSettingsMessage("Test failed: " + r.error, true); return; }
  aiSettingsMessage("Connection works — AI is ready to generate notes and summaries. (Model: " + getAIModel() + ")");
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
  document.getElementById("saveAIBtn").addEventListener("click", saveAISettings);
  document.getElementById("testAIBtn").addEventListener("click", testAIConnection);
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
    if (viewId) openDetails(viewId);
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
  document.getElementById("dpAISummaryBtn").addEventListener("click", () => {
    if (selectedId) aiSummarizeProject(selectedId);
  });
  document.getElementById("aiGenNoteBtn").addEventListener("click", aiGenerateNote);
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
  setupTodoEvents();
  setupAuditEvents();
  setupAACEDocsEvents();
  setupGuideEvents();
  setupSummaryEvents();
  renderGuideDraft();
  renderTodoList();
  loadAudit();
  const csDot = document.getElementById("cloudStatus");
  if (csDot) csDot.addEventListener("click", async () => {
    if (!window.AACE_CLOUD || !window.AACE_CLOUD.url || !window.AACE_CLOUD.anonKey) {
      alert("Cloud connection settings are missing on this device (supabase-config.js was not loaded).");
      return;
    }
    if (!db) {
      try {
        await loadSupabaseLib();
        initCloud();
      } catch (e) {
        alert("Could not load the cloud library — check your internet connection, then tap the badge again.");
        return;
      }
    }
    if (!db) {
      alert("Cloud could not be reached — check your internet connection, then tap the badge again.");
      return;
    }
    clearSession();
    db.auth.signOut().catch(() => {});
    location.reload();
  });
  if (cloudConfigured && db) {
    if (await cloudConnect()) await pullCloudUsers();
    await pullCloudProjects();
    if (cloudReady) syncProjectsToCloud();
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

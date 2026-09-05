/* AACE Project Dashboard — production hardening layer
 *
 * This file is intentionally loaded before script.js and patches named globals
 * during DOMContentLoaded, after script.js has been parsed but before its boot
 * handler wires the UI. It is a migration bridge: the long-term target is to
 * split script.js into modules, but these fixes keep the current app stable
 * while closing security/data-integrity gaps immediately.
 */
(function () {
  "use strict";

  const projectRevisions = new Map();
  const projectSnapshots = new Map();

  function snapshotProject(project) {
    return JSON.stringify(project == null ? null : project);
  }

  function rememberProject(project, updatedAt) {
    if (!project || !project.id) return;
    projectSnapshots.set(project.id, snapshotProject(project));
    if (updatedAt) projectRevisions.set(project.id, updatedAt);
  }

  function refreshProjectUI() {
    if (typeof renderFilterOptions === "function") renderFilterOptions();
    if (typeof renderCards === "function") renderCards();
    if (typeof renderTable === "function") renderTable();
    if (typeof renderExecutive === "function") renderExecutive();
  }

  async function loadAuditFromCloud(projectId) {
    if (!db || !cloudReady) return;
    let query = db.from("activity_trail")
      .select("id, project_id, actor_username, action, note, source, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (projectId) query = query.eq("project_id", projectId);

    const { data, error } = await query;
    if (error) {
      console.error("[AACE Audit] Load failed", error);
      return;
    }

    const mapped = (data || []).map(row => ({
      id: row.id,
      projectId: row.project_id,
      ts: row.created_at,
      user: row.actor_username || "system",
      text: row.note || row.action || "Project activity",
      source: row.source === "manual" ? "manual" : "auto"
    }));

    if (projectId) {
      auditLog = auditLog.filter(entry => entry.projectId !== projectId).concat(mapped)
        .sort((a, b) => String(b.ts).localeCompare(String(a.ts)));
    } else {
      auditLog = mapped;
    }

    if (projectId && selectedId === projectId && typeof renderAudit === "function") renderAudit(projectId);
  }

  async function pullProjectsHardened() {
    if (!db || !cloudReady) return;
    try {
      const { data, error } = await db.from("projects").select("id, data, updated_at");
      if (error) throw error;

      projects = (data || [])
        .filter(row => row && row.data && row.data.tombstone !== true)
        .map(row => row.data)
        .sort((a, b) => String(a.id).localeCompare(String(b.id)));

      projectSnapshots.clear();
      projectRevisions.clear();
      (data || []).forEach(row => {
        if (row && row.data && row.data.tombstone !== true) rememberProject(row.data, row.updated_at);
      });

      projectCounter = typeof computeProjectCounter === "function" ? computeProjectCounter(projects) : projects.length + 1;
      refreshProjectUI();
      if (selectedId) await loadAuditFromCloud(selectedId);
    } catch (error) {
      console.error("[AACE Cloud] Project pull failed", error);
      if (typeof flashSaveStatus === "function") flashSaveStatus("Could not load projects from the cloud.", true);
    }
  }

  async function saveChangedProjects() {
    if (!db || !cloudReady) {
      if (typeof flashSaveStatus === "function") flashSaveStatus("Cloud is unavailable. No project changes were saved.", true);
      throw new Error("Cloud unavailable");
    }

    const currentById = new Map(projects.map(project => [project.id, project]));
    const changed = projects.filter(project => projectSnapshots.get(project.id) !== snapshotProject(project));
    const deleted = [...projectSnapshots.keys()].filter(id => !currentById.has(id));

    try {
      for (const project of changed) {
        const expectedRevision = projectRevisions.get(project.id);
        const nextRevision = new Date().toISOString();

        if (expectedRevision) {
          const { data, error } = await db.from("projects")
            .update({ data: project, updated_at: nextRevision })
            .eq("id", project.id)
            .eq("updated_at", expectedRevision)
            .select("updated_at")
            .maybeSingle();
          if (error) throw error;
          if (!data) throw new Error(`Project ${project.id} changed in another session. Refresh before saving again.`);
          rememberProject(project, data.updated_at);
        } else {
          const { data, error } = await db.from("projects")
            .insert({ id: project.id, data: project, updated_at: nextRevision })
            .select("updated_at")
            .maybeSingle();
          if (error) throw error;
          rememberProject(project, data && data.updated_at ? data.updated_at : nextRevision);
        }
      }

      if (deleted.length) {
        if (!isAdmin()) throw new Error("Only Administrators may delete projects.");
        const { error } = await db.from("projects").delete().in("id", deleted);
        if (error) throw error;
        deleted.forEach(id => {
          projectSnapshots.delete(id);
          projectRevisions.delete(id);
        });
      }

      if (typeof deletedProjectIds !== "undefined" && deletedProjectIds && typeof deletedProjectIds.clear === "function") {
        deletedProjectIds.clear();
      }
      if (typeof flashSaveStatus === "function") flashSaveStatus("Saved to shared cloud · " + timeNow());
      if (selectedId) await loadAuditFromCloud(selectedId);
      return true;
    } catch (error) {
      console.error("[AACE Cloud] Save failed", error);
      if (typeof flashSaveStatus === "function") flashSaveStatus(error.message || "Cloud save failed.", true);
      throw error;
    }
  }

  function formProjectValues() {
    const cost = parseFloat(document.getElementById("f_cost").value);
    if (!Number.isFinite(cost) || cost < 0) throw new Error("Enter a valid project cost.");

    const workflow = getWorkflow(cost, constructionChecked());
    const person = document.getElementById("f_person").value;
    const matches = workflow.stages.filter(stage => stage.responsible === person);
    let stage = matches[0];
    if (matches.length > 1) {
      const selected = document.getElementById("f_stageSub").value;
      stage = matches.find(item => item.status === selected) || matches[0];
    }

    if (!stage && modalMode !== "edit") throw new Error("Please select a valid person / stage.");

    return {
      cost,
      stage,
      shared: {
        title: document.getElementById("f_title").value.trim(),
        department: document.getElementById("f_dept").value,
        budget: cost,
        requestor: document.getElementById("f_requestor").value.trim(),
        personInCharge: stage ? stage.responsible : "",
        currentStatus: stage ? stage.status : "",
        completion: stage ? stage.percent : 0,
        statusLabel: document.getElementById("f_statusLabel").value,
        targetCompletion: document.getElementById("f_target").value,
        lastMovementDate: document.getElementById("f_lastDate").value,
        lastMovementNote: document.getElementById("f_lastNote").value.trim(),
        withConstruction: constructionChecked()
      }
    };
  }

  async function submitProjectHardened(event) {
    event.preventDefault();
    if (!db || !cloudReady) { alert("Cloud is unavailable. Nothing was saved."); return; }

    const submit = document.getElementById("projectModalSubmit");
    if (submit) submit.disabled = true;

    try {
      const { stage, shared } = formProjectValues();
      if (!shared.title) throw new Error("Project title is required.");

      if (modalMode === "edit") {
        if (!canEdit()) throw new Error("You do not have Edit permission.");
        const existing = projects.find(project => project.id === editingId);
        if (!existing) throw new Error("The project is no longer available. Refresh and try again.");

        const enteredNo = document.getElementById("f_projectNo").value.trim();
        if (enteredNo && enteredNo.toLowerCase() !== existing.id.toLowerCase()) {
          throw new Error("Project numbers are immutable. This prevents broken audit references and concurrent ID collisions.");
        }

        const updated = { ...existing, ...shared };
        if (!stage) {
          updated.personInCharge = existing.personInCharge;
          updated.currentStatus = existing.currentStatus;
          updated.completion = existing.completion;
        }

        const expectedRevision = projectRevisions.get(existing.id);
        if (!expectedRevision) throw new Error("This project has no cloud revision. Refresh before editing.");
        const nextRevision = new Date().toISOString();

        const { data, error } = await db.from("projects")
          .update({ data: updated, updated_at: nextRevision })
          .eq("id", existing.id)
          .eq("updated_at", expectedRevision)
          .select("updated_at")
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Someone else updated this project. Refresh to load the latest version before saving.");

        const index = projects.findIndex(project => project.id === existing.id);
        if (index >= 0) projects[index] = updated;
        rememberProject(updated, data.updated_at);
        if (selectedId === existing.id) selectedId = updated.id;

        closeModal();
        refreshProjectUI();
        if (selectedId && typeof openDetails === "function") openDetails(selectedId);
        await loadAuditFromCloud(updated.id);
        if (typeof flashSaveStatus === "function") flashSaveStatus("Project changes saved to cloud.");
      } else {
        if (!canAdd()) throw new Error("You do not have Add Project permission.");
        const payload = {
          ...shared,
          dateSubmitted: document.getElementById("f_lastDate").value
        };

        const { data: newId, error } = await db.rpc("create_aace_project", { p_data: payload });
        if (error) throw error;
        if (!newId) throw new Error("The server did not allocate a project number.");

        const created = { ...payload, id: newId };
        projects.unshift(created);
        const { data: row } = await db.from("projects").select("updated_at").eq("id", newId).maybeSingle();
        rememberProject(created, row && row.updated_at ? row.updated_at : new Date().toISOString());
        projectCounter = typeof computeProjectCounter === "function" ? computeProjectCounter(projects) : projectCounter;

        closeModal();
        refreshProjectUI();
        await loadAuditFromCloud(newId);
        if (typeof flashSaveStatus === "function") flashSaveStatus(`Project ${newId} created securely in cloud.`);
      }
    } catch (error) {
      console.error("[AACE Projects] Save failed", error);
      alert("Could not save the project: " + (error && error.message ? error.message : String(error)));
    } finally {
      if (submit) submit.disabled = false;
    }
  }

  function hardenNavigation() {
    document.querySelectorAll(".nav-link[data-view]").forEach(link => {
      link.setAttribute("role", "button");
      link.setAttribute("tabindex", "0");
      link.setAttribute("aria-label", `Open ${link.textContent.trim()}`);
      if (link.classList.contains("active")) link.setAttribute("aria-current", "page");
      link.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          link.click();
        }
      });
    });
  }

  function simplifyTopbar() {
    const right = document.querySelector(".topbar-right");
    const exportBtn = document.getElementById("downloadBtn");
    const importBtn = document.getElementById("importBtn");
    if (!right || !exportBtn || !importBtn || document.getElementById("topbarMore")) return;

    const wrap = document.createElement("div");
    wrap.className = "topbar-more-wrap";
    wrap.innerHTML = '<button type="button" class="btn btn-ghost" id="topbarMore" aria-haspopup="true" aria-expanded="false">More ▾</button><div class="topbar-more-menu" id="topbarMoreMenu" hidden></div>';
    right.insertBefore(wrap, exportBtn);
    const menu = wrap.querySelector("#topbarMoreMenu");
    menu.appendChild(exportBtn);
    menu.appendChild(importBtn);

    const toggle = wrap.querySelector("#topbarMore");
    toggle.addEventListener("click", () => {
      const opening = menu.hidden;
      menu.hidden = !opening;
      toggle.setAttribute("aria-expanded", opening ? "true" : "false");
    });
    document.addEventListener("click", event => {
      if (!wrap.contains(event.target)) {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function configureBrandingAndStyles() {
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "aace_logo.png?v=40";
    if (!favicon.parentNode) document.head.appendChild(favicon);

    const style = document.createElement("style");
    style.textContent = `
      .ae-del { display:none !important; }
      #syncNowBtn { display:none !important; }
      .topbar-more-wrap { position:relative; }
      .topbar-more-menu { position:absolute; right:0; top:calc(100% + 8px); min-width:180px; padding:8px; background:#fff; border:1px solid var(--gray-200); border-radius:10px; box-shadow:var(--shadow-lg); z-index:100; }
      .topbar-more-menu .btn { width:100%; justify-content:flex-start; margin:2px 0; }
      .nav-link[role="button"]:focus-visible { outline:3px solid rgba(59,130,246,.45); outline-offset:2px; }
      .cloud-required-note { font-size:11px; color:var(--gray-500); margin-top:6px; }
    `;
    document.head.appendChild(style);
  }

  function hardenAISettings() {
    if (typeof aiCall === "function") {
      aiCall = async function (prompt, maxTokens) {
        if (!db || !cloudReady) return { error: "cloud-unavailable" };
        try {
          const { data, error } = await db.functions.invoke("gemini", {
            body: { prompt, maxTokens: Math.max(Number(maxTokens) || 180, 60) }
          });
          if (error) return { error: error.message || "AI service unavailable" };
          if (data && data.error) return { error: data.error };
          if (!data || !data.text) return { error: "AI service returned no text" };
          return { text: data.text };
        } catch (error) {
          return { error: error && error.message ? error.message : "AI service unavailable" };
        }
      };
    }

    if (typeof getAIKey === "function") getAIKey = function () { return "server-managed"; };
    if (typeof saveAISettings === "function") {
      saveAISettings = function () {
        if (typeof aiSettingsMessage === "function") {
          aiSettingsMessage("AI credentials are managed server-side in Supabase. No API key is stored in this browser.");
        }
      };
    }
    if (typeof testAIConnection === "function") {
      testAIConnection = async function () {
        const result = await aiCall("Reply with: connection ok", 60);
        if (typeof aiSettingsMessage === "function") {
          aiSettingsMessage(result.error ? "AI service unavailable: " + result.error : "Server-side AI connection is working.", !!result.error);
        }
      };
    }

    const key = document.getElementById("aiKey");
    if (key) {
      key.value = "";
      key.disabled = true;
      key.placeholder = "Managed securely by Supabase Edge Function";
      const row = key.closest(".form-row") || key.parentElement;
      if (row && !row.querySelector(".cloud-required-note")) {
        const note = document.createElement("div");
        note.className = "cloud-required-note";
        note.textContent = "The Gemini key is no longer stored in localStorage. Configure GEMINI_API_KEY in Supabase Edge Function secrets.";
        row.appendChild(note);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    configureBrandingAndStyles();

    // Replace portfolio synchronization with per-record writes and optimistic
    // concurrency checks. Existing callers may still call saveProjects(); it now
    // returns a real Promise rather than launching an untracked async IIFE.
    if (typeof pullCloudProjects === "function") pullCloudProjects = pullProjectsHardened;
    if (typeof saveProjects === "function") saveProjects = saveChangedProjects;
    if (typeof syncProjectsToCloud === "function") syncProjectsToCloud = saveChangedProjects;
    if (typeof handleFormSubmit === "function") handleFormSubmit = submitProjectHardened;

    // System project audit entries are created by the PostgreSQL trigger. Manual
    // notes are inserted through RLS and then refreshed from the immutable table.
    if (typeof loadAudit === "function") loadAudit = function () { return loadAuditFromCloud(); };
    if (typeof saveAudit === "function") saveAudit = function () { return Promise.resolve(); };
    if (typeof addAudit === "function") {
      addAudit = function (projectId, text, source) {
        if (source !== "manual") return;
        const temp = {
          id: "pending-" + Date.now(), projectId, ts: new Date().toISOString(),
          user: getSessionUser() || "unknown", text, source: "manual"
        };
        auditLog.unshift(temp);
        if (selectedId === projectId && typeof renderAudit === "function") renderAudit(projectId);
        (async () => {
          try {
            const { error } = await db.from("activity_trail").insert({
              project_id: projectId,
              action: "manual_note",
              note: text,
              source: "manual"
            });
            if (error) throw error;
            await loadAuditFromCloud(projectId);
          } catch (error) {
            auditLog = auditLog.filter(entry => entry.id !== temp.id);
            if (selectedId === projectId && typeof renderAudit === "function") renderAudit(projectId);
            alert("Could not save the audit note: " + (error && error.message ? error.message : String(error)));
          }
        })();
      };
    }

    if (typeof openDetails === "function") {
      const baseOpenDetails = openDetails;
      openDetails = function (id) {
        baseOpenDetails(id);
        void loadAuditFromCloud(id);
      };
    }

    hardenAISettings();
    hardenNavigation();
    simplifyTopbar();

    const projectNo = document.getElementById("f_projectNo");
    if (projectNo) {
      projectNo.readOnly = true;
      projectNo.title = "Project numbers are immutable and allocated by the server.";
    }

    document.addEventListener("click", event => {
      const auditDelete = event.target.closest("[data-auditdel]");
      if (auditDelete) {
        event.preventDefault();
        event.stopImmediatePropagation();
        alert("Audit history is append-only and cannot be deleted.");
        return;
      }
      const projectDelete = event.target.closest("[data-del]");
      if (projectDelete && !isAdmin()) {
        event.preventDefault();
        event.stopImmediatePropagation();
        alert("Only Administrators may delete projects.");
      }
    }, true);

    const sync = document.getElementById("syncNowBtn");
    if (sync) sync.setAttribute("aria-hidden", "true");
    const status = document.getElementById("saveStatus");
    if (status) status.textContent = "Cloud-only · writes are confirmed by Supabase";

    // Prime revision snapshots immediately after the authenticated application
    // finishes initializing. A short microtask lets script.js complete boot.
    queueMicrotask(() => {
      if (db && cloudReady) void pullProjectsHardened();
    });
  }, { once: true });
})();

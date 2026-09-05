/* AACE user-management hardening.
 * Loaded by supabase-config.js before script.js. The DOMContentLoaded hook runs
 * after script.js has declared the app globals but before script.js boot logic
 * wires its own user handlers.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof handleUserFormSubmit !== "function") return;
    const originalHandleUserFormSubmit = handleUserFormSubmit;

    handleUserFormSubmit = async function (e) {
      e.preventDefault();
      if (!isAdmin()) return;

      const usernameEl = document.getElementById("u_username");
      const username = usernameEl.value.trim();
      if (!username) { alert("Username is required."); return; }

      const pwd = document.getElementById("u_password").value;
      const rec = {
        displayName: document.getElementById("u_displayName").value.trim() || username,
        role: document.getElementById("u_role").value.trim() || "User",
        department: document.getElementById("u_dept").value.trim(),
        status: document.getElementById("u_status").value || "Active",
        perms: {
          view: document.getElementById("u_perm_view").checked,
          add: document.getElementById("u_perm_add").checked,
          edit: document.getElementById("u_perm_edit").checked
        }
      };

      if (!editingUserId) {
        return originalHandleUserFormSubmit(e);
      }

      const existing = users.find(x => x.username.toLowerCase() === editingUserId.toLowerCase());
      if (!existing) { alert("The user being edited is no longer in the current user list. Refresh and try again."); return; }
      if (!db || !cloudReady || !existing.id) { alert("Cloud user data is unavailable. Refresh the page and try again."); return; }

      // A browser client must not attempt privileged password changes for other
      // Supabase Auth users. Their profile fields can still be safely edited.
      if (pwd) {
        alert("Password changes for another cloud user require a privileged server-side Admin API. No password change was applied; the profile changes will still be saved.");
      }

      const { data, error } = await db.from("user_profiles").update({
        display_name: rec.displayName,
        role: rec.role,
        department: rec.department,
        status: rec.status,
        perms: rec.perms
      }).eq("id", existing.id).select("id").maybeSingle();

      if (error) {
        console.error("[AACE Users] Profile update failed", error);
        alert("Could not save this user: " + error.message);
        return;
      }
      if (!data) {
        alert("The cloud did not update this user. Your session may have expired or the account may have been removed. Refresh and try again.");
        return;
      }

      Object.assign(existing, rec);
      await pullCloudUsers();
      renderUsers();
      refreshProfile();
      applyPermissions();
      closeUserModal();
      if (typeof flashSaveStatus === "function") flashSaveStatus("User account updated in cloud.");
    };
  }, { once: true });

  document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("usersTableBody");
    if (!table) return;

    table.addEventListener("click", async function (e) {
      const button = e.target.closest("[data-udel]");
      if (!button) return;

      // Intercept the legacy fire-and-forget delete handler.
      e.preventDefault();
      e.stopImmediatePropagation();

      if (!isAdmin()) return;
      const username = button.dataset.udel;
      if (!username) return;
      if (username === getSessionUser()) { alert("You cannot delete your own account while signed in."); return; }

      const target = findUserByUsername(username);
      if (!target || !target.id) { alert("This cloud user could not be resolved. Refresh the page and try again."); return; }
      if (!db || !cloudReady) { alert("Cloud user data is unavailable. Refresh the page and try again."); return; }
      if (!confirm(`Permanently delete user \"${username}\"? This removes both the dashboard profile and Supabase Auth account.`)) return;

      button.disabled = true;
      try {
        const { error } = await db.rpc("admin_delete_dashboard_user", { p_user_id: target.id });
        if (error) throw error;
        await pullCloudUsers();
        renderUsers();
        if (typeof flashSaveStatus === "function") flashSaveStatus("User account deleted from cloud.");
      } catch (err) {
        console.error("[AACE Users] Delete failed", err);
        alert("Could not delete this user: " + (err && err.message ? err.message : String(err)) + "\n\nIf this is the first deployment of the fix, run supabase-user-management.sql in the Supabase SQL Editor once.");
      } finally {
        button.disabled = false;
      }
    }, true);
  }, { once: true });
})();

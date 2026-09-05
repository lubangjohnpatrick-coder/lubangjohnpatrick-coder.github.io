/* AACE user-management hardening.
 * Loaded before script.js; hooks run after script.js declares its globals and
 * before the app boot handler wires the Users UI.
 *
 * Auth create/password/delete operations are intentionally delegated to the
 * admin-users Supabase Edge Function. The browser never receives service-role
 * credentials and never tries to impersonate another Auth user.
 */
(function () {
  "use strict";

  async function invokeAdminUsers(body) {
    if (!db || !cloudReady) throw new Error("Cloud user service is unavailable.");
    const { data, error } = await db.functions.invoke("admin-users", { body });
    if (error) throw new Error(error.message || "User administration request failed.");
    if (data && data.error) throw new Error(data.error);
    return data || {};
  }

  function readUserForm() {
    const username = document.getElementById("u_username").value.trim();
    return {
      username,
      password: document.getElementById("u_password").value,
      rec: {
        displayName: document.getElementById("u_displayName").value.trim() || username,
        role: document.getElementById("u_role").value.trim() || "User",
        department: document.getElementById("u_dept").value.trim(),
        status: document.getElementById("u_status").value || "Active",
        perms: {
          view: document.getElementById("u_perm_view").checked,
          add: document.getElementById("u_perm_add").checked,
          edit: document.getElementById("u_perm_edit").checked
        }
      }
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typeof handleUserFormSubmit !== "function") return;

    handleUserFormSubmit = async function (e) {
      e.preventDefault();
      if (!isAdmin()) return;

      const { username, password, rec } = readUserForm();
      if (!username) { alert("Username is required."); return; }
      if (!db || !cloudReady) { alert("Cloud user data is unavailable. Refresh the page and try again."); return; }

      const submit = document.querySelector("#userForm button[type='submit']");
      if (submit) submit.disabled = true;

      try {
        if (!editingUserId) {
          if (password.length < 8) {
            alert("New cloud accounts require a password of at least 8 characters.");
            return;
          }

          await invokeAdminUsers({
            action: "create",
            username,
            password,
            profile: {
              display_name: rec.displayName,
              role: rec.role,
              department: rec.department,
              status: rec.status,
              perms: rec.perms
            }
          });

          await pullCloudUsers();
          renderUsers();
          closeUserModal();
          if (typeof flashSaveStatus === "function") flashSaveStatus("User account created securely in Supabase.");
          return;
        }

        const existing = users.find(x => x.username.toLowerCase() === editingUserId.toLowerCase());
        if (!existing || !existing.id) throw new Error("The cloud user could not be resolved. Refresh and try again.");
        if (username.toLowerCase() !== existing.username.toLowerCase()) {
          throw new Error("Username changes are disabled because the username is tied to the Auth login. Create a replacement account instead.");
        }

        const { data, error } = await db.from("user_profiles").update({
          display_name: rec.displayName,
          role: rec.role,
          department: rec.department,
          status: rec.status,
          perms: rec.perms
        }).eq("id", existing.id).select("id").maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("The profile was not updated. Your session may have expired.");

        if (password) {
          if (password.length < 8) throw new Error("Passwords must contain at least 8 characters.");
          await invokeAdminUsers({ action: "set_password", user_id: existing.id, password });
        }

        await pullCloudUsers();
        renderUsers();
        refreshProfile();
        applyPermissions();
        closeUserModal();
        if (typeof flashSaveStatus === "function") flashSaveStatus("User account updated in cloud.");
      } catch (err) {
        console.error("[AACE Users] Save failed", err);
        alert("Could not save this user: " + (err && err.message ? err.message : String(err)) +
          "\n\nEnsure the admin-users Edge Function is deployed before using Auth administration.");
      } finally {
        if (submit) submit.disabled = false;
      }
    };
  }, { once: true });

  document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("usersTableBody");
    if (!table) return;

    table.addEventListener("click", async function (e) {
      const button = e.target.closest("[data-udel]");
      if (!button) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      if (!isAdmin()) return;
      const username = button.dataset.udel;
      if (!username) return;
      if (username === getSessionUser()) { alert("You cannot delete your own account while signed in."); return; }

      const target = findUserByUsername(username);
      if (!target || !target.id) { alert("This cloud user could not be resolved. Refresh the page and try again."); return; }
      if (!confirm(`Permanently delete user \"${username}\"? This removes both the dashboard profile and Supabase Auth account.`)) return;

      button.disabled = true;
      try {
        await invokeAdminUsers({ action: "delete", user_id: target.id });
        await pullCloudUsers();
        renderUsers();
        if (typeof flashSaveStatus === "function") flashSaveStatus("User account deleted from Supabase.");
      } catch (err) {
        console.error("[AACE Users] Delete failed", err);
        alert("Could not delete this user: " + (err && err.message ? err.message : String(err)) +
          "\n\nEnsure the admin-users Edge Function is deployed.");
      } finally {
        button.disabled = false;
      }
    }, true);
  }, { once: true });
})();

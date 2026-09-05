/* AACE dashboard UX enhancements
 * - Browser/tab branding using the existing AACE logo
 * - Clickable KPI cards that drill into the Projects table
 * - Group filters use the exact same logic as the dashboard KPI counts
 */
(function () {
  "use strict";

  // Add the existing project logo as the browser-tab icon immediately.
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = "aace_logo.png?v=34";
  document.head.appendChild(favicon);

  const appleIcon = document.createElement("link");
  appleIcon.rel = "apple-touch-icon";
  appleIcon.href = "aace_logo.png?v=34";
  document.head.appendChild(appleIcon);

  document.addEventListener("DOMContentLoaded", function () {
    let dashboardProjectFilter = "";

    // Keep the Projects table's existing search/filter/sort behavior, then
    // apply a dashboard group filter when a KPI card was used for navigation.
    if (typeof getFilteredSorted === "function") {
      const baseGetFilteredSorted = getFilteredSorted;
      getFilteredSorted = function () {
        let list = baseGetFilteredSorted();
        if (!dashboardProjectFilter) return list;

        if (dashboardProjectFilter === "completed") {
          return list.filter(p => (Number(p.completion) || 0) >= 100);
        }
        if (dashboardProjectFilter === "delayed") {
          return list.filter(p => Array.isArray(ATTENTION_LABELS) && ATTENTION_LABELS.includes(p.statusLabel));
        }
        if (dashboardProjectFilter === "ongoing") {
          return list.filter(p => {
            const completed = (Number(p.completion) || 0) >= 100;
            const delayed = Array.isArray(ATTENTION_LABELS) && ATTENTION_LABELS.includes(p.statusLabel);
            return !completed && !delayed;
          });
        }
        return list;
      };
    }

    const style = document.createElement("style");
    style.textContent = `
      #viewDashboard .card[data-project-drilldown] {
        cursor: pointer;
        transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;
      }
      #viewDashboard .card[data-project-drilldown]:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 22px rgba(15, 23, 42, .10);
      }
      #viewDashboard .card[data-project-drilldown]:focus-visible {
        outline: 3px solid rgba(37, 99, 235, .30);
        outline-offset: 2px;
      }
      .dashboard-filter-notice {
        display: none;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 0 0 12px;
        padding: 9px 12px;
        border: 1px solid rgba(37, 99, 235, .20);
        border-radius: 8px;
        background: rgba(37, 99, 235, .06);
        font-size: 13px;
      }
      .dashboard-filter-notice.active { display: flex; }
      .dashboard-filter-notice button {
        border: 0;
        background: transparent;
        cursor: pointer;
        font-weight: 700;
        font-size: 13px;
      }
      .topbar-aace-logo {
        width: 34px;
        height: 34px;
        object-fit: contain;
        flex: 0 0 auto;
        margin-left: 2px;
      }
    `;
    document.head.appendChild(style);

    // Also show the brand mark beside the page title in the top bar.
    const topbarLeft = document.querySelector(".topbar-left");
    if (topbarLeft && !topbarLeft.querySelector(".topbar-aace-logo")) {
      const logo = document.createElement("img");
      logo.src = "aace_logo.png?v=34";
      logo.alt = "AACE logo";
      logo.className = "topbar-aace-logo";
      const toggle = document.getElementById("sidebarToggle");
      if (toggle && toggle.nextSibling) topbarLeft.insertBefore(logo, toggle.nextSibling);
      else topbarLeft.prepend(logo);
    }

    const filters = document.querySelector("#viewProjects .filters");
    let notice = null;
    if (filters && !document.getElementById("dashboardProjectFilterNotice")) {
      notice = document.createElement("div");
      notice.id = "dashboardProjectFilterNotice";
      notice.className = "dashboard-filter-notice";
      notice.innerHTML = '<span id="dashboardProjectFilterText"></span><button type="button" id="clearDashboardProjectFilter">Clear filter</button>';
      filters.parentNode.insertBefore(notice, filters);
      document.getElementById("clearDashboardProjectFilter").addEventListener("click", function () {
        dashboardProjectFilter = "";
        notice.classList.remove("active");
        if (typeof renderTable === "function") renderTable();
      });
    } else {
      notice = document.getElementById("dashboardProjectFilterNotice");
    }

    function clearNormalProjectFilters() {
      const ids = ["searchInput", "filterStatus", "filterDept", "filterPIC"];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
    }

    function openProjects(filterKey, label) {
      dashboardProjectFilter = filterKey || "";
      clearNormalProjectFilters();
      if (notice) {
        const text = document.getElementById("dashboardProjectFilterText");
        if (dashboardProjectFilter) {
          if (text) text.textContent = "Showing dashboard group: " + label;
          notice.classList.add("active");
        } else {
          notice.classList.remove("active");
        }
      }
      if (typeof showView === "function") showView("projects");
      if (typeof renderTable === "function") renderTable();
      const projectsView = document.getElementById("viewProjects");
      if (projectsView) projectsView.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function makeCardInteractive(statId, filterKey, label) {
      const stat = document.getElementById(statId);
      const card = stat && stat.closest(".card");
      if (!card) return;
      card.dataset.projectDrilldown = filterKey || "all";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Open " + label + " projects");
      card.title = "View " + label + " projects";
      const activate = function () { openProjects(filterKey, label); };
      card.addEventListener("click", activate);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      });
    }

    makeCardInteractive("statTotal", "", "all");
    makeCardInteractive("statCompleted", "completed", "Completed");
    makeCardInteractive("statOngoing", "ongoing", "Ongoing");
    makeCardInteractive("statDelayed", "delayed", "Delayed / Pending");

    // If the user manually changes any regular Projects filter, stop applying
    // the dashboard group filter so the controls always reflect the list shown.
    ["searchInput", "filterStatus", "filterDept", "filterPIC"].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const eventName = id === "searchInput" ? "input" : "change";
      el.addEventListener(eventName, function () {
        if (!dashboardProjectFilter) return;
        dashboardProjectFilter = "";
        if (notice) notice.classList.remove("active");
      });
    });

    const clearFilters = document.getElementById("clearFiltersBtn");
    if (clearFilters) {
      clearFilters.addEventListener("click", function () {
        dashboardProjectFilter = "";
        if (notice) notice.classList.remove("active");
      });
    }
  }, { once: true });
})();

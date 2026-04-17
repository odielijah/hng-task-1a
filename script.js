document.addEventListener("DOMContentLoaded", () => { // clears interval after every refresh
  let state = {
    title: "Finish HNG Task 1A",
    description:
      "Complete the frontend task for stage 1A of the HNG internship. This description needs to be long enough to test the expand functionality.",
    status: "Pending",
    priority: "High",
    dueDate: "2026-04-17T23:59",
  };

  const card = document.getElementById("todo-card");
  const editBtn = document.getElementById("edit-button");
  const displayMode = document.getElementById("display-mode");
  const editModeForm = document.getElementById("edit-mode");
  const checkbox = document.getElementById("complete-toggle");
  const statusControl = document.getElementById("status-control");
  const expandBtn = document.getElementById("expand-toggle");
  const descText = document.getElementById("todo-description");

  function render() {
    // Sync Text
    document.getElementById("todo-title").textContent = state.title;
    descText.textContent = state.description;
    document.getElementById("status-badge").textContent = state.status;
    document.querySelector('[data-testid="test-todo-priority"]').textContent =
      state.priority;
    document.getElementById("display-due-date").textContent = new Date(
      state.dueDate,
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Sync Controls
    checkbox.checked = state.status === "Done";
    statusControl.value = state.status;

    // Visual States
    card.setAttribute("data-priority", state.priority.toLowerCase());
    card.setAttribute(
      "data-status",
      state.status.replace(/\s+/g, "-").toLowerCase(),
    );

    const badge = document.getElementById("status-badge");
    badge.className = `badge-${state.status.replace(/\s+/g, "-").toLowerCase()}`;

    if (state.status === "Done") {
      document.getElementById("todo-title").classList.add("completed-state");
    } else {
      document.getElementById("todo-title").classList.remove("completed-state");
    }
    updateTimeRemaining();
  }

  expandBtn.addEventListener("click", () => {
    const isExpanded = descText.classList.toggle("collapsed");
    expandBtn.setAttribute("aria-expanded", String(!isExpanded));
    expandBtn.textContent = isExpanded ? "Show More" : "Show Less";
  });

  function updateTimeRemaining() {
    const timeDisplay = document.getElementById("time-remaining");
    const overdueIndicator = document.getElementById("overdue-label");

    if (state.status === "Done") {
      timeDisplay.textContent = "Completed";
      overdueIndicator.classList.add("hidden");
      return;
    }

    const now = new Date();
    const due = new Date(state.dueDate);
    const diff = due - now;

    if (diff <= 0) {
      overdueIndicator.classList.remove("hidden");
      const totalHours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
      timeDisplay.textContent =
        totalHours === 0
          ? "Due now!"
          : `Overdue by ${totalHours} hour${totalHours > 1 ? "s" : ""}`;
    } else {
      overdueIndicator.classList.add("hidden");
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 1) timeDisplay.textContent = `Due in ${days} days`;
      else if (days === 1) timeDisplay.textContent = `Due tomorrow`;
      else if (hours > 0)
        timeDisplay.textContent = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
      else
        timeDisplay.textContent = `Due in ${mins} minute${mins > 1 ? "s" : ""}`;
    }
  }

  // --- Interaction Logic ---
  // --- Interaction Logic ---

  // 1. Delete Functionality
  document
    .querySelector('[data-testid="test-todo-delete-button"]')
    .addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this task?")) {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        setTimeout(() => card.remove(), 300);
      }
    });

  // 2. Focus Trapping for Edit Mode
  const firstInput = document.getElementById("edit-title");
  const lastBtn = document.querySelector(
    '[data-testid="test-todo-cancel-button"]',
  );

  editModeForm.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstInput) {
          lastBtn.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastBtn) {
          firstInput.focus();
          e.preventDefault();
        }
      }
    }
  });

  // 3. Status Logic Syncing
  checkbox.addEventListener("change", (e) => {
    state.status = e.target.checked ? "Done" : "Pending";
    render();
  });

  statusControl.addEventListener("change", (e) => {
    state.status = e.target.value;
    render();
  });

  // Accessibility: Return focus to edit button after closing form
  const toggleEdit = (show) => {
    if (show) {
      displayMode.classList.add("hidden");
      editModeForm.classList.remove("hidden");
      document.getElementById("edit-title").focus();
    } else {
      displayMode.classList.remove("hidden");
      editModeForm.classList.add("hidden");
      editBtn.focus();
    }
  };

  editBtn.addEventListener("click", () => {
    document.getElementById("edit-title").value = state.title;
    document.getElementById("edit-description").value = state.description;
    document.getElementById("edit-priority").value = state.priority;
    document.getElementById("edit-due-date").value = state.dueDate;
    toggleEdit(true);
  });

  editModeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    state.title = document.getElementById("edit-title").value;
    state.description = document.getElementById("edit-description").value;
    state.priority = document.getElementById("edit-priority").value;
    state.dueDate = document.getElementById("edit-due-date").value;
    toggleEdit(false);
    render();
  });

  document
    .querySelector(".btn-cancel")
    .addEventListener("click", () => toggleEdit(false));

  render();
  setInterval(updateTimeRemaining, 30000);
});

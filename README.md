# HNG Stage 1A — Advanced Todo Card

This is a single Todo Card component — not a full app. It extends the Stage 1B Profile Card into a more interactive, app-like experience with editable content, status transitions, priority indicators, expand/collapse behaviour, and live time tracking.

[View Live Demo](https://hng-task-1a-odielijah.netlify.app/)

## 📸 Project Preview
<img width="1680" height="1050" alt="Screenshot 2026-04-17 at 5 30 49 pm" src="https://github.com/user-attachments/assets/499369da-2085-40f9-8412-963782c4745f" />

## ✨ Key Features

- **Edit mode** — click Edit to update the title, description, priority, and due date inline. Save commits changes; Cancel discards them and returns focus to the Edit button.
- **Status transitions** — change status via dropdown (Pending, In Progress, Done) or the checkbox. Both controls stay visually in sync at all times.
- **Priority indicator** — a coloured left-border strip updates dynamically: red for High, blue for Medium, green for Low.
- **Expand / collapse** — long descriptions are clamped to 2 lines by default. The toggle button reveals the full text and updates `aria-expanded` accordingly.
- **Live time display** — shows granular countdowns ("Due in 2 hours", "Due in 45 minutes", "Overdue by 3 hours"). Updates every 30 seconds. Replaced with "Completed" when status is Done.
- **Overdue detection** — when the due date has passed, a visible OVERDUE badge appears and the card border turns red.
- **Visual state changes** — Done applies strikethrough to the title; In Progress applies a blue card border; High priority triggers a red accent strip.

## Running Locally

No build tools or dependencies required.

```bash
git clone <your-repo-url>
cd <repo-folder>
```

Then open `index.html` directly in your browser, or use a local dev server:

```bash
# with VS Code Live Server — right-click index.html → Open with Live Server

# or with npx
npx serve .
```


## 📂 File Structure

```
├── index.html      # Markup and component structure
├── style.css       # All styles including state variants and responsive rules
├── script.js       # State management, event listeners, time logic
└── README.md
```


## What Changed from Stage 0

| Feature | Stage 0 | Stage 1A |
|---|---|---|
| Title / description | Static display | Editable via form |
| Status | Display only | Dropdown control + checkbox sync |
| Priority | Text badge | Coloured indicator strip |
| Description | Always fully visible | Collapsible with toggle |
| Time display | Static | Live countdown, updates every 30s |
| Overdue | Not handled | Badge + red card border |
| Edit form | None | Full form with focus trap |


## Design Decisions

- **State object pattern** — all card data lives in a single `state` object. Every interaction mutates state and calls `render()`, keeping the UI predictable and easy to reason about.
- **Attribute-driven CSS** — `data-priority` and `data-status` attributes are set on the card element, and CSS selectors target them directly. This keeps visual logic in the stylesheet rather than scattered across JS class toggles.
- **Focus management** — the edit form traps focus within itself using a `keydown` Tab listener. When the form closes (Save or Cancel), focus is explicitly returned to the Edit button, preserving keyboard flow.
- **`aria-live="polite"`** on the time display — allows screen readers to announce time updates without interrupting the user.


## Accessibility Notes

- All edit form fields have associated `<label for="">` elements.
- The status dropdown has `aria-label="Change Status"`.
- The expand toggle uses `aria-expanded` and `aria-controls` pointing to the collapsible section's `id`.
- All interactive elements have visible `:focus-visible` styles.
- Keyboard tab order follows the spec: checkbox → status control → expand toggle → Edit → Delete → (Save / Cancel in edit mode).


## Known Limitations

- Only one explicit responsive breakpoint at `400px`. The card adapts naturally via `width: 90%; max-width: 480px` at tablet and desktop sizes, but no distinct tablet or desktop layout is defined.
- The `:has()` CSS selector used for the overdue card border is not supported in Firefox versions below 121.


## data-testid Reference

| Attribute | Element |
|---|---|
| `test-todo-card` | `<article>` root |
| `test-todo-title` | `<h2>` title |
| `test-todo-status` | Status badge `<span>` |
| `test-todo-priority` | Priority text badge |
| `test-todo-priority-indicator` | Coloured strip `<div>` |
| `test-todo-description` | Description `<p>` |
| `test-todo-due-date` | Due date `<time>` |
| `test-todo-time-remaining` | Countdown `<time>` |
| `test-todo-overdue-indicator` | Overdue `<span>` |
| `test-todo-collapsible-section` | Collapsible wrapper `<div>` |
| `test-todo-expand-toggle` | Expand/collapse `<button>` |
| `test-todo-status-control` | Status `<select>` |
| `test-todo-complete-toggle` | Done `<input type="checkbox">` |
| `test-todo-edit-button` | Edit `<button>` |
| `test-todo-delete-button` | Delete `<button>` |
| `test-todo-edit-form` | Edit mode `<form>` |
| `test-todo-edit-title-input` | Title `<input>` |
| `test-todo-edit-description-input` | Description `<textarea>` |
| `test-todo-edit-priority-select` | Priority `<select>` |
| `test-todo-edit-due-date-input` | Due date `<input>` |
| `test-todo-save-button` | Save `<button>` |
| `test-todo-cancel-button` | Cancel `<button>` |

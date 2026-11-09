---
sidebar_position: 3
title: Todo System
description: AI-driven todo management with real-time inline widget in Agent chat
---

# Todo System

## Overview

Two complementary todo capabilities:

| System | Location | Trigger |
|--------|----------|---------|
| **AI Agent Todos** | Chat panel widget | AI calls `manage_todo_list` tool during conversation |
| **Standalone Todos** | Bug/TODO modal | Manual add from Stats bar |

## AI Agent Todo Widget

When an AI Agent calls the `manage_todo_list` tool, the todo list appears as an inline widget **between the chat messages and input area**:

```
┌─ 📋 Todo List  1/3  [Clear] ────────┐
│ 🔄 Analyze issue (in-progress)      │
│ ✅ Edit config file (completed)     │
│ ⬜ Write unit tests (not-started)   │
└────────────────────────────────────┘
```

### How It Works

1. AI decides to track tasks → calls `manage_todo_list` Tool Call
2. Backend `executeManageTodoList()` updates session `todos[]` and emits `__TODO_UPDATE__` prefix
3. Handler converts to `todos` SSE event → frontend renders widget
4. Todo list is persisted to session JSON (`todos` field)
5. AI can add, update status, and remove items by sending the complete list each time

### Todo States

| State | Icon | Meaning |
|-------|------|---------|
| `not-started` | ⬜ | Pending |
| `in-progress` | 🔄 | Currently working (multiple allowed) |
| `completed` | ✅ | Done |

### Widget Controls

- **Clear button** — removes all todos (disabled when Agent is running)
- **Progress counter** — `completed/total` format
- **Auto-refresh** — updates automatically on every AI tool call
- **Collapse toggle** — show/hide the todo list
- **Double-click edit** — click title or content to edit todo inline
- **Status icons** — SVG icons (☐/🔄/✅) for each state

## Standalone Todo Panel

Click the **Known Bugs / TODO** card in the Stats bar to open the standalone panel. Left column: Bug list, Right column: TODO list. Login required for write operations.

### Inline Editing

Double-click any todo title or content to edit inline. Press Enter to save, Esc to cancel. Backend `PUT /api/todos/:id` supports updating both `title` and `content` fields.

### Sorting

Todos are sorted by `created_at` descending: unresolved items first, completed items last.

---
sidebar_position: 2
title: AI Agent System
description: LangChainGo-powered multi-Agent chat with native Function Calling, streaming SSE blocks, and user approval
---

# AI Agent System

## Architecture

```
User (Web UI)
    │
    ▼
HTTP SSE (/api/agent/chat/stream)
    │
    ▼
agent/handlers.go      ← SSE streaming + block protocol
    │
    ├── agent/executor.go   ← Session lifecycle
    ├── agent/subagent.go   ← Agent loop + sub-agent dispatch
    ├── agent/llm.go        ← LangChainGo-native Function Calling
    ├── agent/mcp.go        ← MCP tool connections (stdio / HTTP / SSE)
    └── agent/tools.go      ← Builtin tools + safety + approval
```

## Core Concepts

### Native Function Calling

The system uses **LangChainGo v0.1.14** with `llms.WithTools()` for native OpenAI-compatible function calling. The LLM returns structured `ToolCalls` (name + JSON arguments) directly — no text parsing needed.

### Streaming Block Protocol

SSE events use a custom block protocol for clean separation of AI messages, tool calls, approvals, and user interactions:

```
stream_start        → starts a streaming AI message block
delta               → character-by-character text stream
stream_end          → message block ended
tool                → tool call card (with expandable arguments)
tool_result         → tool result
approval_request    → dangerous-operation approval request (persisted, has a result field)
ask_user            → question to the user (persisted, has a result field)
todo                → todo list update
done                → request finished (with finished: true/false)
```

All block types (`approval_request`, `ask_user`, `todo`) are persisted in `session.Messages` and replayed on reconnect. The `result` field distinguishes pending vs completed:

- `approval_request.result`: `undefined` (pending) / `true` (approved) / `false` (denied)
- `ask_user.result`: `undefined` (pending) / `"user's answer"` (answered)

### User Approval for Dangerous Operations

Sensitive tools (`write_file`, `shell_exec`, `fetch_webpage`, etc.) trigger an **approval dialog** in the chat before execution:

| Safety Level | Behavior |
|-------------|----------|
| Normal | Yellow `⚠️ Approval Request` dialog with details |
| Dangerous shell | Red `⚠️ Dangerous Command Warning` dialog with safety note |
| Blocked | Command rejected outright (e.g. `dd if=`, `format c:`) |

Approvals are **persisted** to the session database — the backend can recover after restart.

See [Security](#security) for details.

### Agent Loop

Each conversation round follows this pattern:

```
User message → SSE stream_start
  → LLM GenerateContent (with tools)
    → ToolCall? → Execute → Send tool block → Append result → Continue
    → Call sub-agent? → Spawn → Send tool block → Continue
    → Final answer → stream_end → done
```

Sub-agents (`CALL: <agent> <task>`) are invoked within the same round loop and run independently with their own system prompts and tools.

## Builtin Tool Providers

| Provider | Tools | Access |
|----------|-------|--------|
| `read_only` | `read_file`, `read_files`, `list_files`, `view_image`, `file_search`, `grep_search` | No approval needed |
| `read_write` | `write_file`, `create_file`, `create_directory`, `replace_string_in_file`, `multi_replace_string_in_file` | Approval required |
| `web` | `fetch_webpage`, `download_file` | Approval required |
| `todo` | `manage_todo_list` | No approval |
| `ask` | `ask_user` | Pauses for user input |
| `shell` | `shell_exec` | Approval + safety check |

### `read_files` — Batch Read (v2.0+)

Reads several files in a single call; each file can have its own line range:

```json
{
  "files": [
    {"path": "/a/Foo.java", "startLine": 10, "endLine": 50},
    {"path": "/a/Bar.java"}
  ]
}
```

- `startLine` / `endLine` are optional (1-based, inclusive); omit them to read the whole file
- Results are separated by `--- FILE: xxx ---`
- Single-file output is capped at 10 KB and truncated beyond that
- **Recommended workflow**: locate line numbers with `grep_search` first, then read precise ranges with `read_files` (include at least 20 lines of context around the target range)

## Session Persistence

Sessions are stored in SQLite at `data/sessions.db` (implemented in `agent/database.go`). A session row carries its meta fields — `agent`, `provider`, `project`, `title`, `bypass_approval`, `archived`, pending approval/question, and timestamps — while message history is kept in per-session message rows.

All block types (`approval_request`, `ask_user`, `todo`) are persisted with their `result` field and replayed on reconnect:

- `approval_request.result`: `undefined` (pending) / `true` (approved) / `false` (denied)
- `ask_user.result`: `undefined` (pending) / `"user's answer"` (answered)

Message types: `system` / `user` / `message` (AI text) / `tool` (tool invocation) / `tool_result` (tool output) / `attachment` (file/image context).

### Token Tracking (v2.0+)

Each `message` block stores a `tokens` field with the **real API usage count** from `resp.Choices[0].GenerationInfo["TotalTokens"]`. The context usage bar in the history list reflects actual token consumption, not estimates.

Legacy data without `tokens` is automatically patched with `estimateTokens()` on load.

## Issue & PR Dispatch (v2.0+)

Issues and PRs from the Dashboard / GitHub panel can be dispatched to AI Agents:

| Mode | Description |
|------|-------------|
| **New Session** | Creates a new Agent session with issue content as attachment + instruction prompt |
| **Attach to Existing** | Sends issue as attachment to an existing conversation; matching project sessions listed first |

### Chat Issue Picker

In conversations bound to a project, a 📋 button opens an **Issue Picker** panel:

- **Multi-select**: Click issues to toggle ☐/☑, selected items shown as chips above input
- **State filter**: Open / Closed / All (defaults to Open)
- **Search**: Real-time text filtering by title or number
- **Number-sorted**: Descending by issue number
- **SVG state icons**: Same visual style as the GitHub panel
- Selected issues are sent as attachment when the user clicks Send, alongside any typed prompt

## Security

| Layer | Mechanism |
|-------|-----------|
| Path sandbox | `resolvePath()` enforces project directory boundaries |
| Shell safety | `safetyCheckShell()` blocks `dd if=`, `format c:` and warns on `rm -rf`, `del /f` |
| User approval | `ApprovalCallback` → SSE → frontend dialog → channel response |
| Approval persistence | `PendingApproval` stored in the session database |
| Token limits | Max context length from model config; auto-compress at 75% usage |
| File read guard | Same file capped at 3 reads per round; output truncated at 20K chars |
| **Bypass Approval** toggle | When enabled, file operations within CWD (outside dangerous dirs) auto-approved |

## UI Features

- **Shift+Enter** to send; Enter for newline
- **Collapsible tool cards** with ▶ triangle indicator and arguments detail
- **AI header** shown once per interaction (not per block)
- **Todo widget** below messages with inline status tracking, collapse toggle, and clear button
- **Model selector** in chat toolbar
- **Bypass Approval** toggle switch in chat toolbar
- **Context usage bar** in history list (percentage-filled bar with real API token counts)
- **Smart scroll**: auto-follows output when at bottom (100px threshold); uses `requestAnimationFrame` for accuracy
- **Issue Picker** 📋: multi-select issues/PRs as attachment; chips display above input
- **Thinking indicator**: animated dots while model is processing
- **Session polling**: re-entering a running conversation shows live progress
- **Stop button**: aborts in-progress requests and saves partial state
| DuckDuckGo | Web search |
| Desktop Commander | Terminal + files + processes |

## DeepSeek Thinking Mode

When `type: "deepseek"` and `thinking_enabled: true`, the system automatically enables BuiltinPlanner:

- Injects `reasoning_effort` before requests
- Extracts `reasoning_content` from responses
- Preserves chain-of-thought context across multi-turn conversations

## API Endpoints

| Endpoint | Method | Description |
|------|------|------|
| `/api/agent/info` | GET | Get Agent/MCP/model lists |
| `/api/agent/sessions` | GET | List all conversations (with context_usage) |
| `/api/agent/sessions/:id` | GET | Get single session (v2.0+) |
| `/api/agent/sessions/:id` | DELETE | Delete a conversation |
| `/api/agent/chat` | POST | Create session or send message (sync, deprecated) |
| `/api/agent/chat/stream` | POST | SSE streaming chat (primary entry point) |
| `/api/agent/approval` | POST | Approve / deny pending dangerous operation |
| `/api/agent/compact` | POST | Manually compact session context |
| `/api/agent/answer` | POST | Answer a pending `ask_user` question |
| `/api/agent/stop` | POST | Abort an in-progress request and save partial state |
| `/api/agent/mcp/refresh` | POST | Force MCP server re-discovery |
| `/api/agent/search` | GET | Search messages across sessions |
| `/api/agent/search/sessions` | GET | Search sessions by title/content |
| `/api/agent/share` | POST/GET | Create or read a share link for a session |
| `/share/<token>` | GET | Public share page for a shared session |

### POST /api/agent/chat

**Create new session**:
```json
{
  "agent": "assistant",
  "provider": "openai/gpt-4o",
  "project": "My Mod",
  "task": "Help me review the code quality of this project"
}
```

**Continue conversation**:
```json
{
  "session": "abc123",
  "message": "Also check for performance issues"
}
```

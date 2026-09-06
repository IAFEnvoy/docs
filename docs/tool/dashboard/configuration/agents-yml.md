---
sidebar_position: 4
title: agents.yml
description: Agent definitions, unified MCP bindings (builtin + external), and system prompt file references
---

# agents.yml

## Full Example

```yaml
agents:
  - id: "assistant"
    name: "General Assistant"
    description: "General AI assistant that can answer questions, write code, read files, and run commands"
    max_instances: 3
    temperature: 0.7
    sub_agents: ["code-reviewer", "mc-modder"]
    mcps: ["read_only", "read_write", "web", "todo", "ask", "shell", "open-websearch"]
    agent_md_file: "prompts/assistant.md"

  - id: "code-reviewer"
    name: "Code Reviewer"
    description: "Reviews code quality and spots potential issues"
    max_instances: 2
    temperature: 0.4
    mcps: ["read_only", "read_write", "web", "todo", "ask", "shell", "github-mcp"]
    agent_md_file: "prompts/code-reviewer.md"

  - id: "mc-modder"
    name: "Minecraft Mod Developer"
    description: "Helps develop and debug Minecraft mods"
    max_instances: 2
    temperature: 0.5
    mcps: ["read_only", "read_write", "web", "todo", "ask", "shell", "github-mcp", "open-websearch"]
    agent_md_file: "prompts/mc-modder.md"
```

## Field Reference

| Field | Type | Description |
|------|------|-------------|
| `id` | string | Unique Agent ID |
| `name` | string | Display name |
| `description` | string | Short description |
| `max_instances` | int | Max concurrent instances (prevents resource conflicts) |
| `temperature` | float | LLM temperature (0–1) |
| `sub_agents` | string[] | Sub-agent IDs this agent can delegate to via `CALL:` syntax |
| `mcps` | string[] | Unified tool sources: builtin provider IDs + external MCP server IDs |
| `agent_md_file` | string | System prompt file path (recommended) |
| `agent_md` | string | Inline system prompt (legacy format) |

## Unified `mcps` Field

The `mcps` field combines **builtin tool providers** and **external MCP servers** into a single list. Each ID is resolved at runtime:

| ID prefix | Source | Example tools |
|-----------|--------|---------------|
| `read_only` | Builtin | `read_file`, `list_files`, `file_search`, `grep_search`, `view_image` |
| `read_write` | Builtin | `write_file`, `create_file`, `create_directory`, `replace_string_in_file`, `multi_replace_string_in_file` |
| `web` | Builtin | `fetch_webpage` |
| `todo` | Builtin | `manage_todo_list` |
| `ask` | Builtin | `ask_user` |
| `shell` | Builtin | `shell_exec` |
| (other) | External MCP | Defined in `mcps.yml`, e.g. `github-mcp`, `open-websearch` |

The system automatically detects whether an ID is a builtin provider or MCP server — no separate `builtin_tools` field needed.

## Sub-Agent Architecture

The system supports a `CALL: <agent_id> <task>` syntax for delegation:

1. The agent's LLM outputs `CALL: code-reviewer Review main.go` when it needs sub-agent help
2. The system spawns the sub-agent independently with its own system prompt and tools
3. Results are returned, and the parent agent continues

Key fields:
- `sub_agents` — list of sub-agent IDs this agent can delegate to
- Sub-agents inherit their own `mcps` configuration independently

## Frontend

- **Agent cards** show name, description, instance count, and tool tags
- **Builtin provider tags** display as named badges (e.g. "File System (Read/Write)", "Terminal Commands")
- **External MCP tags** display server names with status indicators
- **Sub-agent input areas** are collapsed by default; parent agent is always expanded
- ⚠️ Warning badges appear if the prompt is missing `${tools_overview}` or MCP servers are unhealthy

## Prompt Files

It is recommended to use `agent_md_file` to reference external Markdown files for easier editing and version control.

Prompt files are stored in the `prompts/` directory:

```
prompts/
├── assistant.md
├── mc-modder.md
├── bug-fixer.md
├── code-reviewer.md
└── tester.md
```

The checked-in `config/agents.yml` defines five agents by default: `assistant`, `mc-modder`, `bug-fixer`, `code-reviewer`, and `tester` — each backed by its prompt file above.

After editing, use the **🛠 Admin** menu → **Reload Local Config** to hot-reload.

:::tip Prompt Placeholders
Prompt files support `${placeholder}` syntax. Use `${tools_overview}` to auto-inject the full tool list — it covers all entries in `mcps` (both builtin and external). See [Prompt Files → Placeholders](/docs/tool/dashboard/configuration/prompts#placeholders) for the full list.
:::

## Inline Format (legacy)

If not using file references, you can also inline prompts directly in YAML:

```yaml
- id: "my-agent"
  agent_md: |
    You are a professional assistant.
    You can do many things.
```

However, `agent_md_file` is recommended for better maintainability.

## MCP Binding

The `mcps` field references all tool sources. When an Agent instance is created, builtin tools are registered directly as Function Calling tools, and external MCP servers are automatically connected via stdio or HTTP.

Agents and tool sources are decoupled — the same MCP server or builtin provider can be shared by multiple Agents.

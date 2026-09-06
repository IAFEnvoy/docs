---
sidebar_position: 5
title: mcps.yml
description: MCP server list configuration — supports stdio, streamableHttp, and SSE transport
---

# mcps.yml

MCP (Model Context Protocol) servers provide tool capabilities for AI Agents. The system supports three transport types: `stdio` (subprocess), `streamableHttp` (HTTP endpoint), and `sse` (SSE endpoint).

## Full Example

```yaml
servers:
  # Stdio — launches a subprocess via command line
  - id: "github-mcp"
    name: "GitHub"
    type: "stdio"
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_TOKEN}"
    description: "Manage GitHub Issues, PRs, repos, etc."

  # streamableHttp — connects to an HTTP MCP endpoint
  - id: "open-websearch"
    name: "Open WebSearch"
    type: "streamableHttp"
    url: "http://localhost:3000"
    description: "Multi-engine web search via HTTP"

  # Self-hosted streamableHttp — npx starts the process, then connects to url
  - id: "my-service"
    name: "My MCP Service"
    type: "streamableHttp"
    command: "npx"
    args: ["-y", "my-mcp-server"]
    url: "http://localhost:3000/api/mcp"
    description: "Self-hosted MCP with custom API path"
```

## Recommended MCP Servers

The dashboard ships with builtin tools for file access (`read_only`/`read_write`) and shell execution, so you usually only need to add servers for external capabilities. Below are the commonly used ones; secrets are passed as `${ENV_NAME}` placeholders instead of being hardcoded.

| Server | npx package | Use it for | Required env |
|--------|-------------|-----------|--------------|
| GitHub | `@modelcontextprotocol/server-github` | Issues / PRs / repos / code search on GitHub | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| Open WebSearch | `open-websearch` | Multi-engine web search (Google / Bing / DuckDuckGo) | optional `DEFAULT_SEARCH_ENGINE` |
| Desktop Commander | `@wonderwhy-er/desktop-commander` | Terminal control + file editing (community, third-party) | – |
| CurseForge | `curseforge-mcp` | Search mods, browse files, download URLs on CurseForge | `CURSEFORGE_API_KEY` |
| Pendulum | `pendulum-mcp-dispatcher` | In-game Minecraft control & debugging via the Pendulum mod | starts with `/pendulum mcp start` in-game |

Ready-to-paste YAML (add to the `servers:` list):

```yaml
servers:
  # GitHub — stdio
  - id: "github-mcp"
    name: "GitHub"
    type: "stdio"
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "${GITHUB_PERSONAL_ACCESS_TOKEN}"
    description: "Manage GitHub Issues, PRs, repos, code search"

  # Web search — streamableHttp (self-hosted)
  - id: "open-websearch"
    name: "Open WebSearch"
    type: "streamableHttp"
    command: "npx"
    args: ["-y", "open-websearch"]
    url: "http://localhost:3000"
    env:
      DEFAULT_SEARCH_ENGINE: "bing"
    description: "Multi-engine web search"

  # Terminal / file editing — stdio (optional, community)
  - id: "desktop-commander"
    name: "Desktop Commander"
    type: "stdio"
    command: "npx"
    args: ["-y", "@wonderwhy-er/desktop-commander"]
    env: {}
    description: "Terminal operations and file editing"

  # CurseForge API — stdio
  - id: "curseforge"
    name: "CurseForge API"
    type: "stdio"
    command: "npx"
    args: ["-y", "curseforge-mcp"]
    env:
      CURSEFORGE_API_KEY: "${CURSEFORGE_API_KEY}"
    description: "Search CurseForge mods and browse files"

  # Pendulum in-game MCP — stdio (requires the Pendulum mod)
  - id: "pendulum"
    name: "Pendulum"
    type: "stdio"
    command: "npx"
    args: ["-y", "pendulum-mcp-dispatcher"]
    env: {}
    description: "In-game Minecraft control and debugging"
```

:::tip
Only enable the servers you actually need — every external server adds tools to the model context and increases token usage.
:::

## Field Reference

| Field | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier, referenced in `agents.yml` |
| `name` | string | Display name |
| `type` | string | Transport: `stdio` / `streamableHttp` / `sse` |
| `command` | string | Launch command (required for `stdio`; optional for `streamableHttp`/`sse` for self-hosting) |
| `args` | string[] | Command-line arguments |
| `url` | string | HTTP/SSE endpoint URL (required for `streamableHttp`/`sse`) |
| `env` | map | Environment variables (supports `${ENV}` placeholder) |
| `description` | string | Description text |

## Transport Types

### stdio

Launches the MCP server as a subprocess, communicating through stdin/stdout (JSON-RPC over lines):

```yaml
type: "stdio"
command: "npx"             # or "uvx", "node", "python"
args: ["-y", "package-name", "arg1"]
```

:::tip Prerequisites
- `npx`: Requires Node.js 18+
- `uvx`: Requires Python 3.10+ and the `uv` toolchain
:::

### streamableHttp

Connects to an HTTP MCP endpoint via POST JSON-RPC. Supports both standard JSON responses and SSE (`text/event-stream`) responses:

```yaml
# Direct connection (service already running)
type: "streamableHttp"
url: "http://localhost:3000"

# Self-hosted (auto-launch via npx, then connect)
type: "streamableHttp"
command: "npx"
args: ["-y", "open-websearch"]
url: "http://localhost:3000"
```

Self-hosting flow: the system runs the `command` to start the process, waits up to 10 seconds for the HTTP endpoint to become available (via HEAD probe), then proceeds with tool discovery and connection.

### sse

Same as `streamableHttp` — connects via HTTP POST to an SSE-capable endpoint:

```yaml
type: "sse"
url: "http://localhost:3000/mcp"
```

## Caching

MCP tool discovery results are cached to `cache/mcp_cache.json`. On restart, cached tools are loaded immediately; missing or failed servers are re-detected in the background. Use the **Refresh** button in the MCP UI panel to force re-discovery.

## Security Recommendations

| MCP Type | Recommendation |
|----------|----------------|
| Filesystem | Use builtin `read_only` / `read_write` tools instead — they include path sandboxing |
| Shell | The builtin `shell_exec` tool has safety checks and user approval for dangerous commands |

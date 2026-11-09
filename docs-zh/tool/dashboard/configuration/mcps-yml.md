---
sidebar_position: 5
title: mcps.yml
description: MCP 服务器列表配置——支持 stdio、streamableHttp 与 SSE 传输
---

# mcps.yml

MCP（Model Context Protocol）服务器为 AI 智能体提供工具能力。系统支持三种传输类型：`stdio`（子进程）、`streamableHttp`（HTTP 端点）和 `sse`（SSE 端点）。

## 完整示例

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

## 推荐的 MCP 服务器

面板已内置文件访问（`read_only`/`read_write`）和 shell 执行工具，因此通常只需为外部能力添加服务器。下面是常用的几个；密钥通过 `${ENV_NAME}` 占位符传入，而不是硬编码。

| 服务器 | npx 包 | 用途 | 必需环境变量 |
|--------|-------------|-----------|--------------|
| GitHub | `@modelcontextprotocol/server-github` | GitHub 上的 Issue / PR / 仓库 / 代码搜索 | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| Open WebSearch | `open-websearch` | 多引擎网页搜索（Google / Bing / DuckDuckGo） | 可选 `DEFAULT_SEARCH_ENGINE` |
| Desktop Commander | `@wonderwhy-er/desktop-commander` | 终端控制 + 文件编辑（社区、第三方） | – |
| CurseForge | `curseforge-mcp` | 在 CurseForge 上搜索模组、浏览文件、获取下载链接 | `CURSEFORGE_API_KEY` |
| Pendulum | `pendulum-mcp-dispatcher` | 通过 Pendulum 模组在游戏内控制与调试 Minecraft | 在游戏内执行 `/pendulum mcp start` 启动 |

可直接粘贴的 YAML（添加到 `servers:` 列表）：

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
只启用你真正需要的服务器——每个外部服务器都会向模型上下文添加工具，并增加令牌消耗。
:::

## 字段参考

| 字段 | 类型 | 说明 |
|------|------|-------------|
| `id` | string | 唯一标识符，在 `agents.yml` 中引用 |
| `name` | string | 显示名称 |
| `type` | string | 传输方式：`stdio` / `streamableHttp` / `sse` |
| `command` | string | 启动命令（`stdio` 必需；`streamableHttp`/`sse` 自托管时可选） |
| `args` | string[] | 命令行参数 |
| `url` | string | HTTP/SSE 端点 URL（`streamableHttp`/`sse` 必需） |
| `env` | map | 环境变量（支持 `${ENV}` 占位符） |
| `description` | string | 描述文本 |

## 传输类型

### stdio

把 MCP 服务器作为子进程启动，通过 stdin/stdout 通信（按行的 JSON-RPC）：

```yaml
type: "stdio"
command: "npx"             # or "uvx", "node", "python"
args: ["-y", "package-name", "arg1"]
```

:::tip 前置条件
- `npx`：需要 Node.js 18+
- `uvx`：需要 Python 3.10+ 和 `uv` 工具链
:::

### streamableHttp

通过 POST JSON-RPC 连接 HTTP MCP 端点。既支持标准 JSON 响应，也支持 SSE（`text/event-stream`）响应：

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

自托管流程：系统执行 `command` 启动进程，最多等待 10 秒让 HTTP 端点可用（通过 HEAD 探测），然后进行工具发现和连接。

### sse

与 `streamableHttp` 相同——通过 HTTP POST 连接到支持 SSE 的端点：

```yaml
type: "sse"
url: "http://localhost:3000/mcp"
```

## 缓存

MCP 工具发现结果会缓存到 `cache/mcp_cache.json`。重启时会立即加载缓存的工具；缺失或失败的服务器会在后台重新探测。使用 MCP 界面面板中的 **Refresh** 按钮可强制重新发现。

## 安全建议

| MCP 类型 | 建议 |
|----------|----------------|
| 文件系统 | 改用内置的 `read_only` / `read_write` 工具——它们包含路径沙箱 |
| Shell | 内置的 `shell_exec` 工具带有安全检查，危险命令需要用户审批 |

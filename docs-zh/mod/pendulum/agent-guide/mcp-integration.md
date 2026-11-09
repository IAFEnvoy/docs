---
sidebar_position: 1
---

# MCP 集成

Pendulum 通过 TCP 为 AI 智能体提供 MCP（Model Context Protocol）JSON-RPC 2.0 服务器。

## 资源

点击下载用于智能体集成的 MCP 桥接脚本和 API 参考。

import Download from '@site/src/components/Download';

<Download filePath="pendulum/AGENT.md">AGENT.md</Download>
<Download filePath="pendulum/mcp-bridge.js">mcp-bridge.js</Download>

## 快速配置

1. 在游戏内启动 MCP 服务器：
   ```
   /pendulum mcp start
   ```
2. 配置你的 MCP 客户端连接到 `localhost:25566`（默认端口）。

:::tip
你可以在 Pendulum 配置界面（Jupiter 配置 GUI）中自定义端口。为了方便，也可以将 MCP 设置为在游戏启动时自动开启。

MCP 服务器运行时，游戏窗口标题会显示 **" | Shared with AI Agent"**（类似 VS Code 的远程指示器）。脚本执行时，会显示 **" | Script Running"**。

所有 MCP 工具调用都会自动记录到 `pendulum/logs/mcp_calls.jsonl`，便于事后复查。
:::

## 用于 VSCode Copilot

添加到 `.vscode/mcp.json`：

```json
{
  "servers": {
    "pendulum": {
      "type": "stdio",
      "command": "node",
      "args": ["mcp-bridge.js"],
      "env": {
        "PENDULUM_HOST": "localhost",
        "PENDULUM_PORT": "25566"
      }
    }
  }
}
```

## 用于 Claude Desktop

添加到 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "pendulum": {
      "command": "node",
      "args": ["path/to/mcp-bridge.js"],
      "env": {
        "PENDULUM_HOST": "localhost",
        "PENDULUM_PORT": "25566"
      }
    }
  }
}
```

## 用于 Codex CLI

创建 `~/.codex.yaml`（或 `~/.codex.yml`）：

```yaml
mcpServers:
  pendulum:
    command: node
    args:
      - path/to/mcp-bridge.js
    env:
      PENDULUM_HOST: localhost
      PENDULUM_PORT: "25566"
```

:::tip
请确保使用 `mcp-bridge.js` 的**绝对路径**。你可以在 Pendulum 项目目录下运行 `pwd`（macOS/Linux）或 `cd`（Windows）来获取该路径。
:::

配置完成后，运行 Codex：

```bash
codex
```

Codex 会自动发现 `pendulum` MCP 服务器，并可使用所有可用工具来控制 Minecraft。完整的工具列表参见 [智能体 API 参考](agent)。

## 可用工具

| 工具 | 说明 |
|------|-------------|
| `pendulum_eval` | 执行 JavaScript 代码；返回结果或错误 |
| `pendulum_screenshot` | 截取游戏窗口截图（base64 PNG） |
| `pendulum_gui_elements` | 读取所有可见的 GUI 控件 |
| `pendulum_status` | 检查是否有脚本正在运行 |
| `pendulum_abort` | 停止当前正在运行的脚本 |

## 配置

在 Pendulum 配置界面（Jupiter 配置 GUI）中：

- **MCP Enabled**：游戏启动时自动启动 MCP 服务器
- **MCP Port**：TCP 端口（默认 25566）
- **Permissions**：控制脚本可以执行哪些操作（聊天、破坏、放置、攻击、命令）

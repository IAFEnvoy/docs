---
sidebar_position: 1
---

# MCP Integration

Pendulum exposes an MCP (Model Context Protocol) JSON-RPC 2.0 server over TCP for AI agents.

## Useful Resources

Click to download the MCP bridge script and API reference for your agent integration.

import Download from '@site/src/components/Download';

<Download filePath="pendulum/AGENT.md">AGENT.md</Download>
<Download filePath="pendulum/mcp-bridge.js">mcp-bridge.js</Download>

## Quick Setup

1. Start the MCP server in-game:
   ```
   /pendulum mcp start
   ```
2. Configure your MCP client to connect to `localhost:25566` (default port).

:::tip
You can customize the host and port in the Pendulum config screen (Jupiter config GUI). Also you can set MCP to auto-start on game launch for convenience.
:::

## For VS Code Copilot

Add to `.vscode/mcp.json`:

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

## For Claude Desktop

Add to `claude_desktop_config.json`:

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

## Available Tools

| Tool | Description |
|------|-------------|
| `pendulum_eval` | Execute JavaScript code; returns result or error |
| `pendulum_screenshot` | Capture game window screenshot (base64 PNG) |
| `pendulum_gui_elements` | Read all visible GUI widgets |
| `pendulum_status` | Check if a script is running |
| `pendulum_abort` | Stop the current running script |

## Configuring

In the Pendulum config screen (Jupiter config GUI):

- **MCP Enabled**: Auto-start MCP server on game launch
- **MCP Port**: TCP port (default 25566)
- **Permissions**: Control what scripts can do (chat, break, place, attack, commands)

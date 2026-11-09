# Commands

All commands use `/pendulum` as the root.

| Command | Description |
|---------|-------------|
| `/pendulum execute <code>` | Run JavaScript inline |
| `/pendulum file <path>` | Run `.js` from `.minecraft/pendulum/<path>` |
| `/pendulum abort` | Stop running script immediately |
| `/pendulum status` | Show current script state |
| `/pendulum dir` | Print the script directory path |
| `/pendulum mcp start` | Start MCP server (default port 25566) |
| `/pendulum mcp stop` | Stop MCP server |
| `/pendulum mcp status` | Check MCP server state |

:::info
Only one script runs at a time. `/pendulum abort` if stuck.
:::

## Script Files

Place `.js` files in `.minecraft/pendulum/`:

```
.minecraft/
  pendulum/
    farm.js
    mining/
      strip_mine.js
      quarry.js
```

Run with `/pendulum file farm.js` or `/pendulum file mining/strip_mine.js`.

## MCP Server

```js
// Start
/pendulum mcp start

// Check
/pendulum mcp status
// → "MCP server running on port 25566"

// Stop
/pendulum mcp stop
```

Configured in the mod settings (Jupiter config GUI): enable/disable auto-start, change port.

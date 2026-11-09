# 命令

所有命令都以 `/pendulum` 为根命令。

| 命令 | 说明 |
|---------|-------------|
| `/pendulum execute <code>` | 直接运行 JavaScript 代码 |
| `/pendulum file <path>` | 运行 `.minecraft/pendulum/<path>` 中的 `.js` 文件 |
| `/pendulum abort` | 立即停止正在运行的脚本 |
| `/pendulum status` | 显示当前脚本状态 |
| `/pendulum dir` | 打印脚本目录路径 |
| `/pendulum mcp start` | 启动 MCP 服务器（默认端口 25566） |
| `/pendulum mcp stop` | 停止 MCP 服务器 |
| `/pendulum mcp status` | 检查 MCP 服务器状态 |

:::info
同一时间只能运行一个脚本。如果卡住，请使用 `/pendulum abort`。
:::

## 脚本文件

将 `.js` 文件放入 `.minecraft/pendulum/`：

```
.minecraft/
  pendulum/
    farm.js
    mining/
      strip_mine.js
      quarry.js
```

使用 `/pendulum file farm.js` 或 `/pendulum file mining/strip_mine.js` 运行。

## MCP 服务器

```js
// Start
/pendulum mcp start

// Check
/pendulum mcp status
// → "MCP server running on port 25566"

// Stop
/pendulum mcp stop
```

可在模组设置（Jupiter 配置 GUI）中配置：启用/禁用自动启动、修改端口。

---
sidebar_position: 2
title: AI 智能体系统
description: 由 LangChainGo 驱动的多智能体对话，支持原生 Function Calling、流式 SSE 块以及用户审批
---

# AI 智能体系统

## 架构

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

## 核心概念

### 原生 Function Calling

系统使用 **LangChainGo v0.1.14** 的 `llms.WithTools()` 实现原生 OpenAI 兼容的函数调用。LLM 直接返回结构化的 `ToolCalls`（名称 + JSON 参数）——无需解析文本。

### 流式块协议

SSE 事件使用自定义的块协议，以便清晰区分 AI 消息、工具调用、审批和用户交互：

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

所有块类型（`approval_request`、`ask_user`、`todo`）都会持久化到 `session.Messages`，并在重连时重放。`result` 字段用于区分待处理与已完成：

- `approval_request.result`：`undefined`（待处理）/ `true`（已批准）/ `false`（已拒绝）
- `ask_user.result`：`undefined`（待处理）/ `"用户的回答"`（已回答）

### 危险操作的用户审批

敏感工具（`write_file`、`shell_exec`、`fetch_webpage` 等）在执行前会在对话中触发**审批对话框**：

| 安全级别 | 行为 |
|-------------|----------|
| 普通 | 黄色 `⚠️ Approval Request` 对话框，附带详细信息 |
| 危险 shell | 红色 `⚠️ Dangerous Command Warning` 对话框，附带安全说明 |
| 已阻止 | 命令被直接拒绝（例如 `dd if=`、`format c:`） |

审批记录会**持久化**到会话数据库——后端重启后仍可恢复。

详见[安全](#security)。

### 智能体循环

每一轮对话都遵循以下模式：

```
User message → SSE stream_start
  → LLM GenerateContent (with tools)
    → ToolCall? → Execute → Send tool block → Append result → Continue
    → Call sub-agent? → Spawn → Send tool block → Continue
    → Final answer → stream_end → done
```

子智能体（`CALL: <agent> <task>`）在同一轮循环中调用，并使用自己的系统提示词和工具独立运行。

## 内置工具提供商

| 提供商 | 工具 | 访问权限 |
|----------|-------|--------|
| `read_only` | `read_file`、`read_files`、`list_files`、`view_image`、`file_search`、`grep_search` | 无需审批 |
| `read_write` | `write_file`、`create_file`、`create_directory`、`replace_string_in_file`、`multi_replace_string_in_file` | 需要审批 |
| `web` | `fetch_webpage`、`download_file` | 需要审批 |
| `todo` | `manage_todo_list` | 无需审批 |
| `ask` | `ask_user` | 暂停等待用户输入 |
| `shell` | `shell_exec` | 审批 + 安全检查 |

### `read_files`——批量读取（v2.0+）

一次调用读取多个文件；每个文件可以有自己的行范围：

```json
{
  "files": [
    {"path": "/a/Foo.java", "startLine": 10, "endLine": 50},
    {"path": "/a/Bar.java"}
  ]
}
```

- `startLine` / `endLine` 是可选的（从 1 开始，包含端点）；省略则读取整个文件
- 结果之间用 `--- FILE: xxx ---` 分隔
- 单个文件的输出上限为 10 KB，超出部分会被截断
- **推荐工作流**：先用 `grep_search` 定位行号，再用 `read_files` 读取精确范围（在目标范围前后至少保留 20 行上下文）

## 会话持久化

会话存储在 SQLite 的 `data/sessions.db` 中（实现在 `agent/database.go`）。会话行携带其元字段——`agent`、`provider`、`project`、`title`、`bypass_approval`、`archived`、待处理的审批/提问以及时间戳——而消息历史则保存在各会话的消息行中。

所有块类型（`approval_request`、`ask_user`、`todo`）都会连同其 `result` 字段持久化，并在重连时重放：

- `approval_request.result`：`undefined`（待处理）/ `true`（已批准）/ `false`（已拒绝）
- `ask_user.result`：`undefined`（待处理）/ `"用户的回答"`（已回答）

消息类型：`system` / `user` / `message`（AI 文本）/ `tool`（工具调用）/ `tool_result`（工具输出）/ `attachment`（文件/图片上下文）。

### 令牌统计（v2.0+）

每个 `message` 块都会存储一个 `tokens` 字段，其值来自 `resp.Choices[0].GenerationInfo["TotalTokens"]` 的**真实 API 用量**。历史列表中的上下文用量条反映实际的令牌消耗，而非估算值。

加载时，缺少 `tokens` 的旧数据会自动用 `estimateTokens()` 补齐。

## Issue 与 PR 派发（v2.0+）

面板 / GitHub 面板中的 Issue 和 PR 可以派发给 AI 智能体：

| 模式 | 说明 |
|------|-------------|
| **新会话** | 创建新的智能体会话，把 Issue 内容作为附件，并附带指令提示词 |
| **附加到现有会话** | 把 Issue 作为附件发送到已有对话；匹配项目名的会话排在前面 |

### 对话中的 Issue 选择器

在绑定了项目的对话中，📋 按钮会打开 **Issue 选择器** 面板：

- **多选**：点击 Issue 切换 ☐/☑，选中项以标签块形式显示在输入框上方
- **状态筛选**：Open / Closed / All（默认为 Open）
- **搜索**：按标题或编号实时文本过滤
- **按编号排序**：按 Issue 编号降序
- **SVG 状态图标**：与 GitHub 面板相同的视觉风格
- 用户点击发送时，选中的 Issue 会作为附件发送，并附带已输入的提示词

## 安全 {#security}

| 层级 | 机制 |
|-------|-----------|
| 路径沙箱 | `resolvePath()` 强制限定在项目目录边界内 |
| Shell 安全 | `safetyCheckShell()` 阻止 `dd if=`、`format c:`，并对 `rm -rf`、`del /f` 发出警告 |
| 用户审批 | `ApprovalCallback` → SSE → 前端对话框 → 通道响应 |
| 审批持久化 | `PendingApproval` 存储在会话数据库中 |
| 令牌限制 | 最大上下文长度来自模型配置；用量达到 75% 时自动压缩 |
| 文件读取保护 | 同一文件每轮最多读取 3 次；输出截断至 20K 个字符 |
| **Bypass Approval** 开关 | 启用后，CWD 内（危险目录之外）的文件操作自动批准 |

## 界面特性

- **Shift+Enter** 发送；Enter 换行
- **可折叠的工具卡片**，带 ▶ 三角指示和参数详情
- **AI 标题**每次交互只显示一次（而非每个块）
- **待办组件**位于消息下方，支持内联状态跟踪、折叠开关和清除按钮
- **模型选择器**位于对话工具栏
- **Bypass Approval** 开关位于对话工具栏
- **上下文用量条**位于历史列表（按百分比填充的进度条，使用真实 API 令牌数）
- **智能滚动**：位于底部时自动跟随输出（阈值 100px）；使用 `requestAnimationFrame` 保证准确性
- **Issue 选择器** 📋：多选 Issue/PR 作为附件；标签块显示在输入框上方
- **思考指示器**：模型处理时显示动画点
- **会话轮询**：重新进入正在运行的对话时可看到实时进度
- **停止按钮**：中止进行中的请求并保存部分状态
| DuckDuckGo | 网页搜索 |
| Desktop Commander | 终端 + 文件 + 进程 |

## DeepSeek 思考模式

当 `type: "deepseek"` 且 `thinking_enabled: true` 时，系统会自动启用 BuiltinPlanner：

- 在请求前注入 `reasoning_effort`
- 从响应中提取 `reasoning_content`
- 在多轮对话中保留思维链上下文

## API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/agent/info` | GET | 获取智能体/MCP/模型列表 |
| `/api/agent/sessions` | GET | 列出所有对话（含 context_usage） |
| `/api/agent/sessions/:id` | GET | 获取单个会话（v2.0+） |
| `/api/agent/sessions/:id` | DELETE | 删除对话 |
| `/api/agent/chat` | POST | 创建会话或发送消息（同步，已弃用） |
| `/api/agent/chat/stream` | POST | SSE 流式对话（主要入口） |
| `/api/agent/approval` | POST | 批准 / 拒绝待处理的危险操作 |
| `/api/agent/compact` | POST | 手动压缩会话上下文 |
| `/api/agent/answer` | POST | 回答待处理的 `ask_user` 问题 |
| `/api/agent/stop` | POST | 中止进行中的请求并保存部分状态 |
| `/api/agent/mcp/refresh` | POST | 强制重新发现 MCP 服务器 |
| `/api/agent/search` | GET | 跨会话搜索消息 |
| `/api/agent/search/sessions` | GET | 按标题/内容搜索会话 |
| `/api/agent/share` | POST/GET | 创建或读取会话的分享链接 |
| `/share/<token>` | GET | 已分享会话的公开分享页 |

### POST /api/agent/chat

**创建新会话**：
```json
{
  "agent": "assistant",
  "provider": "openai/gpt-4o",
  "project": "My Mod",
  "task": "Help me review the code quality of this project"
}
```

**继续对话**：
```json
{
  "session": "abc123",
  "message": "Also check for performance issues"
}
```

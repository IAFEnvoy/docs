---
sidebar_position: 4
title: agents.yml
description: 智能体定义、统一的 MCP 绑定（内置 + 外部）以及系统提示词文件引用
---

# agents.yml

## 完整示例

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

## 字段参考

| 字段 | 类型 | 说明 |
|------|------|-------------|
| `id` | string | 唯一的智能体 ID |
| `name` | string | 显示名称 |
| `description` | string | 简短描述 |
| `max_instances` | int | 最大并发实例数（避免资源冲突） |
| `temperature` | float | LLM 温度（0–1） |
| `sub_agents` | string[] | 该智能体可通过 `CALL:` 语法委派任务的子智能体 ID |
| `mcps` | string[] | 统一的工具来源：内置提供商 ID + 外部 MCP 服务器 ID |
| `agent_md_file` | string | 系统提示词文件路径（推荐） |
| `agent_md` | string | 内联系统提示词（旧格式） |

## 统一的 `mcps` 字段

`mcps` 字段把**内置工具提供商**与**外部 MCP 服务器**合并为一个列表。每个 ID 在运行时解析：

| ID 前缀 | 来源 | 示例工具 |
|-----------|--------|---------------|
| `read_only` | 内置 | `read_file`、`list_files`、`file_search`、`grep_search`、`view_image` |
| `read_write` | 内置 | `write_file`、`create_file`、`create_directory`、`replace_string_in_file`、`multi_replace_string_in_file` |
| `web` | 内置 | `fetch_webpage` |
| `todo` | 内置 | `manage_todo_list` |
| `ask` | 内置 | `ask_user` |
| `shell` | 内置 | `shell_exec` |
| （其他） | 外部 MCP | 在 `mcps.yml` 中定义，例如 `github-mcp`、`open-websearch` |

系统会自动判断某个 ID 是内置提供商还是 MCP 服务器——无需单独的 `builtin_tools` 字段。

## 子智能体架构

系统支持 `CALL: <agent_id> <task>` 语法来委派任务：

1. 当需要子智能体协助时，智能体的 LLM 输出 `CALL: code-reviewer Review main.go`
2. 系统会用子智能体自己的系统提示词和工具独立启动它
3. 结果返回后，父智能体继续执行

关键字段：
- `sub_agents` —— 该智能体可以委派的子智能体 ID 列表
- 子智能体独立继承各自的 `mcps` 配置

## 前端

- **智能体卡片**展示名称、描述、实例数量和工具标签
- **内置提供商标签**显示为具名徽章（例如 "File System (Read/Write)"、"Terminal Commands"）
- **外部 MCP 标签**显示服务器名称及状态指示
- **子智能体输入区**默认折叠；父智能体始终展开
- 如果提示词缺少 `${tools_overview}` 或 MCP 服务器状态异常，会出现 ⚠️ 警告徽章

## 提示词文件

推荐使用 `agent_md_file` 引用外部 Markdown 文件，便于编辑和版本管理。

提示词文件存放在 `prompts/` 目录：

```
prompts/
├── assistant.md
├── mc-modder.md
├── bug-fixer.md
├── code-reviewer.md
└── tester.md
```

仓库中已有的 `config/agents.yml` 默认定义了五个智能体：`assistant`、`mc-modder`、`bug-fixer`、`code-reviewer` 和 `tester`——每个都由上面对应的提示词文件提供内容。

修改后，使用 **🛠 Admin** 菜单 → **Reload Local Config** 进行热重载。

:::tip 提示词占位符
提示词文件支持 `${placeholder}` 语法。使用 `${tools_overview}` 可自动注入完整工具列表——它覆盖 `mcps` 中的所有条目（内置与外部）。完整列表见[提示词文件 → 占位符](prompts#placeholders)。
:::

## 内联格式（旧式）

如果不使用文件引用，也可以直接在 YAML 中内联提示词：

```yaml
- id: "my-agent"
  agent_md: |
    You are a professional assistant.
    You can do many things.
```

不过，为便于维护，推荐使用 `agent_md_file`。

## MCP 绑定

`mcps` 字段引用所有工具来源。创建智能体实例时，内置工具会直接注册为 Function Calling 工具，外部 MCP 服务器则通过 stdio 或 HTTP 自动连接。

智能体与工具来源是解耦的——同一个 MCP 服务器或内置提供商可以被多个智能体共享。

---
sidebar_position: 7
title: 提示词文件
description: 编写与管理智能体系统提示词
---

# 提示词文件

智能体系统提示词以 Markdown 文件形式存放在 `prompts/` 目录中。

## 文件布局

```
prompts/
├── assistant.md       # General Assistant
├── mc-modder.md       # Minecraft Mod Developer
├── bug-fixer.md       # Bug Fixer
├── code-reviewer.md   # Code Reviewer
└── tester.md          # Test Assistant
```

没有专门的调度器提示词文件——调度型智能体（即配置了 `sub_agents` 的智能体）只需编写通用工作流规则，子智能体列表会自动注入（见下文）。

## 编写提示词

提示词文件就是普通 Markdown。其内容会直接作为系统消息发送给 LLM。

```markdown
You are a professional assistant. You can:
- Do something
- Do something else
Please answer concisely and clearly.
```

:::tip 提示
- 清楚列出智能体的能力
- 明确期望的输出格式
- 说明可用的工具类型
- 保持简洁——避免过长的提示词
:::

## 占位符 {#placeholders}

提示词文件支持 `${placeholder}` 语法，用于动态注入内容。构建系统消息时，所有占位符都会在运行时展开。

### 可用占位符

| 占位符              | 说明                            | 示例输出                          |
|--------------------------|----------------------------------------|-----------------------------------------|
| `${current_time}`        | 当前时间（HH:MM:SS）                | `14:30:00`                              |
| `${current_date}`        | 当前日期（YYYY-MM-DD）              | `2026-06-10`                            |
| `${current_datetime}`    | 当前日期和时间                  | `2026-06-10 14:30:00`                   |
| `${model_name}`          | 当前 LLM 的显示名称               | `DeepSeek V4 Flash`                     |
| `${model_id}`            | 当前 LLM 的模型 ID                   | `deepseek-v4-flash`                     |
| `${agent_name}`          | 智能体显示名称                     | `General Assistant`                     |
| `${agent_id}`            | 智能体配置 ID                        | `assistant`                             |
| `${tools_overview}`      | 所有可用工具（内置 + MCP）    | 见下方示例                       |

### 工具概览示例

在提示词中加入 `${tools_overview}` 后，模型会看到一个统一的工具列表——既包含内置提供商，也包含 `mcps` 字段中的外部 MCP 服务器：

```markdown
- Unmodifiable File System (read_only): read_file, list_files, view_image, file_search, grep_search
- Modifiable File System (read_write): write_file, create_file, create_directory, replace_string_in_file, multi_replace_string_in_file
- Web Fetch (web): fetch_webpage
- TODO Tracking (todo): manage_todo_list
- Ask User (ask): ask_user
- Shell Command (shell): shell_exec
- ✓ GitHub (github-mcp, 26 tools: add_issue_comment, create_branch, create_issue, ...)
- ✓ Open WebSearch (open-websearch, 3 tools: search_web, fetch_page, ...)


### Recommended Usage

Always include `${tools_overview}` so the model knows which tools are available:

```markdown
You are a professional code reviewer. Current time: ${current_datetime}, running model: ${model_name}.

## Available Tools
${tools_overview}

## Responsibilities
- Review code quality, security, and performance
- Discover potential bugs and logic errors
- Provide improvement suggestions
- Check code style and best practices
```

:::warning 重要
如果你在 `mcps` 中配置了工具，却忘记在提示词中加入 `${tools_overview}`，智能体卡片会显示 ⚠️ 警告徽章。
:::

## 调度器提示词

对于调度型智能体，提示词文件中只需编写**通用工作流规则**。子智能体列表会在运行时从 `agents.yml` 动态注入——无需硬编码智能体名称：

```markdown
You are an intelligent task dispatcher. Your job is to analyse user tasks,
decompose them into sub-tasks, and delegate to specialised sub-agents.

## Workflow
...

## Rules
1. Read the "Available Sub-Agents" list above and assign based on expertise
2. Each sub-task must be self-contained
3. Only assign sub-agents that are relevant
4. Aggregate results into a coherent final answer
```

## 热重载

修改提示词文件后，使用 **🛠 Admin** 菜单 → **Reload Local Config** 进行热重载。新建的智能体实例会使用更新后的提示词。

## 相关配置

提示词文件路径在 `agents.yml` 中通过 `agent_md_file` 字段指定：

```yaml
agents:
  - id: "my-agent"
    agent_md_file: "prompts/my-agent.md"
```

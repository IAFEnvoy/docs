---
sidebar_position: 7
title: Prompt Files
description: Writing and managing Agent system prompts
---

# Prompt Files

Agent system prompts are stored as Markdown files in the `prompts/` directory.

## File Layout

```
prompts/
├── assistant.md       # General Assistant
├── mc-modder.md       # Minecraft Mod Developer
├── bug-fixer.md       # Bug Fixer
├── code-reviewer.md   # Code Reviewer
└── tester.md          # Test Assistant
```

There is no dedicated dispatcher prompt file — dispatcher-style agents (those with `sub_agents`) only write generic workflow rules and the sub-agent list is injected automatically (see below).

## Writing Prompts

Prompt files are plain Markdown. The content is sent directly as the system message to the LLM.

```markdown
You are a professional assistant. You can:
- Do something
- Do something else
Please answer concisely and clearly.
```

:::tip Tips
- Clearly list the agent's capabilities
- Specify desired output format
- Mention available tool types
- Keep it concise — avoid overly long prompts
:::

## Placeholders

Prompt files support `${placeholder}` syntax for dynamic content injection. All placeholders are expanded at runtime when the system message is built.

### Available Placeholders

| Placeholder              | Description                            | Example Output                          |
|--------------------------|----------------------------------------|-----------------------------------------|
| `${current_time}`        | Current time (HH:MM:SS)                | `14:30:00`                              |
| `${current_date}`        | Current date (YYYY-MM-DD)              | `2026-06-10`                            |
| `${current_datetime}`    | Current date and time                  | `2026-06-10 14:30:00`                   |
| `${model_name}`          | Current LLM display name               | `DeepSeek V4 Flash`                     |
| `${model_id}`            | Current LLM model ID                   | `deepseek-v4-flash`                     |
| `${agent_name}`          | Agent display name                     | `General Assistant`                     |
| `${agent_id}`            | Agent config ID                        | `assistant`                             |
| `${tools_overview}`      | All available tools (builtin + MCP)    | See example below                       |

### Tool Overview Example

With `${tools_overview}` in your prompt, the model sees a unified list of all tools — both builtin providers and external MCP servers from the `mcps` field:

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

:::warning Important
If you configure tools in `mcps` but forget to include `${tools_overview}` in the prompt, the Agent card will show a ⚠️ warning badge.
:::

## Dispatcher Prompts

For dispatcher agents, only write the **generic workflow rules** in the prompt file. The sub-agent list is dynamically injected from `agents.yml` at runtime — no need to hard-code agent names:

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

## Hot Reload

After editing prompt files, use the **🛠 Admin** menu → **Reload Local Config** to hot-reload. New agent instances will use the updated prompts.

## Related Config

Prompt file paths are specified in `agents.yml` via the `agent_md_file` field:

```yaml
agents:
  - id: "my-agent"
    agent_md_file: "prompts/my-agent.md"
```

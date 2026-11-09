---
title: "提示词模板"
sidebar_position: 6
---

文件：`data/<namespace>/system/prompts/<path>.txt`，UTF-8 文本，也支持 BOM。例如 `data/example/system/prompts/personality/daily.txt` 对应 `example:personality/daily`。

## 内置模板

| ID | 用途 | 占位符 |
| --- | --- | --- |
| `system:routing` | 功能路由 | `{{player_language}}`、`{{capabilities}}` |
| `system:react` | 通用 ReAct 循环 | `{{player_language}}` |
| `system:free_chat` | 自由聊天 | `{{player_language}}` |
| `system:personality/default` | 默认人格 | `{{player_language}}` |
| `system:web_search` | 网页搜索回答 | `{{player_language}}` |
| `system:knowledge_answer` | 本地知识回答 | `{{player_language}}` |
| `system:sign_in` | 签到选择 | `{{player_language}}` |
| `system:quest_narration` | 任务播报 | `{{player_language}}` |
| `system:quest_background` | 任务背景筛选 | `{{player_language}}` |

## 占位符

使用双花括号包裹小写名称，如 `{{player_language}}`。名称首位为字母，后续可用小写字母、数字、下划线；不支持表达式、递归展开或脚本。替换值里的双花括号按原文保留。

玩家语言由执行上下文提供，模块不能覆盖。路由模板必须保留 `{{capabilities}}`，以接收服务端过滤后的能力列表。未知变量、缺失必需模板、空文本和语法错误会拒绝重载，继续使用上一份有效快照。

## 示例人格

```text title="data/example/system/prompts/personality/daily.txt"
你是宿主的补给助手，回答简短清楚，按 {{player_language}} 对话。
涉及资源消耗时说明用途并等待确认，不虚构尚未获得的奖励。
```

在[系统定义](./system.md)中设置 `"personality_prompt": "example:personality/daily"`。人格只注入自由聊天，专用工作流仍使用对应业务模板。

## 覆盖和生效

数据包可覆盖内置相同路径的 TXT。执行 `/reload` 后，新请求使用新版本；已经开始的任务保留旧快照。提示词不能绕过权限、工具预算、价格校验或写操作确认。扩展模块使用 `context.prompt(id, parameters)` 渲染自有变量；仅增加 TXT 不会注册模块。

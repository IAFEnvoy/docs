---
title: "Prompt template"
sidebar_position: 6
---

File: `data/<namespace>/system/prompts/<path>.txt`, UTF-8 text, BOM also supported. For example `data/example/system/prompts/personality/daily.txt` corresponds to `example:personality/daily`.

## Built-in templates

| ID | Purpose | Placeholders |
| --- | --- | --- |
| `system:routing` | Capability routing | `{{player_language}}`, `{{capabilities}}` |
| `system:react` | Generic ReAct loop | `{{player_language}}` |
| `system:free_chat` | Free chat | `{{player_language}}` |
| `system:personality/default` | Default personality | `{{player_language}}` |
| `system:web_search` | Web search answer | `{{player_language}}` |
| `system:knowledge_answer` | Local knowledge answer | `{{player_language}}` |
| `system:sign_in` | Sign-in selection | `{{player_language}}` |
| `system:quest_narration` | Quest narration | `{{player_language}}` |
| `system:quest_background` | Quest background filtering | `{{player_language}}` |

## Placeholders

Wrap a lowercase name in double braces, such as `{{player_language}}`. The first character of a name is a letter; later characters may be lowercase letters, digits and underscores; expressions, recursive expansion and scripts are not supported. Double braces inside a replacement value are kept verbatim.

The player language is provided by the execution context and modules cannot override it. The routing template must keep `{{capabilities}}` so that it receives the capability list filtered by the server. Unknown variables, missing required templates, empty text and syntax errors reject the reload, and the previous valid snapshot stays in use.

## Example personality

```text title="data/example/system/prompts/personality/daily.txt"
You are the host's supply assistant. Answer concisely and clearly, and speak in {{player_language}}.
When resource consumption is involved, explain the purpose and wait for confirmation; do not invent rewards that have not been granted.
```

Set `"personality_prompt": "example:personality/daily"` in the [system definition](./system.md). The personality is injected into free chat only; dedicated workflows still use their own business templates.

## Overrides and effect

A data pack can override a built-in TXT at the same path. After running `/reload`, new requests use the new version; tasks that have already started keep the old snapshot. Prompts cannot bypass permissions, tool budgets, price validation or write-operation confirmation. Extension modules use `context.prompt(id, parameters)` to render their own variables; adding a TXT alone does not register a module.

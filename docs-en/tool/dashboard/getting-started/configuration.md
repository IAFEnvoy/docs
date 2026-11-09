---
sidebar_position: 2
title: Configuration Overview
description: Overview of all config files and their purposes
---

# Configuration Overview

All configuration files are located in the `config/` directory at the project root:

| File | Purpose | Required |
|------|---------|----------|
| `config.yml` | Server port, data source concurrency, caching, project paths, Codacy | Yes |
| `auth.yml` | API keys, GitHub tokens, admin credentials | Yes |
| `ai.yml` | AI provider and model configuration | No |
| `agents.yml` | Agent definitions and MCP bindings | No |
| `mcps.yml` | External MCP server list | No |
| `rate.yml` | Maintenance difficulty scoring coefficients | No |
| `editor.yml` | Mod editor prefill options (licenses, architectures, tags) | No |
| `configuration.json` | UI presets — status colors, loader colors, version-support emoji | No |
| `status_config.json` | Maintenance status order and archived statuses | No |
| `prompts/*.md` | Agent system prompt files (referenced by `agents.yml`) | No |

## Environment Variable Placeholders

Use `${ENV_VAR}` syntax to reference environment variables in any YAML config file:

```yaml
api_key: "${OPENAI_API_KEY}"  # Reads from the OPENAI_API_KEY env var
```

## Hot Reload

After logging in, use the **🛠 Admin** menu → **Reload Local Config** to reload all YAML/JSON configs, prompt files, and the mod catalog without restarting the server.

## Detailed Docs

- [config.yml](/docs/tool/dashboard/configuration/config-yml) — Server, data sources & Codacy
- [auth.yml](/docs/tool/dashboard/configuration/auth-yml) — API keys & login
- [ai.yml](/docs/tool/dashboard/configuration/ai-yml) — AI providers & models
- [agents.yml](/docs/tool/dashboard/configuration/agents-yml) — Agent definitions
- [mcps.yml](/docs/tool/dashboard/configuration/mcps-yml) — MCP servers
- [rate.yml](/docs/tool/dashboard/configuration/rate-yml) — Difficulty scoring
- [editor.yml](/docs/tool/dashboard/configuration/editor-yml) — Editor prefill options
- [Prompt files](/docs/tool/dashboard/configuration/prompts) — Agent system prompts

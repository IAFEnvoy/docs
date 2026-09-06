---
sidebar_position: 1
title: Introduction
description: ModList Dashboard is a Go-built Minecraft Mod data dashboard with an integrated LangChainGo AI Agent system
---

# ModList Dashboard

ModList Dashboard is a full-stack project for managing and displaying Minecraft Mod statistics, editing mod metadata, and chatting with a built-in multi-AI Agent system powered by LangChainGo.

> Source code: [github.com/IAFEnvoy/ModList-Dashboard](https://github.com/IAFEnvoy/ModList-Dashboard)
> · Build & first-run guide: [project README](https://github.com/IAFEnvoy/ModList-Dashboard#readme)

## Core Features

| Module | Description |
|--------|-------------|
| **Mod Dashboard** | List / scatter plot views showing Mod data from CurseForge, GitHub & Codacy |
| **Mod Meta Editor** | Admin CRUD for every mod (ID, name, status, tags, loaders, per-version support matrix, logo upload), with prefill options driven by `config/editor.yml` |
| **GitHub Panel** | Aggregates Issues & Pull Requests across all repos with filtering and archive toggle |
| **Todo System** | Independent Bug & TODO tracker with add / check / delete, login-gated |
| **Cache Management** | One-click per-source cache clearing (database / CurseForge / GitHub / Codacy / all) from the admin menu |
| **AI Agent** | LangChainGo-powered multi-Agent chat with native Function Calling, streaming SSE, MCP toolchain, user approval, Issue Dispatch, issue picker, and real token tracking |
| **Drive** | Lightweight built-in file manager rooted at `data/drive` |
| **i18n** | Built-in Chinese & English bilingual support |

## Tech Stack

- **Backend**: Go 1.24 + `net/http` + SQLite (`glebarez/sqlite`, pure-Go, no CGO) + `yaml.v3`
- **Frontend**: Vanilla HTML/CSS/JS (zero framework dependencies)
- **AI**: LangChainGo `v0.1.14` with native OpenAI-compatible Function Calling; DeepSeek-compatible API with thinking mode
- **MCP**: stdio + streamableHttp + SSE transport support
- **Data Sources**: CurseForge API, GitHub API, Codacy API

## Storage Layout

All runtime state is stored under `config/`, `data/`, and `cache/` at the project root:

| Path | Content |
|------|---------|
| `config/` | YAML / JSON configuration (`config.yml`, `auth.yml`, `ai.yml`, `agents.yml`, `mcps.yml`, `rate.yml`, `editor.yml`, `configuration.json`, `status_config.json`) |
| `data/mods.db` | Normalized mod catalog (mods, versions × loaders, tags, co-authors, difficulty) plus the cached primary-key → result mapping |
| `data/users.db` | Admin / user accounts |
| `data/sessions.db` | AI Agent sessions & message history |
| `data/todos.json` | Bug / TODO items |
| `data/drive/` | Built-in Drive files |
| `cache/` | Per-source HTTP caches (`curseforge/`, `github/`, `codacy/`) and MCP discovery cache (`mcp_cache.json`) |
| `prompts/` | Agent system prompt Markdown files |

## Project Structure

```
ModList-Dashboard/
├── main.go              # Entry point + route registration
├── config.go            # Shared YAML loaders
├── handlers.go          # HTTP handlers
├── middleware.go        # CORS / no-cache middleware
├── auth.go / users.go   # Authentication & account management
├── cache.go             # Per-source cache layer
├── curseforge.go        # CurseForge API client
├── github.go            # GitHub API client (Issues / PRs)
├── codacy.go            # Codacy API client (code quality)
├── modsdb.go            # mods.db schema & migration (normalized SQLite)
├── types.go             # Type definitions + difficulty formula
├── drive.go             # Built-in file manager API
├── agent/               # AI Agent module (LangChainGo)
│   ├── handlers.go      # SSE streaming HTTP handlers
│   ├── executor.go      # Session lifecycle management
│   ├── subagent.go      # Agent loop + sub-agent dispatch
│   ├── llm.go           # LLM runtime + native Tool Calling
│   ├── database.go      # Session persistence (data/sessions.db)
│   ├── tools.go         # Builtin tools + safety + approval
│   ├── mcp.go           # MCP client (stdio / HTTP / SSE)
│   ├── project.go       # Project discovery / cloning
│   ├── share.go         # Session share pages
│   └── ...
├── drive-mcp/           # Optional Drive MCP server
├── static/              # Frontend static assets (HTML / CSS / JS / i18n locales)
├── config/              # YAML + JSON configuration
├── data/                # Runtime databases & Drive root
├── cache/               # Disk caches
└── prompts/             # Agent system prompts
```

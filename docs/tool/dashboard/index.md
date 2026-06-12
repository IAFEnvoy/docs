---
sidebar_position: 1
title: Introduction
description: ModList Dashboard is a Go-built Minecraft Mod data dashboard with an integrated LangChainGo AI Agent system
---

# ModList Dashboard

:::danger Not Released Project
This project is currently in early development and is not yet released. The codebase and features are subject to significant changes. Stay tuned for updates!
:::

ModList Dashboard is a full-stack project for managing and displaying Minecraft Mod statistics, with a built-in multi-AI Agent chat system powered by LangChainGo.

## Core Features

| Module | Description |
|--------|-------------|
| **Mod Dashboard** | List / scatter plot views showing Mod data from CurseForge, Modrinth, GitHub & Codacy |
| **GitHub Panel** | Aggregates Issues & Pull Requests across all repos with filtering and archive toggle |
| **Todo System** | Independent Bug & TODO tracker with add / check / delete, login-gated |
| **AI Agent** | LangChainGo-powered multi-Agent chat with native Function Calling, streaming SSE, MCP toolchain, and user approval |
| **i18n** | Built-in Chinese & English bilingual support |

## Tech Stack

- **Backend**: Go + `net/http` + `langchaingo v0.1.14` + `yaml.v3`
- **Frontend**: Vanilla HTML/CSS/JS (zero framework dependencies)
- **AI**: LangChainGo with native OpenAI Function Calling; DeepSeek-compatible API
- **MCP**: stdio + streamableHttp + SSE transport support
- **Data Sources**: CurseForge API, Modrinth API, GitHub API, Codacy API

## Project Structure

```
ModList-Dashboard/
├── main.go              # Entry point + route registration
├── middleware.go         # CORS / cache middleware
├── auth.go              # Authentication
├── agent/               # AI Agent module (LangChainGo)
│   ├── llm.go           # LLM runtime + native Tool Calling
│   ├── subagent.go      # Agent loop + sub-agent dispatch
│   ├── handlers.go      # SSE streaming HTTP handlers
│   ├── executor.go      # Session lifecycle management
│   ├── tools.go         # Builtin tools + safety + approval
│   ├── mcp.go           # MCP client (stdio / HTTP / SSE)
│   ├── types.go         # Type definitions
│   ├── persist.go       # Session persistence (per-file)
│   ├── context.go       # Token usage & auto-compress
│   └── config.go        # YAML config loader
├── static/              # Frontend static assets
│   ├── index.html
│   ├── css/
│   └── js/
│       ├── LLMStream2.js  # SSE streaming client
│       ├── agent-chat.js  # Chat UI + block protocol
│       ├── agent-ask.js   # Ask-user dialog
│       └── agent-todo.js  # Todo widget
├── data/
│   └── sessions/        # Per-session JSON files
├── wiki/                # Documentation
└── mcps.yml             # MCP server configuration
│   └── locales/         # i18n language files
├── data/                # Mod JSON data
├── prompts/             # Agent system prompts
├── wiki/                # Documentation
└── *.yml                # Configuration files
```

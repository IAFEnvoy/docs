---
sidebar_position: 1
title: 介绍
description: ModList Dashboard 是一个用 Go 构建的 Minecraft 模组数据面板，内置基于 LangChainGo 的 AI 智能体系统
---

# ModList Dashboard

ModList Dashboard 是一个全栈项目，用于管理和展示 Minecraft 模组统计数据、编辑模组元数据，并与内置的多 AI 智能体系统对话，该系统由 LangChainGo 驱动。

> 源代码：[github.com/IAFEnvoy/ModList-Dashboard](https://github.com/IAFEnvoy/ModList-Dashboard)
> · 构建与首次运行指南：[项目 README](https://github.com/IAFEnvoy/ModList-Dashboard#readme)

## 核心功能

| 模块 | 说明 |
|--------|-------------|
| **模组面板** | 列表 / 散点图视图，展示来自 CurseForge、GitHub 与 Codacy 的模组数据 |
| **模组元数据编辑器** | 管理员可对每个模组执行增删改查（ID、名称、状态、标签、加载器、按版本的支持矩阵、图标上传），预填选项由 `config/editor.yml` 驱动 |
| **GitHub 面板** | 汇总所有仓库的 Issue 与 Pull Request，支持筛选和归档开关 |
| **待办系统** | 独立的 Bug 与 TODO 跟踪器，支持添加 / 勾选 / 删除，写入需登录 |
| **缓存管理** | 在管理员菜单中一键清理单个来源的缓存（database / CurseForge / GitHub / Codacy / 全部） |
| **徽章 API** | 面向模组 README 的公开 SVG 徽章（`/api/badge/...`）——CurseForge / GitHub 统计、加载器、许可证、文档、Discord。由缓存提供，无需登录 |
| **AI 智能体** | 由 LangChainGo 驱动的多智能体对话，支持原生 Function Calling、SSE 流式输出、MCP 工具链、用户审批、Issue 派发、Issue 选择器以及真实令牌统计 |
| **Drive** | 内置轻量文件管理器，根目录为 `data/drive` |
| **i18n** | 内置中英双语支持 |

## 技术栈

- **后端**：Go 1.24 + `net/http` + SQLite（`glebarez/sqlite`，纯 Go，无 CGO）+ `yaml.v3`
- **前端**：原生 HTML/CSS/JS（零框架依赖）
- **AI**：LangChainGo `v0.1.14`，使用原生 OpenAI 兼容的 Function Calling；兼容 DeepSeek 的 API，支持思考模式
- **MCP**：支持 stdio + streamableHttp + SSE 传输
- **数据来源**：CurseForge API、GitHub API、Codacy API

## 存储布局

所有运行时状态都存放在项目根目录的 `config/`、`data/` 和 `cache/` 下：

| 路径 | 内容 |
|------|---------|
| `config/` | YAML / JSON 配置（`config.yml`、`auth.yml`、`ai.yml`、`agents.yml`、`mcps.yml`、`rate.yml`、`editor.yml`、`configuration.json`、`status_config.json`） |
| `data/mods.db` | 规范化后的模组目录（模组、版本 × 加载器、标签、共同作者、维护难度）以及缓存的主键 → 结果映射 |
| `data/users.db` | 管理员 / 用户账号 |
| `data/sessions.db` | AI 智能体会话与消息历史 |
| `data/todos.json` | Bug / TODO 条目 |
| `data/drive/` | 内置 Drive 文件 |
| `cache/` | 按来源划分的 HTTP 缓存（`curseforge/`、`github/`、`codacy/`）以及 MCP 发现缓存（`mcp_cache.json`） |
| `prompts/` | 智能体系统提示词 Markdown 文件 |

## 项目结构

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

---
sidebar_position: 1
title: Installation
description: How to deploy ModList Dashboard from scratch
---

# Installation

## Prerequisites

- **Go** 1.24+ (For compile only, not required for runtime)
- **Node.js** 18+ (for MCP servers launched via `npx`)
- **Git** (required for cloning projects into the Agent workspace)
- Optional: **Python 3.10+** + `uv` (for `uvx`-based MCP servers)

The backend is pure Go with a pure-Go SQLite driver, so no CGO / GCC toolchain is required.

## Step 1: Clone the project

```bash
git clone <your-repo-url>
cd ModList-Dashboard
```

## Step 2: Configure credentials

Configuration lives in the `config/` directory. Copy the checked-in templates and fill in your API keys and admin password:

| File | What to fill in |
|------|-----------------|
| `config/auth.yml` | CurseForge API key, GitHub tokens (one per account), Codacy token, admin username/password |
| `config/config.yml` | Server port, cache TTL, data source concurrency, Codacy analysis, Agent project paths |
| `config/ai.yml` | (Optional) AI providers / models for the Agent system |
| `config/mcps.yml` | (Optional) External MCP servers |
| `config/agents.yml` | (Optional) Agent definitions and tool bindings |

Sensitive values may reference environment variables with the `${ENV_VAR}` syntax, e.g.:

```yaml
# config/auth.yml
curseforge:
  api_key: "${CURSEFORGE_API_KEY}"
```

See [Configuration Overview](/docs/tool/dashboard/getting-started/configuration) for the full file list.

## Step 3: Build & run

```bash
# Fetch dependencies (or use the vendored copy in ./vendor)
go mod download

# Build
go build -o modlist-dashboard.exe .

# Run
./modlist-dashboard.exe
```

On first start the server automatically creates the runtime databases under `data/` and cache directories under `cache/`. It logs the listening address, for example:

```
[Start] Mod Dashboard started at http://localhost:3456
```

The port is taken from `config/config.yml` → `server.port` (default `3456`).

## Step 4: Verify

1. Open the printed URL in a browser.
2. Log in with the admin account configured in `config/auth.yml`.
3. If you already have a `data/mods.db` (normalized mod catalog), the dashboard loads it directly. Otherwise, add mods through **🛠 Admin → Edit Mods**.

## Runtime Storage

| Path | Content |
|------|---------|
| `data/mods.db` | Mod catalog (normalized), version/loader support matrix, tags, co-authors, maintenance difficulty and the cached id → result mapping |
| `data/users.db` | User accounts |
| `data/sessions.db` | AI Agent conversations |
| `data/todos.json` | Bug / TODO items |
| `data/drive/` | Built-in Drive files |
| `cache/` | CurseForge / GitHub / Codacy caches and `mcp_cache.json` |

## Deployment Options

### Docker

```dockerfile
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o modlist-dashboard .

FROM alpine:3.20
RUN apk add --no-cache nodejs npm python3 git
WORKDIR /app
COPY --from=builder /app/modlist-dashboard .
COPY --from=builder /app/static ./static
COPY --from=builder /app/config ./config
COPY --from=builder /app/prompts ./prompts
RUN mkdir -p data cache
EXPOSE 3456
CMD ["./modlist-dashboard"]
```

### systemd (Linux)

```ini
[Unit]
Description=ModList Dashboard
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/opt/modlist-dashboard
ExecStart=/opt/modlist-dashboard/modlist-dashboard
Restart=on-failure
Environment="CURSEFORGE_API_KEY=xxx"
Environment="GITHUB_TOKEN=xxx"

[Install]
WantedBy=multi-user.target
```

### Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name dashboard.example.com;

    location / {
        proxy_pass http://127.0.0.1:3456;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

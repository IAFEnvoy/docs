---
sidebar_position: 1
title: 安装
description: 如何从零部署 ModList Dashboard
---

# 安装

## 前置条件

- **Go** 1.24+（仅编译需要，运行时不需要）
- **Node.js** 18+（用于通过 `npx` 启动的 MCP 服务器）
- **Git**（将项目克隆到智能体工作区时需要）
- 可选：**Python 3.10+** + `uv`（用于基于 `uvx` 的 MCP 服务器）

后端是纯 Go，并使用纯 Go 的 SQLite 驱动，因此不需要 CGO / GCC 工具链。

## 步骤 1：克隆项目

```bash
git clone <your-repo-url>
cd ModList-Dashboard
```

## 步骤 2：配置凭据

配置位于 `config/` 目录。复制仓库中已提供的模板，填入 API 密钥和管理员密码：

| 文件 | 需要填写的内容 |
|------|-----------------|
| `config/auth.yml` | CurseForge API 密钥、GitHub 令牌（每个账号一个）、Codacy 令牌、管理员用户名/密码 |
| `config/config.yml` | 服务端口、缓存 TTL、数据源并发数、Codacy 分析、智能体项目路径 |
| `config/ai.yml` | （可选）智能体系统使用的 AI 提供商 / 模型 |
| `config/mcps.yml` | （可选）外部 MCP 服务器 |
| `config/agents.yml` | （可选）智能体定义与工具绑定 |

敏感值可以用 `${ENV_VAR}` 语法引用环境变量，例如：

```yaml
# config/auth.yml
curseforge:
  api_key: "${CURSEFORGE_API_KEY}"
```

完整文件列表见[配置概览](./configuration)。

## 步骤 3：构建并运行

```bash
# Fetch dependencies (or use the vendored copy in ./vendor)
go mod download

# Build
go build -o modlist-dashboard.exe .

# Run
./modlist-dashboard.exe
```

首次启动时，服务会自动在 `data/` 下创建运行时数据库，并在 `cache/` 下创建缓存目录。它会输出监听地址，例如：

```
[Start] Mod Dashboard started at http://localhost:3456
```

端口取自 `config/config.yml` → `server.port`（默认 `3456`）。

## 步骤 4：验证

1. 在浏览器中打开输出的 URL。
2. 使用 `config/auth.yml` 中配置的管理员账号登录。
3. 如果你已有 `data/mods.db`（规范化后的模组目录），面板会直接加载它。否则，通过 **🛠 Admin → Edit Mods** 添加模组。

## 运行时存储

| 路径 | 内容 |
|------|---------|
| `data/mods.db` | 模组目录（规范化）、版本/加载器支持矩阵、标签、共同作者、维护难度以及缓存的 id → 结果映射 |
| `data/users.db` | 用户账号 |
| `data/sessions.db` | AI 智能体对话 |
| `data/todos.json` | Bug / TODO 条目 |
| `data/drive/` | 内置 Drive 文件 |
| `cache/` | CurseForge / GitHub / Codacy 缓存以及 `mcp_cache.json` |

## 部署方式

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

### systemd（Linux）

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

### 反向代理（Nginx）

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

---
sidebar_position: 2
title: auth.yml
description: API 密钥、GitHub 令牌与管理员登录凭据
---

# auth.yml

## 完整示例

```yaml
curseforge:
  api_key: "${CURSEFORGE_API_KEY}"   # CurseForge API Key

github:
  tokens:
    IAFEnvoy: "${GITHUB_TOKEN}"       # Account: Token
    CodeOfArdonia: "${GITHUB_TOKEN2}"

codacy:
  api_token: "${CODACY_API_TOKEN}"    # Codacy API Token

admin:
  username: "admin"                   # Admin username
  password: "your_password"           # Admin password
```

## 字段参考

### curseforge

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `api_key` | string | CurseForge API 密钥。可从 [CurseForge Console](https://console.curseforge.com/) 获取 |

### github

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `tokens` | map | GitHub 账号名到个人访问令牌（Personal Access Token）的映射 |

支持多个 GitHub 账号。系统会根据仓库所有者自动选择正确的令牌：

```yaml
github:
  tokens:
    IAFEnvoy: "ghp_xxxx"
    CodeOfArdonia: "ghp_yyyy"
    AnotherOrg: "ghp_zzzz"
```

:::tip
读取私有仓库的 Issue/PR 时，GitHub 令牌需要 `repo` 权限范围。
:::

### codacy

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `api_token` | string | Codacy API 令牌 |

### admin

用于网页登录的凭据。

| 字段 | 类型 | 说明 |
|-------|------|-------------|
| `username` | string | 登录用户名 |
| `password` | string | 登录密码 |

:::warning
不要把 `auth.yml` 提交到公开仓库。请尽可能用环境变量传递敏感数据。
:::

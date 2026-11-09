---
sidebar_position: 2
title: auth.yml
description: API keys, GitHub tokens, and admin login credentials
---

# auth.yml

## Full Example

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

## Field Reference

### curseforge

| Field | Type | Description |
|-------|------|-------------|
| `api_key` | string | CurseForge API Key. Get it from [CurseForge Console](https://console.curseforge.com/) |

### github

| Field | Type | Description |
|-------|------|-------------|
| `tokens` | map | Map of GitHub account names to Personal Access Tokens |

Supports multiple GitHub accounts. The correct token is auto-selected based on the repo owner:

```yaml
github:
  tokens:
    IAFEnvoy: "ghp_xxxx"
    CodeOfArdonia: "ghp_yyyy"
    AnotherOrg: "ghp_zzzz"
```

:::tip
GitHub tokens need `repo` scope to read Issues/PRs from private repos.
:::

### codacy

| Field | Type | Description |
|-------|------|-------------|
| `api_token` | string | Codacy API Token |

### admin

Credentials for web login.

| Field | Type | Description |
|-------|------|-------------|
| `username` | string | Login username |
| `password` | string | Login password |

:::warning
Do not commit `auth.yml` to public repositories. Use environment variables to pass sensitive data wherever possible.
:::

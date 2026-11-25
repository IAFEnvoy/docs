---
sidebar_position: 9
title: bots.yml
description: Optional Bot notification switches, QQ WebSocket credentials, notification types and static recipients
---

`config/bots.yml` controls the optional Bot module. First startup copies the disabled template from `config/bots.yml.example`. A disabled module does not connect to platforms or create a notification queue. **Restart the service after changing this file**; the admin configuration reload does not reinitialize Bots.

## Complete example

This example enables QQ and leaves targets empty so groups can bind through the website:

```yaml title="config/bots.yml"
enabled: true
notify_new_issues: true
notify_reports: true
dashboard_url: "https://dashboard.example.com"

providers:
  qq:
    enabled: true
    app_id: "${QQBOT_APP_ID}"
    app_secret: "${QQBOT_APP_SECRET}"
    sandbox: false

targets: []
```

QQ events always use **WebSocket**. Do not add `webhook_url` or a callback listening port; these are not configuration fields. Credentials accept literal values or the environment placeholders shown above. Variables must exist in the service process environment. Do not commit real credentials.

## Common fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | bool | `false` | Global switch; at least one platform must be enabled |
| `notify_new_issues` | bool | `true` | Send new Open issue notifications independently of preprocessing |
| `notify_reports` | bool | `true` | Send a plain-text summary after successful preprocessing, with a body of up to 200 characters excluding the header and link |
| `dashboard_url` | string | `""` | Optional external HTTP(S) dashboard address for final-report share links that need no login; no credentials, query or fragment |
| `providers` | object | QQ disabled | Platform configuration; currently supports `qq` |
| `targets` | array | `[]` | Static recipients; may remain empty while groups bind through the website |

## providers.qq

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | bool | `false` | Enable the QQ adapter along with the global switch |
| `app_id` | string | Unset | Required when QQ is enabled; issued by the QQ developer portal |
| `app_secret` | string | Unset | Required when QQ is enabled; accepts environment variables |
| `sandbox` | bool | `false` | Use QQ's sandbox API environment; match test members and the developer portal environment |

The enabled adapter uses official BotGo `v0.2.1` credentials and gateway discovery, opens an outbound WebSocket connection and subscribes to `GROUP_AT_MESSAGE_CREATE` (`1 << 25`). Connections support heartbeats, reconnection backoff and session resumption; no public callback URL is required. QQ's outbound IP allowlist and API permission requirements still apply.

## Static recipients

```yaml
targets:
  - provider: qq
    type: group
    id: "GROUP_OPENID"
  - provider: qq
    type: c2c
    id: "USER_OPENID"
  - provider: qq
    type: channel
    id: "CHANNEL_ID"
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | string | Yes | An enabled platform name; currently `qq` |
| `type` | string | Yes | `group` for groups, `c2c` for direct messages, or `channel` for guild channels |
| `id` | string | Yes | Platform destination ID; group/C2C recipients require OpenIDs, not QQ group/account numbers |

For groups, [website code binding](../features/bot-notifications.md) avoids obtaining an OpenID manually. Static and website recipients coexist; website unbinding does not remove configuration targets. Newly added recipients only receive future notifications.

The group owner must still allow proactive messages in the bot's **group message settings** in mobile QQ. Configuring or binding a destination does not grant this permission.

## Applying settings and storage

Report summaries use one extra tool-free call to the default model in `ai.yml`, retaining the problem assessment and recommendations. Each report produces one message per recipient; summary failures produce a short notice. With `dashboard_url` configured, public shares include only the final report text, excluding attachments, tool history and reasoning.

Notifications, bindings and delivery progress live in `data/bot-notifications.json`, separate from YAML settings. Only binding code hashes are stored; bindings and queues survive restarts. QQ credentials remain in the local configuration or process environment.

The preprocessing switch is managed under **Agent → Settings** and stored in `data/issue-preprocess.json`; it is not a `bots.yml` field. Report notifications require [successful preprocessing](../features/issue-preprocessing.md). Enabling notifications does not enable preprocessing.

See [Bot notifications and QQ binding](../features/bot-notifications.md) for login logs, connection logs and troubleshooting.

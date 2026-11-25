---
sidebar_position: 9
title: bots.yml
description: 可选 Bot 通知开关、QQ WebSocket 凭据、通知类型与固定接收目标
---

`config/bots.yml` 管理可选 Bot 模块。首次启动从 `config/bots.yml.example` 生成默认关闭的配置；关闭时不连接平台，也不创建通知队列。**修改后需重启服务**，管理菜单的配置重载不会重新初始化 Bot。

## 完整示例

以下示例启用 QQ，保留空目标列表以便通过网站绑定群聊：

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

QQ 事件固定通过 **WebSocket** 接收，无需设置 `webhook_url` 或回调监听端口；这些字段不属于配置。凭据可直接填写，也支持上述环境变量占位符。变量必须存在于启动服务的进程环境中；不要提交真实凭据。

## 通用字段

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enabled` | bool | `false` | 总开关；开启后至少启用一个平台 |
| `notify_new_issues` | bool | `true` | 推送新增 Open Issue，独立于预处理开关 |
| `notify_reports` | bool | `true` | 推送成功预处理报告的纯文本摘要，正文最多 200 字，不含标题和链接 |
| `dashboard_url` | string | `""` | 可选的看板外部 HTTP(S) 地址，用于生成无需登录的最终报告分享链接；不能含凭据、查询参数或片段 |
| `providers` | object | QQ 默认关闭 | 平台配置，目前支持 `qq` |
| `targets` | array | `[]` | 固定接收目标；可留空，之后通过网站绑定群聊 |

## providers.qq

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enabled` | bool | `false` | 启用 QQ 适配器，还需开启总开关 |
| `app_id` | string | 未配置 | 启用 QQ 时必填，来自 QQ 开放平台 |
| `app_secret` | string | 未配置 | 启用 QQ 时必填，支持环境变量 |
| `sandbox` | bool | `false` | 使用 QQ 沙箱 API 环境；测试成员和环境需与开放平台配置一致 |

启用后服务使用官方 BotGo `v0.2.1` 获取凭证和网关，建立出站 WebSocket 连接并订阅 `GROUP_AT_MESSAGE_CREATE`（`1 << 25`）。连接具有心跳、退避重连和会话续传；不需要公网回调 URL。服务器仍需满足 QQ 出口 IP 白名单与接口权限要求。

## 固定接收目标

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

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `provider` | string | 是 | 已启用的平台名，目前为 `qq` |
| `type` | string | 是 | `group` 群聊、`c2c` 单聊或 `channel` 频道子频道 |
| `id` | string | 是 | 平台提供的目标 ID；群聊和单聊使用 OpenID，不能填写 QQ 群号或 QQ 号 |

群聊推荐采用[网站一次性码绑定](../features/bot-notifications.md)，无需手动获取 OpenID。固定目标与网站绑定并存；网页解绑不移除配置文件中的目标。添加目标只接收之后的通知，不补发历史内容。

群主仍需在手机 QQ 的机器人**群消息设置**中允许主动推送；配置目标或绑定成功不会自动获得该权限。

## 生效与存储

报告摘要使用 `ai.yml` 默认模型，额外做一次无工具调用，仅保留问题结论与建议。每个报告每个目标只发送一条；摘要失败时发送简短提示。配置 `dashboard_url` 后公开分享仅包含最终报告正文，附件、工具记录和推理不会进入分享页。

通知、绑定和发送进度保存在 `data/bot-notifications.json`，不是 YAML 配置。一次性码仅保存哈希；绑定和队列跨重启保留。QQ 凭证保留在本地配置或进程环境中。

自动预处理开关在 **Agent → 设置** 中管理，保存在 `data/issue-preprocess.json`，不是 `bots.yml` 的字段。报告通知只有在[预处理成功](../features/issue-preprocessing.md)后产生；启用通知不会自动开启预处理。

登录、连接日志及故障排查见 [Bot 通知与 QQ 绑定](../features/bot-notifications.md)。

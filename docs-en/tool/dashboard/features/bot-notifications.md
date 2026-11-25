---
sidebar_position: 6
title: Bot Notifications and QQ Binding
description: Receive binding commands over QQ WebSocket, send new-issue and preprocessing reports, and inspect login and connection logs
---

The optional Bot module sends new-issue notifications and [automatic preprocessing reports](./issue-preprocessing.md). Its current QQ adapter uses the official BotGo SDK and receives events through a **persistent WebSocket connection**. It defaults to disabled.

## Enable the QQ Bot

1. Create a bot in the QQ developer portal, obtain its AppID and AppSecret, enable group messaging, and configure the server's outbound IP allowlist, API permissions and test members.
2. Edit `config/bots.yml`, enable both the global switch and `providers.qq.enabled`, and supply credentials. See [bots.yml](../configuration/bots-yml.md) for a complete example. First startup creates a disabled configuration from the template.
3. Restart the service. The admin configuration reload does not reload the Bot module.
4. Check `[QQBot]` logs: credentials are retrieved first, then the connection is established. `READY` confirms successful WebSocket authentication.

The server needs access to QQ's HTTPS and WSS endpoints. The connection automatically subscribes to group @messages, `GROUP_AT_MESSAGE_CREATE`. No public callback URL or inbound callback port is required. Disable any previous Webhook configuration; the old `/api/bot/qq/webhook` route has been removed.

## Generate a website code and bind a group

1. Log into the website and open **Agent → Settings → QQ group notifications**. Settings appears to the right of **MCP Servers**.
2. Select **Generate binding code**.
3. **@Mention the bot** in the destination group and send `/bind CODE`.
4. The bot replies with the result. The website refreshes bindings every 5 seconds; check it to confirm binding even if the reply fails.

Codes expire after **10 minutes** and work once. Generating another code invalidates that account's previous code for the same binding type. Only send it to the destination group. The server reads `group_openid` from the authenticated QQ event, so you do not need to obtain an OpenID manually; a QQ group number cannot replace it.

Generation, listing and removal require login. Accounts only see and remove their own bindings, and another account cannot take over a bound group. Bindings survive restarts; new bindings only receive future notifications. Website unbinding removes pending deliveries to that group, though an in-flight message can still arrive. Static `targets` must be removed from configuration followed by a restart.

### Command replies

| Group @message | Reply |
| --- | --- |
| `/bind VALID_CODE` | Binding success instructions |
| `/bind` or malformed syntax | Usage instructions |
| Invalid, used or expired code | Instructions to generate a new website code |
| Already bound group | Instructions to check the existing binding |
| Other messages or a mention alone | Bot capabilities and binding instructions |

Feedback uses the message API for **passive replies** with the original `msg_id` and `msg_seq: 1`, without proactive-message permission. Failed replies receive up to three attempts with the same sequence; recent duplicate events do not repeat binding.

## Allow proactive messages

After binding, the **group owner** must use a recent mobile QQ client, select the bot from the group member list, open its **group message settings**, and allow proactive messages. For C2C, the user enables proactive messages on the bot profile. Platform permissions and quotas still apply.

Binding and proactive-message authorization are separate steps. Receiving a `/bind` reply does not establish permission to send issue or report notifications. QQ error `40034105` generally indicates missing proactive-message permission.

## Notification scope and recovery

| Notification | Trigger |
| --- | --- |
| New issue | A successful GitHub TTL or manual cache-clear refresh finds a new Open issue in an unarchived project; each repository's first fetch after every restart only establishes its baseline |
| Preprocessing report | Successful preprocessing triggers one isolated model call for a plain-text summary of up to 200 characters, excluding the header and final link; one message per recipient |

New-issue notifications are independent of the preprocessing switch, but require the GitHub data source and the repository owner's token. Historical issues, pull requests, edits and reopened old issues do not generate new-issue notifications.

The summary uses the default model in `ai.yml` with a single request containing the final report, without chat history or tools. It retains the problem, validity assessment, main cause and recommendation, omitting detailed code paths, reproduction and verification steps. Markdown is removed and the body is limited to 200 characters before sending. All recipients share one generated summary. Generation times out after 60 seconds; failures produce a short completion notice and a log instead of reverting to a long report.

When `dashboard_url` is configured, the message ends with a report link using the existing `/share/<id>` feature. **No login is required to view it.** The share page contains only the final report message, excluding attachments, tool output, intermediate messages and reasoning. The complete conversation remains available after website login. Without the address, the message asks readers to check the website and omits the link.

`data/bot-notifications.json` stores bindings, code hashes, repository baselines, reports awaiting summaries, generated summaries and delivery progress. Failed sends retry with a 10–320 second backoff and reuse persisted summaries and share links after restart. Old queued long reports are converted to a single summary before delivery. Removed targets or disabled notification types discard their pending messages rather than redirecting them to new recipients.

Delivery is at least once: a crash after platform acceptance but before progress is saved can repeat a message. Network conditions and platform quotas can also delay delivery.

## Login and connection logs

| Log | Meaning and troubleshooting |
| --- | --- |
| `[QQBot] 登录成功` / `登录失败` | Credential retrieval succeeded or failed; check AppID, AppSecret and network access |
| `刷新登录凭证` success or failure | Expired credential refresh; cached lookups do not repeat success logs |
| `WebSocket 接入成功 READY` | Event connection authentication completed |
| `WebSocket 连接中断` | Reconnection will use backoff; missed heartbeat acknowledgments also trigger reconnects |
| `会话恢复成功 RESUMED` | Session ID and sequence restored the connection; QQ replays missed events first |
| `WebSocket 接入已停止` | Check the error code, sharding, event permissions, bot status and environment; non-retryable failures stop the receiver |
| `[Bot] QQ 群消息回复失败` | Inspect the QQ error code and traceID; distinguish successful binding from successful reply delivery |

Credential logs exclude AppSecret and tokens; connection logs exclude message bodies and binding commands. Heartbeats follow the interval supplied by QQ and run independently of message processing, so blocked replies do not block heartbeats.

## API and extension

GET, POST and DELETE on `/api/admin/bot-bindings` require website authentication. They list the current account's bindings, generate a code and remove a binding. The QQ connection authenticates with Bot credentials.

The common `bot/` module owns codes, events, persistence and the notification queue. `bot/qqbot/` owns QQ authentication, WebSocket events and sending. To add another platform, implement `bot.Sender` (`Validate` / `Send`) and register its adapter and configuration in `bot.go`. Keep platform event reception in its own adapter.

References: [QQ WebSocket](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/event-emit/websocket.html), [group @message events](https://bot.q.qq.com/wiki/develop/api-v2/autogen/event/group_at_message_create.html), [QQ Bot FAQ](https://bot.q.qq.com/wiki/bot_FAQ/).

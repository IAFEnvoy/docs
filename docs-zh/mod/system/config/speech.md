---
title: "语音合成与播报"
sidebar_position: 10
---

文件：`config/system/system-speech.json`。作用侧：**客户端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `enabled` | 布尔值 | 否 | `false` | 启用播报；API Key 等信息仍需有效。 |
| `provider` | 字符串 | 否 | `"aliyun"` | 提供器 ID，内置 aliyun。 |
| `apiKey` | 字符串 | 否 | `""` | 个人百炼 API Key，仅保存在客户端。 |
| `region` | 字符串 | 否 | `"beijing"` | 服务区域，须与 Key / 音色一致。 |
| `workspace` | 字符串 | 否 | `""` | 可选 Workspace ID。 |
| `model` | 字符串 | 否 | `"qwen3-tts-flash"` | 合成模型，默认 qwen3-tts-flash。 |
| `voice` | 字符串 | 否 | `"Cherry"` | 默认或自定义音色 ID，须匹配模型。 |
| `language` | 字符串 | 否 | `"Client"` | Client 跟随客户端语言，或服务支持的合成语种，如 Auto、Chinese、English。 |
| `volume` | 整数 | 否 | `80` | 播报音量，0～100。 |
| `cacheEnabled` | 布尔值 | 否 | `false` | 本地音频缓存，默认关闭。 |
| `questRequirements` | 布尔值 | 否 | `true` | 播报任务要求。 |
| `questRewards` | 布尔值 | 否 | `true` | 播报任务奖励。 |
| `questDescription` | 布尔值 | 否 | `false` | 播报经筛选的任务背景，默认关闭。 |
| `notificationSoundEnabled` | 布尔值 | 否 | `true` | 通知首次展开的提示音，音量为播报音量的 75%。 |

这些凭证及语音用量仅属于当前客户端，不同步给服务端。推荐通过 `/system settings` 的语音标签页修改，设置提交后自动标记并保存；关闭通知、提前确认或切换语音 session 会取消对应播报。

## 随附默认文件

```json title="config/system/system-speech.json"
{
  "enabled": false,
  "provider": "aliyun",
  "apiKey": "",
  "region": "beijing",
  "workspace": "",
  "model": "qwen3-tts-flash",
  "voice": "Cherry",
  "language": "Client",
  "volume": 80,
  "cacheEnabled": false,
  "questRequirements": true,
  "questRewards": true,
  "questDescription": false,
  "notificationSoundEnabled": true
}
```

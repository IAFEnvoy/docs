---
title: "Speech synthesis and narration"
sidebar_position: 10
---

File: `config/system/system-speech.json`. Side: **client**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `enabled` | Boolean | no | `false` | Enables narration; information such as the API key must still be valid. |
| `provider` | String | no | `"aliyun"` | Provider ID; aliyun is built in. |
| `apiKey` | String | no | `""` | Personal Bailian API key, kept only on the client. |
| `region` | String | no | `"beijing"` | Service region; must match the key / voice. |
| `workspace` | String | no | `""` | Optional Workspace ID. |
| `model` | String | no | `"qwen3-tts-flash"` | Synthesis model, `qwen3-tts-flash` by default. |
| `voice` | String | no | `"Cherry"` | Default or custom voice ID; must match the model. |
| `language` | String | no | `"Client"` | Client follows the client language, or a synthesis language supported by the service, such as Auto, Chinese or English. |
| `volume` | Integer | no | `80` | Narration volume, 0–100. |
| `cacheEnabled` | Boolean | no | `false` | Local audio cache, off by default. |
| `questRequirements` | Boolean | no | `true` | Narrate quest requirements. |
| `questRewards` | Boolean | no | `true` | Narrate quest rewards. |
| `questDescription` | Boolean | no | `false` | Narrate the filtered quest background, off by default. |
| `notificationSoundEnabled` | Boolean | no | `true` | Sound when a notification is first expanded, at 75% of the narration volume. |

These credentials and the speech usage belong only to the current client and are not synced to the server. Prefer editing them in the speech tab of `/system settings`; settings are marked and saved automatically after being submitted. Closing a notification, confirming early or switching the speech session cancels the corresponding narration.

## Bundled default file

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

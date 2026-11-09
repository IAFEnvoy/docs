---
title: "Speech recognition"
sidebar_position: 11
---

File: `config/system/system-asr.json`. Side: **client**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `enabled` | Boolean | no | `false` | Enables optional voice input; Simple Voice Chat is also required. |
| `provider` | String | no | `"aliyun-nls"` | aliyun-nls is built in. |
| `appKey` | String | no | `""` | AppKey of the NLS project. |
| `accessKeyId` | String | no | `""` | AccessKey ID used to request a temporary token. |
| `accessKeySecret` | String | no | `""` | The matching AccessKey Secret, kept only on the client. |
| `region` | String | no | `"shanghai"` | NLS region, `shanghai` by default. |
| `autoSend` | Boolean | no | `false` | Send immediately after successful recognition; when off, the text is placed in the input box. |

These credentials and the speech usage belong only to the current client and are not synced to the server. Prefer editing them in the speech tab of `/system settings`; settings are marked and saved automatically after being submitted. Closing a notification, confirming early or switching the speech session cancels the corresponding narration.

## Bundled default file

```json title="config/system/system-asr.json"
{
  "enabled": false,
  "provider": "aliyun-nls",
  "appKey": "",
  "accessKeyId": "",
  "accessKeySecret": "",
  "region": "shanghai",
  "autoSend": false
}
```

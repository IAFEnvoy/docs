---
title: "Web search endpoint"
sidebar_position: 4
---

File: `config/system/system-search.json`. Side: **server**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `baseUrl` | String | no | `"https://api.deepseek.com/v1"` | Base address of the DeepSeek Search / Fetch API. |
| `apiKeyEnvironment` | String | no | `"SYSTEM_DEEPSEEK_API_KEY"` | Name of the API key environment variable, shared with the model by default. |
| `maxResponseBytes` | Integer | no | `4194304` | Upper limit of a single response body, in bytes, positive integer. |

## Bundled default file

```json title="config/system/system-search.json"
{
  "baseUrl": "https://api.deepseek.com/v1",
  "apiKeyEnvironment": "SYSTEM_DEEPSEEK_API_KEY",
  "maxResponseBytes": 4194304
}
```

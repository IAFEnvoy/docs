---
title: "Model endpoint"
sidebar_position: 3
---

File: `config/system/system-model.json`. Side: **server**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `model` | String | no | `"deepseek-chat"` | Model name, `deepseek-chat` by default. |
| `baseUrl` | String | no | `"https://api.deepseek.com"` | OpenAI-compatible service address, HTTP / HTTPS supported. |
| `apiKeyEnvironment` | String | no | `"SYSTEM_DEEPSEEK_API_KEY"` | Name of the environment variable holding the API key; not the key itself. |
| `providerType` | String | no | `"auto"` | auto, openai or deepseek; auto detects it from the service. |
| `thinkingEnabled` | Boolean | no | `false` | DeepSeek thinking mode option. |
| `reasoningEffort` | String | no | `"high"` | Requested reasoning effort, `high` by default; actual support depends on the model. |
| `apiKeyRequired` | Boolean | no | `true` | Whether the service requires an API key; can be disabled for local services without authentication. |
| `jsonMode` | Boolean | no | `true` | Whether to use the service's JSON output mode. |
| `outputTokenParameter` | String | no | `"max_tokens"` | max_tokens or max_completion_tokens. |

## Bundled default file

```json title="config/system/system-model.json"
{
  "model": "deepseek-chat",
  "baseUrl": "https://api.deepseek.com",
  "apiKeyEnvironment": "SYSTEM_DEEPSEEK_API_KEY",
  "providerType": "auto",
  "thinkingEnabled": false,
  "reasoningEffort": "high",
  "apiKeyRequired": true,
  "jsonMode": true,
  "outputTokenParameter": "max_tokens"
}
```

---
title: "模型接口"
sidebar_position: 3
---

文件：`config/system/system-model.json`。作用侧：**服务端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `model` | 字符串 | 否 | `"deepseek-chat"` | 模型名称，默认 deepseek-chat。 |
| `baseUrl` | 字符串 | 否 | `"https://api.deepseek.com"` | 兼容 OpenAI 的服务地址，支持 HTTP / HTTPS。 |
| `apiKeyEnvironment` | 字符串 | 否 | `"SYSTEM_DEEPSEEK_API_KEY"` | 读取 API Key 的环境变量名称；不是密钥正文。 |
| `providerType` | 字符串 | 否 | `"auto"` | auto、openai 或 deepseek；auto 按服务识别。 |
| `thinkingEnabled` | 布尔值 | 否 | `false` | DeepSeek 思考模式选项。 |
| `reasoningEffort` | 字符串 | 否 | `"high"` | 请求的推理强度，默认 high，实际支持由模型决定。 |
| `apiKeyRequired` | 布尔值 | 否 | `true` | 服务是否要求 API Key；本地无鉴权服务可关闭。 |
| `jsonMode` | 布尔值 | 否 | `true` | 是否使用服务的 JSON 输出模式。 |
| `outputTokenParameter` | 字符串 | 否 | `"max_tokens"` | max_tokens 或 max_completion_tokens。 |

## 随附默认文件

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

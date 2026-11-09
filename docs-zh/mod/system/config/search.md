---
title: "联网搜索接口"
sidebar_position: 4
---

文件：`config/system/system-search.json`。作用侧：**服务端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `baseUrl` | 字符串 | 否 | `"https://api.deepseek.com/v1"` | DeepSeek Search / Fetch API 基础地址。 |
| `apiKeyEnvironment` | 字符串 | 否 | `"SYSTEM_DEEPSEEK_API_KEY"` | API Key 环境变量名称，默认与模型共享。 |
| `maxResponseBytes` | 整数 | 否 | `4194304` | 单次响应体大小上限，字节，正整数。 |

## 随附默认文件

```json title="config/system/system-search.json"
{
  "baseUrl": "https://api.deepseek.com/v1",
  "apiKeyEnvironment": "SYSTEM_DEEPSEEK_API_KEY",
  "maxResponseBytes": 4194304
}
```

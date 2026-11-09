---
title: "Agent 执行预算"
sidebar_position: 1
---

文件：`config/system/system-agent.json`。作用侧：**服务端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `timeZone` | 字符串 | 否 | `"Asia/Shanghai"` | 每日额度结算时区，使用有效 ZoneId。 |
| `modelCallsPerPlayerDay` | 整数 | 否 | `100` | 每玩家每日模型调用上限，正整数。 |
| `concurrentModels` | 整数 | 否 | `4` | 服务端同时执行模型请求的上限，正整数。 |
| `routingPolicy` | 对象 | 否 | 见默认文件 | 路由器预算，见下表。 |
| `policies` | 对象 | 否 | `{}` | 按工作流 ID 覆盖完整执行预算；不是按玩家设置权限。 |

## 执行预算对象

`routingPolicy` 和 `policies` 的每个值使用同一结构。除 reactIterations 外，覆盖某项预算时其余字段也必须完整提供；零次模型 / 写入额度分别禁止该操作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `modelCalls` | 非负整数 | 是 | — | 最多模型调用次数。 |
| `toolCalls` | 非负整数 | 是 | — | 最多工具调用次数。 |
| `steps` | 正整数 | 是 | — | 总执行步骤上限。 |
| `writeSteps` | 非负整数 | 是 | — | 写步骤上限。 |
| `inputBytes` | 正整数 | 是 | — | 输入字节上限。 |
| `outputTokens` | 正整数 | 是 | — | 单次输出 Token 预算。 |
| `totalTokens` | 正整数 | 是 | — | 整个执行的 Token 预算。 |
| `ttlMillis` | 正整数 | 是 | — | 任务总有效期，毫秒。 |
| `modelTimeoutMillis` | 正整数 | 是 | — | 单次模型请求超时，毫秒。 |
| `reactIterations` | 非负整数 | 否 | `3` | ReAct 循环上限；0 禁止额外循环。 |

AI 模式上限与每玩家授权保存在世界 SavedData，通过 `/system ai` 管理，未放在这份全局配置。见[AI 模式](../guides/ai-modes.md)。

## 随附默认文件

```json title="config/system/system-agent.json"
{
  "timeZone": "Asia/Shanghai",
  "modelCallsPerPlayerDay": 100,
  "concurrentModels": 4,
  "routingPolicy": {
    "modelCalls": 1,
    "toolCalls": 0,
    "steps": 4,
    "writeSteps": 0,
    "inputBytes": 16384,
    "outputTokens": 512,
    "totalTokens": 32768,
    "ttlMillis": 14500,
    "modelTimeoutMillis": 4000,
    "reactIterations": 0
  },
  "policies": {}
}
```

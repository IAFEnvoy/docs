---
title: "Agent execution budget"
sidebar_position: 1
---

File: `config/system/system-agent.json`. Side: **server**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `timeZone` | String | no | `"Asia/Shanghai"` | Time zone for daily quota settlement; must be a valid ZoneId. |
| `modelCallsPerPlayerDay` | Integer | no | `100` | Per-player daily model call limit, positive integer. |
| `concurrentModels` | Integer | no | `4` | Upper limit of model requests the server executes concurrently, positive integer. |
| `routingPolicy` | Object | no | See default file | Router budget, see the table below. |
| `policies` | Object | no | `{}` | Overrides the complete execution budget by workflow ID; this is not a per-player permission setting. |

## Execution budget object

`routingPolicy` and every value in `policies` use the same structure. Except for `reactIterations`, when overriding one budget item the remaining fields must also be provided in full; a zero model / write quota forbids that operation respectively.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `modelCalls` | Non-negative integer | yes | — | Maximum number of model calls. |
| `toolCalls` | Non-negative integer | yes | — | Maximum number of tool calls. |
| `steps` | Positive integer | yes | — | Upper limit of total execution steps. |
| `writeSteps` | Non-negative integer | yes | — | Upper limit of write steps. |
| `inputBytes` | Positive integer | yes | — | Upper limit of input bytes. |
| `outputTokens` | Positive integer | yes | — | Output token budget per request. |
| `totalTokens` | Positive integer | yes | — | Token budget for the whole execution. |
| `ttlMillis` | Positive integer | yes | — | Total lifetime of the task, in milliseconds. |
| `modelTimeoutMillis` | Positive integer | yes | — | Timeout of a single model request, in milliseconds. |
| `reactIterations` | Non-negative integer | no | `3` | Upper limit of the ReAct loop; 0 forbids extra loops. |

AI mode limits and per-player authorization are stored in the world SavedData and managed through `/system ai`; they are not part of this global config file. See [AI modes](../guides/ai-modes.md).

## Bundled default file

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

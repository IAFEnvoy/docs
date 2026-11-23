---
title: 聊天配置
description: 配置客户端名称标注、数据包词表、离线路由和 AI 回退。
sidebar_position: 2
---

## 名称和数量怎样识别

客户端发送 `!` 指令前，用当前语言、资源包的物品或方块名称，以及服务端同步的材料词表标注原文。服务端用注册表 ID 验证引用，再选择伙伴和 Task。你也可以在指令里直接使用 `minecraft:raw_iron` 这样的 ID，方便区分同名条目。

在 `data/<命名空间>/psychic/material_language/<名称>.json` 添加材料别名和数量习惯。内置「组」为 64 件，「半组」为 32 件。以下词表让 `取 2捆原铁` 表示取 16 个粗铁。材料词表是数据包注册表，修改后重新进入世界或重启服务端加载。

```json title="data/example/psychic/material_language/zh_cn.json"
{
  "language": "zh_cn",
  "items": {
    "minecraft:raw_iron": ["原铁"]
  },
  "blocks": {
    "minecraft:barrel": ["储料桶"]
  },
  "units": {
    "捆": 8
  },
  "quantities": {
    "半捆": 4
  }
}
```

| 字段 | 用途 |
| --- | --- |
| `language` | Minecraft 语言代码，例如 `zh_cn`。省略时适用于所有语言。 |
| `items`、`blocks` | 物品或方块 ID 到别名数组的映射。 |
| `units`、`quantities` | 单位倍数或固定数量，范围 1–64。 |
| `digits`、`ten` | 自定义一字符数字写法及十位标记。 |

这些字段均可省略。`units` 等映射缺省为空，内置中英文词表仍参与匹配。客户端资源包改名后可以在客户端重载资源。

## 修改本地语义路由

本地路由先尝试 Task 的 `commands` 和结构化参数，再匹配无参数例句。可以在 `data/<命名空间>/assistant_core/routing_lexicon/` 添加 `scope` 为 `psychic:spirit_call` 的语义词表。路由语言键为 `zh` 和 `en`。执行 `/reload` 后，同义词和概念权重生效。例如，可以把「还余几刻」加入 `remaining_time`，让它匹配伙伴的状态 Task。[同义词、权重和完整示例](../../library/assistant-core/text-routing.md#routing-lexicon)

## 配置 AI 回退

当本地路由无法解析时，万物通灵可以使用模型，从当前伙伴可用的 Task 中选择工具。请在运行世界的游戏进程环境中设置 `PSYCHIC_MODEL_API_KEY`。使用 DeepSeek 端点时，也可以设置 `DEEPSEEK_API_KEY`。多人游戏由服务端运行这个流程，单人游戏由本机游戏进程运行。

修改游戏目录下的 `config/psychic-ai.toml`，然后重启运行世界的进程。

| 配置项 | 默认值 | 用途 |
| --- | --- | --- |
| `enabled` | `true` | 允许使用模型回退。设为 `false` 可关闭。 |
| `endpoint` | `https://api.deepseek.com/chat/completions` | OpenAI 兼容 Chat Completions 端点。 |
| `model` | `deepseek-chat` | 传给端点的模型名。 |
| `api_key_required` | `true` | 要求设置密钥。无需密钥的本地兼容端点可设为 `false`。 |
| `output_token_parameter` | `max_tokens` | 输出 token 上限对应的请求字段。 |

已启用且凭据符合端点要求时，模型可收到指令原文和识别出的引用。服务端校验模型选出的 Task、目标权限及参数。没有可用模型时，仍可使用本地支持的指令。

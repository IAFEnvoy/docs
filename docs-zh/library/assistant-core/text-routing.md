---
title: 路由词表
description: 用数据包编辑本地路由的同义词和概念权重。
sidebar_position: 3
---

## 客户端文本标注 {#annotations}

[标注处理器指南包含注册说明和可运行的演示。](./annotation-processor.md)

## 数据包路由词表 {#routing-lexicon}

`RoutingLexicon.forScope(server, scope)` 提供服务端数据包中的同义词和概念权重。宿主可把 `concepts()` 和 `weights()` 传给 `LexicalIndex`。索引以同一词表编码例句和玩家文本。同义表达匹配到同一概念维度，权重乘在该维度的 TF-IDF 权重上。

在数据包的 `data/<命名空间>/assistant_core/routing_lexicon/` 添加 JSON。下面的条目应用于万物通灵，将「还余几刻」映射到其状态例句中的「还要多久」。

```json title="data/example/assistant_core/routing_lexicon/zh.json"
{
  "scope": "psychic:spirit_call",
  "language": "zh",
  "concepts": {
    "remaining_time": ["还要多久", "还余几刻"]
  },
  "weights": {
    "remaining_time": 1.2
  }
}
```

| 字段 | 格式 |
| --- | --- |
| `scope` | 必填，宿主选择的资源 ID。 |
| `language` | 必填，宿主用于路由的语言键。万物通灵使用 `zh` 和 `en`。 |
| `concepts` | 可选，概念 ID 到别名数组的映射。概念 ID 可用小写字母、数字、下划线、点和连字符。 |
| `weights` | 可选，概念 ID 到数值的映射。范围为 0.1–5.0，默认 1.0。 |

执行 `/reload` 后用同一句话验证匹配结果。相同资源 ID 按数据包优先级覆盖，其他文件按资源 ID 顺序合并。同一归一化别名或同一概念权重取排序靠后的文件的值。词表影响向量匹配，宿主的目标选择、参数校验和置信度阈值仍然参与路由。

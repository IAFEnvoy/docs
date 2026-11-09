---
title: "未完成物品标记"
sidebar_position: 6
---

文件：`data/<namespace>/saturn/incomplete/<path>.json`。匹配的物品显示未完成角标，不会禁止使用、合成或改变物品数据。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `items` | [物品匹配条目](../types/item-matcher/index.md)或数组 | 是 | — | 至少一项，任一条目命中即可。 |

## 示例

```json title="data/example/saturn/incomplete/unfinished.json"
{
  "items": [
    "minecraft:stick",
    "#minecraft:planks",
    {
      "type": "saturn:wildcard",
      "pattern": "example:unfinished_*"
    }
  ]
}
```

多个标记命中时显示相同角标，没有 `priority` 字段。不是新的物品注册方式。

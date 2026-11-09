---
title: "加权选择"
sidebar_position: 10
---

`saturn:choice`

按权重随机选择一项动作执行。

操作上下文中的物品堆以及持有者。它不是物品定义文件，应嵌入要求 ItemAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:choice` |
| `actions` | 加权条目数组（value、weight） | 是 | — | 子动作数组；顺序类型依次执行，加权类型按 value 和 weight 选择。 |

每项包含 value 与 weight，见[加权条目](../../data/common.md#加权条目)。负权重按 0 处理；总权重为 0 时从非空动作列表均匀选择。空动作列表不执行。

## JSON 示例

```json
{
  "type": "saturn:choice",
  "actions": [
    {
      "value": {
        "type": "saturn:no_op"
      },
      "weight": 1
    }
  ]
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.item.meta.ChoiceAction`。本页按当前 26.1.2 源码的 Codec 整理。

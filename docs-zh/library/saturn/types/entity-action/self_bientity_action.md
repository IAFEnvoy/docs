---
title: "自身双实体动作"
sidebar_position: 10
---

`saturn:self_bientity_action`

把同一实体作为 actor 和 target 执行双实体动作。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:self_bientity_action` |
| `action` | [双实体动作](../bientity-action/index.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |

## JSON 示例

```json
{
  "type": "saturn:self_bientity_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.SelfBiEntityAction`。本页按当前 26.1.2 源码的 Codec 整理。

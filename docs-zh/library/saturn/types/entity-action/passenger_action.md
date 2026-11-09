---
title: "乘客动作"
sidebar_position: 10
---

`saturn:passenger_action`

对实体的乘客执行动作，可递归处理多层乘客。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:passenger_action` |
| `action` | [实体动作](index.md) | 否 | `{"type":"saturn:no_op"}` | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `bientity_action` | [双实体动作](../bientity-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 在上下文双方之间执行的动作。 |
| `bientity_condition` | [双实体条件](../bientity-condition/index.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `recursive` | 布尔值 | 否 | `false` | 是否递归遍历坐骑或乘客链。 |

## JSON 示例

```json
{
  "type": "saturn:passenger_action"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.PassengerAction`。本页按当前 26.1.2 源码的 Codec 整理。

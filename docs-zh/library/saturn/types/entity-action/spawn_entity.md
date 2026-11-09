---
title: "生成实体"
sidebar_position: 10
---

`saturn:spawn_entity`

在上下文提供的位置或指定坐标生成实体。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_entity` |
| `entity_type` | 资源 ID | 是 | — | 实体类型 ID。 |
| `x` | [数值提供器](../number/index.md) | 是 | — | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | [数值提供器](../number/index.md) | 是 | — | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | [数值提供器](../number/index.md) | 是 | — | Z 坐标、偏移或向量分量，取决于本页行为。 |

## JSON 示例

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow",
  "x": 1,
  "y": 1,
  "z": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnEntityAction`。本页按当前 26.1.2 源码的 Codec 整理。

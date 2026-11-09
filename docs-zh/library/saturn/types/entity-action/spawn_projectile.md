---
title: "生成投射物"
sidebar_position: 10
---

`saturn:spawn_projectile`

生成实体并赋予指定初速度。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_projectile` |
| `entity_type` | 资源 ID | 是 | — | 实体类型 ID。 |
| `velocity_x` | [数值提供器](../number/index.md) | 是 | — | 初速度的 X 分量。 |
| `velocity_y` | [数值提供器](../number/index.md) | 是 | — | 初速度的 Y 分量。 |
| `velocity_z` | [数值提供器](../number/index.md) | 是 | — | 初速度的 Z 分量。 |

## JSON 示例

```json
{
  "type": "saturn:spawn_projectile",
  "entity_type": "minecraft:arrow",
  "velocity_x": 1,
  "velocity_y": 1,
  "velocity_z": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnProjectileAction`。本页按当前 26.1.2 源码的 Codec 整理。

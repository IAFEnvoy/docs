---
title: "施加效果"
sidebar_position: 10
---

`saturn:apply_effect`

给实体施加指定时长和等级的状态效果。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:apply_effect` |
| `effect` | 资源 ID | 是 | — | 状态效果 ID。 |
| `duration_ticks` | [数值提供器](../number/index.md) | 是 | — | 效果持续时长，单位为游戏 tick。 |
| `amplifier` | [数值提供器](../number/index.md) | 否 | `0.0` | 效果等级索引，0 表示 I 级。 |

## JSON 示例

```json
{
  "type": "saturn:apply_effect",
  "effect": "minecraft:speed",
  "duration_ticks": 200,
  "amplifier": 0
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.ApplyEffectAction`。本页按当前 26.1.2 源码的 Codec 整理。

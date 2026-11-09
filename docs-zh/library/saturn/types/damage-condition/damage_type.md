---
title: "伤害类型"
sidebar_position: 10
---

`saturn:damage_type`

检查伤害源的类型。

检查伤害来源、伤害量和相关实体。嵌入 DamageCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:damage_type` |
| `damage_type` | 资源 ID | 是 | — | 原版伤害类型 ID。 |

## JSON 示例

```json
{
  "type": "saturn:damage_type",
  "damage_type": "minecraft:generic"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.damage.DamageTypeCondition`。本页按当前 26.1.2 源码的 Codec 整理。

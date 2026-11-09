---
title: "投射物伤害"
sidebar_position: 10
---

`saturn:projectile`

检查伤害是否来自符合类型或条件的投射物。

检查伤害来源、伤害量和相关实体。嵌入 DamageCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:projectile` |
| `projectile` | 资源 ID | 否 | 省略 | 投射物实体类型 ID。 |
| `projectile_condition` | [实体条件](../entity-condition/index.md) | 否 | `{"type":"saturn:always"}` | 用于投射物实体的条件。 |

## JSON 示例

```json
{
  "type": "saturn:projectile"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.damage.ProjectileDamageCondition`。本页按当前 26.1.2 源码的 Codec 整理。

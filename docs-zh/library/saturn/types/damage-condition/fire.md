---
title: "火焰伤害"
sidebar_position: 10
---

`saturn:fire`

检查伤害源是否属于火焰伤害。

检查伤害来源、伤害量和相关实体。嵌入 DamageCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fire` |

## JSON 示例

```json
{
  "type": "saturn:fire"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.damage.FireDamageCondition`。本页按当前 26.1.2 源码的 Codec 整理。

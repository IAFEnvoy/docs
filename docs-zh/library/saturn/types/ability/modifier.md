---
title: "属性修饰"
sidebar_position: 10
---

`saturn:modifier`

技能生效期间为实体提供属性修饰器。

技能类型写在技能定义的顶层，与 costs、condition 等公共字段并列；不要再嵌套一个 type 对象。技能文件的公共字段见[技能定义](../../data/ability.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:modifier` |
| `modifiers` | [属性修饰器](../../data/common.md#属性修饰器)数组 | 否 | `[]` | 属性修饰器条目列表。 |

modifiers 的每一项是[属性修饰器](../../data/common.md#属性修饰器)，不是属性 ID 到数值的简单映射。

## JSON 示例

```json
{
  "type": "saturn:modifier"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.ability.type.ModifierAbilityType`。本页按当前 26.1.2 源码的 Codec 整理。

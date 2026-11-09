---
title: "技能资源值"
sidebar_position: 10
---

`saturn:ability_storage_resource`

检查技能存储中的资源值。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_resource` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `amount` | 数值或范围对象 | 否 | 省略 | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

## JSON 示例

```json
{
  "type": "saturn:ability_storage_resource",
  "ability": "example:heal"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.AbilityStorageResourceCondition`。本页按当前 26.1.2 源码的 Codec 整理。

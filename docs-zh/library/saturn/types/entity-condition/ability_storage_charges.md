---
title: "技能充能数"
sidebar_position: 10
---

`saturn:ability_storage_charges`

检查技能剩余充能数量。

检查一个实体。条件数组表示全部成立；这里的条件不等于原版 advancement JSON 的玩家谓词。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ability_storage_charges` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `remaining` | 数值或范围对象 | 否 | 省略 | 剩余量的范围或运行时剩余值。 |

## JSON 示例

```json
{
  "type": "saturn:ability_storage_charges",
  "ability": "example:heal"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.entity.AbilityStorageChargesCondition`。本页按当前 26.1.2 源码的 Codec 整理。

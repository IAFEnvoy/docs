---
title: "修改技能存储"
sidebar_position: 10
---

`saturn:modify_ability_storage`

把指定类型的状态写入目标技能的存储。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:modify_ability_storage` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `value` | [状态存储](../storage/index.md) | 是 | — | 本类型使用的值或表达式。 |

只修改技能已经声明的存储类型，未声明时记录警告并跳过。技能常规冷却与充能由激活流程维护，不需要每次手动覆写。

## JSON 示例

```json
{
  "type": "saturn:modify_ability_storage",
  "ability": "example:heal",
  "value": {
    "type": "saturn:cooldown",
    "duration": 40
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.ModifyAbilityStorageAction`。本页按当前 26.1.2 源码的 Codec 整理。

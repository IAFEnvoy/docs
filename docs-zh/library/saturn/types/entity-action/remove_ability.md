---
title: "移除技能"
sidebar_position: 10
---

`saturn:remove_ability`

移除指定来源授予的技能，不影响其他来源。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:remove_ability` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |
| `source` | 资源 ID | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |

## JSON 示例

```json
{
  "type": "saturn:remove_ability",
  "ability": "example:heal",
  "source": "example:manual"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.RemoveAbilityAction`。本页按当前 26.1.2 源码的 Codec 整理。

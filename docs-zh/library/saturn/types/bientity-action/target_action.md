---
title: "目标动作"
sidebar_position: 10
---

`saturn:target_action`

把双实体上下文的 target 交给实体动作。

上下文包含 actor（发起者）与 target（目标）。同一个 ID 在实体动作和双实体动作注册表中可能有不同字段，不能跨种类替换。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:target_action` |
| `action` | [实体动作](../entity-action/index.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |
| `use_target_position` | 布尔值 | 否 | `false` | 是否以目标位置作为执行位置。 |

## JSON 示例

```json
{
  "type": "saturn:target_action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.bientity.meta.TargetAction`。本页按当前 26.1.2 源码的 Codec 整理。

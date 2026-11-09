---
title: "治疗目标"
sidebar_position: 10
---

`saturn:heal_target`

恢复双实体上下文中目标实体的生命值。

上下文包含 actor（发起者）与 target（目标）。同一个 ID 在实体动作和双实体动作注册表中可能有不同字段，不能跨种类替换。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:heal_target` |
| `amount` | [数值提供器](../number/index.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

## JSON 示例

```json
{
  "type": "saturn:heal_target",
  "amount": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.bientity.HealTargetBiEntityAction`。本页按当前 26.1.2 源码的 Codec 整理。

---
title: bientity_action_type（双实体行为）
description: 模组注册的全部内置双实体行为类型，以及每种类型接受的 JSON 字段。
---

# bientity_action_type（双实体行为）

<span id="bientity-action-type-双实体行为" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/action/bientity-action.md)。
:::

双实体行为作用于一对实体：施动者（actor）与目标（target）。这一对由声明该行为的那个定义提供，行为本身只描述要对交给它的这两个实体做什么，不负责挑人。

`type` 写在行为对象里，取值是下面列出的 id 之一。这些 id 由模组固定注册，数据包不能新增或删除；自定义类型只能通过 KubeJS 引入，见 [KubeJS API](../../../kubejs/api-reference.md)。除了 `type`，其余键全部由该类型决定。

## 通用结构 {#通用结构}

一个行为是一个 JSON 对象，`type` 指明类型，其余键都是该类型的字段：

```json
{
  "type": "mxt:damage_target",
  "amount": 4
}
```

行为通常嵌在其他定义的字段里，例如 `bientity_action`：

```json
"bientity_action": {
  "type": "mxt:actor_action",
  "action": {
    "type": "mxt:heal",
    "amount": 2
  }
}
```

`mxt:actor_action` 里嵌套的 `action` 是一个[实体行为](./entity_action_types.md)，所以它收实体行为 id；把 `mxt:heal_target` 这样的双实体行为 id 写在这个位置上是不对的。

任何需要双实体行为的地方也收数组。数组是 `mxt:sequence` 的简写，按顺序执行其中的条目：

```json
"bientity_action": [
  { "type": "mxt:mount" },
  { "type": "mxt:heal_target", "amount": 1 }
]
```

可选的行为字段漏写时就是 `mxt:no_op`。加载期不会为此报错，只是那一项什么都不做。

:::info 字段类型是共享的
接受数值的字段一般都能用[数值提供器](../../../../../library/saturn/types/number.md)代替固定数字，因此凡是普通数字能用的地方，公式和随机值都能用。
:::

:::info 嵌套值
`mxt:if_else` 收一个[双实体条件](../condition/bientity_condition_types.md)；`mxt:actor_action` 与 `mxt:target_action` 收[实体行为](./entity_action_types.md)。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 能够交互式地展示每种类型的字段列表，便于在不查阅本页表格的情况下确认字段名。
:::

## 行为类型 {#行为类型}

### mxt:damage_target {#mxt-damage-target}

对目标造成伤害，并把施动者记为攻击者，因此击杀归属与仇恨都会跟着它；[伤害系统](../../../technical/damage.md)的两层都会生效。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `amount` | 数值提供器 | **必填** | 伤害量。 |
| `damage_type` | 伤害类型 id | 不声明 | 构造这一击的来源类型。 |
| `element` | 元素 id 或 `#元素标签` 的列表 | `[]` | 声明这一击的元素。 |

```json
{
  "type": "mxt:damage_target",
  "amount": "8 + level",
  "damage_type": "minecraft:magic"
}
```

只在服务端结算。`amount` 不是有限数或小于等于 `0` 时这一击不发生。

`element` 只写元素时，取它认领的第一个伤害类型当作 `damage_type`；写成 `#元素标签` 时推不出类型，必须自己写 `damage_type`。两个都写时在**首次使用**这一击时核对元素确实认领了它，不一致各报一次日志，这一击仍按声明的 `damage_type` 打。

---
title: Saturn 动作与条件
description: 在 Saturn 数据定义中设置存档物品价值，比较单件、整组和背包价值。
sidebar_position: 7
---

这些类型适用于 Evaluate `1.0-beta.2` 与 Saturn `1.3.1+`。将它们嵌入接受 Saturn [物品动作](../../library/saturn/types/action/item-action.md)、[物品条件](../../library/saturn/types/condition/item-condition.md)或[实体条件](../../library/saturn/types/condition/entity-condition.md)的字段；它们不是新的 Evaluate 独立数据文件。

所有类型在服务端执行。持有者位于客户端或没有持有者时，动作不执行，条件返回 `false`。查询遵循 Java API 和提示中的组件匹配与价值优先级，包括当前存档覆盖。

## 物品动作

| 类型 | 字段 | 必填 | 行为 |
| --- | --- | --- | --- |
| `evaluate:set_value` | `value`：[数值提供器](../../library/saturn/types/number.md) | 是 | 将有限且非负的数值保存为单件价值。 |
| `evaluate:add_value` | `amount`：数值提供器 | 是 | 在当前公开价值上加上带符号的数值，将结果保存为存档价值；未知或免费物品从 `0` 开始。 |
| `evaluate:reset_value` | 无 | — | 删除精确物品变体的存档价值，恢复数据包定义和推导结果。 |

动作使用上下文物品的类型与精确组件补丁，忽略物品数量。**设置影响本存档内所有相同物品和组件的物品栈**，并非只修改触发动作的那一组物品。其优先级与持久化方式和 `/evaluate set` 一致，会参与配方推导，经过 `/reload` 或重启后仍然保留。

价值改变后立即重算并使客户端缓存失效。重复设置相同数值、重置不存在的覆盖均不触发重算；增量为 `0` 时也不执行。结果为负数或非有限值时忽略此次操作。设置 `0` 会建立免费的基础值并隐藏公开价值行；重置则删除存档覆盖。

```json
{
  "type": "evaluate:set_value",
  "value": 12.5
}
```

```json
{
  "type": "evaluate:add_value",
  "amount": -2.5
}
```

```json
{
  "type": "evaluate:reset_value"
}
```

这些动作由你编写的 Saturn 定义调用，不通过指令执行，也不要求触发玩家具备指令权限；`/evaluate` 指令本身仍保留原有权限限制。

## 物品条件

| 类型 | 字段 | 判断内容 |
| --- | --- | --- |
| `evaluate:has_value` | 无 | 是否存在正的公开价值；未知、免费和空栈返回 `false`。 |
| `evaluate:has_world_value` | 无 | 精确物品／组件键是否存在存档覆盖，包括保存为 `0` 的情况。 |
| `evaluate:value` | `comparison`、`compare_to`；可选 `stack_value` | 将公开价值与数值比较。 |

`evaluate:value` 复用 Saturn 的 `Comparison`：必填 `comparison` 支持 `==`、`!=`、`<`、`<=`、`>`、`>=`，必填 `compare_to` 为目标数值。`stack_value` 为布尔值，默认 `false`；开启后按单件价值乘以物品数量进行比较。使用原始 `double`，不使用提示中四舍五入后的数值。

未知、免费和空栈在所有价值比较中都返回 `false`，包括 `!=`。整组价值溢出时也返回 `false`。判断没有公开价值时，用 `saturn:not` 包装 `evaluate:has_value`。

```json
{
  "type": "evaluate:value",
  "stack_value": true,
  "comparison": ">=",
  "compare_to": 1000
}
```

可以直接组合 Saturn 已有的 `and`、`or`、`not` 和 `if_else`。例如下面的物品动作仅在没有存档覆盖时设置价值：

```json
{
  "type": "saturn:if_else",
  "condition": {
    "type": "saturn:not",
    "condition": { "type": "evaluate:has_world_value" }
  },
  "if_action": {
    "type": "evaluate:set_value",
    "value": 12.5
  }
}
```

## 背包价值条件

`evaluate:inventory_value` 是**实体条件**。它累加所有符合筛选的物品的公开单件价值乘以数量，再比较总值。

| 字段 | 类型 | 必填 | 默认 | 含义 |
| --- | --- | --- | --- | --- |
| `item_condition` | 物品条件 | 否 | `saturn:always` | 累加前筛选物品栈。 |
| `slot` | 整数、槽位字符串或混合数组 | 否 | `[]` | Saturn 原版槽位选择；空数组选择其默认背包与装备槽位。 |
| `comparison` | 比较运算符 | 是 | — | 对累加总值进行比较。 |
| `compare_to` | 数值 | 是 | — | 目标总价值。 |

未知和免费物品贡献 `0`，空背包总价值为 `0`。玩家选中的快捷栏槽位与主手别名只统计一次。总值溢出时返回 `false`。槽位规则沿用 [Saturn 背包条件](../../library/saturn/types/condition/entity-condition.md#saturninventory)。

```json
{
  "type": "evaluate:inventory_value",
  "slot": ["hotbar.*", "inventory.*"],
  "item_condition": { "type": "evaluate:has_value" },
  "comparison": ">=",
  "compare_to": 10000
}
```

要从实体动作字段执行物品动作，可用 Saturn 的 `saturn:equipped_item_action` 或已有的其他物品动作承载类型包装，见[实体动作参考](../../library/saturn/types/action/entity-action.md#saturnequipped_item_action)。

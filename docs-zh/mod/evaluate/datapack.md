---
title: 数据包
description: Evaluate 的 evaluator 与 value_override 注册表、固定值、匹配优先级和文件覆盖规则。
sidebar_position: 1
---

数据包可以设置固定基础值、实例化计算器和覆盖最终结果。两个原生数据包注册表的目录均为**单数**：

```text
data/<namespace>/evaluate/evaluator/<path>.json
data/<namespace>/evaluate/value_override/<path>.json
```

命名空间和相对路径共同组成资源 ID。例如 `data/example/evaluate/evaluator/metals/iron.json` 定义计算器 `example:metals/iron`。

## 固定基础值

一个 `evaluate:constant` 文件为所有命中的物品设置同一个价值：

```json title="data/example/evaluate/evaluator/iron.json"
{
  "type": "evaluate:constant",
  "item": "minecraft:iron_ingot",
  "value": 256,
  "priority": 10,
  "comment": "用于配方推导的基础值"
}
```

| 字段 | 类型 | 必填 | 默认值 | 含义 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `evaluate:constant`。 |
| `item` | Saturn 匹配项或非空数组 | 是 | — | 共用该价值的物品。 |
| `value` | 有限非负 `double` | 是 | — | 单件价值，不乘物品堆叠数量。 |
| `priority` | 有符号整数 | 否 | `0` | 多条基础规则命中时，数值较大者优先。 |
| `comment` | 字符串 | 否 | — | 说明，不参与计算。 |

支持小数和科学记数法。固定值为 `0` 时，物品作为免费输入参与推导，但查询不会返回正价值。负数、`NaN` 和无穷值均无效。

### 物品选择 {#item-selection}

字段名始终为 `item`，数组写法也不改成 `items`。数组条目取并集：任意一项命中即可，所有命中物品使用同一个价值。

```json title="data/example/evaluate/evaluator/shared_metal_value.json"
{
  "type": "evaluate:constant",
  "item": ["minecraft:iron_ingot", "#c:ingots/gold"],
  "value": 256.5,
  "priority": 20
}
```

`item` 直接使用 Saturn 的 `ItemMatcher.ENTRIES_CODEC`，也接受其他模组注册的匹配项。各类匹配器字段请查阅 [Saturn 物品匹配器参考](../../library/saturn/types/item-matcher.md)，Evaluate 不再定义另一套选择器语言。

显式规则匹配实际查询的 `ItemStack`，组件条件不会变成整个物品类型的共同结果。推导图会收集默认栈，以及配方、计算器和 Ingredient 展示中的代表变体。未收集的变体仍能命中显式规则，但可能缺少对应的推导换算链。

## 最终覆盖 {#final-overrides}

使用 `value_override` 改变最终查询和快照，**不将该数值反馈到推导中**：

```json title="data/example/evaluate/value_override/iron.json"
{
  "item": "minecraft:iron_ingot",
  "value": 1000,
  "priority": 10
}
```

覆盖项沿用常量计算器的 `item`、`value`、`priority` 和可选的 `comment` 字段，但**不使用 `type` 字段**。

如果铁锭基础值为 `256`，该覆盖使查询返回 `1000`，铁块仍按 `256 × 9 = 2304` 推导。覆盖为 `0` 会隐藏最终正价值，不会回退到基础值或推导结果。

## 匹配与数据包优先级

1. 同一命名空间、同一路径的文件遵循普通数据包规则，高优先级数据包替换整个文件。
2. 不同文件同时生效；同一注册表中，命中的规则按 `priority` 从高到低选择。
3. 优先级相同时，按资源 ID 的自然升序选择第一条。

数据包优先级不能解决不同路径之间的规则竞争。跨文件覆盖基础值时，应提高 `priority`。最终覆盖与基础规则分别选择，再在推导结束后应用。

### 替换内置定义

内置常量位于 `data/evaluate/evaluate/evaluator/`：

| 类别 | 该目录下的路径 |
| --- | --- |
| 普通物品 | `minecraft/` |
| 标签 | `tags/<标签命名空间>/` |
| 山羊角变体 | `minecraft/goat_horn/` |

例如，在数据包中提供 `data/evaluate/evaluate/evaluator/tags/c/ingots/iron.json` 可替换内置铁锭价值；钻石对应 `tags/c/gems/diamond.json`。

## 其他计算器类型

| `type` | 用途 | 参考 |
| --- | --- | --- |
| `evaluate:constant` | 固定基础值 | 本页 |
| `evaluate:recipe` | 某种配方类型的关系 | [价值推导](./calculation.md#recipe-evaluators) |
| `evaluate:ftb_quests` | 消耗物品的任务兑换 | [FTB Quests](./ftb-quests.md) |
| `evaluate:js` | 带参数的命名脚本回调 | [KubeJS](./kubejs.md#reusable-callbacks) |

计算器文件通过 `type` 选择已注册的 `MapCodec`。只有数据文件或脚本创建实例后，对应类型才会执行。

## 校验与重载

未知字段会被拒绝。不使用 `before`、`after` 或 `phase`；旧的 `values`、`evaluators` 目录及 ProjectE 数据格式均不支持。目前也没有自定义数据包 `conversions`。

初次加载遵循原生注册表校验，错误数据可能阻止数据包加载。执行 `/reload` 时，无效定义会记录日志并跳过，不回退到同路径低优先级文件。缓存行为和 FTB 任务文件的重载方式见[运行与重载](./runtime.md)。

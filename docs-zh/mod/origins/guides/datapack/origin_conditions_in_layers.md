---
sidebar_position: 3
---

# 起源层中的条件起源

起源层可以根据玩家状态显示或隐藏起源。这适用于多阶段选择：先选择一个元素，然后只显示与该元素匹配的起源。

## 基本语法 {#basic-syntax}

不要使用纯 ID 字符串，而是使用包含 `condition` 和 `origins` 的对象：

```json
{
  "origins": [
    "origins:avian",
    "origins:blazeborn",
    {
      "condition": {
        "type": "origins:exposed_to_sun"
      },
      "origins": [
        "origins:enderian"
      ]
    },
    {
      "condition": {
        "type": "origins:not",
        "condition": {
          "type": "origins:exposed_to_sun"
        }
      },
      "origins": [
        "origins:arachnid"
      ]
    }
  ]
}
```

白天只有 Enderian 可用，夜晚只有 Arachnid 可用。`origins:avian` 和 `origins:blazeborn` 这样的纯 ID 始终会显示。

:::tip
如果多个起源 ID 和标签共享同一个条件，可以把它们列在同一个条件之下——无需为每个起源重复条件。
:::

## 按之前的选择进行限制 {#restricting-by-previous-selection}

最常见的用法是多起源层设置：玩家在第 1 层选择一个元素，然后在第 2 层只看到匹配的起源。

使用 [`origins:origin`](../../types/condition/entity_condition_types#originsorigin) 作为条件：

```json
// Layer 2: data/elements/origins/layer/elemental_origins.json
{
  "order": 1,
  "origins": [
    {
      "condition": {
        "type": "origins:origin",
        "origin": "elements:fire",
        "layer": "elements:element"
      },
      "origins": [
        "origins:blazeborn",
        "elements:flame_spirit"
      ]
    },
    {
      "condition": {
        "type": "origins:origin",
        "origin": "elements:air",
        "layer": "elements:element"
      },
      "origins": [
        "origins:avian",
        "aerum:aerum"
      ]
    }
  ]
}
```

当玩家在 `elements:element` 起源层中选择了 `elements:fire` 时，他们在此层会看到 Blazeborn 和 Flame Spirit。

你也可以用 [`origins:power_active`](../../types/condition/entity_condition_types#originspower_active) 检查某个特定**能力**是否激活。

:::caution
起源层中的实体条件是在**客户端**求值的。需要访问服务端的条件（例如计分板检查）在这里不会生效。请使用 `origins:origin`、`origins:dimension`、`origins:exposed_to_sun` 等条件。
:::

---
title: "物品条件"
sidebar_label: "物品条件 (ItemCondition)"
sidebar_position: 4
---

# 物品条件

检查一个 ItemStack。不能将物品 ID 字符串直接当成任意 ItemCondition。

### `saturn:amount` {#saturnamount}

比较物品堆的数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:amount` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:amount",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:armor_value` {#saturnarmor_value}

比较装备提供的护甲值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:armor_value` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:armor_value",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:base_enchantment` {#saturnbase_enchantment}

比较物品指定基础附魔的等级。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:base_enchantment` |
| `enchantment` | 资源 ID | 是 | — | 附魔 ID 或附魔列表。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:base_enchantment",
  "enchantment": "minecraft:unbreaking",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:component` {#saturncomponent}

检查物品堆指定组件的数据。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:component` |
| `component` | 资源 ID | 是 | — | 数据组件 ID，或是否按文本组件读取的开关。 |
| `nbt` | 对象 | 是 | — | 原版 CompoundTag 数据。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:component",
  "component": "minecraft:custom_data",
  "nbt": {}
}
```

</details>

### `saturn:durability` {#saturndurability}

比较物品剩余耐久。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:durability` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:durability",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:fuel` {#saturnfuel}

比较物品作为燃料的燃烧时间。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fuel` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fuel",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:has_component` {#saturnhas_component}

检查物品堆是否有指定数据组件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:has_component` |
| `component` | 资源 ID | 是 | — | 数据组件 ID，或是否按文本组件读取的开关。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:has_component",
  "component": "minecraft:custom_data"
}
```

</details>

### `saturn:ingredient` {#saturningredient}

使用 Minecraft Ingredient 匹配物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ingredient` |
| `ingredient` | 原版 Ingredient（物品 ID、#tag 或物品 ID 数组） | 是 | — | 原版 Ingredient。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ingredient",
  "ingredient": "#minecraft:logs"
}
```

</details>

### `saturn:is_equipable` {#saturnis_equipable}

检查物品是否可装备到指定槽位。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:is_equipable` |
| `slot` | 枚举字符串 | 否 | 省略 | 装备槽。 可用值：`mainhand`、`offhand`、`feet`、`legs`、`chest`、`head`、`body`、`saddle`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:is_equipable"
}
```

</details>

### `saturn:item_id` {#saturnitem_id}

检查物品堆是否为指定物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item_id` |
| `item` | 资源 ID | 是 | — | 物品 ID、谓词或上下文中的物品参数键。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:item_id",
  "item": "minecraft:diamond"
}
```

</details>

### `saturn:item_matcher` {#saturnitem_matcher}

按多个物品匹配条目检查物品堆。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item_matcher` |
| `items` | [物品匹配条目](../item-matcher.md)数组 | 是 | — | 物品匹配条目、物品谓词或物品列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:item_matcher",
  "items": [
    "minecraft:diamond"
  ]
}
```

</details>

### `saturn:item_tag` {#saturnitem_tag}

检查物品是否属于指定标签。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item_tag` |
| `tag` | 标签 ID（带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:item_tag",
  "tag": "#minecraft:logs"
}
```

</details>

### `saturn:on_cooldown` {#saturnon_cooldown}

检查上下文物品是否处于冷却中。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:on_cooldown` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:on_cooldown"
}
```

</details>

### `saturn:relative_durability` {#saturnrelative_durability}

比较物品剩余耐久占最大耐久的比例。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:relative_durability` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:relative_durability",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:tool_ability` {#saturntool_ability}

检查物品是否支持指定 NeoForge ItemAbility。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:tool_ability` |
| `ability` | 资源 ID | 是 | — | 技能 ID 或工具能力，按字段类型区分。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:tool_ability",
  "ability": "example:heal"
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:always` {#saturnalways}

条件始终为真。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:always` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:always"
}
```

</details>

### `saturn:and` {#saturnand}

所有子条件都成立时才匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:and` |
| `conditions` | 同类条件数组 | 是 | — | 同类子条件列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:and",
  "conditions": []
}
```

</details>

### `saturn:chance` {#saturnchance}

按指定概率决定是否命中。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:chance` |
| `chance` | 数值 | 是 | — | 命中概率，0 表示不命中，1 表示必定命中。 Codec 范围：`0.0D, 1.0D`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:chance",
  "chance": 1
}
```

</details>

### `saturn:js` {#saturnjs}

调用由 KubeJS 注册的回调，并传入 params 参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:js` |
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:never` {#saturnnever}

条件始终为假。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:never` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:never"
}
```

</details>

### `saturn:not` {#saturnnot}

反转子条件的匹配结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:not` |
| `condition` | [物品条件](./item-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:not",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:or` {#saturnor}

任一子条件成立即匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:or` |
| `conditions` | 同类条件数组 | 是 | — | 同类子条件列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:or",
  "conditions": []
}
```

</details>

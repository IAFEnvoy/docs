# 物品条件类型 {#item-condition-types}

物品条件检查物品堆叠的属性。

### `origins:amount` {#originsamount}

检查物品堆叠的数量。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的堆叠数量 |

### `origins:armor_value` {#originsarmor_value}

检查物品的盔甲防护值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"item_condition": {
    "type": "origins:armor_value",
    "comparison": ">",
    "compare_to": 3
}
```

此示例将检查该盔甲物品（在此上下文中为胸甲）的盔甲值是否高于 3，即皮革胸甲这一盔甲物品的盔甲值。

</details>

### `origins:base_enchantment` {#originsbase_enchantment}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查直接存储在物品上的附魔等级，不考虑附魔等级能力的影响。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `enchantment` | [标识符](../basic_concepts#identifier) | **必填** | 要检查的附魔 |
| `comparison` | [字符串](../basic_concepts#string) | `>=` | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的附魔等级 |

### `origins:block_item` {#originsblock_item}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查物品堆叠是否为方块物品。

### `origins:component` {#originscomponent}

检查特定数据组件的值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `component` | [标识符](../basic_concepts#identifier) | **必填** | 数据组件 ID |
| `value` | NBT | 可选 | 期望的值 |

### `origins:durability` {#originsdurability}

检查物品当前的耐久值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的耐久值 |

<details>
<summary>示例</summary>

```json
"item_condition": {
    "type": "origins:durability",
    "comparison": "<=",
    "compare_to": 100
}
```

此示例将检查物品的耐久值是否为 100 或更低。

</details>

### `origins:empty` {#originsempty}

检查物品堆叠是否为空。

### `origins:enchantable` {#originsenchantable}

检查物品是否可以被附魔。

### `origins:food` {#originsfood}

检查物品是否为食物。

### `origins:fuel` {#originsfuel}

检查物品能否用作熔炉燃料。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的燃烧时间（以 tick 计） |

<details>
<summary>示例</summary>

```json
"item_condition": {
    "type": "origins:fuel",
    "comparison": ">=",
    "compare_to": 10
}
```

此示例将检查物品的燃料时间是否为 10 或更多。

</details>

### `origins:has_component` {#originshas_component}

检查物品是否拥有特定数据组件。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `component` | [标识符](../basic_concepts#identifier) | **必填** | 数据组件 ID |

### `origins:has_power` {#originshas_power}

检查物品是否拥有特定能力（来自 Origins 物品）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `power` | [标识符](../basic_concepts#identifier) | **必填** | 能力 ID |

<details>
<summary>示例</summary>

```json
"item_condition": {
    "type": "origins:has_power",
    "power": "origins:water_breathing"
}
```

此示例将检查物品是否嵌入了人鱼族的鳃 *(`origins:water_breathing`)* 能力。

</details>

### `origins:in_tag` {#originsin_tag}

检查物品是否位于某个物品标签中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `tag` | [标识符](../basic_concepts#identifier) | **必填** | 物品标签 ID |

<details>
<summary>示例</summary>

```json
"item_condition": {
  "type": "origins:in_tag",
  "tag": "origins:meat"
}
```

此示例将检查物品是否位于 `origins:meat` 物品标签中。

</details>

### `origins:ingredient` {#originsingredient}

检查物品是否匹配某个原料（物品、标签或列表）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `ingredient` | [Ingredient] | **必填** | 物品、标签，或物品/标签的列表 |

Ingredient 格式：`{"item": "minecraft:diamond"}` 或 `{"tag": "minecraft:planks"}` 或 `[{"item": "..."}, {"tag": "..."}]`

<details>
<summary>示例</summary>

```json
"item_condition": {
  "type": "origins:ingredient",
  "ingredient": {
    "tag": "minecraft:wool"
  }
}
```

一个匹配钻石的原料。

</details>

### `origins:is_damageable` {#originsis_damageable}

检查物品是否可被损坏（即拥有耐久值）。

### `origins:is_equipable` {#originsis_equipable}

检查物品能否装备在特定栏位中。

### `origins:on_cooldown` {#originson_cooldown}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查当前持有该物品的玩家是否正在对该物品类型处于冷却中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:power_count` {#originspower_count}

检查物品拥有的能力数量。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"item_condition": {
    "type": "origins:power_count",
    "comparison": ">",
    "compare_to": 0
}
```

此示例将检查物品中嵌入的能力是否多于 0 个。

</details>

### `origins:relative_durability` {#originsrelative_durability}

以百分比形式检查物品的耐久度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的百分比（0-1） |

<details>
<summary>示例</summary>

```json
"item_condition": {
    "type": "origins:relative_durability",
    "comparison": ">=",
    "compare_to": 0.9
}
```

此示例将检查物品的耐久度是否为 90% 或更高。

</details>

### `origins:smeltable` {#originssmeltable}

检查物品能否在熔炉中熔炼（即拥有熔炉配方）。

### `origins:tool_ability` {#originstool_ability}

检查物品是否为特定方块挖掘能力对应的正确工具。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `ability` | [字符串](../basic_concepts#string) | **必填** | 工具能力名称 |

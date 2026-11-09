# 伤害条件类型 {#damage-condition-types}

伤害条件检查伤害实例的属性。

### `origins:amount` {#originsamount}

检查伤害数值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 伤害数值 |

<details>
<summary>示例</summary>

```json
"damage_condition": {
    "type": "origins:amount",
    "comparison": "==",
    "compare_to": 4
}
```

此示例将检查造成/承受的伤害是否等于 2 颗心。

</details>

### `origins:attacker` {#originsattacker}

检查来源实体（攻击者）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `entity_condition` | [实体条件](../condition/entity_condition_types) | **必填** | 对攻击者的条件 |

### `origins:id` {#originsid}

检查伤害类型 ID。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `value` | [标识符](../basic_concepts#identifier) | 可选 | 伤害类型 ID |

<details>
<summary>示例</summary>

```json
"damage_condition": {
    "type": "origins:id",
    "value": "minecraft:in_wall"
}
```

此示例将检查伤害类型是否为 `minecraft:in_wall`，这意味着如果实体正在方块中窒息，该条件将判断为 true。

</details>

### `origins:in_tag` {#originsin_tag}

检查伤害类型是否位于某个伤害类型标签中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `tag` | [标识符](../basic_concepts#identifier) | **必填** | 伤害类型标签 ID |

### `origins:magic` {#originsmagic}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查该伤害是否被归类为魔法伤害，例如药水或龙息伤害。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:projectile` {#originsprojectile}

检查该伤害是否来自弹射物。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `projectile` | 实体类型 ID | 可选 | 只检查特定类型的弹射物实体 |
| `projectile_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 弹射物实体必须满足的条件 |

<details>
<summary>示例</summary>

```json
"damage_condition": {
    "type": "origins:projectile",
    "projectile": "minecraft:spectral_arrow"
}
```

此示例将检查伤害来源是否为光灵箭弹射物实体。

</details>

### `origins:type` {#originstype}

检查伤害类型（与 `id` 类似）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `damage_type` | [标识符](../basic_concepts#identifier) | **必填** | 伤害类型 ID |

<details>
<summary>示例</summary>

```json
"damage_condition": {
    "type": "origins:type",
    "damage_type": "minecraft:fall"
}
```

此示例将检查伤害类型是否为 `minecraft:fall`。

</details>

### `origins:fire` {#originsfire}

检查伤害是否为火焰伤害。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

<details>
<summary>示例</summary>

```json
"damage_condition": {
    "type": "origins:fire"
}
```

此示例将检查伤害来源是否被归类为火焰伤害。

</details>

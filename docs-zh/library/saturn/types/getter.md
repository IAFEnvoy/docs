---
title: "实体取值器"
sidebar_label: "实体取值器 (EntityValueGetter)"
sidebar_position: 22
---

# 实体取值器

EntityValueGetter 的完整参数决定查询身份。只读取传入视图或已采集快照；缺失与已知的 0、false、空集合不同。

### `saturn:abilities` {#saturnabilities}

读取实体持有的技能信息。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:abilities` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:abilities"
}
```

</details>

### `saturn:absorption` {#saturnabsorption}

读取实体的伤害吸收生命值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:absorption` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:absorption"
}
```

</details>

### `saturn:advancements` {#saturnadvancements}

读取已采集的玩家成就信息。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:advancements` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:advancements"
}
```

</details>

### `saturn:air` {#saturnair}

读取实体剩余空气值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:air` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:air"
}
```

</details>

### `saturn:attribute` {#saturnattribute}

从已采集属性中读取指定属性的基础值或有效值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attribute` |
| `attribute` | 资源 ID | 是 | — | 属性 ID。 |
| `value` | 枚举字符串 | 否 | `"effective"` | 选择要读取的投影字段，不是信息表达式。 可用值：`base`、`effective`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attribute",
  "attribute": "minecraft:max_health",
  "value": "effective"
}
```

</details>

### `saturn:attributes` {#saturnattributes}

读取已采集的属性列表。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attributes` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attributes"
}
```

</details>

### `saturn:carried_item` {#saturncarried_item}

读取玩家光标当前携带的物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:carried_item` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:carried_item"
}
```

</details>

### `saturn:effect` {#saturneffect}

读取指定状态效果的等级或时长。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:effect` |
| `effect` | 资源 ID | 是 | — | 状态效果 ID。 |
| `value` | 枚举字符串 | 否 | `"amplifier"` | 选择要读取的投影字段，不是信息表达式。 可用值：`amplifier`、`duration`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:effect",
  "effect": "minecraft:speed",
  "value": "amplifier"
}
```

</details>

### `saturn:effects` {#saturneffects}

读取实体当前的状态效果列表。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:effects` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:effects"
}
```

</details>

### `saturn:ender_chest` {#saturnender_chest}

读取已采集的玩家末影箱内容。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ender_chest` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ender_chest"
}
```

</details>

### `saturn:equipment` {#saturnequipment}

读取实体装备槽信息。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:equipment` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:equipment"
}
```

</details>

### `saturn:experience` {#saturnexperience}

读取玩家经验点数、等级和进度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:experience` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:experience"
}
```

</details>

### `saturn:food` {#saturnfood}

读取玩家饥饿值、饱和度和消耗度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:food` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:food"
}
```

</details>

### `saturn:game_mode` {#saturngame_mode}

读取玩家的游戏模式。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:game_mode` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:game_mode"
}
```

</details>

### `saturn:health` {#saturnhealth}

读取实体当前生命值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:health` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:health"
}
```

</details>

### `saturn:inventory` {#saturninventory}

读取已采集的玩家背包内容。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:inventory` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:inventory"
}
```

</details>

### `saturn:location` {#saturnlocation}

读取实体位置和维度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:location` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:location"
}
```

</details>

### `saturn:max_health` {#saturnmax_health}

读取实体最大生命值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:max_health` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:max_health"
}
```

</details>

### `saturn:profile` {#saturnprofile}

读取玩家 UUID 与名称。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:profile` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:profile"
}
```

</details>

### `saturn:resource` {#saturnresource}

从已采集资源中读取指定资源的当前值或上下限。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource` |
| `resource` | 资源 ID | 是 | — | 已注册的 Saturn 资源 ID。 |
| `value` | 枚举字符串 | 否 | `"current"` | 选择要读取的投影字段，不是信息表达式。 可用值：`current`、`minimum`、`maximum`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:resource",
  "resource": "example:mana",
  "value": "current"
}
```

</details>

### `saturn:resources` {#saturnresources}

读取已采集的 Saturn 资源列表。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resources` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:resources"
}
```

</details>

### `saturn:score` {#saturnscore}

读取指定记分项的分数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:score` |
| `objective` | 字符串 | 是 | — | 计分板记分项名称。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:score",
  "objective": "kills"
}
```

</details>

### `saturn:scores` {#saturnscores}

读取已采集的计分板分数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:scores` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:scores"
}
```

</details>

### `saturn:selected_slot` {#saturnselected_slot}

读取玩家当前选中的快捷栏槽位。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:selected_slot` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:selected_slot"
}
```

</details>

### `saturn:statistics` {#saturnstatistics}

读取已采集的玩家统计信息。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:statistics` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:statistics"
}
```

</details>

### `saturn:team` {#saturnteam}

读取已采集的计分板队伍信息。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:team` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:team"
}
```

</details>

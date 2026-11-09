# 方块条件类型 {#block-condition-types}

方块条件检查某个位置的方块的属性。

### `origins:adjacent` {#originsadjacent}

检查相邻位置是否存在匹配的方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `adjacent_condition` | [方块条件](../condition/block_condition_types) | **必填** | 相邻方块的判断条件 |
| `comparison` | [字符串](../basic_concepts#string) | 可选 | 用于匹配数量的比较方式 |
| `compare_to` | [整数](../basic_concepts#integer) | 可选 | 用于比较的数量 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:adjacent",
    "adjacent_condition": {
        "type": "origins:block_id",
        "block": "minecraft:iron_ore"
    },
    "comparison": ">=",
    "compare_to": 4
}
```

此示例将检查待检查方块的相邻位置是否有四个或更多铁矿石方块。

</details>

### `origins:air` {#originsair}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查目标方块是否为空气。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:attachable` {#originsattachable}

检查该方块是否位于可让受支持方块附着的位置（即检查相邻方块朝向该方块位置的侧面是否有固体）。

### `origins:blast_resistance` {#originsblast_resistance}

检查方块的爆炸抗性。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:blast_resistance",
    "comparison": ">=",
    "compare_to": 1200
}
```

此示例将检查该方块的爆炸抗性值是否达到黑曜石方块或更高。

</details>

### `origins:block_entity` {#originsblock_entity}

检查该方块是否拥有方块实体。

### `origins:block_id` {#originsblock_id}

检查方块的 ID。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block` | [标识符](../basic_concepts#identifier) | **必填** | 方块 ID |

<details>
<summary>示例</summary>

```json
"block_condition": {
  "type": "origins:block_id",
  "block": "minecraft:stone"
}
```

此示例将检查待检查方块的相邻位置是否有四个或更多铁矿石方块。

</details>

### `origins:block_state` {#originsblock_state}

检查特定的方块状态属性。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `property` | [字符串](../basic_concepts#string) | **必填** | 属性名称 |
| `value` | [布尔值](../basic_concepts#boolean) | 可选 | 期望的布尔值 |
| `comparison` | 比较 | 可选 | 用于整数属性的比较 |
| `enum` | [字符串](../basic_concepts#string) | 可选 | 期望的枚举值 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:and",
    "conditions": [
        {
            "type": "origins:block_id",
            "block": "minecraft:chest"
        },
        {
            "type": "origins:block_state",
            "property": "facing",
            "enum": "north"
        }
    ]
}
```

此示例将检查箱子方块是否朝向北。

</details>

### `origins:distance_from_coordinates` {#originsdistance_from_coordinates}

检查方块与坐标之间的距离。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `reference` | 坐标 | **必填** | 参考坐标 |
| `offset` | 坐标 | 可选 | 应用于参考坐标的偏移 |
| `ignore_x` | [布尔值](../basic_concepts#boolean) | `false` | 忽略 X 轴 |
| `ignore_y` | [布尔值](../basic_concepts#boolean) | `false` | 忽略 Y 轴 |
| `ignore_z` | [布尔值](../basic_concepts#boolean) | `false` | 忽略 Z 轴 |
| `shape` | [字符串](../basic_concepts#string) | 可选 | 距离形状 |
| `scale_reference_to_dimension` | [布尔值](../basic_concepts#boolean) | `true` | 按维度缩放参考坐标 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:distance_from_coordinates",
    "offset": {
        "x": 1024,
        "z": 512
    },
    "ignore_y": true,
    "comparison": "<",
    "compare_to": 8
}
```

此示例将检查该方块是否位于指定坐标（X：1024，Z：512）周围 8 格半径内。

</details>

### `origins:exposed_to_sky` {#originsexposed_to_sky}

检查该方块是否暴露于天空。

### `origins:fluid` {#originsfluid}

检查方块位置处的流体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `fluid_condition` | [流体条件](../condition/fluid_condition_types) | **必填** | 要判断的流体条件 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:fluid",
    "fluid_condition": {
        "type": "origins:still"
    }
}
```

此示例将检查该方块是否为源流体。

</details>

### `origins:hardness` {#originshardness}

检查方块的硬度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:hardness",
    "comparison": "==",
    "compare_to": 1.5
}
```

此示例将检查该方块是否与石头一样硬。

</details>

### `origins:height` {#originsheight}

检查方块的高度（Y 层级）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的 Y 层级 |

<details>
<summary>示例</summary>

```json
"block_condition": {
  "type": "origins:height",
  "comparison": "<=",
  "compare_to": 64
}
```

此示例将检查该方块的爆炸抗性值是否达到黑曜石方块或更高。

</details>

### `origins:in_rain` {#originsin_rain}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查雨水是否能到达目标方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:in_tag` {#originsin_tag}

检查该方块是否位于某个方块标签中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `tag` | [标识符](../basic_concepts#identifier) | **必填** | 方块标签 ID |

<details>
<summary>示例</summary>

```json
"block_condition": {
  "type": "origins:in_tag",
  "tag": "origins:natural_stone"
}
```

此示例检查该方块是否为钻石块。

</details>

### `origins:light_blocking` {#originslight_blocking}

检查该方块是否在代码中被标记为阻挡光线。例如玻璃不会满足此条件。

### `origins:light_level` {#originslight_level}

检查该方块处的光照等级。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的光照等级 |
| `light_type` | [字符串](../basic_concepts#string) | `block` | `block` 或 `sky` |

<details>
<summary>示例</summary>

```json
"block_condition": {
  "type": "origins:light_level",
  "comparison": ">",
  "compare_to": 7
}
```

此示例将检查箱子方块是否朝向北。

</details>

### `origins:movement_blocking` {#originsmovement_blocking}

检查该方块是否阻挡移动（是否为固体）。

### `origins:nbt` {#originsnbt}

检查方块实体的 NBT 数据。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `nbt` | [字符串](../basic_concepts#string) | **必填** | NBT 查询字符串 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:and",
    "conditions": [
        {
            "type": "origins:block_id",
            "block": "minecraft:beacon"
        },
        {
            "type": "origins:nbt",
            "nbt": "{Levels: 1}"
        }
    ]
}
```

此示例将检查信标方块是否具有值为 1 的 `Level`。

</details>

### `origins:raining` {#originsraining}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查当前该维度是否正在下雨。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:replaceable` {#originsreplaceable}

检查该方块能否被另一个方块替换（即它是否为高草丛或空气之类的非固体方块）。

### `origins:slipperiness` {#origINSSlipperiness}

检查方块的滑度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"block_condition": {
    "type": "origins:slipperiness",
    "comparison": "==",
    "compare_to": 0.98
}
```

此示例将检查该方块是否具有与冰（或浮冰）方块相同的滑度。

</details>

### `origins:thundering` {#originsthundering}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查当前该维度是否正在雷暴。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:water_loggable` {#originswater_loggable}

检查该方块是否可以含水。

# 生物群系条件类型 {#biome-condition-types}

生物群系条件检查生物群系的属性。

### `origins:high_humidity` {#originshigh_humidity}

检查该生物群系是否算作高湿度区域（湿度值大于 0.85）。

### `origins:in_tag` {#originsin_tag}

检查该生物群系是否位于某个生物群系标签中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `tag` | [标识符](../basic_concepts#identifier) | **必填** | 生物群系标签 ID |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:in_tag",
    "tag": "minecraft:allows_surface_slime_spawn"
}
```

此示例将检查该生物群系是否包含在 `#minecraft:allows_surface_slime_spawn`（`data/minecraft/tags/worldgen/biome/allows_surface_slime_spawn.json`）生物群系标签中。

</details>

### `origins:precipitation` {#originsprecipitation}

检查该生物群系的降水类型。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `precipitation` | [字符串](../basic_concepts#string) | **必填** | `none`、`rain` 或 `snow` |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:precipitation",
    "precipitation": "snow"
}
```

此示例将检查实体当前所在生物群系的降水类型是否为雪。（例如：`minecraft:snowy_taiga`、`minecraft:ice_spikes` 等。）

</details>

### `origins:temperature` {#originstemperature}

检查该生物群系的温度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 温度值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:temperature",
    "comparison": ">=",
    "compare_to": 2
}
```

此示例将检查实体当前所在生物群系的温度是否为 2 或更高。（例如：`minecraft:badlands`、`minecraft:desert` 等。）

</details>

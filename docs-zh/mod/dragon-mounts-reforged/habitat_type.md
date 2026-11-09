---
title: 栖息地类型 JSON
sidebar_position: 5
---

# 栖息地类型 JSON

`dragon_mounts:habitat_type` 注册表不加载独立的数据包文件。栖息地对象放在纯种龙的 `habitats` 数组中，并通过其必填的 `type` 字段分发。每个条目会在龙当前所在位置计算一个分数。

## 基本格式

```json
{
  "type": "dragon_mounts:biome",
  "biome": "#minecraft:is_snowy",
  "points": 4
}
```

## 内置类型

| `type` | 字段 | 默认值 | 计算方式 |
| --- | --- | --- | --- |
| `picky` | `required_habitats`（栖息地数组，必填） | 无 | 每个嵌套条件都必须返回非零分数，然后将这些分数相加。 |
| `biome` | `biome`（生物群系 ID 或生物群系标签，必填）、`points`（整数） | `points: 3` | 当当前位置属于该条目或标签时计分。 |
| `in_fluid` | `fluid`（流体 ID 或流体标签，必填）、`point_multiplier`（浮点数） | `0.5` | 统计 3x3x3 区域内匹配的流体数量，然后乘以该数量。 |
| `world_height` | `height`（整数，必填）、`below`（布尔值）、`points`（整数） | `false`、`3` | 当 `below: false` 时，在高于该高度处计分；当为 `true` 时，在低于该高度且看不到天空处计分。 |
| `light` | `light`（整数，必填）、`below`（布尔值）、`points`（整数） | `false`、`3` | 比较当前位置的方块光照。 |
| `nearby_blocks` | `block`（方块 ID 或方块标签，必填）、`point_multiplier`（浮点数） | `0.5` | 统计 3x3x3 区域内匹配的方块数量，然后乘以该数量。 |
| `dragon_breath` | 无 | 无 | 当原版龙息区域效果云占据当前位置时计 `10` 分。 |
| `time` | `is_day`（布尔值）、`points`（整数） | `true`、`1` | 当所请求的白天/夜晚状态匹配时计分。 |

`biome`、`fluid` 和 `block` 字段可以接受单个注册表 ID（例如 `"minecraft:water"`）、以 `#` 为前缀的标签 ID（例如 `"#minecraft:is_ocean"`），或同时混合这两种形式的数组：

```json
"block": [
  "minecraft:ice",
  "#minecraft:logs"
]
```

## 示例

```json
{
  "habitats": [
    {
      "type": "dragon_mounts:in_fluid",
      "fluid": ["minecraft:water", "#example:dragon_fluids"],
      "point_multiplier": 1.0
    },
    {
      "type": "dragon_mounts:picky",
      "required_habitats": [
        {
          "type": "dragon_mounts:biome",
          "biome": "#minecraft:is_ocean",
          "points": 5
        },
        {
          "type": "dragon_mounts:time",
          "is_day": false,
          "points": 2
        }
      ]
    }
  ]
}
```

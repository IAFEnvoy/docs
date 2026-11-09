---
title: 纯种龙品种 JSON
sidebar_position: 2
---

# 纯种龙品种 JSON

纯种龙定义提供龙的基础数值、驯服与繁殖物品、能力、栖息地以及客户端资源位置。

## 文件位置

将文件放入数据包的 `data/<namespace>/purebred_dragon_breed/` 目录。例如：

```text
data/example/purebred_dragon_breed/azure.json
```

该文件的注册表 ID 为 `example:azure`。

## 字段

所有字段都直接写在根对象中，不存在 `core` 或 `content` 子对象。

| 字段 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `ambient_sound` | Sound event ID | 可选 | 龙的环境音效。 |
| `death_loot` | Loot table ID | 可选 | 龙死亡时使用的战利品表。 |
| `hatch_time` | Integer | `-1` | 孵化时长，单位为刻。小于或等于 `0` 的值使用服务器配置。 |
| `growth_time` | Integer | `-1` | 成长时长，单位为刻。小于或等于 `0` 的值使用服务器配置。 |
| `size_modifier` | Float | `-1.0` | 体型倍率。小于或等于 `0` 的值使用服务器配置。 |
| `primary_color` | Hex color string | 可选 | 主色，不含 `#`，例如 `"4e91d9"`。 |
| `secondary_color` | Hex color string | 可选 | 副色，不含 `#`。 |
| `inventory_texture` | Resource ID | `minecraft:textures/block/stone.png` | 龙物品栏界面使用的纹理。 |
| `breath_type` | Breath type registry ID | 可选 | 引用 `dragon_breath_type` 中的一个条目。 |
| `immunities` | String array | `[]` | 免疫标识符。例如 `"drown"` 会改变水中的寻路减速。 |
| `attributes` | 属性 ID 到数值的对象 | `{}` | 覆盖实体属性基础值，例如 `"minecraft:max_health": 40.0`。 |
| `habitats` | [栖息地](./habitat_type.md) array | `[]` | 用于栖息地评分的内联条件。 |
| `abilities` | [能力](./dragon_ability_type.md) array | `[]` | 该龙拥有的内联能力。 |
| `taming_items` | Item ID array | `[]` | 可以驯服该龙的物品。 |
| `breeding_items` | Item ID array | `[]` | 可以让该龙繁殖的物品。 |
| `hatch_particles` | ParticleOptions object | 可选 | 孵化粒子。该对象必须包含 `type`，由原版粒子 Codec 分发。 |
| `accessories` | String array | `[]` | 允许的饰品标识符。 |
| `model_location` | Resource ID | 可选 | GeckoLib 模型资源位置。 |
| `animation_location` | Resource ID | 可选 | GeckoLib 动画资源位置。 |
| `variants` | Variant array | `[]` | 该纯种龙可用的变体。 |

## 变体对象

| 字段 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `id` | String | **必填** | 本地变体 ID。 |
| `texture` | Resource ID | 可选 | 皮肤纹理。 |
| `saddle_texture` | Resource ID | 可选 | 已装备鞍时的纹理。 |
| `glow_texture` | Resource ID | 可选 | 自发光层纹理。 |
| `egg_texture` | Resource ID | 可选 | 龙蛋纹理。 |
| `breath_type` | Inline breath-type object | 可选 | 该变体专用的龙息类型。其结构见 [龙息类型](./dragon_breath_type.md)。 |
| `primary_color` | Hex color string | 可选 | 变体主色，不含 `#`。 |
| `secondary_color` | Hex color string | 可选 | 变体副色，不含 `#`。 |
| `size_modifier` | Float | `-1.0` | 变体体型倍率。 |

## 示例

```json
{
  "ambient_sound": "minecraft:entity.ender_dragon.ambient",
  "hatch_time": 24000,
  "growth_time": 48000,
  "size_modifier": 1.15,
  "primary_color": "4e91d9",
  "secondary_color": "d8f3ff",
  "inventory_texture": "example:textures/gui/azure_dragon.png",
  "breath_type": "example:frost",
  "attributes": {
    "minecraft:max_health": 40.0,
    "minecraft:movement_speed": 0.28
  },
  "taming_items": ["minecraft:salmon"],
  "breeding_items": ["minecraft:cod"],
  "hatch_particles": {
    "type": "minecraft:snowflake"
  },
  "habitats": [
    {
      "type": "dragon_mounts:biome",
      "biome": "#minecraft:is_snowy",
      "points": 4
    }
  ],
  "abilities": [
    {
      "type": "dragon_mounts:frost_walker",
      "level": 2
    }
  ],
  "variants": [
    {
      "id": "pale",
      "texture": "example:textures/entity/dragon/azure_pale.png",
      "egg_texture": "example:textures/entity/dragon/egg/azure_pale.png",
      "primary_color": "d4efff"
    }
  ]
}
```

:::note
`variants[].breath_type` 是一个完整的内联龙息类型对象，而根级 `breath_type` 字段是龙息类型注册表 ID。这两个字段不能互换使用。
:::

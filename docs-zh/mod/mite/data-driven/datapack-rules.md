---
id: datapack-rules
title: 数据包规则
sidebar_position: 2
description: recipe_rules、food_nutrition、harvest_rules、mob_spawn_rules 与 gelatinous_dissolving 的格式。
---

所有路径都相对于标准的数据包根目录：

```text
data/<namespace>/mite/<rule_type>/<name>.json
```

文件名会参与资源 ID。例如 `data/example/mite/mob_spawn_rules/cave_hunter.json` 的实体规则 ID 为 `example:cave_hunter`。

## 配方规则

路径：`mite/recipe_rules`。资源 ID 必须与目标配方 ID 一致。规则会添加限时合成难度、工作台等级与配置门槛。

```json title="data/example/mite/recipe_rules/steel_hammer.json"
{
  "difficulty": 6400,
  "workbench_tier": "iron",
  "gates": ["metal_tiers", "additional_melee_weapons"]
}
```

| 字段 | 必填 | 说明 |
|---|:---:|---|
| `difficulty` | 否 | 非负的合成难度；省略则使用回退的计时算法 |
| `workbench_tier` | 否 | `none`、`flint`、`copper`、`silver`、`gold`、`iron`、`ancient_metal`、`mithril`、`adamantium` 或 `obsidian` |
| `gates` | 否 | 配置门槛；关闭任一门槛都会隐藏并禁用该配方 |

常用门槛包括 `metal_tiers`、`additional_melee_weapons`、`rune_gates`、`metal_buckets`、`metal_doors`、`metal_bars`、`material_anvils`、`strongboxes`、`furnace_family`、`obsidian_tools`、`chainmail` 与 `ore_storage_blocks`。

## 食物营养 {#food-nutrition}

路径：`mite/food_nutrition`。每个物品或标签使用一个文件。

```json title="data/example/mite/food_nutrition/pear.json"
{
  "items": ["example:pear", "#example:pears"],
  "nutrition": 1,
  "phytonutrients": 1,
  "sugar": 800,
  "priority": 10
}
```

| 字段 | 默认值 | 说明 |
|---|---:|---|
| `items` | 必填 | 一个物品 ID/标签，或物品 ID/标签的数组 |
| `nutrition` | `0` | 总体营养点数 |
| `protein` | `0` | 蛋白质点数 |
| `essential_fats` | `0` | 必需脂肪点数 |
| `phytonutrients` | `0` | 植物营养素点数 |
| `sugar` | `0` | 非负的糖分反应值 |
| `priority` | `0` | 多个定义匹配同一物品时的优先级 |

精确的物品匹配优先于标签匹配。不支持旧的 `item`、`tag` 与批量 `entries` 格式。

## 采集与掉落

路径：`mite/harvest_rules`。

```json title="data/example/mite/harvest_rules/hard_logs.json"
{
  "blocks": "#example:hard_logs",
  "tool_requirement": {
    "items": "#minecraft:axes",
    "config": "require_axe_for_logs",
    "message": "message.example.requires_axe"
  },
  "tree_felling": true,
  "priority": 20
}
```

可选顶层字段为 `tool_requirement`、`tree_felling`、`ore_fortune`、`leaf_drops` 与 `progressive_drops`。`leaf_drops.fruits` 接受单个条目或数组，并可通过 `biomes` 限制生物群系 ID/标签。`progressive_drops` 使用 `base`、可选的 `base_alternative` 与 `tiers` 实现砂砾式的渐进掉落。

## 怪物生成条件

路径：`mite/mob_spawn_rules`。每个文件 ID 对应一个实体类型 ID。

```json title="data/example/mite/mob_spawn_rules/cave_hunter.json"
{
  "base_rule": "monster",
  "max_overworld_y": 40,
  "random_chance": 0.25,
  "nearby_blocks": [
    {
      "blocks": "#c:ores/silver",
      "horizontal": 8,
      "vertical": 4
    }
  ],
  "max_sky_light_when_exposed": 7,
  "spawn_on": "#minecraft:base_stone_overworld"
}
```

| 字段 | 说明 |
|---|---|
| `base_rule` | `monster`、`mob`，或 codec 支持的其他基础规则 |
| `max_overworld_y` | 常规的主世界最大高度，可被 `surface_exception` 放宽 |
| `absolute_max_overworld_y` | 例外无法绕过的绝对主世界高度上限 |
| `surface_exception` | 月相、寒冷生物群系或生物群系选择器构成的例外 |
| `random_chance` | 从 `0` 到 `1` 的额外生成概率 |
| `exposure_blocks` | 暴露或遮挡检查所使用的方块集合 |
| `nearby_blocks` | 附近方块、水平/垂直半径以及可选的 Y 偏移 |
| `max_sky_light_when_exposed` | 从 `0` 到 `15` 的最大暴露天空光照 |
| `spawn_on` | 允许的支撑方块 ID/标签 |

## 凝胶状溶解

路径：`mite/gelatinous_dissolving`。

```json title="data/example/mite/gelatinous_dissolving/soft_metal.json"
{
  "blocks": ["#example:soft_metal", "example:grate"],
  "exclude": "example:protected_grate",
  "normal": {
    "contact_period": 60,
    "projectile_period": 40
  },
  "acidic": {
    "contact_period": 10,
    "projectile_replacement": "minecraft:air"
  },
  "contact_damage": 1.0,
  "priority": 10
}
```

`blocks` 与 `predicate` 至少需要其一。当前的 predicate 为 `non_solid_render`。`normal` 与 `acidic` 都支持 `contact_period`、`projectile_period`、`projectile_replacement` 与 `projectile_face`；周期为 `0` 时立即处理。

:::tip 重载与诊断

保存后运行 `/reload`，并在服务器日志中查找 `Loaded ... definitions`。解析错误会包含完整的资源 ID。

:::

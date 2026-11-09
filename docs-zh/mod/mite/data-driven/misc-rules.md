---
id: misc-rules
title: 实例多文件规则
sidebar_position: 3
description: config/mite 下的规则目录、选择器、优先级、默认文件以及 16 个 codec。
---

`config/mite` 既包含主要的配置文件，也包含当前游戏实例的外部规则目录。首次启动时，MITE 会把 71 个默认规则 JSON 文件复制到对应子目录。此后每个文件都可以独立添加、修改或删除。

```text
config/mite/
|- mite-common.json
|- mite-client.json
|- arrows/
|- bucket_families/
|- butchering/
|- crops/
|- earth_elementals/
|- entity_drops/
|- fishing/
|- livestock/
|- mob_replacements/
|- portals/
|- repair/
|- rune_gates/
|- saplings/
|- silverfish/
|- skeleton_projectiles/
`- village_conversions/
```

## 默认文件的生命周期

- `.defaults-installed` 记录当前版本或更早版本提供过的默认相对路径。
- 更新引入的新默认文件会被复制进来。
- 用户刻意删除的旧默认文件不会在每次启动时重新出现。
- 更新 MITE 绝不会覆盖已存在的自定义文件。

升级前请备份整个目录。要恢复某个默认文件，可在重启前删除该文件并移除记录中的对应标记路径，或从模组 JAR 的 `mite/defaults` 中提取。

## 匹配与优先级

选择器接受物品、方块或实体 ID 以及 `#tag` 值，可以是单个值，也可以是数组。整数 `priority` 越大越先匹配；相同优先级按相对文件路径排序。

加载器只扫描下面列出的 16 个规则子目录。它绝不会把根目录下的 `mite-common.json` 或 `mite-client.json` 当作规则文件。

:::warning 这不是数据包目录

这些文件属于服务器实例配置，不应放进世界的 `datapacks` 文件夹。整合包应把它们分发到对应的 `config/mite` 子目录下。

:::

## 目录与字段

| 目录 | 必填字段 | 常用可选字段/枚举 |
|---|---|---|
| `entity_drops` | `entities`, `mode`, `items` | `mode`：`wight_rare_pool`、`arachnid_webs` |
| `mob_replacements` | `entities`, `replacement`, `profile` | `giant_vampire_bat`、`longdead_guardian`、`infernal_creeper` |
| `arrows` | `items`, `recovery` | `silver_damage`、`acid_resistant`；回收配置从 `flint` 到 `adamantium` |
| `skeleton_projectiles` | `entities`, `projectile` | `damage_profile`：`default`、`longdead`、`longdead_guardian` |
| `crops` | `blocks`, `young_output`, `mature_output` | `immature_output`、`blighted_output`、`mature_base_count`、`mature_bonus` |
| `saplings` | `blocks` | `requires_precipitation`、`biome_tag`、`temperature`：`none`/`oak`/`birch` |
| `livestock` | `entities`, `food`, `grazing`, `meat`, `raw_meat`, `cooked_meat`, `manure` | `produces_milk`、`egg_output`、`feather_output`、`manure_output`、`bowl_milk_output` |
| `butchering` | `entities`, `raw_output`, `cooked_output` | `mode`：`random_extra`/`single_special`、`requires_wellness` |
| `repair` | `items`, `material`, `tier` | `costs` 可以覆盖盔甲槽位与工具类型 |
| `bucket_families` | `material`, `empty`, `water`, `lava`, `milk`, `stone` | 材料：copper、silver、gold、iron、ancient metal、mithril、adamantium |
| `fishing` | `mode`, `success` | `target_block`、`fallback`；模式 `deep_ocean`/`grass_worm` |
| `earth_elementals` | `spawn_blocks`, `type`, `tool_block`, `drop_block` | 标签可以扩展有效的生成基底 |
| `portals` | `source_dimension`, `target_dimension`, `color` | `foundation`、`rune_gate` |
| `rune_gates` | `corner_blocks`, `radius` | `radius`：`mithril`/`adamantium` |
| `village_conversions` | `blocks`, `replacement` | 存活作物到死亡作物的映射 |
| `silverfish` | `condition`, `result` | 条件 `source_block`/`dimension`/`nearby_block`，配合对应的 `source`、`dimension` 或 `nearby` |

每个目录都支持 `priority`，默认值为 `0`。

## 示例：为整合包添加银箭

```json title="config/mite/arrows/example_silver_arrow.json"
{
  "items": ["example:silver_arrow", "#example:silver_arrows"],
  "recovery": "silver",
  "silver_damage": true,
  "priority": 20
}
```

伤害倍率不属于这个文件；请使用 `production.silverArrowUndeadDamageMultiplier`。

## 示例：自定义修理材料

```json title="config/mite/repair/example_mithril.json"
{
  "items": "#example:mithril_equipment",
  "material": "#c:nuggets/mithril",
  "tier": "mithril",
  "costs": {
    "helmet": 10,
    "chestplate": 16,
    "pickaxe": 6,
    "standard_tool": 4
  },
  "priority": 20
}
```

修改后请运行 `/reload`。重载桶家族规则还会刷新发射器行为。

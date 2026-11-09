---
id: tags
title: 标签约定
sidebar_position: 4
description: 使用 Minecraft、c 与 MITE 标签进行跨模组扩展。
---

MITE 优先使用 Minecraft 1.21 与 NeoForge 社区标签。整合包应扩展标签，而不是复制大套的逐物品规则。

## 社区 `c` 标签

常用物品标签：

```text
c:ingots/silver              c:nuggets/copper
c:ingots/ancient_metal       c:nuggets/silver
c:ingots/mithril             c:nuggets/ancient_metal
c:ingots/adamantium          c:nuggets/mithril
c:buckets/empty              c:nuggets/adamantium
c:buckets/water              c:chains
c:buckets/lava               c:drinks/milk
c:buckets/milk               c:drinks/water
```

常用方块标签包括 `c:ores/copper`、`c:ores/silver`、`c:ores/mithril`、`c:ores/adamantium`、`c:stones`、`c:gravels`、`c:obsidians`、`c:netherracks` 以及按材料区分的 `c:storage_blocks/*` 标签。

## MITE 功能标签

| 标签 | 用途 |
|---|---|
| `mite:metal_smelting_inputs` | 需要金属冶炼热量检查的输入 |
| `mite:oven_masonry_inputs` | 低等级烤炉接受的砌筑输入 |
| `mite:livestock_food/<animal>` | 可手动喂给牛、猪、羊或鸡的物品 |
| `mite:livestock_grazing/cow` | 牛会啃食的放牧方块 |
| `mite:livestock_grazing/general` | 通用的牲畜饲料方块 |
| `mite:livestock_meat/<animal>` | 各牲畜物种的肉类集合 |
| `mite:repair/<material>` | 由材料修理规则匹配的装备 |
| `mite:enchantable/*` | MITE 附魔支持的工具、武器或盔甲 |
| `mite:underworld_portal_foundations` | 从主世界通往冥界的传送门地基 |
| `mite:nether_portal_foundations` | 直接或随后通往下界的传送门地基 |
| `mite:incorrect_for_mithril_tool` | 秘银工具无法正确采集的方块 |
| `mite:extinguishable_torches` | 会被环境规则熄灭的火把 |

## 扩展标签

```json title="data/example/tags/item/repair/mithril.json"
{
  "replace": false,
  "values": [
    "example:mithril_drill",
    "example:mithril_helmet"
  ]
}
```

这个文件定义的是 `example:repair/mithril`，它不会自动加入 `mite:repair/mithril`。要扩展 MITE 的标签，请使用 `mite` 命名空间：

```text
data/mite/tags/item/repair/mithril.json
```

:::tip 保持 `replace: false`

兼容性数据包通常应追加取值。只有在有意替换 MITE 的全部默认集合时才使用 `replace: true`。

:::

只要物品或方块的判定可以表达为一个集合，就应优先使用标签。只有当关系还需要产出数值、优先级或条件时，才单独创建规则 JSON。

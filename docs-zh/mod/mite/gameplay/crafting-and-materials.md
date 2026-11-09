---
id: crafting-and-materials
title: 采集、合成与材料
sidebar_position: 2
description: 工具要求、限时合成、工作台等级、熔炉热量、修理与材料装备。
---

## 采集要求

方块掉落不再仅由破坏速度决定。原木需要斧，石头与矿石需要镐。具体的方块与可接受的工具来自 `harvest_rules`；**Enable tool gates**、**Require an axe for logs** 与 **Require a pickaxe for stone and ores** 可启用相应的限制。

树叶果实、树苗、渐进式砂砾掉落与矿石时运使用同一套数据规则。它们的概率仍由可见的树叶掉落与 Ore Fortune 概率设置控制。

## 限时合成

启用 **Enable timed crafting** 后，取出合成结果需要先完成一个进度计时。基础时长来自配方难度；没有显式难度的配方使用占用原料槽位的数量。

| 配置 | 用途 |
|---|---|
| Use MITE recipe difficulties when available | 优先采用 `recipe_rules` 中的 MITE 难度 |
| Minimum crafting time | 每个配方的最短时长 |
| Base crafting time | 回退算法的基础时长 |
| Crafting time per occupied ingredient slot | 每占用一个原料槽位增加的时长 |

移动原料、更换结果、关闭菜单或失去合成资格都会让服务器重新校验进度。客户端无法自行宣告合成完成。

## 工作台等级

标准流程如下：

| 等级 | 支持范围 |
|---|---|
| 燧石 | 最低等级的配方 |
| 铜、银、金 | 全部 2 级配方，但配方可能要求特定材料的工作台 |
| 铁 | 铁及以下 |
| 远古金属 | 远古金属及以下 |
| 秘银 | 秘银及以下 |
| 艾德曼合金 | 全部常规等级 |
| 黑曜石 | 仅黑曜石与燧石分支 |

**Require material-tiered workbenches** 控制工作台要求，**Require clear space above workbenches** 控制工作台上方的净空。每个配方要求的等级来自 `recipe_rules`。

## 熔炉热量

MITE 的熔炉除燃烧时间外还追踪一个热量等级：

| 燃料类别 | 默认热量 | 配置 |
|---|---:|---|
| 木材/木炭 | 1 | Wood and charcoal heat level |
| 煤炭 | 2 | Coal heat level |
| 熔岩 | 3 | Lava heat level |
| 烈焰燃料 | 4 | Blaze-rod heat level |

普通金属、秘银与艾德曼合金的默认要求由它们三项可见的所需热量设置控制。每个熔炉还各有最大热量容量，因此仅更换燃料无法让低等级熔炉处理所有矿石。

安装 Jade 后，熔炉浮层会显示剩余燃料、剩余冶炼时间、当前热量、容量与输入要求。

## 装备、品质与修理

- 铜使用原版铜锭、铜矿与铜块；MITE 提供加工部件与装备。
- 银、远古金属、秘银与艾德曼合金拥有完整的工具与盔甲链。
- 额外武器包括小刀、匕首、手斧、战斧、战锤、战锄、镰刀与短棍。
- 装备品质可自动选择最高品质或消耗经验；配置界面分别提供品质选择与经验消耗的设置。
- 材料铁砧用对应的粒修复装备。对应关系来自 `config/mite/repair`，而修复效果与经验消耗是普通设置。
- 装有熔岩的金属桶可能熔化；每种材料都有各自可见的熔岩熔化概率。

相关设置见[流程与合成规则](../content/progression-and-crafting.md)与[材料与生产规则](../content/materials-and-production.md)。

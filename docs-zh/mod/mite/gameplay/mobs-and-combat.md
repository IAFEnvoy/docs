---
id: mobs-and-combat
title: 怪物、战斗与附魔
sidebar_position: 5
description: MITE 的新实体、AI、材料箭矢、凝胶状怪物、元素生物与附魔。
---

## 新的实体家族

MITE 注册了 30 种可生成的怪物类型，并为主要生物提供了刷怪蛋。主要家族包括：

- **亡灵：** 远古亡灵、远古亡灵守卫、白骨领主、远古白骨领主、食尸鬼、亡魂、尸妖与暗影。
- **蛛形类：** 林木蜘蛛、黑寡妇、恶魔蜘蛛与相位蜘蛛。
- **蝙蝠与犬科：** 吸血蝙蝠、巨型吸血蝙蝠、夜翼、恐狼与地狱犬。
- **凝胶状怪物：** 果冻、团块、软泥与布丁；酸性变体会溶解更多种类的方块。
- **元素与特殊怪物：** 火焰元素、大地元素、黏土傀儡、炼狱苦力怕、下界产物、铜刺、霜白蠹虫与女巫。

`mobs.enabled` 与 `mobs.newMobs` 需要重启。每种实体的基础生成条件位于 `mob_spawn_rules` 数据包注册表；月相、替换概率与能力数值位于 `mobs` 配置。

## AI 与环境交互

- 僵尸可以挖掘符合条件的方块，并遵守 `mobGriefing`。
- 鱿鱼会在水中接触玩家并施加缓慢。
- 蜘蛛会发射蛛网，而凝胶状怪物会发射凝胶状弹射物。
- 女巫会施加延迟诅咒并召唤敌对狼。
- 牲畜会寻找水与食物、躲避雨水与火焰，并传播恐慌。

行为总开关包括 `mobs.advancedAi`、`mobs.combatRebalance`、`mobs.entityParityBehaviors`、`mobs.arachnidWebProjectiles` 与 `mobs.gelatinousProjectiles`。

## 凝胶状怪物与元素生物

凝胶状怪物的接触与弹射物溶解通过 `gelatinous_dissolving` 定义；目标、伤害与周期并不硬编码在实体类中。Jade 会显示当前已溶解的方块数量与最近一次完成的时间。

大地元素拥有内部热量。熔岩或火焰会把它们提升到熔融阈值，而雨水、水与寒冷生物群系会加速冷却。最大热量、各阈值、冷却、治疗、护甲、点燃概率与基础属性使用 `mobs.earthElemental*`。生命值、追踪范围、移动速度与攻击伤害需要重启。

## 箭矢与远程战斗

- 材料箭矢各有独立的基础伤害、回收概率与目标倍率。
- `production.silverArrowUndeadDamageMultiplier` 控制银箭对亡灵造成的伤害。
- `config/mite/skeleton_projectiles` 决定骷髅的弹药。
- 箭矢的对象关系位于 `config/mite/arrows`；回收概率使用 `progression.*ArrowRecoveryChance`。

## 附魔

当前的数据注册表包含 15 种 MITE 附魔：箭矢回收、击晕、钓鱼时运、肥沃、伐木、吸血、速度、再生、行动自由、精准飞行、毒素、缴械、收获、屠宰与耐力。

`progression.enchantments` 是总开关。触发概率、持续时间与倍率使用 `progression.stun*`、`vampiric*`、`poison*`、`disarming*` 及相关键。附魔本身使用 Minecraft 的动态注册表 JSON，允许整合包通过数据包更改支持的物品、等级与权重。

## 状态效果

| 效果 | 行为 |
|---|---|
| Stalwart Resistance | 每级从除窒息以外的所有来源中减去 5 点伤害，并在 HUD 上把这份防护显示为额外护甲。原版抗性会被转换为该效果。 |
| Malnutrition | 提高饥饿消耗并减慢自然恢复，直到蛋白质与植物营养素回升。 |
| Witch's Curse | 代表 16 种持续诅咒，涵盖装备损耗、移动与食物限制、对箱子的恐惧以及对生物的恐惧。杀死施咒的女巫或使用祛魔之瓶即可清除。 |
| Insulin Resistance | 在 48,000、96,000 与 144,000 时达到轻度、中度与重度阶段。继续摄入糖分会施加对应的恶心等级；重度阶段还会施加中毒。 |
| Crushing Slowness | 每级降低 20% 的移动速度与视角转向速度。III 级会阻止玩家在水中或熔岩中向上游泳。原版缓慢会被转换为该效果。 |
| Deadly Poison | 每 5 秒造成 1 点致命的魔法伤害。原版中毒会被转换为该效果。 |

Stalwart Resistance、Crushing Slowness 与 Deadly Poison 使用不同的名称，以免与原版中较弱的对应效果混淆。

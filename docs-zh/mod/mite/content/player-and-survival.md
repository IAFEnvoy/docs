---
title: 玩家与生存规则
sidebar_position: 2
---

# 玩家与生存规则

## `PLR-01` - 初始上限与等级成长 {#plr-01}
**配置：** `Enable survival overhaul`; `Initial maximum health`; `Initial food level`; `Levels per health increase`; `Health gained per milestone`; `Level cap`

新玩家开始时生命值与食物上限都较低。达到经验里程碑会提升最大生命值并解锁额外的食物槽位，直到达到配置的上限；HUD 显示当前的实际上限，而不是容易误导的原版最大值。

## `PLR-02` - 营养与营养储备 {#plr-02}
**配置：** `Initial food energy`; `Food energy limit`; `Enable nutrient physiology`; `Enable MITE food values`; `Food energy per nutrition point`; `Nutrient reserve limit`; `Initial protein reserve`; `Initial essential-fat reserve`; `Initial phytonutrient reserve`; `Nutrient reserve per food point`; `Nutrient reserve decay per tick`; `Insulin resistance limit`; `Insulin resistance decay per tick`

除了抗饥饿的食物能量储备，食物还分别维护蛋白质、必需脂肪与植物营养素储备。含糖食物会累积胰岛素抵抗，而多样化的饮食则补充长期生存所需的各项储备。

## `PLR-03` - 食物能量、疾跑与被动饥饿 {#plr-03}
**配置：** `Use MITE sprint rules`; `Allow beneficial eating`; `Passive hunger exhaustion per tick`; `Passive nutrition consumption ratio`

疾跑消耗剩余食物或食物能量，而不是原版固定的饥饿阈值。饱食度已满的玩家仍可食用能补充已耗尽食物能量或某项营养储备的食物，而被动饥饿会持续消耗食物以及较小比例的食物能量。

## `PLR-04` - 治疗、营养不良与饥饿 {#plr-04}
**配置：** `Malnutrition threshold`; `Malnutrition hunger-rate multiplier`; `Malnutrition natural-healing multiplier`; `Dynamic natural-regeneration threshold`; `Starvation progress per tick`; `Starvation damage`

自然治疗默认遵循 MITE 的营养规则。营养素不足会减慢恢复并增加饥饿消耗；食物能量耗尽会推进饥饿伤害。可选的动态阈值会把治疗改回按食物上限缩放的原版行为。

## `PLR-05` - 虚弱打击 {#plr-05}
**配置：** `Enable MITE weak strikes`; `Weak-strike health threshold`; `Weak-strike knockback strength`

在生命值、食物能量或武器支撑不足时发动的攻击会变成虚弱打击。它可以把没有防护的目标击退，但不造成伤害，也无法用来绕过前期的生存限制。

## `PLR-06` - 基于等级的玩家加成 {#plr-06}
**配置：** `Crafting speed per level`; `Melee damage per level`; `Enable MITE professions`

等级是角色成长的一部分，而不仅是附魔货币。更高的等级可以改善限时合成与近战输出，而职业系统会记录专精进度。

## `PLR-07` - 触及与交互距离 {#plr-07}
**配置：** `Enable MITE reach rules`; `Base block reach`; `Base entity interaction reach`; `Base melee reach`

MITE 缩短了默认的方块、交互与近战触及距离。随后由高度差、姿态以及手持的工具或武器修正这个经服务器校验的距离。

## `PLR-08` - 控制状态惩罚 {#plr-08}
**配置：** `Enable control-state penalties`; `Foodless mining speed multiplier`; `Cobweb mining speed multiplier`; `Control effects prevent crafting`

食物耗尽、上半身被蜘蛛网缠住以及严重的 Crushing Slowness 会降低挖掘速度或中断合成。服务器会在限时任务全程检查这些状态，因此移动物品或打开其他菜单都无法绕过。

## `PLR-09` - 同步的生存 HUD {#plr-09}
**配置：** `Show survival HUD`; `Show detailed tooltips`; `Show nutrition button in inventory`; `Show witch curse HUD`

HUD 会显示玩家真实的生命值与食物上限，以及营养、胰岛素抵抗、装备品质、食物消耗、束缚、合成进度与诅咒状态。显示的数据来自服务器同步的状态。

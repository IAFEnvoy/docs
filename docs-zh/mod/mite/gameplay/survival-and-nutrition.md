---
id: survival-and-nutrition
title: 生存、成长与营养
sidebar_position: 1
description: 生命值、饥饿、等级成长、营养储备与胰岛素反应。
---

## 初始上限与成长

新玩家默认以 6 点生命值和 6 点食物值开始，在 HUD 上表现为 3 颗心和 3 个饥饿图标。达到配置的经验等级里程碑会提升玩家的最大生命值，直到配置的等级上限。

| 行为 | 配置 |
|---|---|
| 初始生命值与食物 | Initial maximum health; Initial food level |
| 每次成长里程碑所需的等级 | Levels per health increase |
| 每个里程碑获得的生命值 | Health gained per milestone |
| 等级上限 | Level cap |
| 由等级带来的合成与近战加成 | Crafting speed per level; Melee damage per level |

最大生命值由服务器存储并同步。客户端 HUD 渲染实际上限，而不是用原版固定的 20 点量表误导玩家。

## 食物能量与进食

启用 **Use MITE sprint rules** 后，疾跑需要可用能量，而不是原版固定的食物阈值。只要食物或单独的食物能量储备仍有剩余，玩家就可以疾跑，因此初始 6 点的食物上限并不会阻止疾跑。

**Allow beneficial eating** 允许处于当前食物上限的玩家仅在该食物仍有效果时进食。当一种食物能够补充食物、已消耗的食物能量，或某项已耗尽的蛋白质、必需脂肪、植物营养素储备时，该食物即为有效。没有 MITE 营养数据的食物仍沿用原版进食规则。

服务器每 tick 累加配置的 **Passive hunger exhaustion per tick**。由 **Passive food-energy consumption ratio** 选定的比例也会累加到食物能量上；每累计 4 点消耗 1 点食物能量。默认值 `0.002` 与 `0.25` 复现了 MITE 的速率。将第一个值设为 `0` 会同时禁用这两项被动消耗。

## 营养不等于饥饿

MITE 追踪以下全部内容：

- **总体营养：** 决定基础生理储备。
- **蛋白质：** 主要来自肉类、鱼类、蛋类与奶类。
- **必需脂肪：** 来自特定肉类、鱼类与加工食品。
- **植物营养素：** 主要来自水果、蔬菜与作物。
- **糖分反应与胰岛素抵抗：** 含糖食物会累积一种随时间缓慢衰减的反应。

具体食物数值来自[食物营养数据](../data-driven/datapack-rules.md#food-nutrition)。服务端平衡使用 **Nutrition per food point**、**Nutrient reserve per food point**、**Nutrient reserve decay per tick**、**Insulin resistance limit** 与 **Insulin resistance decay per tick**。

:::warning 单一食物无法满足所有需求

熟肉能提供大量蛋白质，但可能不含植物营养素。水果可以补充植物营养素，但也可能产生强烈的糖分反应。长期生存需要轮换食物来源。

:::

## 饥饿与营养不良

当蛋白质或植物营养素低于储备上限的 5% 时，营养不良开始出现。默认情况下它把饥饿消耗提高到正常速率的 1.5 倍，并把自然恢复降低到四分之一。这些惩罚由 **Malnutrition hunger-rate multiplier** 与 **Malnutrition natural-healing multiplier** 控制。食物能量耗尽会依据 **Starvation progress per tick** 与 **Starvation damage** 推进饥饿。

自然治疗默认使用 MITE 的营养进度公式。启用 **Dynamic natural-regeneration threshold** 会切换到原版治疗，其食物阈值按当前上限缩放：上限满时为饱和式快速治疗，上限减 2 时为普通治疗。

牛奶无法消除营养不良；缺失的营养素必须回升到其阈值以上。胰岛素抵抗同样不受牛奶影响，会依据 **Insulin resistance decay per tick** 衰减。

## 客户端界面

- 默认按 `N` 打开营养界面。
- **Show nutrition button in inventory** 控制生存模式物品栏旁的苹果按钮。
- **Show survival HUD** 控制 HUD。
- **Show detailed tooltips** 控制食物提示框。
- **Show witch curse HUD** 控制诅咒通知。

客户端设置只影响呈现方式，无法改变由服务器掌控的营养或伤害规则。对应规则见 [PLR-02](../content/player-and-survival.md#plr-02)、[PLR-04](../content/player-and-survival.md#plr-04) 与 [UX-01](../content/interface-and-multiplayer.md#ux-01)。

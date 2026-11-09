---
id: agriculture-and-livestock
title: 农业与畜牧
sidebar_position: 3
description: 作物病害、施肥、树苗限制，以及牲畜的生存与产出。
---

## 作物与病害

MITE 加入了洋葱与可反复收获的蓝莓，并提高了小麦、胡萝卜、马铃薯等作物的生存压力。干旱、随机病害或血月条件都可能使作物枯萎或死亡。

| 配置 | 用途 |
|---|---|
| Enable crop disease | 作物病害的总开关 |
| Crop drought-death chance | 在干燥的随机 tick 中死亡的概率 |
| Natural crop blight chance | 常规的随机枯萎概率 |
| Enable bowl crop watering | 启用浇水与湿度规则 |
| Enable blood-moon crop disease | 在血月期间传播作物病害 |
| Blood-moon crop-disease chance | 血月时的病害概率 |

随附的村庄农田会把存活的作物替换为对应的死亡变体。映射来自 `config/mite/village_conversions`。

## 施肥、收获与树苗

- 粪便可以给农田施肥，同时也作为低热量燃料使用。
- **Enable manure crop fertilization** 控制农田施肥；**Fertility chance per level** 控制 Fertility 附魔。
- **Mature crop bonus-drop chance** 与 **Harvesting extra-drop multiplier** 控制成熟作物的额外产出。
- 橡树、白桦等树苗可能受生物群系温度限制。对象关系来自 `config/mite/saplings`，而配置界面按树苗类型暴露温度阈值。
- 树叶产出的树苗与果实来自 `harvest_rules`；配置界面暴露对应的树叶掉落概率。

## 牲畜的三项状态

牛、猪、羊与鸡会追踪食物、饮水与自由三项数值，范围为 0% 到 100%。当其中最低的一项低于 25% 时，动物处于不适状态，繁殖与产出都会减少。

改善状态的方法：

- 为动物放置可食用的方块，或直接喂食。
- 提供附近的水、装有水的炼药锅，或能接触到雨水。
- 避免过度拥挤，以及长期关在看不到天空的封闭空间里。
- 围出一块受保护的区域，同时留出足够的活动空间。

更新频率与状态变化由 **Livestock update interval**、**Livestock feeding food gain**、**Livestock food decay**、**Livestock water decay**、**Livestock freedom gain** 以及相关的可见牲畜设置控制。

## 牛奶、羽毛、鸡蛋与粪便

- 牛健康时牛奶会逐渐恢复；用碗或材料桶取奶会消耗其储备。
- 鸡有实际的羽毛数量。跳跃或受到伤害可能掉落羽毛，累积的产出可以转化为羽毛或鸡蛋。
- 成年牲畜会在各自物种特定的倒计时结束后产出粪便。
- 屠宰掉落可能要求动物处于健康状态；目标与产物来自 `config/mite/butchering`。

配置界面把牛奶产出、鸡的产出以及各物种的粪便周期与其他牲畜设置归在一起。Jade 会显示三项状态以及产出与粪便计时。完整规则摘要见 [AGR-08](../content/world-and-ecology.md#agr-08)。

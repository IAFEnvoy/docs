---
title: 世界与生态规则
sidebar_position: 5
---

# 世界与生态规则

## `AGR-01` - 作物与野生产物 {#agr-01}
**配置：** `Enable blueberry bushes`; `Enable MITE sapling rules`; `Oak sapling minimum temperature`; `Birch sapling minimum temperature`

MITE 加入了洋葱与可再生的蓝莓丛，同时改变了树苗与野生产物对生物群系温度的反应。这些资源支撑了前期的食物与农业循环。

## `AGR-02` - 考虑气候的作物生长 {#agr-02}
**配置：** `Enable MITE crop growth rules`; `Minimum crop sky light`; `Global crop growth multiplier`; `Minimum optimal crop temperature`; `Maximum optimal crop temperature`; `Crop temperature tolerance`; `Fertilized crop growth multiplier`; `Isolated crop growth multiplier`; `Crop-row end growth multiplier`; `Cross-row crop growth multiplier`

作物需要配置的天空光照，并以较低的全局速率生长。随后，生物群系温度、湿润或施肥的农田、孤立状态、行列布局以及邻近作物会修正每次生长判定。

## `AGR-03` - 作物病害与浇水 {#agr-03}
**配置：** `Enable crop disease`; `Crop drought-death chance`; `Natural crop blight chance`; `Enable bowl crop watering`; `Enable blood-moon crop disease`; `Enable blood-moon crop disease on dedicated servers`; `Blood-moon crop-disease chance`

作物可能枯萎，也可能因干旱而死亡。浇水与处理可以保护田地，而血月会在单人游戏与专用服务器各自独立的规则下传播病害。

## `AGR-04` - 肥沃与收获 {#agr-04}
**配置：** `Enable manure crop fertilization`; `Fertility chance per level`; `Mature crop bonus-drop chance`; `Harvesting extra-drop multiplier`

施肥的农田以及 Fertility 与 Harvesting 附魔可以提高作物产出。成熟作物获得受控的额外掉落，而不是原版不受限制的倍增。

## `AGR-05` - MITE 作物收获 {#agr-05}
**配置：** `Mature crop bonus-drop chance`; `Harvesting extra-drop multiplier`

小麦、胡萝卜、马铃薯与洋葱使用按成熟度区分的 MITE 掉落。小麦会还原为两粒种子，未成熟或枯萎的马铃薯可能变成毒马铃薯，而可可豆保留原版在丛林木上放置的限制。

## `AGR-06` - 施肥菌丝转化 {#agr-06}
**配置：** `Enable manure crop fertilization`

在低光照的室内生长的棕色蘑菇可以把湿润的施肥农田转化为菌丝。这提供了一条与灌溉和粪便绑定的可再生蘑菇途径，而不是无条件的方块配方。

## `AGR-07` - 树叶果实与树苗产物 {#agr-07}
**配置：** `Enable leaf fruit drops`; `Leaf fruit-drop chance`; `Leaf swamp no-drop chance`; `Enable MITE sapling rules`

树叶会提供符合生物群系的木棍、树苗、苹果、香蕉与橙子。温度、降水、树木类型与沼泽排除条件让每种资源都与其预期的环境绑定。

## `AGR-08` - 牲畜健康与产出 {#agr-08}
**配置：** `Enable livestock wellness`; `Enable livestock manure`; `Livestock update interval (ticks)`; `Livestock production chance per update`; `Cow milk produced per update`; `Chicken feather production chance`; `Chicken egg production chance`; `Cow manure period (ticks)`; `Chicken manure period (ticks)`; `Livestock safe trampling count`; `Trampling chance increase per step`; `Trampling maximum chance`

牲畜会追踪食物、饮水、自由、拥挤与恐慌这几项状态。健康的动物会产出牛奶、鸡蛋、羽毛与粪便；条件不佳会降低产出，并可能在畜群中传播恐慌。

## `WLD-01` - 矿石生成 {#wld-01}
**配置：** `Ore Fortune extra-drop chance per level`

铜、银、秘银、艾德曼合金以及冥界中的原版矿石使用标准的 configured feature、placed feature 与 NeoForge 生物群系修改器。数据包控制它们的目标方块、矿脉大小、数量、高度范围与生物群系分布。时运使用单独控制的额外掉落概率。

## `WLD-02` - 冥界 {#wld-02}
**配置：** `Enable the Underworld`; `Enable Underworld dungeon attempts`; `Enable Underworld fog cycle`; `Enable MITE Underworld bedrock strata`; `Enable exact MITE Underworld terrain noise`; `Enable MITE Underworld cave cobwebs`

冥界是位于主世界与下界之间的深层深板岩维度。它的洞穴、基岩与地幔地形、地牢、蜘蛛网与迷雾循环构成了中期的核心探索层。

## `WLD-03` - 传送门与符文之门 {#wld-03}
**配置：** `Enable Underworld portal routing`; `Enable Rune Gates`; `Rune Gate teleport delay (ticks)`; `Mithril Rune Gate domain radius`; `Adamantium Rune Gate domain radius`; `Show Rune Gate transition effects`

普通传送门会先经过冥界，再到达下界。符文石可以把传送门变成同维度的符文之门，其图案、材料与朝向共同决定目的地与范围。

## `WLD-04` - 村庄进程 {#wld-04}
**配置：** `Gate new villages behind progression`; `Earliest village generation day`

村庄生成会被推迟，直到世界达到配置的天数与流程条件。村庄农田使用死亡作物，而武器匠的战利品可能出现在受保护的铁制保险箱中。

## `WLD-05` - 村庄农田与保险箱 {#wld-05}
**配置：** `Gate new villages behind progression`; `Enable strongboxes`

村庄农田一开始就是对应的死亡作物方块。武器匠的箱子会迁移为铁制保险箱，同时保留其战利品表，而其更高的采集等级可以防止前期被盗。

## `WLD-06` - 维度注册与安全传送 {#wld-06}
**配置：** `Enable the Underworld`; `Enable Underworld portal routing`; `Enable Rune Gates`

冥界被注册为一个持久的服务器维度。传送门传送会处理目的地查找、区块加载、安全落点、返回路线与服务器重启，且不会信任客户端发来的传送请求。

## `SKY-01` - 天气与饥饿 {#sky-01}
**配置：** `Passive hunger exhaustion per tick`; `Enable livestock wellness`; `Enable MITE fishing`

降雨、雷暴、浸水与寒冷生物群系会增加被动的食物消耗。同一套天气状态还影响钓鱼、牲畜的遮蔽与饮水，而炎热生物群系会阻止不恰当的潮湿加成。

## `SKY-02` - 血月 {#sky-02}
**配置：** `Enable moon events`; `Blood-moon period (days)`; `Harvest-moon and moon-dog offset (days)`; `Prevent sleeping during blood moons`; `Enable blood-moon crop disease`; `Blood-moon crop-disease chance`; `Empower hostile mobs during blood moons`; `Blood-moon hostile-mob effect duration`; `Blood-moon hostile-mob speed amplifier`; `Blood-moon hostile-mob strength amplifier`

血月会阻止睡眠、威胁作物、强化怪物并提高地表压力。周期、偏移、效果持续时间与怪物倍率全部由服务器控制。

## `SKY-03` - 其他月相与生成 {#sky-03}
**配置：** `Blue-moon period (days)`; `Enable MITE moon-based surface spawning`; `Blue-moon surface spawn chance`; `Blood-moon surface spawn chance`; `Full-moon surface spawn chance`; `New-moon surface spawn chance`; `Ordinary-moon surface spawn chance`; `Daytime undead surface spawn chance`; `Render special moon colors and halos`

蓝月、满月、新月与普通月相会改变地表生成概率，而特殊月相渲染让玩家能立即获得视觉反馈。白天的亡灵生成有其独立的概率。

## `SKY-04` - 收获之月 {#sky-04}
**配置：** `Enable moon events`; `Harvest-moon and moon-dog offset (days)`; `Render special moon colors and halos`

收获之月是按计划出现的月相状态，拥有自己的天空与月面外观，并在天气事件排期中占有一席之地。MITE 不会为它提供单独的作物、战利品或战斗加成。

## `SKY-05` - 基于天数的敌对装备 {#sky-05}
**配置：** `Enable day-based hostile equipment progression`; `Advanced hostile weapon unlock day`; `Elite hostile weapon unlock day`; `Zombie equipment chance`; `Zombie villager equipment chance`

世界的生存天数会解锁更强的敌对武器池。僵尸与僵尸村民可能携带与当前天数相符的装备，而亡魂与白骨领主会逐步进入其进阶与精英武器组。

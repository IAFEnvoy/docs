---
title: 流程与合成规则
sidebar_position: 3
---

# 流程与合成规则

## `PRG-01` - 第一天的资源 {#prg-01}
**配置：** `Enable progression rules`; `Enable leaf stick drops`; `Leaf stick-drop chance`; `Enable leaf fruit drops`; `Leaf sapling-drop chance`; `Leaf fruit-drop chance`; `Leaf swamp no-drop chance`; `Use MITE gravel loot`; `Gravel special-drop chance (0-1)`; `Chance to advance to the next gravel-loot tier (0-1)`; `Grass worm base chance`; `Grass worm Fortune bonus per level`; `Grass worm rain bonus`; `Grass worm maximum chance`

开局循环始于树叶、草与砂砾提供的零散资源。木棍、燧石、食物、树苗与鱼饵提供了通往第一批工具的路径，无需依赖徒手采集原木或石头。

## `PRG-02` - 采集工具门槛 {#prg-02}
**配置：** `Enable tool gates`; `Require clear access to production blocks`

采集由服务端规则决定，而不是仅由破坏速度决定。受保护的地形与生产方块只有在手持工具满足目标规则时才会掉落。

## `PRG-03` - 工具家族与材料等级 {#prg-03}
**配置：** `Require an axe for logs`; `Require a pickaxe for stone and ores`; `Enable metal tiers`

原木需要手斧、斧或战斧；石头与矿石需要镐或战锤。工具的材料还必须达到目标的等级要求，而保险箱归属可能施加额外的限制。

## `PRG-04` - 可携带的生产方块 {#prg-04}
**配置：** `Enable portable production blocks`

部分玩家自制的生产方块可以在比自然地形更宽松的规则下回收。这能避免流程装备被永久困住，同时不削弱普通的采集门槛。

## `PRG-06` - 前期采矿来源 {#prg-06}
**配置：** `Enable tool gates`; `Use MITE gravel loot`

MITE 不把人工矿道作为一个独立系统来追踪。前期采矿受工具门槛与偏向深度的矿石生成约束，而裸露的石头、裸露的矿石、砂砾与地表资源提供了预期的初始材料。矿石分布通过世界生成数据包控制。

## `PRG-07` - 不稳定土壤坍塌 {#prg-07}
**配置：** `Enable unstable soil collapse`; `Soil collapse delay (ticks)`; `Extra slope collapse delay (ticks)`

泥土及其他带有相应标签的土壤在失去支撑后会垂直下落。当相邻空间与其下方的方块构成连续开口时，它们也可能从敞开的边缘向侧面滑落，然后继续沿斜坡下落。

敞开斜坡的坍塌会等待常规坍塌延迟再加上一段额外延迟，后者默认为 40 tick。在预定检查之前封闭开口或放置脚手架即可阻止坍塌，让玩家有时间在挖掘矿道时加以支撑。土壤正下方的脚手架会被视为稳定支撑。

## `CRF-01` - 限时合成 {#crf-01}
**配置：** `Enable timed crafting`; `Use MITE recipe difficulties when available`; `Minimum crafting time (ticks)`; `Base crafting time (ticks)`; `Crafting time per occupied ingredient slot (ticks)`

合成需要时间，其长短取决于配方难度、占用的原料、工作台与玩家进度。移动原料、关闭菜单或失去资格会按服务器状态取消或暂停工作。

## `CRF-02` - 合成资格与取消 {#crf-02}
**配置：** `Crafting requires food energy`; `Control effects prevent crafting`; `Enable timed crafting`

食物耗尽与束缚类效果可以暂停或拒绝合成。原料变动、关闭菜单、死亡、断线或切换到其他菜单都会安全地取消当前的服务端任务。

## `CRF-03` - 工作台等级与配方 {#crf-03}
**配置：** `Require material-tiered workbenches`; `Disable vanilla equipment recipes`

配方要求使用合适材料制成的工作台，从燧石一直到高阶金属与黑曜石。会绕过这一阶梯的装备配方已从普通的原版合成中移除。

## `CRF-04` - 装备品质 {#crf-04}
**配置：** `Enable equipment quality`; `Automatically select the highest affordable quality`; `Charge experience for superior quality`

合成出的装备可以获得影响其性能的品质等级。玩家可以花费经验选择品质，也可以让游戏自动选择可用的最高等级。

## `CRF-05` - 工作台遮挡 {#crf-05}
**配置：** `Require clear space above workbenches`

使用工作台要求其上方有净空。被遮挡的工作台会拒绝打开或合成，并向玩家说明原因。

## `CRF-06` - 由服务器计时的合成状态 {#crf-06}
**配置：** `Enable timed crafting`; `Enforce server authority`

合成进度由服务器计时并同步到客户端 HUD。客户端可以显示或取消任务，但无法宣告完成、复制结果，或在状态无效转换后保留进度。

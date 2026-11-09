---
title: 材料、生产与食物规则
sidebar_position: 4
---

# 材料、生产与食物规则

## `MAT-01` - 材料流程 {#mat-01}
**配置：** `Enable production overhaul`; `Enable metal tiers`

采矿、合成、冶炼、修理、武器、盔甲与抗性共用同一条材料阶梯。工具与工作台的等级会阻止低阶段材料处理更晚阶段的资源。

## `MAT-02` - 金属与材料方块 {#mat-02}
**配置：** `Enable metal tiers`; `Enable material chainmail`; `Enable metal doors`; `Enable metal bars`; `Enable ore-storage blocks`

银、远古金属、秘银与艾德曼合金延伸了原版的铜、金与铁。它们的锭、粒、盔甲、锁链、门、栏杆、储存方块及相关装备共享同一材料身份；铜继续使用原版的锭、矿石与方块。

## `MAT-03` - 材料的战斗属性 {#mat-03}
**配置：** `Silver-arrow damage multiplier against undead`; `Enable exact MITE arrow and skeleton rules`; `Skeleton arrow friendly-fire damage multiplier`; `Skeleton arrow damage-taken multiplier`; `Skeleton projectile material-damage multiplier`; `Skeleton projectile base damage bonus`; `Longdead arrow damage bonus`; `Longdead Guardian arrow damage bonus`; `Burning-arrow gelatinous damage bonus`

弹射物的材料与目标家族都会影响伤害。银对亡灵效果突出，燃烧的箭矢会伤害凝胶状生物，而骷髅变种会获得考虑材料差异的箭矢行为。

## `MAT-04` - 武器与装备家族 {#mat-04}
**配置：** `Enable additional MITE melee weapons`

MITE 加入了小刀、匕首、短棍、棍棒、手斧、战斧、战锤、锄镐与镰刀。每个已实现的家族都有各自不同的触及范围、伤害、采集用途与可用材料。

## `MAT-05` - 原版装备限制 {#mat-05}
**配置：** `Disable vanilla equipment recipes`; `Enable metal tiers`

原版的铁、金、钻石与下界合金装备在适当场合仍保留其原本身份，但其部件与配方遵循 MITE 的流程。后期盔甲无法绕过工作台与配方的门槛。

## `MAT-06` - 黑曜石工具 {#mat-06}
**配置：** `Enable obsidian tools`

黑曜石工具构成高于燧石的非金属层级。它们提供了一条更早获得更强切割与挖掘能力的路径，但不会取代后期金属工作台的阶梯。

## `MAT-07` - 基于硬度的工具磨损 {#mat-07}
**配置：** `Scale tool wear with block hardness`; `Tool durability cost multiplier`

破坏方块会依据其硬度与工具家族消耗耐久。坚硬的石头比松软的土壤昂贵得多，而剑、锹与挖掘工具使用不同的磨损速率。

## `MAT-08` - 盔甲耐久与最小伤害 {#mat-08}
**配置：** `Damaged armor loses protection`; `Enable minimum damage floor`; `Minimum nonzero damage`; `Fire bypasses ordinary armor`

盔甲在其耐久的前一半保持完整防护，随后在接近损坏时逐渐失效。成功的攻击会保留可配置的最小伤害量，而火焰可以绕过普通盔甲的减伤。

## `MAT-09` - 熔岩与酸液腐蚀 {#mat-09}
**配置：** `Lava damages equipped items`; `Lava equipment-damage multiplier`; `Lava metal-equipment damage multiplier`; `Acidic gelatinous creatures corrode inventory`; `Acid corrosion chance per creature size`; `Acid corrosion damage multiplier`

熔岩会损坏穿戴与手持的装备，而酸性凝胶状生物会腐蚀物品栏中可损耗的物品。艾德曼合金以及被加入抗酸标签的物品免疫。

## `MAT-10` - 皮革盔甲的现场修理 {#mat-10}
**配置：** `Allow leather armor field repair`; `Leather armor field-repair multiplier`

受损的皮革盔甲可以在个人合成栏中用线或筋腱修理。该配方保留原有的盔甲堆叠并恢复受控数量的耐久。

## `MAT-11` - 铁砧与装备修理 {#mat-11}
**配置：** `Enable material anvils`; `Enable MITE equipment repair`; `Equipment repair effectiveness multiplier`; `Repair experience cost per material`

材料铁砧按等级限制可修理的装备。修理材料、效果与经验消耗取决于被修复的装备以及所使用的工作台。

## `MAT-12` - 金属桶 {#mat-12}
**配置：** `Enable metal buckets`; `Allow non-adamant bucket melting in lava`; `Copper bucket lava-melting chance`; `Silver bucket lava-melting chance`; `Gold bucket lava-melting chance`; `Iron bucket lava-melting chance`; `Ancient metal bucket lava-melting chance`; `Mithril bucket lava-melting chance`; `Adamantium bucket lava-melting chance`; `Experience cost for source placement`

桶存在于多个金属等级中。熔岩会损坏较弱的桶，而在由服务器控制的规则下，放置珍贵的流体源需要消耗经验。

## `SMELT-01` - 熔炉家族 {#smelt-01}
**配置：** `Enable furnace family`

黏土、砂岩、硬化黏土、黑曜石与下界岩熔炉构成了一条生产线阶梯。熔炉的材料决定该工作台能支持哪些热量等级与配方。

## `SMELT-02` - 熔炉热量与燃料 {#smelt-02}
**配置：** `Enable furnace heat`; `Wood and charcoal heat level`; `Coal heat level`; `Lava heat level`; `Blaze-rod heat level`; `Log furnace burn time`; `Plank furnace burn time`; `Lava-bucket furnace burn time`; `Manure furnace burn time`

燃料既提供燃烧时间，也提供热量。普通金属、秘银与艾德曼合金需要越来越热的燃料与熔炉材料，从而阻止用初始设备完成高阶冶炼。

## `SMELT-03` - 矿石与熔炉等级要求 {#smelt-03}
**配置：** `Metal-ore required heat level`; `Mithril-ore required heat level`; `Adamantium-ore required heat level`; `Coal heat level`; `Lava heat level`; `Blaze-rod heat level`

普通金属矿石需要煤炭热量以及圆石熔炉或更好的熔炉。秘银需要熔岩热量与黑曜石熔炉，而艾德曼合金需要烈焰棒热量与下界岩熔炉。

## `SMELT-04` - 熔炉窒息与灌水 {#smelt-04}
**配置：** `Enable furnace smothering and flooding`

水或堵住熔炉正面的实体方块会立即将其熄灭。燃烧时间、烹饪进度、热量与点燃的方块状态都会被重置，玩家会收到具体的遮挡提示。

## `SMELT-05` - 熔炉经验 {#smelt-05}
**配置：** `Use MITE furnace experience`; `Furnace experience multiplier`

受支持的金属产物与熟食产物会给予固定的 MITE 经验值。手动取出会把奖励给予玩家，而漏斗抽取会在熔炉正面生成经验球。

## `FOD-01` - 食物营养数值 {#fod-01}
**配置：** `Enable MITE food values`; `Enable nutrient physiology`; `Nutrition per food point`; `Nutrient reserve per food point`

每种受支持的食物都提供各自组合的食物能量、蛋白质、必需脂肪、植物营养素与糖分反应。食物能量用于抵抗饥饿，并与三项长期营养储备分别追踪。数据包定义物品与标签的对应关系，允许整合包扩展食物表。

## `FOD-02` - 生存食物链 {#fod-02}
**配置：** `Enable MITE food values`; `Enable nutrient physiology`; `Enable MITE fishing`; `Enable blueberry bushes`

狩猎、采集、钓鱼、作物、乳制品、汤、沙拉与甜点构成一条食物链。简单的食物能让玩家在前期存活，而经过加工且多样化的餐食才能维持长期恢复所需的营养储备。

## `FOD-04` - 钓鱼与鱼饵 {#fod-04}
**配置：** `Enable MITE fishing`; `Deep-ocean salmon chance`; `Grass worm base chance`; `Grass worm Fortune bonus per level`; `Grass worm rain bonus`; `Grass worm maximum chance`

天气、时间、水域类型与昆虫鱼饵都会影响钓鱼。草可以提供蚯蚓，深海则可以按可配置的概率产出鲑鱼。

## `FOD-05` - 鱼钩战斗 {#fod-05}
**配置：** `Fishing-hook impact damage`; `Enable MITE fishing`

抛出的鱼钩可以造成少量由服务器判定的撞击伤害。材料钓竿各自保留耐久与鱼饵行为，而鱼钩并不会因此变成完整的远程武器。

---
title: 实体、战斗与魔法规则
sidebar_position: 6
---

# 实体、战斗与魔法规则

## `MOB-01` - 高级敌对行为 {#mob-01}
**配置：** `Enable mob overhaul`; `Enable advanced AI`; `Enable combat rebalance`

敌对生物拥有更长的感知范围、协同的目标选择、更好的站位以及重新平衡的战斗行为。这些变化让遭遇战因其决策而危险，而不只是靠堆高生命值。

## `MOB-02` - 可见性与局部种群 {#mob-02}
**配置：** `Prevent visible mobs from despawning`; `Visible mob persistence range`; `Enable local monster population protection`; `Local monster base limit`; `Local monster depth interval`; `Local monster horizontal radius`; `Local monster vertical radius`; `Blood-moon local monster limit multiplier`; `Full-moon local monster limit multiplier`

处于附近活跃玩家视野内的活体怪物会刷新其消失计时。自然敌对生成还遵守一个以玩家为中心的局部上限，该上限随深度增加，并在满月与血月期间提高。

## `MOB-03` - 牲畜恐慌传播 {#mob-03}
**配置：** `Enable livestock wellness`; `Livestock panic horizontal radius`; `Livestock panic vertical radius`; `Livestock minimum panic duration (ticks)`; `Livestock random panic duration (ticks)`

受到威胁的牲畜会更有效地逃离，并把恐慌跨物种传播给附近的动物。恐慌持续时间与传播范围由服务器控制，并会反馈到牲畜健康系统中。

## `MOB-04` - 骷髅射击位置 {#mob-04}
**配置：** `Enable advanced AI`; `Enable skeleton firing-position AI`; `Firing-position attempt interval`; `Firing-position player range`; `Firing-position search radius`; `Firing-position search attempts`; `Firing-position movement speed`

手持弹射武器的无目标骷髅可以搜索一个可到达、且能对隐蔽玩家形成清晰射击线的位置。除这一目标与普通的同伴警戒行为外，MITE 并不定义单独的通用伏击或编组系统。

## `MOB-05` - 僵尸挖掘与行为对齐 {#mob-05}
**配置：** `Enable exact MITE mob behaviors`; `Enable advanced AI`; `Enforce server authority`

部分实体会复现 MITE 的交互，例如会考虑工具的僵尸挖掘与接触效果。破坏性行为遵守服务器规则、方块硬度、工具要求与 `mobGriefing`。

## `MOB-06` - 骷髅与远古亡灵变种 {#mob-06}
**配置：** `Enable exact MITE mob behaviors`; `Enable exact MITE arrow and skeleton rules`; `Longdead arrow damage bonus`; `Longdead Guardian arrow damage bonus`; `Skeleton projectile base damage bonus`

骷髅家族的敌人包括远程与快速的近战变种。远古亡灵使用远古金属箭，普通骷髅使用锈铁箭，而骷髅的友伤与材料伤害规则会被一致地应用。

## `MOB-07` - 敌对鱿鱼 {#mob-07}
**配置：** `Enable exact MITE mob behaviors`; `Enable combat rebalance`

鱿鱼可以追击附近的玩家，并在接触时施加强力的移动减速，使开阔水域的穿行变得危险，而不是把每只鱿鱼都当作被动的景物。

## `MOB-08` - 新怪物与替换 {#mob-08}
**配置：** `Enable MITE mobs`; `Giant Vampire Bat replacement chance`; `Longdead Guardian replacement chance`; `Infernal Creeper replacement chance`; `Infernal Creeper sky-gate bypass chance`; `Infernal Creeper height-roll maximum`; `Wight rare-drop chance`; `Wight rare-drop Looting bonus per level`

MITE 加入了亡灵、蜘蛛、蝙蝠、凝胶状生物、元素生物、炼狱生物以及其他敌对家族。替换概率控制更强的变种何时取代普通的生成。

## `MOB-09` - 凝胶状与蛛形能力 {#mob-09}
**配置：** `Enable gelatinous sphere projectiles`; `Enable arachnid web projectiles`

凝胶状怪物与敌对蜘蛛使用各自家族特有的弹射物与控制效果。它们的体型、碰撞、伤害免疫与落地反馈都与对应的生物变种一致，而不是套用原版史莱姆的行为。

## `MOB-10` - 女巫诅咒 {#mob-10}
**配置：** `Enable witch curses`; `Witch curse delay (ticks)`; `Show witch curse HUD`

除普通的药水战斗外，女巫还可以施加延迟诅咒。诅咒的计时与状态由服务器掌控，而客户端 HUD 会显示已知的诅咒信息。

## `MOB-11` - 生成条件与蠹虫方块 {#mob-11}
**配置：** `Enable MITE moon-based surface spawning`; `Blue-moon surface spawn chance`; `Blood-moon surface spawn chance`; `Full-moon surface spawn chance`; `New-moon surface spawn chance`; `Ordinary-moon surface spawn chance`; `Daytime undead surface spawn chance`; `Enable MITE infested-block silverfish variants`; `Generate MITE infested silverfish blocks`

实体生成可以取决于维度、高度、生物群系、月相与来源方块。被虫蚀的石头与下界岩使用显式的来源规则，让整合包可以安全地扩展蠹虫行为。

## `MOB-12` - 大地元素 {#mob-12}
**配置：** `Earth Elemental maximum heat`; `Earth Elemental magma heat threshold`; `Earth Elemental passive cooling`; `Earth Elemental rain cooling bonus`; `Earth Elemental cold-biome cooling bonus`; `Earth Elemental water cooling bonus`; `Earth Elemental healing interval (ticks)`; `Earth Elemental healing amount`; `Earth Elemental natural defense`; `Earth Elemental ignition chance`; `Earth Elemental minimum ignition duration (seconds)`; `Earth Elemental maximum ignition duration (seconds)`; `Earth Elemental maximum health`; `Earth Elemental follow range`; `Earth Elemental movement speed`; `Earth Elemental attack damage`; `Enable Fire Elemental lava spawning`

大地元素会追踪热量、在雨水、水与寒冷生物群系中冷却、随时间治疗、抵抗伤害，并可以点燃目标。火焰元素在熔岩中的生成则单独控制。

## `MAG-01` - 附魔 {#mag-01}
**配置：** `Enable MITE enchantment effects`; `Enable MITE arrow recovery`; `Arrow Recovery chance per level`; `Speed movement bonus per level`; `Free Action compensation per level`; `Butchering extra-drop scale`; `Butchering spider-eye chance`; `Stun chance per level`; `Stun duration per level (ticks)`; `Stun Slowness amplifier per level`; `Vampiric trigger chance per level`; `Vampiric maximum healing ratio`; `Disarming chance per level`; `Poison chance per level`; `Poison base duration (ticks)`; `Poison duration per level (ticks)`

15 种 MITE 附魔涵盖箭矢回收、收获、屠宰、机动、控制、毒素、吸血以及其他生存用途。效果概率、持续时间、治疗上限与回收速率都可以按附魔等级配置。

## `MAG-02` - 更强的状态效果 {#mag-02}
**配置：** `Enable survival overhaul`; `Enable nutrient physiology`; `Enable witch curses`; `Show survival HUD`; `Show witch curse HUD`

MITE 提供了抗性、缓慢与中毒的更强命名变体，以及营养不良、胰岛素抵抗、麻痹与女巫诅咒。它们的等级、持续性、清除规则、服务器同步与 HUD 状态都作为同一个状态系统处理。

## `MAG-03` - 弹射物与材料伤害 {#mag-03}
**配置：** `Enable exact MITE arrow and skeleton rules`; `Silver-arrow damage multiplier against undead`; `Skeleton arrow friendly-fire damage multiplier`; `Skeleton arrow damage-taken multiplier`; `Skeleton projectile material-damage multiplier`; `Skeleton projectile base damage bonus`; `Longdead arrow damage bonus`; `Longdead Guardian arrow damage bonus`; `Burning-arrow gelatinous damage bonus`

箭矢材料、射击者类型、目标家族、燃烧状态与附魔共同参与一套由服务器判定的伤害计算。这保证了对亡灵与凝胶状敌人时弹药选择仍然有意义。

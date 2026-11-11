---
title: entity_action_type（实体行为）
description: 模组注册的全部内置实体行为类型，以及每种类型接受的 JSON 字段。
---

# entity_action_type（实体行为）

<span id="entity-action-type-实体行为" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/action/entity-action.md)。
:::

**实体行为**对单个实体执行一次操作。作用对象由声明这条行为的那个定义给出，行为本身只描述要对它做什么。`type` 写在行为对象里，和它的字段平级，取值是带 `mxt` 命名空间、列在本页里的 id 之一。

实体行为是 Java（内置）注册表，`type` id 固定，数据包既加不了条目也删不掉条目。要加自定义类型只能写 Java，或者用 KubeJS 桥接，见 [KubeJS API](../../../kubejs/api-reference.md)。

```json
{
  "type": "mxt:heal",
  "amount": 4
}
```

行为是别的定义里的值，所以通常嵌在 `entity_action` 这类字段下面：

```json
"entity_action": {
  "type": "mxt:apply_effect",
  "effect": "minecraft:speed",
  "duration_ticks": 200
}
```

凡是收实体行为的地方也收数组。数组是 `mxt:sequence` 的简写，按写的顺序挨个执行：

```json
"entity_action": [
  { "type": "mxt:extinguish" },
  { "type": "mxt:heal", "amount": 2 }
]
```

字段表里「默认」列标着 **必填** 的键必须写，其余写的是省略时的取值。可选的行为字段省略时默认是 `mxt:no_op`，所以"写了 `condition` 却漏了 `action`"这类错在加载期不报错，只是那一项什么都不做。

:::info 字段类型是共享的
许多字段收[数值提供器](../../../../../library/saturn/types/number.md)而不是固定数字，另有一些类型引用共享的[数据类型](../shared_data_types.md)。字段收嵌套的行为或条件时，值用对应家族的 id。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 能交互式地列出一个类型有哪些字段，核对字段名挺方便，不用翻本页的表。
:::

## 行为类型 {#行为类型}

### `mxt:damage` {#mxt-damage}

对实体施加伤害。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `amount` | 数值提供器 | **必填** | 伤害量，点数。 |
| `damage_type` | 伤害类型 id | 无 | 构造这一击的来源。 |
| `element` | 元素 id 或 `#标签`的列表 | `[]` | 声明这一击的元素。 |

```json
{ "type": "mxt:damage", "amount": 4, "damage_type": "minecraft:magic" }
```

它**没有归属**，因此不结算灵根元素关系，也不记攻击者：反噬、丹药毒性和环境 tick 这类"代价"用它是对的。当它落在施法者以外的人身上时，改为把施法者记为加害者。

`damage_type` 构造这一击的来源，`element` 声明这一击的元素：只写元素时取它认领的第一个类型；两个都写时在**首次使用**这一击时核对元素确实认领了它，不一致各报一次日志。见[伤害系统](../../../technical/damage.md)。

只在服务端结算；求值不是有限值或不大于 `0` 时什么都不做。

### `mxt:attach_element` {#mxt-attach-element}

给实体加上（或减去）某个元素的附着。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `element` | 元素 id | **必填** | 要加减哪个元素的附着。 |
| `amount` | 数值提供器 | **必填** | 加多少；负数表示净化。 |

```json
{ "type": "mxt:attach_element", "element": "example:fire", "amount": -5 }
```

求值不是有限值、或等于 `0` 时什么都不做。写正数会走与打击**同一条**反应管线，攒够即触发 [element_reaction](../../json/element_reaction.md)，所以"泡在岩浆里""服丹""诅咒持续喂火"都用它。

### `mxt:grant_spirit_root` {#mxt-grant-spirit-root}

授予实体一个[灵根](../../json/spirit_root.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `spirit_root` | 灵根 id | **必填** | 授予哪条灵根。 |

```json
{ "type": "mxt:grant_spirit_root", "spirit_root": "example:azure_root" }
```

非生物目标不跑。

### `mxt:grant_physique` {#mxt-grant-physique}

在其持有条件、叠层与互斥检查都通过后授予一个[体质](../../json/physique.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `physique` | 体质 id | **必填** | 授予哪条体质。 |

```json
{ "type": "mxt:grant_physique", "physique": "example:flame_body" }
```

非生物目标不跑。任何一项检查不过就不授予。

### `mxt:remove_spirit_root` {#mxt-remove-spirit-root}

移除一个已持有的灵根及其授予的技能。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `spirit_root` | 灵根 id | **必填** | 移除哪条灵根。 |

```json
{ "type": "mxt:remove_spirit_root", "spirit_root": "example:azure_root" }
```

非生物目标不跑。

### `mxt:remove_physique` {#mxt-remove-physique}

移除一个已持有的体质及其授予的技能和属性来源。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `physique` | 体质 id | **必填** | 移除哪条体质。 |

```json
{ "type": "mxt:remove_physique", "physique": "example:flame_body" }
```

非生物目标不跑。

### `mxt:apply_curse` {#mxt-apply-curse}

通过权威诅咒事务施加一个数据包[诅咒](../../json/curse.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `curse` | 诅咒 id | **必填** | 施加哪条诅咒。 |
| `stacks` | 数值提供器 | `1` | 施加几层。 |
| `duration_ticks` | 数值提供器 | 无 | 持续多少 tick；不写由诅咒自己决定。 |

```json
{ "type": "mxt:apply_curse", "curse": "example:burning_meridian", "stacks": 2 }
```

`stacks` 不是有限值、小于 `1` 或大于 `256` 时整条不施加，`stacks` 按四舍五入取整。`duration_ticks` 不是有限值、为负或超过 `Long.MAX_VALUE` 时当作没写这一项。

### `mxt:apply_curses` {#mxt-apply-curses}

通过标准事务施加若干个独立配置的诅咒。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `curses` | 诅咒条目数组 | **必填** | 逐条独立施加。 |

```json
{
  "type": "mxt:apply_curses",
  "curses": [
    { "curse": "example:burning_meridian", "stacks": 2 },
    { "curse": "example:weak_spirit", "duration_ticks": 600 }
  ]
}
```

:::info 条目形状与默认值
每个条目自身**不带** `type` 键：

| 条目字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `curse` | 诅咒 id | **必填** | 施加哪条诅咒。 |
| `stacks` | 数值提供器 | `1` | 施加几层。 |
| `duration_ticks` | 数值提供器 | 无 | 持续多少 tick；不写由诅咒自己决定。 |
:::

条目之间互不影响，某一条不施加不会停掉后面的条目。

### `mxt:remove_curse` {#mxt-remove-curse}

以 `cleansed` 原因移除一个指定诅咒，因此它的 `on_cleanse` 会执行。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `curse` | 诅咒 id | **必填** | 移除哪条诅咒。 |

```json
{ "type": "mxt:remove_curse", "curse": "example:burning_meridian" }
```

### `mxt:remove_curses_by_tag` {#mxt-remove-curses-by-tag}

净化模型的解除侧：移除所有带有所给 `mxt:curse` 标签中**任意一个**的已持有诅咒，原因同样是 `cleansed`。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `tags` | 标签数组 | **必填** | 写成 `"#namespace:path"`。 |

```json
{ "type": "mxt:remove_curses_by_tag", "tags": ["#example:minor_curses"] }
```

诅咒定义从不声明什么可以净化它。

### `mxt:spawn_sword_aura` {#mxt-spawn-sword-aura}

在本次行为的发动位置生成一把剑气。剑尖沿行为实体的视线方向，速度由 `speed` 控制；剑身和火焰颜色分别由两个 ARGB 颜色控制。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `speed` | 数值提供器 | `1` | 沿视线方向的速度，必须求值为有限正数。 |
| `blade_color` | ARGB 颜色 | `#C778D9FF` | 内部剑身颜色；最高字节是透明度。 |
| `aura_color` | ARGB 颜色 | `#CC78D9FF` | 外层剑气颜色；最高字节是透明度。 |
| `radial_flame` | 布尔 | `false` | 为 `true` 时火焰从剑身向四周流动；否则向上流动。 |
| `length` | 浮点数 | `1.65` | 剑刃长度，范围 `0.01`–`32`。 |
| `blade_width` | 浮点数 | `0.26` | 剑刃宽度，范围 `0.01`–`32`。 |
| `thickness` | 浮点数 | `0.08` | 剑身厚度，范围 `0.01`–`32`。 |
| `handle_length` | 浮点数 | `0.44` | 剑柄长度，范围 `0.01`–`32`。 |
| `guard_width` | 浮点数 | `0.52` | 护手宽度，范围 `0.01`–`32`。 |
| `scale` | 浮点数 | `1` | 整体缩放，范围 `0.01`–`32`。 |
| `lifetime` | 整数 | `80` | 存活时间，单位为 tick，范围 `1`–`72000`。 |
| `collide_action` | 实体行为 | 无 | 撞到实心方块时执行的行为。写了它剑气才会在撞到后消失；不写则直接穿过方块。 |

```json
{
  "type": "mxt:spawn_sword_aura",
  "speed": 1.5,
  "blade_color": "#C778D9FF",
  "aura_color": "#CC78D9FF",
  "radial_flame": false,
  "length": 1.65,
  "blade_width": 0.26,
  "thickness": 0.08,
  "handle_length": 0.44,
  "guard_width": 0.52,
  "scale": 1.0,
  "lifetime": 80
}
```

只在服务端生成。出生点是这次发动的地点，方向取行为实体的视线方向；颜色字段只接受 ARGB 颜色，不另外读取透明度字段。尺寸超出范围会在加载期拒收，`speed` 求值不是有限正数时不生成。

写了 `collide_action` 的剑气每一步都会检查自己即将进入的实心方块：撞上就先在撞击点执行这条行为，然后消失。执行时行为实体是发动剑气的那一方——公式里的 `caster_*` 读的是它，`mxt:damage` 这类落在行为实体上的动作也作用在它身上；位置是撞击点，所以声音、粒子、爆炸与方块行为都发生在撞到的地方。发动者已经不在（掉线、所在区块未加载）时这条行为不执行，剑气仍然消失。它只在服务端保存，不发给客户端，也不影响剑气的显示。

### `mxt:explode` {#mxt-explode}

在实体所在位置制造一次爆炸。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `power` | 浮点数 | **必填** | 爆炸威力。 |
| `interaction` | 原版爆炸交互类型 | `mob` | 例如 `mob` 或 `none`。 |
| `indestructible` | 方块条件 | 无 | 匹配上的方块在爆炸里被保护。 |
| `create_fire` | 布尔 | `false` | 爆炸是否留下火。 |

```json
{ "type": "mxt:explode", "power": 3.0, "create_fire": true }
```

只在服务端爆炸。`power` 不是有限数或者是负数时什么都不发生。施法者被记为这场爆炸的起因。

### `mxt:spawn_lightning` {#mxt-spawn-lightning}

在行为位置加上偏移量的位置劈下一道带颜色的闪电；这道闪电之后做什么由原版闪电自己的行为决定——除了颜色，它**就是原版闪电**：伤害、引燃、避雷针充能、铜氧化、雷声、天空闪光以及村民→女巫、猪→僵尸猪灵、苦力怕充能这些雷击转化全部照旧。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `offset_x` | 数值提供器 | `0` | 相对行为位置的 X 偏移。 |
| `offset_y` | 数值提供器 | `0` | 相对行为位置的 Y 偏移。 |
| `offset_z` | 数值提供器 | `0` | 相对行为位置的 Z 偏移。 |
| `color` | 颜色 | `0x737380` | 闪电颜色，写 `#RRGGBB`（整数或 `[r,g,b]` 浮点数组也接受），一律按不透明处理。 |
| `alpha` | 浮点数 | `0.3` | 辉光强度，取值 `0`–`1`。 |
| `thickness` | 浮点数 | `1` | 光柱粗细，取值 `0.1`–`4`。 |
| `palette` | RGB 颜色数组 | `[]` | 渐变，最多 `16` 个条目。 |
| `damage` | 数值提供器 | `5` | 雷击伤害，与原版一致。 |
| `visual_only` | 布尔 | `false` | 为 `true` 时这道闪电只作装饰：只打雷，不结算伤害、不引燃。 |
| `cause` | 布尔 | `true` | 把它归属给玩家。 |

```json
{ "type": "mxt:spawn_lightning", "color": "#8A2BE2", "damage": 8 }
```

写进天劫时间线时，这些字段都放在那一拍的 `action` 里：

```json
{
  "timeline": [
    {
      "type": "mxt:action",
      "action": {
        "type": "mxt:spawn_lightning",
        "palette": ["#7A5CFF", "#66CCFF"],
        "alpha": 0.45,
        "thickness": 1.6,
        "damage": 12
      }
    },
    { "type": "mxt:idle", "duration": 20 }
  ]
}
```

完全不需要字段也能写，闪电就落在行为位置本身，偏移量默认为 `0`。

`cause` 把这道闪电归属给玩家，玩家随后成为它造成伤害的来源，也可以触发原版 `channeled_lightning` 进度；`cause` 生效要求行为实体本身是玩家。

四个数值字段（三个偏移量与 `damage`）都必须求值为有限值，否则整条不劈。`damage` 求值后为负按 `0` 处理。

它是一个 `EntityAction`，所以天劫时间线、成败行为、阵法逐实体行为、技能、契约、秘境——任何 `EntityAction` 槽位都能用。

不做数据包、只想直接打一道雷时用 `/mxt lightning`（顶层别名 `/lightning`），参数与上表一一对应（渐变在命令里写作 `palette 7A5CFF,66CCFF`，不带 `#`），见[命令](../../../player-guide/commands.md)。

:::info 颜色与渐变
`color` 接受与灵气颜色相同的写法（`#RRGGBB`；整数或 `[r,g,b]` 浮点数组也接受），默认值就是原版那身冷白（按 8 位取整）；`alpha` 取 `0..1`，`thickness` 取 `0.1..4`。

`alpha` 是**亮度**不是透明度：原版闪电走加法混合，顶点色的 `RGB × alpha` 就是它的发光强度，所以调高更刺眼，调低更幽暗。

`palette` 用渐变**取代**单一的 `color`：它是一组 RGB 颜色（色值写法与 `color` 相同），第一个位于光柱顶端，最后一个位于地面，最多 16 个条目。渲染时按雷柱的九道横向接缝逐段取色，相邻两项之间线性过渡（一项 = 纯色，两项 = 两端渐变，更多项 = 多段渐变）；四个叠加层和两条分叉读同一组接缝，所以分叉在它离开主干的高度上颜色与主干一致。`alpha` 仍是整道闪电共用的一个辉光值，而不是每个颜色一个。

非法颜色或长度超过 16 的列表会在**解码期**直接失败，而不是被静默丢弃：渐变里的笔误应当看得见。
:::

### `reincarnation:add_lifespan` {#reincarnation-add-lifespan}

增加目标的剩余寿元与本世累计授予总额。需要安装可选的 Reincarnation 模组。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `amount` | 数值提供器 | **必填** | 增加量，单位刻，必须非负。 |

```json
{ "type": "reincarnation:add_lifespan", "amount": 2400 }
```

常量和公式均在执行时检查，结果非有限或为负时不操作；有效结果按 `Math.round` 取整。数量为 `0` 时不修改账本，也不为未记账目标开账。非生物目标不操作。

**寿元总开关关闭时仍可写入**；该开关控制自然老化。详见[寿元](../../../player-guide/lifespan.md)。

### `reincarnation:remove_lifespan` {#reincarnation-remove-lifespan}

扣除目标的剩余寿元，最低到 `0`，不减少本世累计授予总额。需要安装可选的 Reincarnation 模组。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `amount` | 数值提供器 | **必填** | 扣除量，单位刻，必须非负。 |

```json
{ "type": "reincarnation:remove_lifespan", "amount": 1200 }
```

数量的校验、取整、零值和非生物目标处理与增寿行为一致。寿元总开关关闭时也可扣除。

### `mxt:modify_pill_toxicity` {#mxt-modify-pill-toxicity}

改写目标身上累计的丹毒。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `mode` | 字符串 | `add` | `add` 或 `set`。 |
| `amount` | 数值提供器 | **必填** | 数量。 |

```json
{ "type": "mxt:modify_pill_toxicity", "mode": "add", "amount": -30 }
```

这是数据包里**唯一一处**把自选数字写进丹毒账的写入。负的 `add` 就是排毒，结果不会低于 `0`；`set` 的写死常量必须非负，否则加载期报错。非生物目标是静默无操作，求值不是有限值时什么都不做。

丹毒平时由 [pill](../../json/pill.md) 的服用规则累积；服务端配置「炼丹 → 每秒丹毒自然消退」默认 `0`，也就是不自然消退。

### `reincarnation:unlimited_lifespan` {#reincarnation-unlimited-lifespan}

关闭账本，直到显式授予寿元重新开账。没有字段。

```json
{"type":"reincarnation:unlimited_lifespan"}
```

### `reincarnation:reincarnate` {#reincarnation-reincarnate}

排队转世。mode 默认为 configured，new_life 归档并替换玩家，reset 保持对象和世代；非玩家始终原地重置。reason 是可选聊天组件。

```json
{"type":"reincarnation:reincarnate","mode":"new_life","reason":{"text":"服用转世丹"}}
```

### `mxt:cultivate` {#mxt-cultivate}

让目标**开始运功**。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `action?` | 法门 id | 走挑选 | 点名一条 [`cultivation`](../../json/cultivation.md)；不写就按"当下适用的里 `priority` 最大的一条"挑。 |

```json
{ "type": "mxt:cultivate" }
{ "type": "mxt:cultivate", "action": "example:azure_meditation" }
```

与玩家自己按修炼键是**同一条开始路径**：点名的那条也要过自己的 `start_condition` 与 `cultivate_condition`（"这一拍能不能拿到成果"；`tick_condition` 答的是"还继续不继续修炼"，开始前不参与挑选），一条都不适用就什么都不发生。

**没有返回值，失败一律静默**：已经在修炼、或在冷却、或条件不成立都只是"没开始"。要提示就在数据包里用 `mxt:if_else` 配 [`mxt:cultivating`](../condition/entity_condition_types.md) 自己发消息。

只在服务端生效，非生物目标是静默无操作。这是数据包与脚本把一具身体"开练"的唯一入口（另一个入口是玩家的修炼键）。

### `mxt:stop_cultivating` {#mxt-stop-cultivating}

让目标**停下正在运功的那一条**，并按下这条法门自己的 `cooldown` 写冷却。

没有字段，整条就写作 `{"type": "mxt:stop_cultivating"}`。

与玩家自己按修炼键停下是同一条路径（含漂浮物的归还、突破侦听的清理与移动限制的解除）。目标本来就没在修炼时静默无操作；同样只在服务端生效、只认生物。

:::info 嵌套值
`mxt:if_else` 接受一个[实体条件](../condition/entity_condition_types.md)；`mxt:passenger_action` 与 `mxt:riding_action` 接受实体行为、[双实体行为](./bientity_action_types.md)和[双实体条件](../condition/bientity_condition_types.md)；`mxt:explode` 用[方块条件](../condition/block_condition_types.md)筛选受保护的方块。
:::

---
title: 定义功法与晋级
description: 配置功法进度链、熟练度来源、等级条件与自动晋升规则。
---

# 定义功法与晋级

<span id="定义功法与晋级" />

一门会升级的功法是三张表组合的：**进度链**（`mxt/progression/` 里一级一个文件）、**衡量熟练度的数值**（`resource`），以及**功法定义**（`technique`），它把前两者接到自己身上。等级不是第四张表——它就是进度链上的一级，链由 `next_level` 串出来。

本篇基于[定义技能](./add-an-ability.md)，为 `example:azure_breath` 增加进度链，使玩家学习功法后可通过熟练度提升等级。

## 教程目标 {#你要搭建什么}

| 文件 | 用途 |
| --- | --- |
| `data/example/saturn/resource/azure_mastery.json` | 衡量该功法熟练度的数值。 |
| `data/example/mxt/progression/azure_breath_1.json` | 链的入口级。 |
| `data/example/mxt/progression/azure_breath_2.json` | 第二级：门槛、倍率，以及它给的能力。 |
| `data/example/mxt/progression/azure_breath_3.json` | 最高级，不写 `next_level`。 |
| `data/example/mxt/technique/azure_breath.json` | *（编辑）* 接上链、点名熟练度数值、给每一级配条件与能力。 |
| `data/example/mxt/cultivation/meditation.json` | *（编辑）* 打坐结算那一拍也涨一点熟练度。 |
| `data/example/saturn/trigger/azure_mastery_from_kill.json` | 击杀也涨一点熟练度。 |

## 第 1 步 —— 熟练度就是一个数值 {#第-1-步-——-熟练度就是一个数值}

功法身上没有"熟练度"这个计数器：`mastery_resource` 指的是 `resource` 表里的一个数，链上每一级的 `mastery` 指的是这个数要达到多少。所以先给它一个数。

```json
// data/example/saturn/resource/azure_mastery.json
{
  "default_value": 0,
  "max": 1000,
  "particle_color": "#66CCFF"
}
```

`default_value` 与 `max` 必填，`min` 默认 `0`。`max` 应不低于最高晋升门槛；数值变化会被限制在边界内，门槛高于 `max` 时无法达到最高等级，且不会产生错误日志。

这个数值没有灵气定义指向它，所以它没有灵气身份：不进灵气轮盘（那张表按灵气列），也不参与灵气存储那套接口，就是一个普通的数。要在 HUD 上看到它，就在 `bars` 里写一条；功法面板上那根熟练度进度条用它的 `particle_color` 上色。

## 第 2 步 —— 一级一个文件，用 `next_level` 串起来 {#第-2-步-——-一级一个文件-用-next-level-串起来}

```json
// data/example/mxt/progression/azure_breath_1.json
{
  "next_level": "example:azure_breath_2"
}
```

```json
// data/example/mxt/progression/azure_breath_2.json
{
  "next_level": "example:azure_breath_3",
  "mastery": 100,
  "damage_multiplier": 1.25
}
```

```json
// data/example/mxt/progression/azure_breath_3.json
{
  "mastery": 400,
  "damage_multiplier": 1.5
}
```

- 链**没有身份字段**：它就是 `next_level` 串出来的这条直线，**没有任何一级把它写成 `next_level` 的对应等级就是入口**。这里 `azure_breath_1` 没人指向，所以链是 1 → 2 → 3，链内序号依次是 `0`、`1`、`2`。最高一级不写 `next_level`。
- `mastery` 是**到达该等级**需要的量，入口级那一份永远不会被读——`azure_breath_1` 不必写它。
- 进度链定义在 `progression` 注册表中；各功法通过 `default_level` 指定入口，因此多个功法可共用同一条链与晋升门槛。
- `damage_multiplier` 只在**该链授予的能力施放**这条路上生效：持有者当前在哪一级，就用对应等级的倍率（同一个能力被多处授予时取最高的那个）。它进的是伤害公式的 `damage_multiplier` 变量。

链上的问题全部在世界加载时一次报出（`/mxt registries validate`）：一级被两处写成后继（`follows both <A> and <B>`）、成环（`chain is cyclic, or joins another chain, at level <id>`）、以及**后一级要求的熟练度比前一级低**（`lowers its mastery requirement at level <id>`）。走不出去的链整条不被索引：宁可没有顺序，也不留下半条链。`next_level` 指向不存在的条目不在这里——那会让整个数据包加载失败。

## 第 3 步 —— 功法把该链接到自己身上 {#第-3-步-——-功法把这条链接到自己身上}

```json
// data/example/mxt/technique/azure_breath.json
{
  "quality": "example:refined",
  "learn_condition": {"type": "mxt:has_realm", "aura": "example:qi"},
  "cultivation_modifier": 1.25,
  "passive_modifiers": [
    {
      "attribute": "minecraft:max_health",
      "id": "example:technique/azure_breath",
      "amount": 2,
      "operation": "add_value"
    }
  ],
  "granted_abilities": ["example:qi_bolt"],
  "default_level": "example:azure_breath_1",
  "mastery_resource": "example:azure_mastery",
  "configuration": {
    "example:azure_breath_2": {
      "condition": {"type": "mxt:realm", "realm": "example:foundation", "comparison": ">="},
      "ability": "example:qi_recovery"
    },
    "example:azure_breath_3": {
      "condition": {"type": "mxt:realm", "realm": "example:core_formation", "comparison": ">="}
    }
  }
}
```

三个新字段各答一件事：

| 字段 | 答什么 |
| --- | --- |
| `default_level` | 该功法从链上哪一级进入。 |
| `mastery_resource` | 用哪个数值衡量熟练度；不写就永不晋升。 |
| `configuration` | 入口之后每一级的 `condition`（到达该等级还要什么）与 `ability`（该等级给什么能力）。 |

- `configuration` 的键就是链上对应等级的 id。**入口之后的每一级必须配置**：链条不能经过一个没有任何描述的台阶，漏一级会报 `does not configure the progression level <id>`；配了从入口走不到的等级会报 `configures progression level <id>, which it can never reach from <entry>`。
- 入口级可省略条目；若配置了条目，其 `ability` 在入口级正常生效，`condition` 不参与晋升校验。
- `ability` 按最低等级累积授予，达到第三级时仍保留第二级的技能。示例将 `example:qi_recovery` 从 `granted_abilities` 移至第二级，因此恢复技能在二级解锁；一级仍授予 `example:qi_bolt`。
- 熟练度与 `condition` 是**两道独立的门**，晋升时都要过：数值够、条件也成立才走这一步。只想要数值，条件写 `mxt:always`。
- `mastery_resource` 与 `configuration` **都要求 `default_level`**：写了数值却没有入口，加载期直接按 `mastery_resource needs default_level to name the progression chain it measures` 报错；反过来，只写了 `configuration`、没写 `mastery_resource` 的功法照常授予能力，只是不会自己晋升。

## 第 4 步 —— 熟练度从哪来 {#第-4-步-——-熟练度从哪来}

本体仅比较熟练度数值，增长方式由内容包定义。可使用以下四种来源。

**打坐也算一份。** 结算成功那一拍跑一次 `cultivate_action`：

```json
// data/example/mxt/cultivation/meditation.json
"cultivate_action": {"type": "mxt:add_resource", "resource": "example:azure_mastery", "amount": 1}
```

**战斗也算一份。** 触发规则是"某个信号 → 条件成立就跑一个行为"：

```json
// data/example/saturn/trigger/azure_mastery_from_kill.json
{
  "trigger": {"type": "mxt:kill"},
  "action": {"type": "mxt:add_resource", "resource": "example:azure_mastery", "amount": 1}
}
```

能挂的信号是**技能触发器那一套**加上移植过来的原版触发器（`mxt:kill` 这类），全部条目见[触发器](../datapack/types/other/trigger-type.md)。规则自己的 `chance` 与 `cooldown` 用来限频。

**用该功法自己的技能。** 会执行动作的技能类型，直接把同一个行为写进 `entity_action`：

```json
// data/example/saturn/ability/qi_bolt.json
"entity_action": {"type": "mxt:add_resource", "resource": "example:azure_mastery", "amount": 1}
```

技能不能区分当前执行来自哪门功法。同一技能若同时由境界或丹药授予，也会增加相同的全局资源。需要限定熟练度来源时，应使用该功法独有的技能，或独立的熟练度资源。

**通过修炼增加熟练度。** 当 `mastery_resource` 与修炼灵气引用同一资源时，修炼结算按 `regen × absorb_amount × 亲和 × 灵气速度` 增加该资源，填满后的溢出部分计为修为。`aura_gains` 同样可增加该资源，因此这些来源也会贡献熟练度。

`mxt:add_resource` 的 `amount` 可以写公式。数值同样会被各种东西**扣掉**：任何消耗（`Cost`）、实体之间的转移、灵力容器都能把它拿走，所以"花熟练度换东西"是允许的，代价是下一次晋升被推迟——已经获取的等级不会掉。

## 第 5 步 —— 自动晋升 {#第-5-步-——-学会之后它会自己爬}

手册那一侧不用改：`example:azure_breath` 在 [KubeJS 创建物品并绑定行为](./create-items-with-kubejs.md) 里已经有了自己的 `technique_binding`。

```mcfunction
give @s kubejs:azure_manual[mxt:technique="example:azure_breath"]
```

服务端**每秒**检查一次身上每一门已学功法：熟练度达到下一级的 `mastery`，下一级的 `condition` 也成立，就升上去。一次检查会顺着链连着往上走，直到某一步不满足为止，但**不会跳级**。晋升之后立刻按新等级重算能力（`granted_abilities` 加上已经到达过的每一级的 `ability`），并发布一次 `mxt:progression_level` 信号：公式变量 `level` 是刚到达的链内序号，扩展值 `owner` 是该功法的 id。

**等级只升不降。** 包改过某门功法的 `default_level` 之后，身体里那条再也走不到的记录会被清掉（实体加入世界时、玩家登录时，以及数据包重载时——重载那一次扫过全部已加载实体），该功法退回它自己的入口级；清一条会在服务端日志里留一条带功法 id 与等级 id 的 `WARN`。

## 在游戏里验证 {#在游戏里验证}

```text
（重新打开世界）
/mxt registries validate                      → 没有 Codec 错误
/mxt registries list                          → mxt:progression=3
/saturn ability list                             → 已授予的能力与各自的来源
/saturn triggers rules mxt:kill                   → 列出击杀那条规则
/mxt resource example:azure_mastery           → 当前熟练度
/saturn triggers publish mxt:kill                 → 手动发一次击杀信号（需要 gamemaster）
```

1. `/give @s kubejs:azure_manual[mxt:technique="example:azure_breath"]`，右键学会。这时只有 `example:qi_bolt`——恢复技能要到第二级。功法页（人物信息面板 `Z` 左上角的「习得功法」页签）上能看到该功法、它的等级与熟练度条。
2. 打坐一分钟：`cultivate_action` 每秒给 `1`，`/mxt resource example:azure_mastery` 跟着涨；打一只怪，或者 `/saturn triggers publish mxt:kill` 手动发一次信号，再涨 `1`。
3. 数值到 `100` 之后的一两秒内晋升到第二级：`example:qi_recovery` 出现在轮盘配置界面右边的技能池里（`/saturn ability list` 会把它连同来源一起列出来），该链授予的技能打出的伤害从 `1.0` 倍变成 `1.25` 倍。
4. 想直接看晋升就别等：`/mxt resource example:azure_mastery set 100`（需要 gamemaster）。这个写法直接改写数值，不经过边界钳制。
5. 再把数值推到 `400`：晋升第三级，倍率变成 `1.5` 倍。
6. 把 `azure_breath_3.json` 的 `mastery` 改成 `50`（比第二级的 `100` 低），重开世界：`/mxt registries validate` 报 `lowers its mastery requirement at level example:azure_breath_3`。

## 常见错误 {#常见错误}

| 现象 | 原因 |
| --- | --- |
| 读了半天不晋升 | 没写 `mastery_resource`（永不晋升），或者数值没涨到下一级的 `mastery`，或者下一级的 `condition` 没成立——两个门槛都要过。 |
| 熟练度停止增长 | 已达到资源的 `max`，后续变更被限制在边界内。门槛高于 `max` 时无法达到最高等级，且不会报告错误。 |
| 所有人的该功法一起涨 | 熟练度是**全局数值**，不是每门功法一份：任何来源往这个数里加，所有指它的功法都受益。要分开就得用不同的数值。 |
| 修炼增加了其他功法的熟练度 | 多个功法共用同一资源。若熟练度引用灵气的 `resource`，该资源的所有增量都会计入熟练度。 |
| 报 `mastery_resource needs default_level to name the progression chain it measures` | 写了衡量熟练度的数值，却没写入口等级。 |
| 报 `configuration needs default_level to name the progression chain it belongs to` | 写了逐级配置，却没写入口等级。 |
| 报 `enters the unknown progression level <id>` | `default_level` 指向一个不存在的等级。 |
| 报 `does not configure the progression level <id>` | 从该功法的入口出发会经过 `<id>`，但 `configuration` 里没有它。 |
| 报 `configures progression level <id>, which it can never reach from <entry>` | `configuration` 里配了一个从入口走不到的等级。 |
| 报 `lowers its mastery requirement at level <id>` | 后一级的 `mastery` 比前一级低，整条链被丢掉、不索引。 |
| 报 `follows both <A> and <B>` / `chain is cyclic, or joins another chain, at level <id>` | 一级被两处写成后继（分叉），或者成环。 |
| 报 `next_level <id> is not a progression` | 这个包加载不到这一步：`next_level` 指向不存在的等级时世界直接拒绝加载，整次加载失败，而不是「该链被丢掉」。 |
| 等级记录莫名退回了入口级 | 包改过该功法的 `default_level`：跑去不到的记录会在实体加入世界、登录与数据包重载时被清掉，日志里有对应的 `WARN`。 |
| 改了文件却什么也没变 | 数据包注册表在世界加载时读，`/reload` 不重读。 |

## 接下来 {#接下来}

- [progression（进度链）](../datapack/json/progression.md) —— 每一级的完整字段，以及链在运行期如何编号。
- [technique（功法）](../datapack/json/technique.md) —— 功法定义的完整字段与逐级配置的规则。
- [定义技能](./add-an-ability.md) —— 该链授予的那些能力本身如何写。
- [trigger（触发器）](../../../library/saturn/data/trigger.md) —— 触发规则的完整字段：信号、条件、概率与冷却。

---
title: talisman（符箓）
---

# talisman（符箓）

<span id="talisman" />

文件位置：`data/<namespace>/mxt/talisman/<path>.json`

**用途**：定义符箓的使用方式、目标、动作、灌注容量与发动消耗。

符箓定义描述铭刻后的使用效果、目标、灵气容量与单次消耗。画符配方通过顶层 `talisman` 字段引用该定义，见 [`mxt_talisman:talisman_drawing`](../../addons/talisman/datapack/talisman_drawing.md)。

**效果由 `type` 分派。** 公共字段只有 `type` / `condition` / `costs`（外加载体自己的 `capacity`）；`type` 是**必填**的分派键，效果与目标写在**它分派出来的字段**里：四种使用类型是 `mxt:self`（自己身上使用）、`mxt:area`（范围使用）、`mxt:crosshair`（准星对准使用）与 `mxt:thrown`（丢掷使用），见[使用类型](#usage-types)。**旧的 `abilities` / `durability` / `consume` 三个键已作废**：写了会被静默忽略（按未知键口径），那条符就成了没有效果的符，迁移见[使用类型](#usage-types)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `type` | 使用类型（`type` 分派） | 无（**必填**） | 这一条符**如何用**：`mxt:self` / `mxt:area` / `mxt:crosshair` / `mxt:thrown`（`mxt:empty` 是什么都不做的那一个），各自带自己的参数（目标、动作、`max_use`…），见[使用类型](#usage-types)。 |
| `capacity` | double | `1` | 载体的**灌注容量倍率**：容量 ＝ 一次发动的灵气用量 × 这个倍率，按灵气分别计算并保留小数。必须 ≥ 1，小于 1 在加载期被拒。 |
| `condition` | [实体条件](../types/condition/entity_condition_types.md) | `mxt:always` | 在 `costs` 前检查持有者的使用资格；不满足时拒绝激发，载体、耐久、存量与持有者资源均不变。所有铭刻条件均须成立；条件数组为隐式 AND。 |
| `costs` | 数组，条目见 [`Cost`](../types/shared_data_types.md#cost) | `[]` | 单次发动的消耗，同一载体的条目合计；无法支付时拒绝激发。与消耗无关的使用要求应配置在 `condition`。 |

**`type` 分派出来的字段不在上表**：`max_use`、`target_selector`、`length` / `radius` / `limit` / `order`、`speed` / `gravity`、`entity_action` / `bi_entity_action` / `target_condition` / `block_condition` / `block_action` 这些由被选中的那一类自己声明与读取，逐个写在下面[使用类型](#usage-types)。

## 使用类型 {#usage-types}

`type` 决定使用方式与目标来源。各类型均先在使用者上执行一次 `entity_action`，再对通过 `target_condition` 的目标分别执行 `bi_entity_action`。投掷类型额外处理方块命中，使用 `block_condition` / `block_action`。

| `type` | 目标 | 自己的参数 |
| --- | --- | --- |
| `mxt:self`（自己身上使用） | 使用者自己 | `max_use`、`entity_action`、`bi_entity_action` |
| `mxt:area`（范围使用） | `target_selector` 选出的实体，再用 `target_condition` 过滤 | `max_use`、`target_selector`、`target_condition`、`entity_action`、`bi_entity_action` |
| `mxt:crosshair`（准星对准使用） | 沿视线的射线目标（内部就是一个 `mxt:ray`，参数是 `length` / `radius` / `limit` / `order`） | 同上五个，去掉 `target_selector` |
| `mxt:thrown`（丢掷使用） | 投掷物命中的那个实体；命中方块时改由方块那一半接手 | `speed`、`gravity`、`target_condition`、`entity_action`、`bi_entity_action`、`block_condition`、`block_action`（**没有 `max_use`**） |

- **准星类型必须获得实体目标**，此检查先于 `condition`；无目标时不支付消耗，也不扣除耐久。
- **范围类型无目标时仍视为发动**，但不会对任何实体执行目标行为。
- **投掷类型**生成投掷物：发动时在使用者上执行 `entity_action`，命中实体后执行 `bi_entity_action`。载体在投掷时消耗，因此不提供 `max_use`。
- **命中方块**时，先用 `block_condition` 检查命中方块，再在该位置执行 `block_action`；字段省略时分别为恒真和空操作，见[方块条件类型](../types/condition/block_condition_types.md)。方块命中不执行 `target_condition` 或 `bi_entity_action`，实体命中不执行 `block_action`。命中面通过 context 的 `direction` 传递，供 `mxt:js` 等扩展行为读取；本体方块行为不使用该值。
- **`type` 必填**；需要空操作时显式使用 `mxt:empty`。

`capacity` 控制单次灌满可支持的连续发动次数。容量为单次灵气用量乘以实际倍率，实际倍率取 `min(填写值, 载体剩余使用次数)`。剩余次数根据[耐久](#耐久)计算；无耐久时计为 1 次，有耐久时至少计为 1 次。默认倍率 `1` 对应一次发动用量。

那是**倍率**而不是一张灵气表：容量由 `costs` 自己算出来——同一张载体上多条铭刻的用量与倍率各自相乘再相加——所以它不由数据包按灵气逐项写。载体容量可以写成 `5` 或 `2.5`（≥ 1）。`capacity` 与 `costs` 的灵气条目就是"灌多少"与"一次花多少"这两件事，两者都不依赖持有者。

`max_use` 只写在**使用类型**里（`mxt:thrown` 没有）：它记的是"这条符能给载体几次使用"，不是磨损点数；写了它就该按整次数读（见[耐久](#耐久)）。

**定义不提供 `quality` 字段。** 载体品质由画符配方的 `grades[].quality` 在铭刻时写入 `mxt:quality` 组件，未设置时由 [default_quality](./default_quality.md) 按物品 ID 或标签提供默认值。完整解析规则见[品质](#档位)。

`costs` 里 `mxt:aura` 条目从**载体自己灌进去的存量**里扣，不够就是"未充能"、拒绝发动；`saturn:resource` / `mxt:item` / `mxt:js` 条目在发动时向**持有者**收。无法支付就**拒绝这次激发**。**一次发动的总价是"载体价 + 每一条铭刻技能自己的 `costs`"一起算的**，而且在任何效果发生之前一次预演：总价无法支付就一个技能也不执行（载体不消耗、耐久不扣、存量不减、持有者的账也不动）。要表达与消耗量无关的门槛（境界、天气、手持物、概率……）就写在 `condition` 上，它排在 `costs` 之前，见[条件](#条件)。

自动发动由载体物品堆的模式控制，不是定义字段。同一符箓定义可用于灌满即发或手动储存的载体。见[载体模式](#载体模式)与[内置物品](../../player-guide/items.md)。

## `/talisman` 命令 {#talisman-命令}

`/talisman` 提供按定义 ID 铭刻载体的操作，无需手写物品组件。全部子命令均需 `gamemaster` 权限。

| 命令 | 说明 |
| --- | --- |
| `/talisman` 或 `/talisman blank [count]` | 给出空白载体。 |
| `/talisman give <talisman>` | 给出铭刻了这条符箓定义的载体，模式为 `fire`；定义声明了 `max_use` 时，使用次数上限立即写进物品的原版耐久组件，获取手就有耐久条。 |
| `/talisman give <talisman> count <1..64>` | 同上，给一整叠——但带耐久的载体不叠放，这时给的是**多份单张**（见[耐久](#耐久)）。 |
| `/talisman give <talisman> count <1..64> charged` | 同上，并且已经灌满。 |
| `/talisman give <talisman> stored [count <1..64>]` | 同上，模式为 `store`。储存模式的载体靠手动灌注，所以这一支不提供 `charged`。 |

`give` 一次只收**一个**符箓 ID：一张载体只铭刻一条定义，写第二条会替换第一条。要直接写物品组件，字段是单个 `talisman`，例如 `give @s mxt:talisman[mxt:talisman={talisman:"mypack:flame_sigil"}]`。定义参数按已加载的 `talisman` 注册表补全。

## 灌注与激发 {#灌注与激发}

载体独立保存灵气，容量为单次发动用量乘以 `capacity`。灌注速率为每 tick 1 单位，每单位消耗持有者 1 点对应灵气；发动时扣除 `costs` 中声明的灵气用量。

### 灌注 {#灌注}

- **写大倍率可以连着打好几次**：`costs` 里每次 12、`capacity` 写 5，容量就是 60，灌满一次能发动 5 次，中间不用再灌。带 `max_use` 的符正是为此存在：一次灌注打满它的使用次数。缺省倍率 `1` 时容量就是一次发动的量，每发动一次都要重新灌满。
- **倍率会被"还能打几次"卡住**：实际倍率是 `min(填写值, 剩余使用次数)`，剩余次数 ＝ `使用次数上限 − 当前损伤`（一次发动扣 1）。所以载体写 5 而只剩 3 次时容量就是 3 次，灌满它不会多花灵气。反过来，**被外部磨掉耐久**（`mxt:damage_item`、原版修复之外的手段）会让容量跟着变小，而已经灌进去的那部分不会凭空消失——它会在载体最终销毁时按没消耗的部分退回（见[耐久](#耐久)）。
- **按灵气分别计量**：`costs` 里有几种灵气，载体就分别存几种；一次灌注只填**当前第一条未满**的那条，顺序＝铭刻顺序里各条 `costs` 的书写顺序，填满一条后再按住会继续填下一条。
- **容量与单次用量都要能脱离持有者定价**：灌注时长由"容量 ÷ 每 tick 注入"得出，而客户端要为姿势算出同一个数，所以 `costs` 里的灵气条目按**空公式上下文**求值（和 `item_aura.aura` 对容量的口径一致），倍率本身是个常量。灵气条目因此只能写常量或与持有者无关的表达式，`"realm_rank * 4"` 这类只在有人时才有值的写法会求出 0、被当作"这条不算"；灵气条目求成 0 就等于这次发动不要这种灵气。
- **没有灵气条目**：`costs` 里没有灵气条目的符箓没有可灌注的东西，按住右键不会进入灌注，但它**随时都是"够的"**，因此**右键即发动**，只有在 `costs` 里有别的条目时才立即向持有者收。
- **如何灌**：手持载体按住右键，与灵石灌注同一套手势（`BLOCK` 姿势、每 4 tick 一次提示音、action bar 显示 `已存 / 容量`）。灌注期间不消耗物品，只有发动时才扣掉一次代价：没耐久的载体是消耗一件，有耐久的是扣耐久。

### 激发 {#激发}

- **发动看的是"够不够一次"，不是"满没满"**：存量够付清一次 `costs` 里的灵气条目，右键就是发动；不够才是灌注。灌到**满**（达到容量）那一刻，`fire` 模式的载体立刻自动发动，这也是唯一会自动发动的时候。tooltip 那一行写的就是这件事："灵气充足，右键激发" / "按住右键灌注灵气"。存量不够一次发动的载体右键会进入灌注而不是发动，手势按"够不够一次"自动二分。
- **徒手右键与"被灌满"走的是同一个入口**，由[载体模式](#载体模式)决定谁在什么时候发动。两种模式下都能**右键**发动：若因冷却等原因没发动成功，或它本来就是"随时够"的符，右键就是唯一的路。
- **不在手上也能发动**：载体是由**填满它的那一方**汇报的，不是由持有者汇报——展示架上摆着的符被人或灵爆填满时照样发动（`store` 模式除外，它只积累）。这时**行为者**仍是填符的那位，出账、被记录、为其效果作答都算在他头上；**位置**则是载体所在的展示架。

### 载体模式 {#载体模式}

模式存在 stack 上的 `mxt:talisman` 组件里，**不是**定义字段，因此同一批铭刻在不同载体上可以有不同行为。

| 模式 | 行为 |
| --- | --- |
| `fire`（默认，缺省即此） | 灌满那一刻自动发动。 |
| `store` | 只积累，等你动手。 |

**潜行 + 右键**切换模式，动作栏和提示框显示当前模式。`store` 模式且载体已灌满时，潜行使用直接发动，不切换模式，并按正常规则消耗载体。

### 位置上下文 {#位置怎么用}

位置以 `block_x`/`block_y`/`block_z` 进入能力的公式上下文（与 `block_break` 等触发器给的位置同一套写法），并且作为这次激发的**原点**交给"在哪里发生"的东西：`spawn_projectile`、`spawn_particles`、`spawn_effect_cloud`、`spawn_lightning`、`explode`、`play_sound`、`block_action` 都以原点为位置；`mxt:area` 目标选择器的**方盒**（边长 `2 × radius`，不是球）以原点为中心，`mxt:ray` 与 `mxt:cone` 也从原点起算（没有原点时才是施法者的眼睛位置）；`mxt:teleport` 这类"把目标移到行为者处"的双方行为也移到原点。原点缺省 = 行为者自己，所以普通施法一字未变。投射物仍按**行为者**的朝向发射——位置是"从哪里发出"，朝向是"谁在瞄"。边界：`condition` 一族（灵气环境、亮度、暴露于天空、脚下方块等）与按位置读环境灵气的取值仍以**行为者**自身位置为准。

### 徒手发动的冷却 {#徒手发动的冷却}

由**服务端配置「符箓 → 使用冷却」**控制，不在数据包里。单位 tick、范围 `0..72000`、默认 `20`（1 秒），写 `0` 关闭。

- **一次"尝试"就进冷却**：消耗无法支付、或符箓自己的 `condition` 不满足而被拒绝，也算，那次点击确实成了发动的尝试；而空载体、存量不够一次发动这两种**根本没成为尝试**的点击不花冷却——那几种情况本来就只是给玩家一句说明，立刻可以改。
- **它只管"手"这一条路**：长按灌注灌满而自动发动时同样受它限制。窗口内灌满不会发动，而且那一 tick 的灵气**根本不会被灌进去**（灌进去等于花钱买一次注定被拒的尝试），所以窗口内你看到的是一张不动的符，窗口一过同样的灌注就正常发动。
- **展示架那条路完全不看它**：架上的符不在任何人手里，被灌满就发动，既不因为填料的人正在窗口内而被拒，也不会替谁记一次窗口。
- 冷却走原版的物品冷却，所以热键栏的灰色扫描和 `mxt:on_cooldown` 物品条件都能直接读到。又因为本模组的载体都是同一个物品 `mxt:talisman`，这份冷却是**按玩家**、按物品记的：手上另外几张符在窗口内也一起按不动，这正是它要挡的"一秒内连点一叠符"。
- 窗口记在原版的冷却组里，组名就是一个 ID。本模组的载体没有 `use_cooldown` 组件，所以组就是物品注册名 `mxt:talisman`；想让某一类符走自己的组，给物品加 `minecraft:use_cooldown`（带 `cooldown_group`）即可，代码侧不用改。游戏里真正挡住点击的是原版本身——它在问物品之前就先看冷却——所以窗口内的观感是热键栏的灰色扫描加什么都没发生。
- **消耗按"在哪"分**：手上一次发动消耗一件本体，但**创造模式不消耗**；摆在展示架上的**永远消耗**，与填料的人是不是创造模式无关。**声明了 `max_use` 的符两条路都改成扣一次使用次数**，创造模式那条"不消耗"同样成立（手上不扣，架上的照扣）。

### 耐久 {#耐久}

`max_use` 写在**使用类型里**，是"这一条符给载体几次使用"：同一张载体上的条目**相加**，一次发动扣 1 次。`mxt:thrown` 没有这个字段（丢出去就消耗载体）。没声明 `max_use` 的条目跟着一起发动，但不出账。

- 上限落在**原版组件**上，所以耐久条、原版的修复与附魔、`mxt:durability` / `mxt:relative_durability` 物品条件与 `mxt:damage_item` 物品行为这一整套直接可用，模组没有第二套耐久。
- 框架写下去的是**原版那一套**：`minecraft:max_damage` + `minecraft:max_stack_size: 1` + `minecraft:damage: 0`。少一件都不成立：没有 `damage` 就不算可损伤物品（没有耐久条），带着 1 以上的 `max_stack_size` 会被原版按"既耐久又能叠放"拒绝，所以内容包自己补组件时也要补这三个。
- 写入时机是**出手时**：`/talisman give` 给出的载体获取手就有耐久条。内容包自己造（配方带组件补丁）的载体则在**第一次激发时**补上。**内容包已经写在 stack 上的 `max_damage` 优先于定义的合计值**，所以同一份定义能做出一批 3 点的、一批 10 点的；它只改上限，"扣不扣"仍由定义决定。
- **耐久只属于单张载体**：带耐久的载体不叠放（`/talisman give count` 给的是多份单张），一叠多张的载体不记耐久、照旧一次一张本体。
- **剩余使用次数由耐久上限算出**：`上限 − 当前损伤`（一次发动扣 1）。**没声明 `max_use` 的载体算 1 次**，声明了的**至少算 1 次**——还没被磨损销毁就总能再打一次，那一次正是销毁它的那次。这个数就是 `capacity` 那个倍率的实际上限，也是"还能被灌多少"的答案。
- **扣到或越过上限的那一次激发把那张载体销毁**：这次发动该付的灵气**照扣**（它确实发动了），之后存量里**没消耗的部分**按当初灌进去的价钱退回给这一次的行为者，1 单位灵气 = 1 点它计量所用的 resource。收不下的部分随符纸一起没掉，不会把这次激发判失败。没声明耐久的载体照旧一次一张本体，同样退回没消耗的那部分；存量是**整叠共享**的，所以那种情况下要整叠用光才会退回。
- tooltip 里另有一行"耐久：剩余 / 上限"，它在组件还没写上去时也能读出定义的合计值。

### 条件 {#条件}

`condition` 在扣费前检查持有者，展示架上的载体以灌注者作为行为者。支持[实体条件](../types/condition/entity_condition_types.md)及隐式 AND 数组，并可读取 `block_x` / `block_y` / `block_z`。不满足时动作栏显示「不满足发动条件」，载体、耐久、存量与持有者资源均保持不变。

全部铭刻条件均须通过，任一失败即拒绝整次发动。效果直接使用动作，不额外检查技能条件。

该条件仅限制发动，不限制灌注与储存；条件恢复后仍可使用已有存量。

### 代价 {#代价}

`costs` 使用统一消耗类型（`saturn:resource` / `mxt:aura` / `mxt:item` / `mxt:js`）与结算流程。灵气条目从载体存量扣除，其余条目由持有者支付；灌注时每存入 1 单位消耗持有者 1 点对应灵气。

后者在激发**之前**先规划：无法支付就**拒绝这次激发**，action bar 说明是"灵气不足"还是"缺少所需物品"，载体、耐久与存量都不动。这就是"灵力不足无法使用"这类**按定义**的门槛，而"什么时候根本不许用"写在 `condition` 上、排在它前面。规划是只读的，而且**把这一次发动的总价一起算进去**（载体价 + 每一条铭刻自己的 `costs`），所以"动作已经跑过、载体却无法支付"不会发生；载体价本身的扣除仍然发生在**动作真的跑过之后**——一次发动可以同时写好几条铭刻，同一张载体上多条铭刻的 `costs` 相加。灵气条目**按写的量扣**，可以是小数——容量与灌注也保留小数，最后只差 `0.25` 时只接收并支付 `0.25`。

### 档位 {#档位}

**定义不提供 `quality` 字段。** 品质来源依次为载体的 `mxt:quality` 组件和 [default_quality](./default_quality.md) 注册表。画符配方按完成度选择 `grades[].quality`，并在铭刻时写入组件；注册表默认值仅用于解析，不写回物品。解析后的品质参与提示框显示、使用条件、链式升级与 `value_multiplier` 计算。

### 发动的判定 {#发动的判定}

发动依次处理目标选择、铭刻条件与支付，然后执行动作。准星类型无实体目标时，在条件检查前拒绝；`entity_action` 在使用者上执行一次，`bi_entity_action` 对通过 `target_condition` 的目标分别执行。投掷类型在发射时执行前者，命中后执行后者。

符箓直接执行动作，不再通过 `abilities` 承载技能，因此不经过技能的 `cast_time` 或引导流程。

符箓位置作为目标选择中心、射线起点与位置类效果的默认原点；展示架使用架子位置，手持使用玩家位置。雷击、爆炸、粒子、音效与方块行为默认采用该原点。需要以目标位置执行时，将实体行为嵌入 `mxt:target_action` 并设 `"use_target_position": true`，见[双实体行为类型](../types/action/bientity_action_types.md)。`mxt:damage_target` 与 `mxt:damage` 直接读取实体，不依赖上述位置转换。

## 命名与物品组件 {#命名与物品组件}

该定义里没有可写的文本字段：显示名由标识符现算，`talisman.mxt.<定义命名空间>.<路径>`（`mxt_test:flame_sigil` → `mxt.talisman.mxt_test.flame_sigil`），描述键是名字键再接 `.description`。要给它配词就翻译这两个键。

**载体 tooltip 里还会印一行"如何用"**，键按**使用类型**给：`mxt.talisman_type.mxt.<类型>`（`self` / `area` / `crosshair` / `thrown` / `empty`，例如 `mxt.talisman_type.mxt.thrown`），与名字同一套四段式。**同一张载体上同一个类型只印一次**；本模组自带这五条（在两份 lang 里），第三方注册的类型没写这一条就不会留下裸键。

示例：

```json
// data/example/mxt/talisman/flame_sigil.json
{
  "type": "mxt:self",
  "max_use": 10,
  "condition": {"type": "mxt:resource_compare", "resource": "example:true_essence", "min": 2},
  "costs": [
    {"type": "mxt:aura", "aura": "example:qi", "amount": 12},
    {"id": "example:true_essence", "amount": 2}
  ],
  "entity_action": {"type": "mxt:apply_effect", "effect": "minecraft:fire_resistance", "duration_ticks": 120}
}
```

**准星对准使用的例子**（取不到实体就发动不了，这条排在 `condition` 之前）：

```json
// data/example/mxt/talisman/seeking_sigil.json
{
  "type": "mxt:crosshair",
  "max_use": 3,
  "length": 12.0,
  "radius": 0.5,
  "target_condition": {"type": "mxt:entity_type", "entity_type": "#example:demons"},
  "bi_entity_action": {"type": "mxt:damage_target", "amount": "12"}
}
```

这张符每次发动扣 12 点 `example:qi`、另向持有者收 2 点 `example:true_essence`，容量倍率 10（＝120 点，够打 10 次），耐久 10 点每次扣 1——灌满一次正好打完它的耐久。倍率写 20 也一样：剩余次数只有 10，实际倍率被卡在 10。它的 `condition` 要求持有者手上有 2 点 `example:true_essence`（正好是同一次发动要收的那笔钱）：不够时条件先拒、账上一点不动，够的时候才轮到 `costs` 结算。

**丢掷使用的例子**（命中方块走"方块那一半"，命中实体走目标那一半）：

```json
// data/example/mxt/talisman/thunder_sigil.json
{
  "type": "mxt:thrown",
  "speed": 1.5,
  "gravity": 0.04,
  "block_condition": {"type": "mxt:block_tag", "tag": "minecraft:mineable/pickaxe"},
  "block_action": {"type": "mxt:spawn_entity", "entity_type": "minecraft:lightning_bolt"},
  "bi_entity_action": {"type": "mxt:target_action", "action": {"type": "mxt:damage", "amount": 8}, "use_target_position": true}
}
```

这张符出手就变成一枚投掷物：撞到方块时先拿**被打中的那个方块**过 `block_condition`（这里要求它在 `minecraft:mineable/pickaxe` 里），过了才在命中处跑 `block_action`——`block_action` 是方块动作，落点就是那个方块，所以这里落下一道原版的 `minecraft:lightning_bolt`。撞到实体时改走目标那一半：`mxt:target_action` 配 `"use_target_position": true` 把嵌套动作放在**目标自己身上**，而符箓的原点仍是出手的位置（见上文"发动的地点"）。它没有 `max_use`：载体在出手那一刻就被消耗。

"已经铭刻了哪条符箓"由物品组件 `mxt:talisman` 保存：一个 `talisman` 条目（可缺省，缺省就是刚做出来的空载体），加上一个 `mode` 字段（`"fire"`（缺省）或 `"store"`）。一张载体只铭刻一条，再刻一次会替换上一条。组件里存的是**具体条目**，因此不能写标签。灌注进度另存于 `mxt:spirit_storage`，与灵石共用的存储组件，按**灵气**记已灌单位，缺省表示一点都没灌。组件与载体的说明见[内置物品](../../player-guide/items.md)。

画符用的颜料是符笔自己的存量，另一个物品组件 `mxt:brush_pigment`：一个**非负整数**，1 单位就是 1 像素弧长，缺省与 `0` 是同一件事（都是空笔）。符笔不叠放，绘制时按每一笔的长度从这口存量里扣；加料照原版储物袋那套点击——**光标提着符笔对着颜料物品点一下**（左键或右键均可），一次一份，一份多少由服务端配置「符箓 → 一份颜料的点数」决定。

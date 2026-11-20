---
title: 锻造法器
description: 用锻造手法、工具绑定和一张图纸搭出锻造台的一条生产线：锻打条、目标区间、收尾模式、品质阶梯与失败结算。
---

本页需要 **Forging Workstations** 附属（`mxt_forging`）。共享物品与通用规则仍由 MiXianTu 本体提供。


# 锻造法器

<span id="锻造法器" />

锻造台按蓝图处理材料。玩家使用锻打手法调整数值条，使其进入目标区间并满足收尾要求；额外锻打次数影响成品品质。

锻造流程使用四类定义：`forging_method` 定义单次锻打，`tool_binding` 将工具物品绑定至手法，`forging_blueprint` 定义材料与目标，`blueprint_binding` 将图纸物品绑定至蓝图。绑定表通过 `items` 匹配单个物品 ID、物品标签或数组。常规绑定无需物品组件；需要为特定物品堆追加手法或蓝图时，使用对应列表组件。

本篇给示例包加一条铁剑生产线：四种手法、一把铁匠锤、一张图纸物品和三个品质档。

## 教程目标 {#你要搭建什么}

| 文件 | 用途 |
| --- | --- |
| `data/example/mxt_forging/forging_method/light_strike.json` | 轻敲：数值 `-1`。 |
| `data/example/mxt_forging/forging_method/heavy_strike.json` | 重锤：数值 `+2`，带消耗、条件、冷却与音效。 |
| `data/example/mxt_forging/forging_method/quench.json` | 淬火：数值 `-1`，零消耗。 |
| `data/example/mxt_forging/forging_method/temper.json` | 回火：数值 `+2`，零消耗。 |
| `data/example/mxt_forging/tool_binding/smith_hammer.json` | 铁匠锤解锁哪四种手法。 |
| `data/example/mxt_forging/forging_blueprint/spirit_sword.json` | 材料、允许手法、锻打条、收尾模式、品质阶梯、失败结算。 |
| `data/example/mxt_forging/blueprint_binding/sword_manual.json` | 图纸物品提供哪一份蓝图。 |
| `data/example/mxt/quality/flawless.json` | 品质阶梯的最高一档。 |

## 第 1 步 —— 一次锻打是什么 {#第-1-步-——-一次锻打是什么}

一份手法就是"按一下会怎样"：数值往哪边走、花多少、什么时候允许、按下去响什么。

```json
// data/example/mxt_forging/forging_method/light_strike.json
{
  "value_delta": -1,
  "icon": { "id": "minecraft:feather" }
}
```

```json
// data/example/mxt_forging/forging_method/heavy_strike.json
{
  "value_delta": 2,
  "costs": [{ "id": "example:qi", "amount": 1 }],
  "condition": { "type": "mxt:health", "comparison": ">=", "compare_to": 10 },
  "icon": { "id": "minecraft:iron_ingot" },
  "cooldown": 10,
  "sound": "minecraft:block.anvil.land"
}
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `value_delta` | Integer | **必填** | 锻打条的偏移，**不能为 `0`**。 |
| `costs` | `List<Cost>` | `[]` | 每次锻打的消耗，从锻打者身上扣，整份数组全有或全无；写法见[共享数据类型 · `Cost`](../../../datapack/types/shared_data_types.md#cost)，各类型见[cost_type（消耗）](../../../datapack/types/other/cost-type.md)。 |
| `condition` | `EntityCondition` | `mxt:always` | 允许使用该手法的条件，判定对象是**玩家**（[实体条件](../../../datapack/types/condition/entity_condition_types.md)）。 |
| `icon` | 图标引用 | 无 | 列表里画什么，**同时决定这个手法在列表里叫什么名字**。 |
| `cooldown` | Integer | `0` | 冷却，单位 tick，范围 `0..72000`。 |
| `sound` | SoundEvent ID | `minecraft:block.anvil.place` | 锻打**真的发生**之后，在台子位置对附近所有玩家播放。 |

三件容易踩的事：

- **`icon` 不是装饰。** 手法在列表里的显示名就是它那个物品的名字；不写 `icon`（或写成贴图）时列表里显示的是注册 ID。想让人一眼看懂，就给它一个图标。
- **越界的手法会被直接拒绝。** 每次锻打前都会算一次"打完还在不在条内"，不在就拒绝——所以别指望用一记越界的重锤把数值"掰"回区间里。
- **冷却在扣费与条件判定之前就记下了。** 一次因为灵气不足或条件不满足被打回的锻打，照样占掉这段冷却。

音效按 ID 在加载期解析，名字写错会让**整条手法条目**被拒绝，而不是静默无声；要静音就写 `minecraft:intentionally_empty`。

## 第 2 步 —— 工具与图纸物品 {#第-2-步-——-工具与图纸物品}

两张按物品认领的注册表：定义里用 `items` 说明该定义管哪件（或哪族）工具、图纸，下面给出这组定义：

```json
// data/example/mxt_forging/tool_binding/smith_hammer.json
{
  "items": "example:smith_hammer",
  "methods": [
    "example:heavy_strike", "example:light_strike",
    "example:quench", "example:temper"
  ]
}
```

```json
// data/example/mxt_forging/blueprint_binding/sword_manual.json
{
  "items": "example:sword_manual",
  "blueprints": ["example:spirit_sword"]
}
```

两条定义分别放在 `data/example/mxt_forging/tool_binding/<名字>.json` 与 `data/example/mxt_forging/blueprint_binding/<名字>.json` 下，条目 id 是 `example:<名字>`，一份文件就是一条定义。`items` 与 `methods` / `blueprints` 都必填非空，`priority` 可选。

**工具与图纸物品由此自动生效**：注册表里谁的 `items` 命中这件物品，谁放进锻造台对应槽位就有效，物品本身不复制定义，所以改该定义不需要动物品。

**可用手法 = 蓝图 `allowed_methods` ∩ 所有已放置工具 `methods` 的并集。** 蓝图没声明 `allowed_methods` 时，蓝图一侧不做限制，列表就是工具的并集。

### 给物品堆临时附加 {#给物品堆临时附加}

绝大多数情况下这一步什么都不用做：注册表里已经有定义认领了这些物品。两条**逐堆**附加的路：

**测试用 `/give` 的物品组件语法**（不用写代码，改完定义直接试）：

```text
/give @s minecraft:iron_ingot[mxt_forging:forging_methods=["example:heavy_strike","example:light_strike"]]
/give @s minecraft:paper[mxt_forging:forging_blueprints=["example:spirit_sword"]]
```

内容包可直接在绑定定义的 `items` 中指定工具或图纸物品，无需修改物品注册代码。物品本身由内容包注册，例如通过 [KubeJS](../../../tutorial/create-items-with-kubejs.md)。上述组件命令适用于尚未注册专用物品时的测试。

:::tip 两条路指向的是同一批定义

`items` 写的是**物品** id（`example:smith_hammer`），物品堆上的组件里写的是**注册表条目** id（`example:heavy_strike` 属于 `forging_method` 注册表）。定义里的 `methods` / `blueprints` 与物品堆上的列表**取并集**，所以工具槽检查的是「这堆能解析出至少一种手法吗」；两处任一写错 id，那一项就解析不出来。

:::

## 第 3 步 —— 图纸：材料、锻打条与目标区间 {#第-3-步-——-图纸-材料、锻打条与目标区间}

```json
// data/example/mxt_forging/forging_blueprint/spirit_sword.json
{
  "input": [
    { "ingredient": "minecraft:iron_ingot", "count": 2 },
    { "ingredient": "minecraft:stick", "count": 1 }
  ],
  "allowed_methods": [
    "example:light_strike", "example:heavy_strike",
    "example:quench", "example:temper"
  ],
  "meter_min": -8,
  "meter_max": 8,
  "target_min": 2,
  "target_max": 4,
  "result": "minecraft:iron_sword"
}
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `input` | `List<SizedIngredient>` | **必填** | 材料需求，每项是 `ingredient`（原版材料：物品 id、`#物品标签`，或自定义材料）+ `count`（正整数，默认 `1`）。 |
| `allowed_methods` | `HolderSet<forging_method>` | 空 | 允许的手法：ID 列表、单个 `"#命名空间:标签"`，或整个省略。**省略或空列表 = 不限制**。 |
| `meter_min` / `meter_max` | Integer | **必填** | 锻打条的两端，必须**跨过 0**（一个为负、一个为正）。 |
| `target_min` / `target_max` | Integer | **必填** | 目标区间，必须落在条内。 |
| `result` | Identifier | **必填** | 成功后产出的物品。 |

`input` 与槽位顺序无关：12 个输入格合计满足各项数量即可，材料可跨格扣除。列表必须非空、最多 15 项，且不能包含完全相同的 `ingredient` 与 `count` 组合。每项必须提供 `ingredient`；`count` 为正整数，默认 `1`。不同 `Ingredient` 的匹配范围允许重叠，不以实际物品 ID 判重。无效输入或消耗条目均导致定义加载失败。

`ingredient` 是**原版材料**，所以它既能按物品、也能按堆判断：写物品 id 或 `#物品标签` 时只看物品；要**按品质档位卡材料**，就写本体的自定义材料 `mxt:quality`——这是"这块材料必须至少三档"真正写得出来的地方：

```json
"input": [
  {
    "ingredient": {
      "neoforge:ingredient_type": "mxt:quality",
      "items": "example:spirit_iron_ingot",
      "min_quality": "example:tier_3"
    },
    "count": 2
  }
]
```

会话锁下的是**实际取走的那几堆**，所以带组件的材料在结算时的品质读取（见第 4 步）读到的是真东西，不是被抹平的同名物品。

:::warning 条与目标区间的约束是双向的

`meter_min` 必须为负、`meter_max` 必须为正，并且 `target_min`/`target_max` 要夹在两者之间。另外，**开始会话时**服务端会用广度优先搜索算一遍：以这份蓝图允许的手法，能不能在不越界的前提下走进目标区间、并满足收尾模式。算不出来，这次"使用蓝图"会被拒绝。

:::

## 第 4 步 —— 收尾模式、额外步数与品质 {#第-4-步-——-收尾模式、额外步数与品质}

把收尾模式与品质阶梯加进同一份蓝图：

```json
"finish_pattern": {
  "steps": [
    "example:light_strike", "example:heavy_strike", "example:light_strike",
    "example:heavy_strike", "example:light_strike", "example:heavy_strike"
  ],
  "required_suffix_steps": 2
},
"max_steps": 24,
"quality_by_extra_steps": [
  { "max_extra_steps": 0, "quality": "example:flawless" },
  { "max_extra_steps": 4, "quality": "example:refined" },
  { "max_extra_steps": 2147483647, "quality": "example:common" }
]
```

```json
// data/example/mxt/quality/flawless.json
{
  "color": "#FFAA00"
}
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `finish_pattern.steps` | 六个手法 | `[]` | 收尾模式。要校验时**必须正好六项**。 |
| `finish_pattern.required_suffix_steps` | Integer | `0` | 校验末尾几项，范围 `0..6`。 |
| `max_steps` | Integer | 无 | 步数上限。**省略则该蓝图永不因步数失败。** |
| `quality_by_extra_steps` | `List<QualityThreshold>` | **必填** | 额外步数到品质的升序映射，**末项必须是 `2147483647`**。 |

`required_suffix_steps` 只校验模式的**最后 N 项**：界面上"要求"那一行只有这 N 格有图标，前面几格画成屏障——它们既不显示也不判定。上面这份蓝图要求最后两锤是"轻敲 → 重锤"。

**额外步数 = 实际步数 − 最短步数。** 最短步数在会话开始时就算好了（就是第 3 步那次搜索），不是"数值超出目标多少"。上面这份蓝图的最短解是三锤（重锤 → 轻敲 → 重锤，落到 3），所以额外步数为 `0` 就是绝品。

- 品质采用首个满足 `额外步数 ≤ max_extra_steps` 的档位。列表必须按阈值升序排列，并以 `2147483647` 覆盖剩余情况。
- 档位的颜色写在**品质定义**自己的 `color` 上（选填）：写了就给提示框的物品名、提示框里品质那一行、`/picker` 里品质分类的条目名与蓝图 tooltip 的档位表上色，不写就保持原样（不是"默认白色"）。这张档位表本身在锻造台的蓝图 tooltip 里能看到，交工后读数区还会显示成品的对应档位。
- **材料的品质会除这个额外步数。** `quality` 的 `forging_modifier` 大于 1 时，同样的额外步数会被算成更少，于是获取更好的档；多种材料取其中**最低**的一档（一件成品只和它最差的材料一样好），没有品质可解析的材料被跳过；修正项缺失或不可用时按 `1` 处理。
- 材料品质从会话锁定、结算时实际扣除的物品堆读取，包括 `mxt:quality` 组件和 [default_quality](../../../datapack/json/default_quality.md) 的解析结果。工具槽与图纸槽不参与：两者不消耗，且会话期间可调整。品质链归属由 `quality` 定义声明，绑定表不声明链。

:::tip 完成是自动的

每次锻打之后服务端都会检查一遍：数值落进目标区间、并且收尾模式匹配，会话**立刻结算**，成品直接出现在输出格。界面上没有"完成"按钮（协议里有一个 `FINISH` 请求，但界面不发它）。

反过来说，目标区间包含 `0` 且不要求收尾模式的蓝图，会在你按下"使用蓝图"的瞬间就完成。

:::

`max_steps` 是锻造失败的唯一触发条件。例如值为 `24` 时，第 25 次锻打请求触发失败。该判定在执行锻打前进行，因此触发失败的请求不计为一次锻打。

## 第 5 步 —— 成功与失败的收尾 {#第-5-步-——-成功与失败的收尾}

```json
"result": "minecraft:iron_sword",
"complete_action": { "type": "mxt:add_resource", "resource": "example:qi", "amount": 5 },
"fail_action": {
  "type": "mxt:apply_effect",
  "effect": "minecraft:weakness",
  "duration_ticks": 100
},
"failure_settlement": {
  "result": "minecraft:iron_nugget",
  "input_return_ratio": 0.25,
  "material_loss_ratio": 0.75
}
```

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `complete_action` | `EntityAction` | `mxt:no_op` | 成功时对**玩家**执行的行为。 |
| `fail_action` | `EntityAction` | `mxt:no_op` | 失败时对玩家执行的行为。 |
| `failure_settlement.result` | Identifier | 无 | 失败时可能产出的"废料"。 |
| `failure_settlement.input_return_ratio` | Double | `0` | 整份材料原样退回的概率，范围 `0..1`。 |
| `failure_settlement.material_loss_ratio` | Double | `1` | 材料损失比例；它的反面 `1 - 该值` 是产出废料的概率。 |

失败结算是**两次独立掷骰**：先按 `input_return_ratio` 决定要不要把锁定的材料放回输入格（放不下的掉给玩家），再按 `1 - material_loss_ratio` 决定要不要额外给一份废料。所以"既退回材料、又获取废料"是会发生的。省略整个 `failure_settlement` 就是默认的 `destroy_input()`：什么都不还。

「取消」按钮使用独立的取消策略，不执行上述失败结算。默认策略将锁定材料退回输入格，但仍执行 `fail_action`。取消策略由 Java 接口提供，不能通过数据包修改。

## 在游戏里验证 {#在游戏里验证}

```text
/give @s mxt_forging:forging_table
/give @s example:smith_hammer
/give @s example:sword_manual
/mxt registries validate
/mxt registries list
```

这两件物品还没注册的话，把定义 `items` 里的物品换成原版物品，或者直接给原版物品挂组件：

```text
/give @s minecraft:iron_ingot[mxt_forging:forging_methods=["example:heavy_strike","example:light_strike","example:quench","example:temper"]]
/give @s minecraft:paper[mxt_forging:forging_blueprints=["example:spirit_sword"]]
```

1. 放下锻造台，右键打开。界面左边三格放图纸，右边三格放工具，中间 4×3 是材料输入格，成品在右侧输出格。
2. 把两枚铁锭和一根木棍放进输入格。左列表里出现成品图标（蓝图在列表里就是用**产出物品**命名的）；悬停它，会列出材料清单，够的显示绿色 `✔` 与"已有/需要"，不够的红色 `✖`，下方还会写步数上限。
3. 选中蓝图，按「使用蓝图」。材料被拿走，会话开始：条上出现绿色目标带、灰色零线、红色当前值。
4. 在右列表选中一个手法（图标就是 `icon`，悬停显示"数值影响：+2"），按「使用方法」。当前值移动，下面的"当前"一行记录最近六锤；选中手法时条上还会出现一条黄色预测线。
5. 把当前值打进绿带，并让最后两锤是"轻敲 → 重锤"。会话会自动结算，成品落进输出格，Tooltip 里出现品质行——显示的品质名按条目 id 生成，是 `mxt.quality.example.flawless`（给那个键在自己语言文件里写一条译文即可；`flawless.json` 里写不出名字，定义没有 `name` 字段）。
6. 再打一件，这次故意多绕几锤，比较两次的品质。想中途放弃就按「取消」，材料按取消策略退回。
7. `/mxt registries validate` 应当无错误，`/mxt registries list` 里能看到 `mxt_forging:forging_method`、`mxt_forging:forging_blueprint`、`mxt_forging:tool_binding` 与 `mxt_forging:blueprint_binding` 的条目数。

:::tip 自动化与拒绝原因

输入格对漏斗开放；成品只能从**下方**的漏斗抽出。会话进行中输入格与蓝图槽都被锁定，只有工具槽随时可换——所以中途加一把锤子可以立刻拓宽手法列表。

还有一个必须知道的现实：**被拒绝的请求不会弹提示**。`使用蓝图`/`使用方法` 的失败原因（材料不足、输出格被占、越界、冷却、蓝图不可达）只写进服务端日志里那行 `forging SELECT/STRIKE … outcome=`。玩家看到的症状是"按了没反应"，原因要去日志里找。

:::

## 常见错误 {#常见错误}

| 现象 | 原因 |
| --- | --- |
| 左列表空的 | 蓝图槽里没放物品，或者放进去的物品没有任何 `blueprint_binding` 定义的 `items` 命中它、它自己也没带 `mxt_forging:forging_blueprints` 组件。**没有"列出全注册表"的回退**：三格为空就没有蓝图。 |
| 右列表里没有你要的手法 | 交集为空：蓝图 `allowed_methods` 里没有它，或没有任何已放置的工具解锁它。 |
| 蓝图定义加载失败 | `input` 为空、超过 15 项、逐字重复的同一项、缺 `ingredient`；`meter_min`/`meter_max` 没有跨过 0；品质阶梯不是升序或末项不是 `2147483647`；`finish_pattern` 要校验却不是六项。 |
| 「使用蓝图」按钮是灰的 | 材料不足（悬停蓝图看哪一行是 `✖`）、输出格里有东西，或者会话已经在跑。 |
| 按「使用蓝图」没反应 | 服务端拒绝了。除了材料/输出格，最常见的是**目标区间不可达**：按这份蓝图允许的手法与收尾模式，搜索找不到解。 |
| 如何打都完不成 | 收尾模式要求的手法没有对应工具解锁；或者数值一直没进区间——注意越界的那一锤会被直接拒绝。 |
| 打到步数上限还没有成品 | `max_steps` 到了仍未满足条件：**下一次**锻打把会话判失败，按 `failure_settlement` 结算。 |
| 成品品质每次都一样 | 每次都用最短解（额外步数恒为 0）；或者材料的品质解析不出来——给材料一个档要么写物品堆上的 `mxt:quality` 组件，要么写 [default_quality](../../../datapack/json/default_quality.md)，灵植定义自身不声明档位，见第 4 步。 |
| 中途一把手法突然不可用 | 可用手法每次锻打都重算，工具槽不锁定：拿掉锤子就少一批手法。 |
| 冷却中按了没用 | `cooldown` 是按（玩家, 台子）记的，而且在条件与扣费**之前**判定，所以一次被打回的锻打也占冷却。 |
| 材料没退回手里 | 输入格满了，多出来的部分掉在脚下。 |

## 接下来 {#接下来}

- [forging_blueprint（锻造图纸）](../datapack/forging_blueprint.md) —— 图纸的完整字段表与校验规则。
- [forging_method（锻造手法）](../datapack/forging_method.md) 与 [tool_binding（工具绑定）](../datapack/tool_binding.md) —— 手法与工具那一半。
- [blueprint_binding（图纸绑定）](../datapack/blueprint_binding.md) —— 注册表如何为图纸物品写定义，以及物品堆上的列表组件如何追加。
- [quality（品质）](../../../datapack/json/quality.md) —— `forging_modifier`、品质链的顺序与入口档、以及品质的解析顺序。
- [MxtEvents：事件](../../../kubejs/api/events.md) —— 用脚本读/改锻打消耗、拦下某个阶段。

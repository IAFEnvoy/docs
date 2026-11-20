---
title: 数据包约定
description: 定义共用的引用、标签、翻译键、字段解码、数值与行为条件规则。
---

# 数据包约定

<span id="数据包约定" />

本页说明所有定义共用的引用格式、翻译规则、解码行为与数值格式。各注册表的字段见 [JSON 数据格式](./json/index.md)。

## 引用规则 {#引用规则}

- 单个条目引用写条目自己的 id；条目或标签都收的字段可以直接写 `#标签`。
- 必填的单条引用指向不存在的条目时，整个数据包加载失败。可选引用可省略，并采用字段表中的默认值；容错列表与映射中的无效条目按下述规则处理。
- 按物品认领的注册表（`artifact`、`pill_binding`、`technique_binding`、`item_aura`、`default_quality`、`item_binding`、`weapon_binding`、`tool_binding`、`blueprint_binding`）都用 `items` 字段收 `ItemMatcher`：ID、标签、通配符、正则和混合数组都收，三种写法与七种条目类型见 [`ItemMatcher`](./types/shared_data_types.md#itemmatcher)；`currency` 是例外，字段叫 `item`。按方块认领的 `block_aura`、`heat_source` 与 `spirit_herb` 同形，字段叫 `blocks`。
- 多个定义匹配同一物品时，按 `priority` 从高到低选择，默认值为 `0`，同优先级按注册表顺序决定。匹配器类型不影响优先级，直接指定物品 ID 不会优先于标签。`block_aura` 不提供 `priority`，所有匹配定义的贡献相加；`aura_zone` 与 `element_reaction` 的 `priority` 同样采用降序。
- 原版标签是唯一的标签系统；不要在 JSON 里重复定义 `tags` 字段。

## 标签 {#标签}

### 直通标签 {#直通标签}

模组有一个标签写在**原版注册表**上，所以路径长得不一样——是 `tags/damage_type`，不是 `tags/mxt/...`：

```text
data/mxt/tags/damage_type/no_bonus.json
```

被列进 `mxt:no_bonus` 的伤害类型不参与伤害加成结算：不乘进度等级与亲和倍率、不乘体质倍率、不读 `overcomes`/`adapted_to` 关系，也不留元素附着。数值原样交给原版，而原版自己的减免（护甲、附魔、抗性、吸收、无敌帧）照旧生效。默认收两条：虚空伤害 `minecraft:out_of_world`，以及模组自己用于寿元耗尽的 `mxt:lifespan`；内容包可以在同一路径上追加（`replace: false`）或整体替换（`replace: true`）。详见[伤害系统](../technical/damage.md)。

### 本模组自己的分组标签 {#本模组自己的分组标签}

模组还给自己的物品与方块留了几张**分组标签**，路径就是原版那一套 `data/mxt/tags/<注册表>/<名字>.json`，内容包用 `replace: false` 追加即可：

| 标签 | 种类 | 装了什么 |
| --- | --- | --- |
| `#mxt:spirit_stones` | 物品 | 四种灵石：下品 `mxt:spirit_stone`、中品 `mxt:medium_spirit_stone`、上品 `mxt:high_spirit_stone`、极品 `mxt:supreme_spirit_stone`。 |
| `#mxt:coins` | 物品 | 六种硬币：铜 / 铁 / 金 / 钻石 / 绿宝石 / 下界合金（`mxt:copper_coin` 起）。 |
| `#mxt:workstations` | 物品 + 方块 | 玩家操作用的那几台：兑换站、支票台、交易站、系统站、灵气工作台、锻造台、画符工作站。 |
| `#mxt:display_stands` | 物品 + 方块 | 六种木质的展示架。 |

这几张**只作分组**用——本体没有任何一处读它们，写配方材料、写认领表或写条件时按需引用（例如材料写 `"#mxt:coins"`）。模组另有几张**有语义**的标签（`#mxt:talisman_paper`、`#mxt:brush_pigment`、`#mxt:back_equipable` / `#mxt:belt_equipable`），它们的用途写在各自那页。

## 翻译键 {#翻译键}

### 定义的名字与描述 {#定义的名字与描述}

数据驱动定义的显示名由标识符自动生成翻译键 `<注册表命名空间>.<类别>.<定义命名空间>.<路径>`。类别就是注册表自己的 path；**注册表命名空间就是那个注册表自己的命名空间**——本体自己的注册表（`mxt:aura`、`mxt:talisman` …）键写作 `mxt:<路径>`，这些定义键以 `mxt.` 开头；寄放在前置库里的注册表用库的命名空间（`saturn:resource`、`saturn:ability`、`saturn:trigger`）键写作 `saturn:`，它们的定义键以 `saturn.` 开头。举例：`aura` 里的 `mxt:fire` 查 `mxt.aura.mxt.fire`，`resource` 里的 `example:qi` 查 `saturn.resource.example.qi`，`talisman` 里的 `mxt_test:flame_sigil` 查 `mxt.talisman.mxt_test.flame_sigil`。类别没有例外表（`example:refined` 在 `mxt:quality` 里查 `mxt.quality.example.refined`）。路径里的 `/` **原样**进入键中，不会转成 `.`（`example:foo/bar` 得到的键是 `saturn.resource.example.foo/bar`），所以按类别分子文件夹不会多出第二套翻译键规则。

JSON 里**没有** `translation_key` 这类字段，下面这 24 张注册表的定义**不存任何文本**，名字与描述永远按注册 id 现算：`resource`、`aura`、`realm_stage`、`element`、`spirit_root`、`physique`、`ability`、`curse`、`technique`、`progression`、`cultivation`、`artifact`、`medicinal_property`、`spirit_herb`、`alchemy_furnace`、`alchemy_wall_material`、`pill`、`pill_binding`、`formation`、`tribulation`、`secret_realm`、`contract_type`、`talisman`、`quality`。它们里面没有 `name` / `description` 字段，不读取额外字段；**包唯一能给一个定义配词的办法就是翻译上面那个生成的键**。描述键是名字键再接 `.description`。

**会把描述键画出来的是这四类定义：`quality`（品质名下面那一行）、`contract_type`（契约卷轴的提示框）、`pill`（认领丹药的物品提示框）与 `technique`（手册的提示框，以及被读时聊天栏那一行）**，而且**只在这个键被翻译时才画**：语言文件里没有这个键就整行不输出，不会把 `mxt.aura.example.fire.description` 这样的键名当正文打出去；其余注册表的描述键没有任何界面或提示框去读。

缺少名称译文时，列表、标题、面板条目及句中参数回退显示定义 ID，例如 `mxt:aura/example.fire`。提示框中可省略的名称或说明行不显示，包括丹药、药材、炉壁、炉型名称与符箓类型说明。界面不直接显示语言键。

`minor_stages` 不是名字列表，而是一个数量：子阶段名一律按 `<本境界名字键>.minor_stage.<下标>` 生成（同样带注册表命名空间，下标从 `0` 起）；没被翻译的那一重不显示。

### 界面标题 {#界面标题}

每个数据包注册表的界面标题另有固定键 `mxt.registry.<注册表 path>`（如 `mxt.registry.aura`、`mxt.registry.quality`），由本模组自己的语言文件提供；数据包只需要为自己的定义提供上面那个键。

### 命令文案 {#命令文案}

命令的每一句提示都写作 `command.mxt.<组>.<名字>`：**组是这条命令自己的那一段**（`command.mxt.quality.set`、`command.mxt.formation.bind.done`），所以查一句文案时按命令找即可。**所有子命令共用的那几句放在 `message` 组**（`command.mxt.message.requires_player`、`command.mxt.contract.failure.<小写枚举名>`），因为"哪个子命令都能用到"本身不是一条命令。

命令与其他界面共用的文案保留原有语言键，不重复定义到 `command.*`。例如，`block.mxt.rift.recolored` 同时用于裂隙交互和命令，`tooltip.mxt.talisman.mode.*` 同时用于提示框和 `/talisman`。命令直接引用这些键。

### 语言文件 {#语言文件}

翻译写在 `assets/<命名空间>/lang/zh_cn.json` 与 `en_us.json` 两份里，键写全、两份键集合一致。**定义之外的键也在这里**：物品、方块、界面、命令、提示框都是同一套原版语言文件。

## 字段解码口径 {#字段解码口径}

一份文件就是一条定义。写进去的东西逃不出下面五种结果，先认清写错时会怎样，再谈字段。

**未知字段被静默忽略。** 解码器只读取已声明的字段，额外字段不生效，也不产生日志。升级数据包时，应根据字段表核对已删除或改名的字段。

**未知 `type` 导致定义加载失败。** `type` 是分派键，必须引用已注册的类型；无效取值不会被替换为空操作。

**空表、空列表、非法值——拒收。** 一个恒真或恒假的条件、越界的数值、该填却不填的键都在这类里，加载直接失败。

**容错集合保留有效条目。** 部分列表与映射在条目解码失败时记录 `Ignoring invalid list element` 并丢弃该条目，其余内容继续加载。`costs` 等消耗数组采用严格解码：任一条目无效都会导致整份定义加载失败。

**通用字段不存在。** 定义里没有 `schema_version`、`enabled` 或 `tags`；"这一条现在要不要进注册表"由下面的 `neoforge:conditions` 回答，不是写一个开关字段。

定义解码失败时，加载不会保留旧快照，世界也无法完成加载。修复所列错误后才能继续；多个解码错误会集中报告。

## 停用一条定义 {#停用一条定义}

**停用一条定义是加载期的事**：把 NeoForge 的资源条件直接写在定义文件里，条件不成立的条目**根本不会进注册表**，也就不会被任何服务读到。所有数据包注册表用的是同一套条件：

```json
{
  "neoforge:conditions": [
    { "type": "neoforge:never" }
  ]
}
```

可用的条件都写在 `neoforge:` 命名空间下：`never` / `always`（无字段）、`mod_loaded`（`modid`）、`registered`（`registry` 默认 `minecraft:item`、`value`）、`and` / `or`（`values`）、`not`（`value`）与 `feature_flags_enabled`（`flags`）。条件可以写在**任何**注册表条目的文件里，所有数据包注册表一视同仁；一份文件就是一条定义，顶层没有 `values` 这类包装。条件成立时 `neoforge:conditions` 会在交给定义解码之前被剥掉，正常字段照常读。**按标签判断的条件（如 `tag_empty`）不能用在这里**：解码到该层时标签还没绑定，会直接抛异常；标签判断只属于配方、战利品表那一类加载更晚的东西。

**条件不成立不是加载错误**：加载器把该条目当作跳过处理，只留一条 DEBUG 日志 `Skipping loading registry entry … as its conditions were not met`，世界照常加载。所以「文件明明在、游戏里却没有」时，那条 DEBUG 日志是唯一的线索——默认的日志级别看不到它。

被加载条件排除的条目视为不存在，引用它的定义可能因此解码失败。加载条件不提供「保留注册但停用效果」的状态。完整文件见[数据包示例](./examples.md)。

> 灵根与体质另有一个**开关**（`spirit_identity` 附件里的 `disabled_spirit_roots` / `disabled_physiques`）：关闭是「仍然持有但不生效」。操作用脚本的 `MxtSpiritRoots.setEnabled` / `MxtPhysiques.setEnabled`，或管理员命令 `/mxt spirit_root enable|disable`、`/mxt physique enable|disable`；本模组不为它提供玩家界面。它管的是「身体要不要用这一条」，与「从数据包里拿掉该定义」是两件事。品质的顺序由 `quality` 自己声明（每一档的 `quality` 与 `next`），不依赖标签顺序。

## 数值字段 {#数值字段}

数值可以写成常量、表达式字符串或数值提供器对象：

```json
{
  "damage": 8.0,
  "speed": "2 + level * 0.1",
  "amount": {"type": "mxt:constant", "value": 10}
}
```

表达式使用 exp4j。变量由内置变量表按需从求值上下文携带的对象（施法者、目标、资源、随机源）里读出，`params` 可以覆盖或追加变量。加载阶段可判定的公式问题（空表达式、语法错误、`params` 非法等）是解码错误：加载器收集全部失败条目后一并列出并使加载失败。上下文无法提供的变量名只能在求值时发现——开发环境打印完整 ERROR 日志，生产环境每个不同消息打印一行 WARN，两者都继续按 `0` 处理。完整字段与取值范围见[数值提供器](../../../library/saturn/types/number.md)。

## 行为与条件 {#行为与条件}

行为统一称为 `action`，按目标分为 entity、item、block、bi-entity 等。多个步骤可通过 sequence/choice/if_else 等元行为组合。`condition` 用于限制技能、绑定物品、修炼、境界和配方。行为数组按顺序执行全部条目；条件数组要求全部条目成立。

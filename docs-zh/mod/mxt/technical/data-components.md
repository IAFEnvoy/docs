---
title: 数据组件
description: 物品数据组件的字段、读写职责与定义解析优先级。
---

# 数据组件

<span id="数据组件" />

本体往物品堆上挂的状态**全部**走原版数据组件（`DataComponentType`），没有"往物品上存一份模组自己的 NBT"这回事。本体组件统一登记在 `registry.MxtDataComponents` 一处，每一个都同时声明**持久化 codec** 与**网络 codec**（`persistent(...).networkSynchronized(...)`），所以它们都跟着存档走、也跟着同步给客户端——组件里没有"只服务端"或"只在本次会话有效"的类别。

组件保存特定物品堆的状态，例如锻造结果、符箓铭刻与灵气存量；数据包定义描述该类物品的通用规则。两者的合并优先级见[数据加载](./data-loading.md)中的组件覆盖规则。

## 一览 {#一览}

下表的「载荷」是 codec 解出来的 Java 形状，不是 JSON 键名——字段级的 JSON 写法在各定义自己的页面里。一行里出现 `Holder<X>` 表示存的是**注册表引用**（跟着包走），`Identifier` 表示存的是**裸 id**（不校验存在）。

### 品质与元素 {#品质与元素}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:quality` | `Holder<ItemQuality>` | **全模组唯一一个装档位的组件**，也是品质解析三层里的第一层。它装的是**整份品质对象**，所以它既定档位、也定该物品堆读哪条链：写上去就是"该物品堆是这个档"。`/quality set`、一次成功的升级、锻造台结算与画符铭刻写的都是它；`/quality clear` 移除它，该物品堆退回携带的定义该层。 |
| `mxt:element` | `List<Either<Holder<Element>, TagKey<Element>>>` | 该物品堆**额外**带的元素，与定义里写的取并集。可以写具体元素，也可以写元素标签。 |

### 丹药 {#丹药}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:pill` | `PillComponent`（可选 `pill`、`on_consume`、`toxicity_gain`、`toxicity_threshold`、`on_overdose`、`toxicity_after_overdose`） | 该物品堆丹药**自己声明的身份与效果**。组件里的 `pill` 指名一份丹药定义，**优先于** `pill_binding` 匹配到的那份；五个效果键再按字段逐个盖上去。**服用次数与冷却不在这里**，它们只认匹配到的绑定。 |

### 功法 {#功法}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:technique` | `Holder<Technique>` | 该物品堆**教的是哪门功法**。有它时不再按匹配器挑 `technique_binding` 声明，而是点名 `technique` 等于它的那一条。 |
| `mxt:technique_reading` | `TechniqueReadingComponent`（可选 `learn_time`、`hold_animation`、`hold_sound`） | 该物品堆**如何被读**，逐字段覆盖功法自己写的那三个字段。学哪门功法不在这里，那在 `mxt:technique`。 |
| `mxt:stored_text` | `Component`（裸字符串＝翻译键，对象＝完整组件） | 玉简上写着的那段文字，读出来时整段打进聊天栏；不写就印一句"什么都没写"。 |
| `mxt:jade_slip_reading` | `int`（tick，`0` 及以上） | 玉简**读多久**：按住右键读满这么多 tick 才出内容。不写就是 `40`（两秒）；写 `0` 与**潜行右键**一样是一点即读。 |

### 灵气与法器 {#灵气与法器}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:item_aura` | `double remain` | 一件**被消耗过**的物品堆上剩余的灵气，一个数。 |
| `mxt:spirit_storage` | `Object2DoubleMap<Holder<Aura>>` | 物品堆的灵气存量，按灵气身份保存有限非负 double。存取和容量支持小数，展示保留两位；缺组件的含义由物品决定（灵石满、符箓空），空表表示已耗空。 |
| `mxt:artifact_state` | `ArtifactStateComponent`（可选 `owner_uuid`、`owner_name`、`nourishment`） | 保存法器归属与温养度。UUID 用于归属校验，名称由认主者写入，仅用于显示。法器身份由物品定义解析，灵气存量由 `mxt:spirit_storage` 保存。 |
| `mxt:item_abilities` | `ItemAbilitiesComponent`（`abilities`） | 装备或激活期间**额外**授予的技能 id 列表，与定义声明的并集。行为 `mxt:add_ability` 是它的专用生产者（已写过的一条不写第二遍、原有条目一律保留）。 |
| `mxt:storage` | `DataStorageHolder` | 技能运行期状态的宿主（冷却、充能、开关、计时、锁目标）。一对 `(技能 id, 状态种类)` 地址对应一格，同一种类的第二个值会**替换**而不是并列。值本身是可变的，由内容侧或物品宿主整份写入。 |

### 诅咒 {#诅咒}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:curse_container` | `CurseContainerComponent`（`curses`，每条是一个 `mxt:apply_curse` 条目） | 该物品堆携带的诅咒：装备时施加给持有者，摘下时移除**它自己施加的**那些。条目就是 `mxt:apply_curse` 行为本身，所以物品声明不了那个行为做不到的事，物品也从不直接改持有者状态。 |

### 契约与灵兽 {#契约与灵兽}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:contract_scroll` | `ContractScrollComponent`（可选 `contract_type`） | 一张可重复使用的契约卷轴**指向哪份契约定义**。 |
| `mxt:contract_bell` | `ContractBellComponent`（`beast`、`name`、`behaviors`） | 保存御兽铃选中的灵兽及其可用命令。每个铃可分别指定目标；命令列表在选中时从生物读取并保存为快照，客户端无需解析实体即可显示轮盘页。 |
| `mxt:spirit_beast` | `SpiritBeastComponent`（`entity_type`、`entity`、`name`、`contract_type`、`owner`、`owner_name`） | 灵兽袋里**那一只**生物：存档数据、重建它需要的实体类型，以及进去时的契约。类型存在数据**旁边**而不是里面，所以存档数据保持生物自己写的样子。名字、契约类型与主人是快照，因为画提示框的地方不能解码、不能查表。 |

### 阵法 {#阵法}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:formation_plate` | `FormationPlateComponent`（`allowed`、可选 `formation`） | 一块便携阵盘**允许跑**哪些阵法，以及**这一块**执行的是哪座。允许列表每块一样，选中的那座必须是列表成员；列表为空表示不限制，除非服务端配置把它变成"什么都不许"。 |

### 秘境、令牌与鉴定 {#秘境、令牌与鉴定}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:secret_realm_token` | 可选 `realm`、`preset`、`duration_ticks`、`summoned`、`summoned_dimension` | realm 为秘境定义，preset 为裂隙预设；门的持续时间默认 0（永久），后两项由运行时记录复用的门 UUID 与维度。 |
| `mxt:reward_box` | `ResourceKey<LootTable>` | 奖励箱开哪张战利品表。存的是 **`ResourceKey` 而不是 `Holder`**：`/reload` 会换掉战利品表实例，握着旧的那份会一直滚重载之前的表。 |
| `mxt:token` | `TokenComponent`（可选 `kind`、`value`、`owner`） | 秘境令牌与交易令牌共用的**身份与权限**载荷。`owner` 是权限记录，故意不进提示框。 |
| `mxt:identification` | `IdentificationComponent`（`result`） | 本体提供的未鉴定物品**鉴定后变成哪件物品**的已解析 id。 |

### 经济 {#经济}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:cheque` | `ChequeComponent`（`value`、`issuer`） | 一张支票上记的价值，与任何具体的货币物品无关。 |

### 资源容器 {#资源容器}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:resource_container` | `ResourceContainerComponent`（`values`） | 保存物品容器中的资源及其数量，支持小数。容器用于转运资源，长按使用时将存量转入持有者对应的资源账户。 |
| `mxt:resource_capacity` | `ResourceCapacityComponent`（`values`） | 这口容器**每种资源最多装多少**，由发放容器的一方写。**这里没有条目的资源就是一点也装不下**——资源本身没有天然上限，数字必须写在某处。 |

### 符箓与符笔 {#符箓与符笔}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:talisman` | `TalismanComponent`（`talisman`、`mode`） | 一张载体上**已铭刻的那条符箓**：单个 `talisman` 条目，缺省即一张空白载体；再刻一条会替换前一条。`mode` 是 `fire`（缺省）或 `store`，**存在物品堆上而不是任何定义上**，所以同一条铭刻在不同载体上可以有不同行为。它的提示框由 `TalismanTooltipAppender` 单独画，好让那些行落在载体的充能行上面。 |
| `mxt:brush_pigment` | `int`（`0` 到上限） | 符笔自己的**颜料存量**，一个非负整数，**1 单位就是 1 像素弧长**。没写这个组件与写 `0` 是一回事。它不是消耗品条目：加料是原版储物袋那套点击，判定与换算只在 `runtime.talisman.BrushPigmentService` 一处。 |

### 灵植与灵根 {#灵植、丹炉与灵根}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:herb_age` | `int`（`0` 到上限） | 一株灵植果实的**药龄**。破坏成熟植株时，已生长的年数向下取整写进掉落的每一堆，**同一刻**再按它去查这株灵植自己的 `quality_by_age` 阶梯，命中的对应档位写进 `mxt:quality`。它同时是**药力公式的输入**（变量 `herb_age`），而不是第二个乘数——想让老药更值钱，就在药力公式里读它。 |
| `mxt:spirit_root` | `Holder<SpiritRoot>` | 这件物品（通常是灵根石）携带**哪条灵根定义**。 |
| `mxt:physique` | `Holder<Physique>` | 这件物品（通常是体质石或卷轴）携带**哪条体质定义**。 |

### 裂缝 {#裂缝}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt:rift` | 可选 `blueprint`、`recorded` | blueprint 为完整单门模板；recorded 为记录的目的地，放置时优先于蓝图目的地。物品对空气使用编辑参数，对方块使用重复放置；保存蓝图会清除 recorded 覆盖。 |

## 三类状态的解析规则 {#三种-谁说了算}

看完上面那张表，组件与声明的关系可以收成三句：

- **只有 `mxt:quality` 装档位。** 别的组件都不带品质，`mxt_forging:forging_result` 只记锻造记录。
- **`mxt:pill` / `mxt:technique` / `mxt:technique_reading` 参与"哪条声明适用"。** 前两者能指名或挑出声明，后者再覆盖一层参数。这三条是[数据加载](./data-loading.md)里那张「组件压过声明」表的全部成员。
- **其余全部只装状态。** 它们不影响"适用哪条声明"，只回答"该物品堆现在是什么样"。

## 组件不是消耗品条目 {#组件不是消耗品条目}

两个容易混的地方：

- **符笔颜料不使用 `Cost`。** 符箓灵气（`mxt:spirit_storage`）与符笔颜料（`mxt:brush_pigment`）均属于工具自身存量，由对应使用流程扣除，不作为玩家付款来源。
- **货币计价不属于消耗事务。** 支票价值与 `currency` 的兑换价格不使用 `Cost`。

## 组件写入限制 {#写组件时的两个坑}

- **列表里的空堆要用 `ItemStack.OPTIONAL_CODEC`。** 组件是要落盘、要同步的，列表里出现一个空堆会让**整个包编码失败**。本模组用空堆占位的列表一律走那个 codec。
- `mxt:rift.blueprint` 的格式见 [rift](../datapack/json/rift.md#门模板与秘境布局)；`recorded` 使用相同的 destination 格式。

## 相关阅读 {#相关阅读}

- [数据加载](./data-loading.md)：组件的持久化与网络 codec 在哪里登记、组件与声明的合并顺序、品质解析的三层。
- [附件](./attachments.md)：同一个"状态放哪"问题的另一侧——挂在实体、区块与世界上的那些。
- [Java API](../java/api.md)：`QualityService` 等读组件的服务入口。
- [内置物品](../player-guide/items.md)：哪些本体物品带哪些组件，以及可以直接抄的 `give` 例子。

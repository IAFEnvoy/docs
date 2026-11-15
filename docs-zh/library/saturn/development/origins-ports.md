---
title: "Origins 数据适配"
sidebar_position: 5
---

将 Origins-NeoForge 1.21.1 的动作或条件转换为 Saturn 的 Minecraft 26.1.2 数据时，需要核对类型名、字段与上下文。Saturn 复用了其中可独立使用的通用能力，但不是 Origins 数据包的直接兼容层，也不要求安装 Origins。

完整字段表、默认值、JSON 示例和行为说明统一维护在[动作与条件类型参考](../types/index.md)中。本页仅说明两套格式之间的对应关系和适配限制。

## 复用已有能力

| 范围 | Origins 类型 | Saturn 对应 | 差异 |
| --- | --- | --- | --- |
| 动作组合 | `and` | `sequence` | 动作数组同样顺序执行。 |
| 实体动作 | `add_xp` | `add_experience` | 分别设置 points、levels。 |
| 实体动作 | `fire_projectile` | `spawn_projectile` | 保留 Saturn 的字段与激活上下文。 |
| 实体动作 | `block_action_at` | `block_action` | 在激活位置执行方块动作，嵌套字段为 action。 |
| 双实体动作 | `source_action` | `actor_action` | 对 actor 执行实体动作。 |
| 方块动作 | `add_block` | `set_block` | 使用 Saturn 的方块状态定义。 |
| 方块动作 | `destroy` | `break_block` | 复用原有破坏方块行为。 |
| 方块动作 | `absolute_offset` | `offset` | 使用 x、y、z 偏移。 |
| 物品动作 | `consume` | `consume_item` | 字段为 count，不是 amount。 |
| 物品动作 | `damage` | `damage_item` | 沿用现有耐久逻辑。 |
| 物品动作 | `merge_component` | `merge_components` | 沿用 Saturn 的组件补丁。 |
| 实体条件 | `in_tag` | `entity_tag` | 方块与物品上下文分别为 block_tag、item_tag。 |
| 实体条件 | `xp_levels` / `xp_points` | `experience_level` / `experience_points` | 沿用 comparison 与 compare_to。 |
| 实体条件 | `biome_in` | `on_block` + `biome_tag` | 按需要组合方块与群系条件，不新增 BiomeCondition 注册表。 |
| 实体条件 | `ability` | `player_ability` | 原版玩家能力标记，与 Saturn Ability 技能区分。 |
| 伤害条件 | `id` / `type` | `damage_type` | 字段统一为 damage_type。 |
| 伤害条件 | `in_tag` | `damage_type_tag` | 沿用现有伤害类型标签。 |
| 延迟 | `delay` | timeline 的 `idle` / timeline `idle` | 使用现有时间线调度，不再建立全局 Timeout 队列。 |

## 适配差异

- 使用 Saturn 现有的四种 Action、五种 Condition 及 `MapCodec` 分派注册表，类型命名空间为 `saturn`。不新增一套动作执行器。
- 数值使用 `NumberProvider`，比较沿用 `comparison` / `compare_to`。嵌套动作与条件继续携带父上下文的公式、激活来源与扩展数据。
- `side` 判断逻辑端，单人游戏内置服务器按服务端处理。命令、进度、统计、菜单、原版 predicate 与背包写操作使用服务端 API；没有新增客户端类引用或 accessor/mixin。
- `for_range` 与 `while` 通过 `max_iterations` 限制每次调用，默认 1024。`for_range` 截断次数；`while` 仍满足条件且达到上限时抛出异常中断，不回滚已执行动作。
- 背包使用原版命令槽位 ID / 名称 / 范围，选中快捷栏和主手别名去重；只处理原版槽位，不读取 Power 专属背包。`modify_inventory` 按槽位执行一次，不保留 Origins 的 process_mode 迭代语义。
- 范围形状按相对中心计算，修正原实现的立方体轴差符号和实体绝对坐标距离问题。方块位置惰性遍历；`attachable` 使用相邻方块的真实坐标检查支撑面。
- `grant_advancement` / `revoke_advancement` 的 `selection: "everything"` 处理全部进度，不局限于给定进度所在树。该模式仍要求 advancement 字段，但不使用它。
- `fluid_height` 的 `fluid` 引用 NeoForge FluidType，例如 `minecraft:water`；`submerged_in` 接收流体 ID，再按其 FluidType 检查眼睛位置。

这是能力移植，不是 Origins 数据包的直接兼容层。即使类型 ID 相同，也应按对应 Saturn 类型页调整字段。

## 不兼容的 Origins 类型

| 范围 | 原因或替代方式 |
| --- | --- |
| Power、Origin、entity set 与 ResourceReference 相关类型 | 依赖 Origins 的运行时状态；Saturn 已有独立 Ability、Resource、DataStorage 接口，不复制这些内部对象。 |
| `elytra_flight_possible` | 依赖 Caelus；没有引入额外必装依赖。 |
| `using_effective_tool` | 原实现直接访问客户端挖掘状态和游戏模式内部字段，需要额外的双端隔离与状态契约。 |
| `modify_death_ticks`、`modify_attack_cooldown` | 依赖内部字段访问或 accessor，不为这些动作新增 mixin。 |
| `variable_execute_command` | 原实现基于 Origins 的 ResourceReference；普通命令使用 execute_command。 |
| Loot modifier 物品 `modify` | 当前 ItemActionContext 只提供可原地修改的 ItemStack，不能可靠回写替换后的物品类型。 |
| `drop_inventory`、`replace_entity`、`random_teleport`、`raycast`、实体 `explode` | 原实现还涉及物品回写、实体复制、碰撞或射线行为，当前未提供对应类型；范围行为可使用 region_apply，方块上下文已有 explode。 |
| `moving` | 原实现依赖 MovingEntity 注入状态；Saturn 不包含对应运动状态 mixin。 |
| `distance_from_coordinates` | 涉及出生点、跨维度缩放和精度约定，当前无对应类型，不应把 Origins 同名项视为已注册。 |

## 来源

移植来源为 [Origins-NeoForge](https://github.com/IAFEnvoy/Origins-NeoForge) 的 `data/action/builtin`、`data/condition/builtin` 和相关工具类。Saturn 对其进行了上下文、Codec 与 Minecraft 26.1.2 API 适配；Saturn 不需要安装 Origins。


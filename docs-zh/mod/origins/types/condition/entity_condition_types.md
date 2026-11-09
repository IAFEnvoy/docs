# 实体条件类型 {#entity-condition-types}

实体条件检查实体的状态。

### `origins:ability` {#originsability}

检查玩家是否拥有特定能力（例如 `invulnerable`、`mayfly`）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `ability` | [字符串](../basic_concepts#string) | **必填** | 能力：`flying`、`instabuild`、`invulnerable`、`may_build`、`mayfly` |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:ability",
  "ability": "minecraft:mayfly"
}
```

此示例将检查玩家能否像创造模式那样飞行。

</details>

### `origins:advancement` {#originsadvancement}

检查某项进度是否已被授予。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `advancement` | [标识符](../basic_concepts#identifier) | **必填** | 进度 ID |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:advancement",
  "advancement": "minecraft:story/smelt_iron"
}
```

此示例将检查玩家是否拥有 `minecraft:story/smelt_iron` 进度，该进度通过熔炼第一块铁锭获得。

</details>

### `origins:air` {#originsair}

检查实体剩余的空气。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | `==`、`!=`、`<`、`<=`、`>`、`>=` |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:air",
  "comparison": "==",
  "compare_to": 0
}
```

此示例将检查玩家是否已无剩余呼吸值/空气/气泡。

</details>

### `origins:attack_cooldown` {#originsattack_cooldown}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

比较玩家当前攻击冷却的进度。

### `origins:attack_cooldown` {#originsattack_cooldown-1}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

比较玩家当前攻击冷却的进度。

### `origins:attack_target_condition` {#originsattack_target_condition}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查生物是否拥有攻击目标。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:attacker_condition` {#originsattacker_condition}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查生物是否拥有最近的生物攻击者。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:attribute` {#originsattribute}

检查实体的属性值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `attribute` | [标识符](../basic_concepts#identifier) | **必填** | 属性 ID |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:attribute",
  "attribute": "minecraft:generic.armor",
  "comparison": ">=",
  "compare_to": 10.0
}
```

此示例将检查实体的盔甲属性是否达到 10 或更高。

</details>

### `origins:biome_in` {#originsbiome_in}

检查实体是否位于指定的生物群系之一。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `biome` | Identifier or List | 可选 | 生物群系 ID |
| `biomes` | List of Identifier | 可选 | 备选生物群系列表 |
| `condition` | [生物群系条件](../condition/biome_condition_types) | 可选 | 要评估的生物群系条件 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:biome_in",
  "biome": "minecraft:plains"
}
```

此示例将检查实体当前是否位于平原生物群系中。

</details>

### `origins:block_collision` {#originsblock_collision}

检查实体在偏移位置处的方块碰撞。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `offset_x` | [浮点数](../basic_concepts#float) | `0.0` | X 偏移 |
| `offset_y` | [浮点数](../basic_concepts#float) | `0.0` | Y 偏移 |
| `offset_z` | [浮点数](../basic_concepts#float) | `0.0` | Z 偏移 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:block_collision",
  "offset_x": 0.1,
  "offset_z": 0.1
}
```

此示例将检查实体是否与方块的正 X 面或正 Z 面发生碰撞。

</details>

### `origins:block_in_radius` {#originsblock_in_radius}

检查实体周围一定半径内是否存在匹配条件的方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 用于匹配方块的条件 |
| `radius` | [整数](../basic_concepts#integer) | **必填** | 搜索半径 |
| `shape` | [字符串](../basic_concepts#string) | `cube` | `cube` 或 `sphere` |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:block_in_radius",
    "block_condition": {
        "type": "origins:in_tag",
        "tag": "origins:natural_stone"
    },
    "radius": 1,
    "shape": "cube",
    "comparison": ">=",
    "compare_to": 4
}
```

此示例将检查实体周围 1 格半径内是否有 4 个或更多属于 `#origins:natural_stone` 方块标签的方块。

</details>

### `origins:brightness` {#originsbrightness}

检查实体眼睛位置的光照等级。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:brightness",
  "comparison": "<=",
  "compare_to": 0.5
}
```

此示例将检查亮度是否为 0.5 或更低（即光照等级为 11 或更低）。

</details>

### `origins:can_have_effect` {#originscan_have_effect}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查生物能否受到指定状态效果的影响。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) | **必填** | 要测试的状态效果 |

### `origins:climbing` {#originsclimbing}

检查实体当前是否正在攀爬。

### `origins:collided_horizontally` {#originscollided_horizontally}

检查实体是否在水平方向上撞到墙壁。

### `origins:command` {#originscommand}

检查命令是否返回特定结果。

:::caution
此条件仅在服务端有效。这意味着 `origins:climbing`、`origins:entity_glow`、`origins:shader` 等客户端能力类型无法与之配合使用。
:::

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `command` | [字符串](../basic_concepts#string) | **必填** | 要执行的命令 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:command",
    "command": "execute if score @s objective1 = @s objective2",
    "comparison": "==",
    "compare_to": 1
}
```

此示例将检查实体在 objective1 和 objective2 这两个计分板目标中的分数是否相同。

</details>

### `origins:creative_flying` {#originscreative_flying}

检查玩家是否处于创造模式飞行状态。

### `origins:daytime` {#originsdaytime}

检查当前是否为白天。

### `origins:dimension` {#originsdimension}

检查实体当前所在的维度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `dimension` | [标识符](../basic_concepts#identifier) | **必填** | 维度 ID |
| `inverted` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，则反转结果 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:dimension",
  "dimension": "minecraft:the_nether"
}
```

此示例将检查实体是否位于下界维度中。

</details>

### `origins:distance_from_coordinates` {#originsdistance_from_coordinates}

检查实体与一组坐标之间的距离。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `x` | [浮点数](../basic_concepts#float) | `0` | 参考 X 坐标 |
| `y` | [浮点数](../basic_concepts#float) | `0` | 参考 Y 坐标 |
| `z` | [浮点数](../basic_concepts#float) | `0` | 参考 Z 坐标 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的距离 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:distance_from_coordinates",
  "x": 256,
  "y": 64,
  "z": 32,
  "comparison": "<",
  "compare_to": 8
}
```

此示例将检查实体是否位于坐标 (256, 64, 32) 周围 8 格范围内。

</details>

### `origins:elytra_flight_possible` {#originselytra_flight_possible}

检查实体当前能否进行鞘翅飞行。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `check_state` | [布尔值](../basic_concepts#boolean) | `false` | 是否还要求实体处于空中、未在飞行、不在水中且没有漂浮效果 |
| `check_abilities` | [布尔值](../basic_concepts#boolean) | `true` | 是否还要求实体拥有允许鞘翅飞行的物品或能力 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:elytra_flight_possible",
    "check_state": true,
    "check_abilities": true
}
```

此示例将检查玩家能否激活鞘翅飞行。

</details>

### `origins:enchantment` {#originsenchantment}

检查已装备的物品是否拥有特定附魔。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `enchantment` | [标识符](../basic_concepts#identifier) | **必填** | 附魔 ID |
| `calculation` | [字符串](../basic_concepts#string) | `sum` | `sum` 或 `max`：如何跨物品合并附魔等级 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 针对等级的 比较方式 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的等级 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:enchantment",
    "enchantment": "minecraft:protection",
    "calculation": "sum",
    "comparison": ">=",
    "compare_to": 16
}
```

此条件将检查实体是否穿着一整套保护 IV 盔甲（或更好的附魔，这在装有模组时可能实现）。

</details>

### `origins:entity_in_radius` {#originsentity_in_radius}

检查实体周围一定半径内是否存在匹配条件的实体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `entity_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 用于匹配实体的条件 |
| `radius` | [整数](../basic_concepts#integer) | **必填** | 搜索半径 |
| `shape` | [字符串](../basic_concepts#string) | `cube` | `cube` 或 `sphere` |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

### `origins:entity_type` {#originsentity_type}

检查实体的类型。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `entity_type` | [标识符](../basic_concepts#identifier) | **必填** | 实体类型 ID |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:entity_type",
  "entity_type": "minecraft:creeper"
}
```

此示例将检查实体是否为苦力怕。

</details>

### `origins:equipped_item` {#originsequipped_item}

检查装备在特定栏位中的物品。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `equipment_slot` | [Equipment Slot](../minecraft_data_types#equipment-slot-group) | **必填** | 要检查的栏位 |
| `item_condition` | [物品条件](../condition/item_condition_types) | **必填** | 物品条件 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:equipped_item",
    "equipment_slot": "mainhand",
    "item_condition": {
        "type": "origins:in_tag",
        "tag": "minecraft:pickaxes"
    }
}
```

此示例将检查实体主手中的物品是否为镐。

</details>

### `origins:exists` {#originsexists}

检查实体是否存在。

### `origins:exposed_to_sky` {#originsexposed_to_sky}

检查实体是否暴露在天空下。

### `origins:exposed_to_sun` {#originsexposed_to_sun}

检查实体是否暴露在阳光下。

### `origins:fall_distance` {#originsfall_distance}

检查实体的下落距离。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:fall_distance",
  "comparison": ">=",
  "compare_to": 4
}
```

此示例将检查实体是否已下落 4 格或更多距离。

</details>

### `origins:fall_flying` {#originsfall_flying}

检查实体当前是否处于鞘翅滑翔状态（使用鞘翅、鞘翅能力或类似方式）。

### `origins:fluid_height` {#originsfluid_height}

检查实体浸入的流体高度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `fluid` | [标识符](../basic_concepts#identifier) | **必填** | 流体 ID 过滤 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:fluid_height",
    "fluid": "minecraft:lava",
    "comparison": "==",
    "compare_to": 0
}
```

此示例将检查实体是否没有接触熔岩流体。

</details>

### `origins:food_level` {#originsfood_level}

检查实体的饥饿值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:food_level",
    "comparison": "==",
    "compare_to": 0
}
```

此示例将检查玩家是否拥有 0 个饥饿鸡腿（即 0 点食物值）。

</details>

### `origins:gamemode` {#originsgamemode}

检查玩家的游戏模式。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `gamemode` | [字符串](../basic_concepts#string) | **必填** | 游戏模式：`survival`、`creative`、`adventure`、`spectator` |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:gamemode",
  "gamemode": "creative"
}
```

此示例将检查玩家是否处于创造模式。

</details>

### `origins:glowing` {#originsglowing}

检查实体是否发光。

### `origins:grounded` {#originsgrounded}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查实体是否位于地面上。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:health` {#originshealth}

### `origins:hostile` {#originshostile}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查实体是否实现了 Minecraft 的敌对生物接口。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

检查实体当前的生命值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:health",
    "comparison": "<",
    "compare_to": 20
}
```

此示例将检查实体的生命值是否低于 10 颗心（即 20 点生命值）。

</details>

### `origins:in_block` {#originsin_block}

检查实体的碰撞箱是否与特定方块相交。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | **必填** | 方块条件 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:in_block",
    "block_condition": {
        "type": "origins:block_id",
        "block": "minecraft:grass"
    }
}
```

此示例将检查草（植物）当前是否与实体的脚部重叠。

</details>

### `origins:in_block_anywhere` {#originsin_block_anywhere}

检查实体的碰撞箱内是否存在任意匹配条件的方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | **必填** | 方块条件 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 匹配方块的最小数量 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:in_block_anywhere",
    "block_condition": {
        "type": "origins:in_tag",
        "tag": "minecraft:flowers"
    },
    "comparison": ">",
    "compare_to": 1
}
```

此示例将检查实体当前是否位于属于 `#minecraft:flowers`（`data\minecraft\tags\blocks\flowers.json`）方块标签的两格高植物方块内。玫瑰丛方块就是一个例子。

</details>

### `origins:in_rain` {#originsin_rain}

检查实体所在位置是否正在下雨。

### `origins:in_snow` {#originsin_snow}

检查实体所在位置是否正在下雪。

### `origins:in_tag` {#originsin_tag}

检查实体是否位于某个实体类型标签中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `tag` | [标识符](../basic_concepts#identifier) | **必填** | 实体类型标签 ID |

### `origins:in_thunderstorm` {#originsin_thunderstorm}

检查实体所在位置是否有雷暴。

### `origins:inventory` {#originsinventory}

检查实体的物品栏内容。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 物品条件 |
| `slot` | List of Integer | 可选 | 要检查的栏位 |
| `process_mode` | [字符串](../basic_concepts#string) | `stacks` | `stacks` 或 `items` |
| `power` | [标识符](../basic_concepts#identifier) | 可选 | 要检查其物品栏的能力 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 针对匹配数量的比较方式 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的数量 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:inventory",
    "process_mode": "stacks",
    "comparison": ">=",
    "compare_to": 10
}
```

此示例将检查实体物品栏中是否有 10 个或更多栏位被任意物品占用。

</details>

### `origins:invisible` {#originsinvisible}

检查实体当前是否处于隐身状态。

### `origins:living` {#originsliving}

检查实体是否为 `LivingEntity` 的实例，简单来说，即生物或玩家。

### `origins:mob_effect` {#originsmob_effect}

检查特定状态效果是否处于激活状态。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `effect` | [标识符](../basic_concepts#identifier) | **必填** | 效果 ID |
| `min_amplifier` | [整数](../basic_concepts#integer) | `0` | 最小等级 |
| `max_amplifier` | [整数](../basic_concepts#integer) | `2147483647` | 最大等级 |
| `min_duration` | [整数](../basic_concepts#integer) | `-1` | 最短剩余持续时间（tick） |
| `max_duration` | [整数](../basic_concepts#integer) | `2147483647` | 最长剩余持续时间（tick） |
| `inverted` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，则检查该效果**未**处于激活状态 |

### `origins:moving` {#originsmoving}

检查实体当前是否正在移动。

### `origins:nbt` {#originsnbt}

检查实体的 NBT 数据。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `nbt` | NBT Object | **必填** | 用于与实体匹配的 NBT 数据 |

### `origins:on_block` {#originson_block}

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:on_block"
}
```

此示例将检查实体当前是否位于地面上。

</details>

检查实体是否站在方块上（而不是处于空中）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 对所站方块的条件 |

### `origins:on_fire` {#originson_fire}

检查实体是否着火。

### `origins:origin` {#originsorigin}

检查实体的起源。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `origin` | [标识符](../basic_concepts#identifier) | **必填** | 起源 ID |
| `layer` | [标识符](../basic_concepts#identifier) | 可选 | 起源层 ID |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:origin",
  "origin": "origins:phantom",
  "layer": "origins:origin"
}
```

此示例将检查实体是否在默认起源层上拥有 `origins:phantom` 起源。

</details>

### `origins:passenger` {#originspassenger}

检查实体是否拥有匹配的乘客。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 对每个乘客检查的双实体条件 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的乘客数量 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:passenger",
    "bientity_condition": {
        "type": "origins:actor_condition",
        "condition": {
            "type": "origins:entity_type",
            "entity_type": "minecraft:player"
        }
    },
    "comparison": ">=",
    "compare_to": 1
}
```

此示例将检查目标实体是否正被玩家（动作实体）骑乘。

</details>

### `origins:passenger_recursive` {#originspassenger_recursive}

递归检查乘客。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 在每一层检查的双实体条件 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:passenger_recursive",
    "bientity_condition": {
        "type": "origins:actor_condition",
        "condition": {
            "type": "origins:entity_type",
            "entity_type": "minecraft:armor_stand"
        }
    }
}
```

此示例将检查目标实体是否正被一个盔甲架骑乘，而该盔甲架又正被另一个盔甲架骑乘（依此类推）。

</details>

### `origins:power_active` {#originspower_active}

检查特定能力是否处于激活状态。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `power` | [标识符](../basic_concepts#identifier) | **必填** | 能力 ID |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:power_active",
  "power": "origins:primary_key"
}
```

此示例将检查 `origins:primary_key` 能力当前是否处于激活状态。

</details>

### `origins:power_type` {#originspower_type}

检查实体是否拥有处于激活状态的特定类型能力。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `power_type` | [标识符](../basic_concepts#identifier) | **必填** | 能力类型 ID |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:power_type",
    "power_type": "origins:active_self"
}
```

此示例将检查实体是否拥有使用 [Active Self（能力类型）](../power/action) 的能力。

</details>

### `origins:predicate` {#originspredicate}

对照数据包中定义的谓词进行检查。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `predicate` | [标识符](../basic_concepts#identifier) | **必填** | 谓词资源位置 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:predicate",
    "predicate": "example:weather/is_thunderstorm"
}
```

此示例将检查 `example:check_if_thunderstorm` 谓词（`data\example\predicates\weather\is_thunderstorm.json`）是否为真。

</details>

### `origins:raining` {#originsraining}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查实体所在世界当前是否正在下雨。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:raycast` {#originsraycast}

执行一次射线检测，并检查匹配的实体/方块。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `distance` | [浮点数](../basic_concepts#float) | **必填** | 射线检测距离 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 要匹配的方块 |
| `entity_condition` | [实体条件](../condition/entity_condition_types) | 可选 | 要匹配的实体 |

### `origins:relative_health` {#originsrelative_health}

检查实体生命值占最大生命值的百分比。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 百分比数值（0-1） |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:relative_health",
    "comparison": "<=",
    "compare_to": 0.5
}
```

此示例将检查玩家的生命值是否为其最大生命值的一半或更少。

</details>

### `origins:relative_resource` {#originsrelative_resource}

把资源的数值除以其最大值的比例，与某个数值或资源值进行比较。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `relativity` | [资源引用](../shared_data_types#resource-reference) | **必填** | 用于比较的值 |

### `origins:empty_resource` {#originsempty_resource}

检查资源是否处于或低于其最小值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |

### `origins:full_resource` {#originsfull_resource}

检查资源是否处于或高于其最大值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |

### `origins:compare_resources` {#originscompare_resources}

比较同一实体上的两个资源。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `left_resource` | [标识符](../basic_concepts#identifier) | **必填** | 左侧资源能力 ID |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `right_resource` | [标识符](../basic_concepts#identifier) | **必填** | 右侧资源能力 ID |

### `origins:resource` {#originsresource}

检查资源的数值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `resource` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 资源能力 ID |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:resource",
    "resource": "example:a_simple_resource",
    "comparison": "==",
    "compare_to": 1
}
```

此示例将检查玩家在 `example:a_simple_resource` 资源能力中的数值是否为 1。（`data\example\powers\a_simple_resource.json`）

</details>

### `origins:riding` {#originsriding}

检查实体是否骑乘着另一个实体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 骑乘者与载具之间的双实体条件 |
| `recursive` | [布尔值](../basic_concepts#boolean) | 可选 | 是否递归检查 |

### `origins:riding_recursive` {#originsriding_recursive}

递归检查被骑乘的实体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 在每一层检查的双实体条件 |

### `origins:riding_root` {#originsriding_root}

检查骑乘链最根部的被骑乘实体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `bientity_condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 对根部载具的条件 |

### `origins:saturation_level` {#originssaturation_level}

检查玩家的饱和度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:saturation_level",
    "comparison": "==",
    "compare_to": 0
}
```

此示例将检查玩家的饱和度是否降为 0。

</details>

### `origins:scoreboard` {#originsscoreboard}

检查计分板分数。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `name` | [字符串](../basic_concepts#string) | 可选 | 分数持有者名称（默认为实体名称） |
| `objective` | [字符串](../basic_concepts#string) | **必填** | 计分板目标名称 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:scoreboard",
    "objective": "obj",
    "comparison": ">",
    "compare_to": 3
}
```

此示例将检查玩家在 `obj` 计分板目标中的分数是否大于 3。

</details>

### `origins:set_size` {#originsset_size}

检查实体当前所在集合的成员数量。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `set` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 实体集合 ID |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

### `origins:sneaking` {#originssneaking}

检查实体是否正在潜行。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `inverted` | [布尔值](../basic_concepts#boolean) | `false` | 若为 `true`，则检查实体是否**未**在潜行 |

### `origins:sprinting` {#originssprinting}

检查实体是否正在疾跑。

### `origins:stat` {#originsstat}

检查实体某项 Minecraft 统计的数值。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `stat` | [统计引用](../shared_data_types#stat-reference) | **必填** | 要检查的统计。 |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的值 |

<details>
<summary>示例 1</summary>

```json
{
  "type": "origins:stat",
  "stat": "minecraft:deaths",
  "comparison": ">=",
  "compare_to": 10
}
```

此示例将检查玩家是否已死亡 10 次或更多。

</details>

<details>
<summary>示例 2</summary>

```json
{
  "type": "origins:stat",
  "stat": {
    "stat_type": "minecraft:mined",
    "id": "minecraft:diamond_ore"
  },
  "comparison": ">=",
  "compare_to": 100
}
```

此示例将检查玩家是否已挖掘 100 个或更多钻石矿石。

</details>

### `origins:submerged_in` {#originssubmerged_in}

检查实体是否浸没在特定流体中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `fluid` | [标识符](../basic_concepts#identifier) | **必填** | 流体 ID |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:submerged_in",
    "fluid": "minecraft:water"
}
```

此示例将检查玩家是否浸没在水中。

</details>

### `origins:swimming` {#originsswimming}

检查实体是否正在游泳。

### `origins:tamed` {#originstamed}

检查实体是否已被驯服。

### `origins:team` {#originsteam}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查实体是否属于任意计分板队伍，或属于指定名称的队伍。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `team` | String | 可选 | 要求的计分板队伍名称 |

### `origins:team` {#originsteam-1}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查实体是否属于任意计分板队伍，或在存在 `team` 时属于指定名称的队伍。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `team` | String | 可选 | 要求的计分板队伍名称 |

### `origins:thundering` {#originsthundering}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查实体所在世界当前是否正在打雷。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| 无 | - | - | - |

### `origins:time_of_day` {#originstime_of_day}

检查一天中的时间。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的 tick 数 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:and",
    "conditions": [
        {
            "type": "origins:time_of_day",
            "comparison": ">=",
            "compare_to": 12000
        },
        {
            "type": "origins:time_of_day",
            "comparison": "<=",
            "compare_to": 13000
        }
    ]
}
```

此示例将检查太阳当前是否正在落山。

</details>

### `origins:using_effective_tool` {#originsusing_effective_tool}

检查实体是否手持对其正在注视的方块有效的工具。

### `origins:using_item` {#originsusing_item}

检查实体当前是否正在使用物品。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `item_condition` | [物品条件](../condition/item_condition_types) | 可选 | 对正在使用的物品的条件 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:using_item",
    "item_condition": {
        "type": "origins:food"
    }
}
```

此示例将检查实体当前是否正在食用食物。

</details>

### `origins:xp_levels` {#originsxp_levels}

检查玩家的经验等级。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:xp_levels",
    "comparison": "<=",
    "compare_to": 5
}
```

此示例将检查玩家的经验等级是否为 5 级或更低。

</details>

### `origins:xp_points` {#originsxp_points}

检查玩家的经验点（距离下一级的进度）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [整数](../basic_concepts#integer) | **必填** | 用于比较的值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:xp_points",
    "comparison": ">=",
    "compare_to": 90
}
```

此示例将检查玩家是否拥有 90 点或更多经验点，这只有在玩家至少达到 7 级时才可能实现。

</details>

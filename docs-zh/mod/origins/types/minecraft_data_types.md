---
sidebar_position: 1
---

# Minecraft 数据类型 {#minecraft-data-types}

这些是 Minecraft 定义、并在 Origins JSON 文件中使用的数据类型。理解它们有助于使用能力、动作和条件。

---

## 物品堆叠（Item Stack） {#item-stack}

**物品堆叠**（Item Stack）是一个或多个物品的 JSON 表示，包含物品 ID、数量和可选的数据组件（1.20.5+ 中取代了 NBT）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `id` | [标识符](./basic_concepts#identifier) | **必填** | 物品 ID（例如 `minecraft:diamond_sword`） |
| `count` | [整数](./basic_concepts#integer) | `1` | 物品数量（1~64） |
| `components` | Object | 可选 | [数据组件](https://minecraft.wiki/w/Data_component_format)映射 |

:::warning
如果你的数据包是从 1.20.4 或更早版本升级而来，必须把所有物品堆叠转换为新格式。旧的 `nbt` 字段不再受支持，必须替换为 `components`。
:::

**示例：**
```json
{
    "id": "minecraft:diamond_sword",
    "count": 1,
    "components": {
        "minecraft:enchantments": {
            "levels": {
                "minecraft:sharpness": 5
            }
        }
    }
}
```

---

## 伤害类型（Damage Type） {#damage-type}

**伤害类型**（Damage Type）通过其标识符从 `damage_type` 注册表（`data/<namespace>/damage_type/`）中引用。当某字段的类型为 `DamageType` 时，你需要提供指向某个伤害类型定义的标识符。

**示例：**
```json
"damage_type": "minecraft:in_wall"
```

伤害类型在数据包的 `data/<namespace>/damage_type/` 中定义，用于指定伤害是否无视盔甲、是否算作火焰伤害等属性。常见伤害类型 ID 列表见 [Minecraft Wiki: Damage Type](https://minecraft.wiki/w/Damage_type)。

**伤害类型 JSON** 的定义如下：

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `message_id` | [字符串](./basic_concepts#string) | **必填** | 死亡消息的翻译键 |
| `exhaustion` | [浮点数](./basic_concepts#float) | `0.0` | 造成的饥饿消耗 |
| `scaling` | [字符串](./basic_concepts#string) | `when_caused_by_living_non_player` | `never`、`always` 或 `when_caused_by_living_non_player` |
| `effects` | [字符串](./basic_concepts#string) | `hurt` | `hurt`、`thorns`、`drowning`、`burning`、`poking` 或 `freezing` |
| `death_message_type` | [字符串](./basic_concepts#string) | `default` | `default`、`fall_variants` 或 `intentional_game_design` |

---

## 装备槽位组（Equipment Slot Group） {#equipment-slot-group}

**装备槽位组**（Equipment Slot Group）指定物品占用哪些装备槽位。它可以是单个槽位，也可以是一组槽位。

`EquipmentSlotGroup` 的合法值：

| 值 | 说明 |
|-------|-------------|
| `any` | 任意装备槽位 |
| `hand` | 任意一只手（主手或副手） |
| `armor` | 任意盔甲槽位 |
| `head` | 头部盔甲槽位 |
| `chest` | 胸部盔甲槽位 |
| `legs` | 腿部盔甲槽位 |
| `feet` | 脚部盔甲槽位 |
| `mainhand` | 仅主手 |
| `offhand` | 仅副手 |
| `body` | 身体槽位（马铠、狼铠等） |

---

## 文本组件（Text Component） {#text-component}

**文本组件**（Text Component）是 Minecraft 的富文本格式，用于消息、提示框和标题。它可以是普通字符串，也可以是复杂的 JSON 对象。

**简单字符串：**
```json
"message": "Hello World!"
```

**带样式的文本：**
```json
{
    "text": "Hello",
    "color": "gold",
    "bold": true
}
```

**可翻译文本：**
```json
{
    "translate": "origins.gui.choose_origin.title",
    "fallback": "Choose your Origin"
}
```

完整文档见 [Minecraft Wiki: Text component format](https://minecraft.wiki/w/Text_component_format)。

---

:::tip 
在本模组中，如果在需要文本组件的位置使用简单字符串，它会自动转换为以该字符串作为翻译键的可翻译文本组件。 

例如，`"message": "origins.gui.choose_origin.title"` 等价于：
```json
"message": {
    "translate": "origins.gui.choose_origin.title"
}
```
:::

## MobEffectInstance {#mobeffectinstance}

**MobEffectInstance** 定义施加于实体的状态效果。使用 `MobEffectInstance.CODEC` 序列化（1.21+）。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `id` | [标识符](./basic_concepts#identifier) | **必填** | 效果 ID（例如 `minecraft:speed`） |
| `duration` | [整数](./basic_concepts#integer) | **必填** | 以 tick 计的持续时间 |
| `amplifier` | [整数](./basic_concepts#integer) | `0` | 效果等级（0 = I 级，1 = II 级，以此类推） |
| `ambient` | [布尔值](./basic_concepts#boolean) | `false` | 粒子是否更透明 |
| `show_particles` | [布尔值](./basic_concepts#boolean) | `true` | 是否显示粒子 |
| `show_icon` | [布尔值](./basic_concepts#boolean) | `true` | 是否在 HUD 中显示图标 |
| `hidden_effect` | MobEffectInstance | 可选 | 嵌套的效果实例（用于不祥之兆等会连锁施加另一效果的场合） |

---

## 效果条目（EffectEntry） {#effectentry}

**EffectEntry** 是简化后的状态效果定义，用于某些能力类型（例如 `origins:stacking_status_effect`）。与 `MobEffectInstance` 不同，它省略了 `duration` 和 `hidden_effect` 字段。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `id` | [标识符](./basic_concepts#identifier) | **必填** | 效果 ID |
| `amplifier` | [整数](./basic_concepts#integer) | `0` | 效果等级 |
| `ambient` | [布尔值](./basic_concepts#boolean) | `false` | 粒子是否透明 |
| `show_particles` | [布尔值](./basic_concepts#boolean) | `true` | 是否显示粒子 |
| `show_icon` | [布尔值](./basic_concepts#boolean) | `true` | 是否显示效果图标 |
| `id` | [标识符](./basic_concepts#identifier) | **必填** | 效果 ID |
| `amplifier` | [整数](./basic_concepts#integer) | `0` | 效果等级 |
| `ambient` | [布尔值](./basic_concepts#boolean) | `false` | 该效果是否为环境效果 |
| `show_particles` | [布尔值](./basic_concepts#boolean) | `true` | 是否显示粒子 |
| `show_icon` | [布尔值](./basic_concepts#boolean) | `true` | 是否显示图标 |

## NBT 复合标签（NBT Compound） {#nbt-compound}

**NBT 复合标签**（NBT Compound）是某些能力类型中使用的简化 NBT 数据表示。它支持 byte、short、int、long、float、double、string、list 和 compound 等基础 NBT 类型。NBT 用于定义复杂的数据结构，例如物品数据或实体数据。

NBT 结构与类型的详情见 [Minecraft Wiki: NBT format](https://minecraft.wiki/w/NBT_format)。

## 粒子选项（Particle Option） {#particle-option}

**粒子选项**（Particle Option）是一种数据类型，用于在会生成粒子的能力中定义粒子参数。它包含粒子类型及其相关数据。

每种粒子类型所需的选项各不相同。粒子类型及其参数的详情见 [Minecraft Wiki: Particle Format](https://minecraft.wiki/w/Particle_format) 页面。

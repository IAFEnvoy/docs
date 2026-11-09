---
sidebar_position: 1
---

# 起源：模组兼容

起源：模组兼容是起源（NeoForge）的**数据驱动扩展**。它不添加独立的起源、物品、方块或菜单，而是注册额外的起源**动作类型**、**条件类型**、**能力类型**以及 Puffish Skills **奖励类型**，让数据包能够与受支持的模组交互。

模块在启动时被发现，仅当所有目标模组都已安装，且版本落在声明的闭区间 `minVersion` 与 `maxVersion` 范围内时才会启用。同时省略两个边界时只检查模组 ID。

:::caution 不稳定
下面列出的所有兼容功能都是新实现的，目前尚不稳定。它们可能发生变化，也可能出现异常行为。如遇问题请反馈。
:::

## 依赖

- [起源（NeoForge）](https://www.curseforge.com/minecraft/mc-mods/origins-neoforge)

不需要额外的兼容模组。安装受支持的模组后，对应模块会自动启用。

## 如何使用这些页面

下面的每个条目都是起源数据中使用的类型标识符。标题指明了它确切的数据种类：

- **Entity Action**（实体动作）或 **Bi-entity Action**（双实体动作）：对单个实体，或对动作执行者与目标这一对实体产生效果。
- **Entity Condition**（实体条件）或 **Item Condition**（物品条件）：求值为真或假。
- **Power**（能力）：为能力持有者提供持续生效的能力或行为。
- **Reward Type**（奖励类型）：由 Puffish Skills 的奖励使用，而不是直接用在起源能力中。

把该标识符用作兼容起源 JSON 字段中的 `type` 值。例如，Mermod 的尾巴能力可以这样声明：

```json
{
  "type": "origins_integration:tail"
}
```

动作和条件不是独立文件：请把它们放进起源能力或其他起源类型提供的兼容动作或条件字段中。

## 兼容列表

✅ 完全支持  
🚧 部分支持  
🔮 计划支持  
❌ 暂无支持计划

| 模组 | 兼容内容 | 状态 |
| --- | --- | :---: |
| [新生魔艺](./ars-nouveau) | 用于法力、法术和符文的实体动作、实体条件与能力 | ✅ |
| [冷汗](./cold-sweat) | 玩法兼容：免疫火焰的起源不会过热 | 🚧 |
| [机械动力](./create) | 玩法兼容：潜水装备为在陆地上的鳃呼吸起源供氧 | 🚧 |
| [Curios API](./curios) | 实体动作、实体条件与一个物品条件 | ✅ |
| [Eidolon RePraised](./eidolon-repraised) | 实体动作、一个双实体动作与一个能力 | ✅ |
| [伊卡洛斯之翼](./icarus) | 虚拟翅膀的能力类型 | ✅ |
| [铁魔法](./irons-spellbooks) | 用于法力和施法的实体动作、实体条件与能力 | ✅ |
| [Mermod](./mermod) | 无需装备的人鱼尾巴能力类型 | ✅ |
| [MineTeam](./mine-team) | 双实体动作 | ✅ |
| [More Darkness](./more-darkness) | 玩法兼容：猫族夜视会被识别 | 🚧 |
| [Puffish Skills](./puffish-skills) | 授予起源能力的奖励类型 | ✅ |
| [暮色森林](./twilight-forest) | 用于坚固化与 Ice Queen 护盾的实体动作 | ✅ |
| [True Darkness Biomes](./true-darkness-biomes) | 玩法兼容：猫族夜视会被识别 | 🚧 |
| [Wood Walkers](./wood-walkers) | 用于形态与形态能力的实体动作和实体条件 | ✅ |

在上方选择一个兼容页面，或使用侧边栏查看其注册的起源数据类型和字段。

---
sidebar_position: 2
---

# 架构概览

本页说明模组内部的整体结构，以便你在代码库中导航。

## 项目结构 {#project-structure}

```
src/main/java/com/iafenvoy/origins/
├── data/
│   ├── action/         # Entity, Block, Item, Bi-entity action types
│   ├── badge/          # Badge system
│   ├── condition/      # Entity, Block, Item, Bi-entity, Damage, Biome, Fluid conditions
│   ├── layer/          # Layer registry and data
│   ├── origin/         # Origin registry and data
│   └── power/          # Power registry, base classes, built-in powers
│       ├── builtin/
│       │   ├── action/     # Action-triggered powers
│       │   ├── modify/     # Stat/damage modifier powers
│       │   ├── prevent/    # Blocking powers
│       │   └── regular/    # Standalone powers
│       └── component/      # Reusable power components (active, cooldown, toggle, resource, etc.)
├── registry/           # Block, item, entity, recipe registrations
├── attachment/         # Player data storage (OriginDataHolder)
├── command/            # In-game commands
├── config/             # Mod configuration
├── network/            # Network packet handling
└── render/             # Client-side rendering
```

## 注册表系统 {#registry-system}

Origins 使用原版的 **DataPack Registry**（数据包注册表）系统。共有两类：

| 类型 | 示例 | 加载来源 |
|------|----------|-------------|
| **内置**（codec 注册表） | 动作类型、条件类型、能力类型 | Java 代码中的 `DeferredRegister` |
| **动态**（数据包注册表） | 起源、起源层、能力、徽章 | `data/<ns>/origins/<type>/` 下的 JSON 文件 |

动态注册表在 `OriginsRegistries.newDatapackRegistries()` 中声明。每个注册表都有一个 `ResourceKey`：
- `origins:origin` → `OriginRegistries.ORIGIN_KEY`
- `origins:layer` → `LayerRegistries.LAYER_KEY`
- `origins:power` → `PowerRegistries.POWER_KEY`
- `origins:badge` → `BadgeRegistries.BADGE_KEY`

## 能力生命周期 {#power-lifecycle}

当能力被授予玩家时：

1. 调用 `Power.grant(holder)`。授予是批处理的：对于一个完整起源（或一个 `MultiplePower` 及其子能力），能力会先被注册，只有整个授予批次完成后才被 **tick** 一次。
2. 随后调用 `Power.tick(holder)`（每个批次一次）。如果满足 `condition` 字段，能力会通过 `Power.active(holder)` 变为**激活**状态。
3. 在 `Power.tickInterval()`（默认值为 1）定义的间隔上，`Power.tick(holder)` 持续运行。
4. 如果条件变为 false，触发 `Power.inactive(holder)`。
5. 当能力被撤销时，触发 `Power.revoke(holder)`。

:::note
由于激活被推迟到授予批次结束时，能力可以安全地引用同一起源中的另一个能力（例如资源能力），即使该能力在 `powers` 列表中声明得更晚。批次中的所有能力都会在任何一个被 tick 之前注册完成。
:::

**组件**（`ActiveComponent`、`CooldownComponent`、`ToggleComponent`、`ResourceComponent`、`InventoryComponent`、`EntitySetComponent`）挂载在每个能力实例上，并持久保存运行时状态。

## 添加自定义类型 {#adding-custom-types}

添加新的**能力类型**：

1. 继承 `com.iafenvoy.origins.data.power.Power`。
2. 通过 `codec()` 提供 `MapCodec`。
3. 通过 `DeferredRegister` 在 `PowerRegistries.POWER_TYPE` 上注册它。

添加新的**条件**或**动作**：

1. 实现相应的接口（`EntityCondition`、`BlockCondition`、`EntityAction` 等）。
2. 提供一个 `MapCodec`。
3. 通过 `ConditionRegistries` 或 `ActionRegistries` 注册。

## 依赖说明 {#dependencies-explanation}

- **[Jupiter](../../../../library/jupiter)**：配置库。
- **Additional Entity Attributes** *（JIJ）*：提供更多实体属性（例如熔岩视觉），并取代了部分能力类型。
- **Caelus** *（JIJ）*：为滑翔飞行相关能力提供属性支持与更好的能力处理。
- **Integration** *（JIJ）*：提供与其他模组更好的兼容性和入口点。

## 与 Fabric 版本的差异 {#differences-from-the-fabric-version}

这个 NeoForge 移植版把过去各自独立的库（Apoli、Calio）合并为一个模组。命名空间从 `apoli`/`calio` 改为 `origins`。数据路径结构使用 NeoForge 的 DataPack Registry 系统，而不是 Fabric 的自定义加载。

类名和类型 ID 大多与 Fabric 版本一致，但请始终查阅源码，而不要假定它们完全相同。

**关于如何从 Fabric 移植到 NeoForge，见[本指南](../porting)。**

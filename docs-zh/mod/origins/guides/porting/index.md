---
sidebar_position: 3
---

# 从 Fabric 移植到 NeoForge

本文说明原版 Fabric 版本（Apace100/origins-fabric）与 NeoForge 重写版（IAFEnvoy/Origins-NeoForge）之间的差异。你可以用它把现有的数据包、扩展模组或文档从 Fabric 版本转换为 NeoForge 版本。

:::info
你可以尝试使用[自动转换器](./converter)来完成数据包的自动转换，但务必仔细检查输出，并根据本指南列出的差异进行必要的手动调整。
:::

---

## 数据路径变化 {#data-path-changes}

所有 JSON 文件都从自定义路径迁移到**原版数据包注册表（DataPack Registry）**路径。

| 内容 | Fabric 路径 | NeoForge 路径 |
|---------|------------|---------------|
| 起源 | `data/<ns>/origins/` | `data/<ns>/origins/origin/` |
| 能力 | `data/<ns>/powers/` | `data/<ns>/origins/power/` |
| 起源层 | `data/<ns>/origin_layers/` | `data/<ns>/origins/layer/` |
| 徽章 | （Fabric 中不存在） | `data/<ns>/origins/badge/` |
| 全局能力集 | `data/<ns>/global_powers/` | `data/<ns>/origins/global_powers/` |

> **操作：** 移动文件，并加上注册表子目录（`origin/`、`power/`、`layer/`、`badge/`）。

---

## 起源 JSON 变化 {#origin-json-changes}

| 字段 | 状态 | 备注 |
|-------|--------|-------|
| `name` | 改为可选 | 更推荐使用翻译键 `origin.<ns>.<path>.name` |
| `description` | 改为可选 | 更推荐使用翻译键 `origin.<ns>.<path>.description` |
| `loading_priority` | :x: 已移除 | 数据包现在按优先级自然覆盖 |
| `powers` | 已改变 | 现在支持 `#tag` 引用。**优先使用 `#tag`，而不是逐个列出能力 ID** |
| `icon` | 已改变 | 从 Item+Damage+NBT 改为 `{"id": "minecraft:feather"}` |
| `order` | 已改变 | 默认值从 `0` 改为 `Integer.MAX_VALUE` |
| `impact` | 未变 | 0=None，1=Low，2=Medium，3=High |
| `unchoosable` | 未变 | |
| `upgrades` | 未变 | |

> **操作：** 从所有起源 JSON 中移除 `name`/`description`/`loading_priority`。改为通过语言文件添加 `name`/`description`。把 `icon` 更新为新的 `{"id": "..."}` 格式。尽可能在 `powers` 中使用 `#tag` 引用，而不是逐个列出能力 ID。

---

## 起源层 JSON 变化 {#layer-json-changes}

| 字段 | 状态 | 备注 |
|-------|--------|-------|
| `replace` | :x: 已移除 | 使用数据包覆盖行为 |
| `name` | 改为可选 | 更推荐使用翻译键 `layer.<ns>.<path>.name` |
| `missing_name` | :x: 已移除 | 不再需要 |
| `missing_description` | :x: 已移除 | 不再需要 |
| `origins` | 已改变 | 现在支持 `#tag` 引用。**优先使用 `#tag`，而不是逐个列出起源 ID** |
| `gui_title.choose_origin` | 已重命名 | 原本是顶层的 `choose_origin`；现在嵌套在 `gui_title` 下 |
| `gui_title.view_origin` | 已重命名 | 原本是顶层的 `view_origin`；现在嵌套在 `gui_title` 下 |
| `order` | 未变 | |
| `enabled` | 未变 | |
| `allow_random` | 未变 | |
| `hidden` | 未变 | |
| `auto_choose` | 未变 | |
| `default_origin` | 未变 | |
| `allow_random_unchoosable` | 未变 | |
| `exclude_random` | 未变 | |

> **操作：** 把 `choose_origin`/`view_origin` 移到 `gui_title` 下。移除 `replace`/`name`/`missing_name`/`missing_description`。尽可能在 `origins` 中使用 `#tag` 引用，而不是逐个列出起源 ID。

---

## 能力 JSON 变化 {#power-json-changes}

| 字段 | 状态 | 备注 |
|-------|--------|-------|
| `hidden` | 未变 | |
| `condition` | 未变 | 实体条件 |
| `loading_priority` | 未变 | |
| `badges` | 未变 | 支持内联 `{badge}` 对象 |
| `type` | 未变 | 能力类型 ID |

> **操作：** 能力 JSON 基本兼容。通过 `power.<ns>.<path>.name` / `.description` 键翻译能力名称和描述。

### `origins:multiple` — 保留单文件中的子能力 {#originsmultiple--split-into-individual-files}

NeoForge **支持 `origins:multiple`**，可以在同一个 JSON 文件中组合多个子能力。移植时保留原有组合结构即可。

每个子能力直接作为 `origins:multiple` 对象中的具名字段，其值为完整的能力定义。保留字段与示例见 [`origins:multiple` 参考文档](../../types/power/regular.md#originsmultiple)。

> **操作：** 将整个能力文件从 `data/<ns>/powers/` 移至 `data/<ns>/origins/power/`。在起源的 `powers` 字段或能力 `#tag` 中保留父能力 ID，并按本指南检查各子能力的字段、条件和动作是否需要调整。

---

## 已移除的条件类型 {#removed-condition-types}

| Fabric 类型 | 在 NeoForge 中的状态 | 备注 |
|-------------|-------------------|-------|
| `origins:command` | :x: 已移除 | |
| `origins:entity_group` | :warning: 作为能力重新引入 | `origins:entity_group` 现在提供有限的战斗组兼容性；通用类型标签检查请使用 `origins:in_tag` |
| `origins:category`（生物群系） | :x: 已移除 | 1.21.1 不再有生物群系类别，请改用 `origins:in_tag` |
| `origins:high_humidity`（生物群系） | :x: 已移除 | 1.21.1 不再有湿度条件，请改用 `origins:in_tag` |
| `origins:owner`（双实体） | :x: 已移除 | 后续会添加 |

---

## 新特性 {#new-features}

| 特性 | 备注 |
|---------|-------|
| **数据包注册表系统** | 所有 Origins JSON 都使用原版数据包注册表 |
| **能力标签** | 在起源的 `powers` 和起源层的 `origins` 中引用 `#tag` |
| **徽章注册表** | 徽章使用位于 `origins:badge` 的原版注册表 |
| **内联徽章定义** | 能力中的 `badges` 可以接受内联 `{badge}` 对象 |
| **ColorSettings** | `red`/`green`/`blue`/`alpha` 浮点数，外加单个 `color` 十六进制整数 |

---

## 关键 API 差异 {#key-api-differences}

| Fabric（Apoli）API | NeoForge API |
|--------------------|--------------|
| `PowerTypeRegistry` | 通过 `Registry` 访问 `PowerRegistries.POWER_KEY` |
| `OriginsRegistry` | `OriginRegistries.ORIGIN_KEY` |
| `OriginLayerRegistry` | `LayerRegistries.LAYER_KEY` |
| `OriginsAPI` | 以 attachment 形式使用 `OriginDataHolder.get(entity)` |
| `PowerType` 接口 | 带 `MapCodec` 的 `Power` 抽象类 |
| `PowerHolderComponent` | `OriginDataHolder`（NeoForge attachment） |
| `PowerTypeRegistry#register` | `BuiltInRegistries` + DeferredRegister 模式 |

> **操作：** 对于面向 NeoForge 的 Java 扩展模组，从 Apoli 的 `PowerTypeRegistry` 移植到 NeoForge 的 `DeferredRegister<MapCodec<? extends Power>>` 模式。

---

## AI 移植提示词 {#ai-porting-prompt}

在把 Fabric Origins 数据包转换为 NeoForge 版本时，使用以下提示词：

```
You are porting an Origins Fabric data pack to the NeoForge version (IAFEnvoy/Origins-NeoForge).

Changes to apply:
1. Move all JSON files to datapack registry paths:
   - origin JSONs: data/<ns>/origins/ → data/<ns>/origins/origin/
   - power JSONs: data/<ns>/powers/ → data/<ns>/origins/power/
   - layer JSONs: data/<ns>/origin_layers/ → data/<ns>/origins/layer/
2. Remove from Origin JSONs: name, description, loading_priority.
   Add translations to language file: "origin.<ns>.<id>.name" and ".description".
3. Remove from Layer JSONs: replace, name, missing_name, missing_description.
   Move choose_origin/view_origin under a new "gui_title" object.
   Add translations: "layer.<ns>.<id>.name".
   Use #tag references in origins instead of listing individual origin IDs.
4. Update icon format: old "item"/"damage"/"nbt" → new {"id": "minecraft:..."}
   Use #tag references in powers instead of listing individual power IDs.
5. Keep origins:multiple powers in one JSON file with named sub-power fields.
   Port each sub-power's fields, conditions, and actions as needed.
6. Replace removed condition types (command, category, high_humidity, owner) with equivalent alternatives or JS scripts. `entity_group` is available again as a limited power, not a condition.
7. Check the porting guide at porting.md for the full list of differences.
```

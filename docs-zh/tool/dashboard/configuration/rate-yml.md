---
sidebar_position: 6
title: rate.yml
description: 维护难度评分系数
---

# rate.yml

控制维护难度的评分系数。难度会**计算并缓存在 `data/mods.db`** 中：

```
Codacy base score = Codacy score (0 is treated as 0.1)

Architecture coefficient = Σ(values matched in rate.yml) ÷ total declared architectures
Version bonus (per MC version) = loader multiplier × (Σ status values across that version's loaders ÷ loader count)
                                loader multiplier: 1 loader = 1; multiple loaders = multi_loader_multiplier
Version coefficient = 1 + Σ(version bonus across all MC versions)

Final difficulty = (Codacy base score + Architecture coefficient) × Version coefficient
```

## 完整示例

```yaml
version:
  All: 0.075       # Fully supported
  Partly: 0.05     # Partial support
  BugFix: 0.025    # Bug fixes only
  Planned: 0.04    # Planned

architecture:
  Fabric-Loom: 0.5
  ModDevGradle: 0.5
  Architectury-Loom: 2
  Stonecutter: 0.8

multi_loader_multiplier: 1.2
```

## 字段参考

### version

每种支持状态的加分，按 MC 版本 × 加载器的组合逐项应用。

| 状态 | 默认值 | 含义 |
|--------|---------|---------|
| `All` | `0.075` | 完全支持 |
| `Partly` | `0.05` | 部分支持 |
| `BugFix` | `0.025` | 仅修复 Bug |
| `Planned` | `0.04` | 计划支持但尚未发布 |

### architecture

每种架构的系数。如果模组声明了多种架构，则把在 `rate.yml` 中匹配到的系数求和，再除以声明的架构总数（未匹配的条目按 `0` 计）。

| 架构 | 默认值 | 说明 |
|--------------|---------|-------------|
| `Fabric-Loom` | `0.5` | 标准 Fabric 构建 |
| `ModDevGradle` | `0.5` | 标准 NeoForge 构建 |
| `Architectury-Loom` | `2` | 多平台构建（复杂度更高） |
| `Stonecutter` | `0.8` | 多版本构建工具 |

### multi_loader_multiplier

当同一个 MC 版本支持多个加载器时使用的乘数。默认 `1.2`。

## 计算示例

某个模组：

- Codacy 评分：`1.5`
- 一种架构：`Architectury-Loom`（系数 2.0 → 架构系数 = 2.0）
- 一个 MC 版本支持 3 个加载器，状态全部标记为 `All`

该版本的版本加分：

- 状态合计 = 0.075 × 3 = 0.225
- ÷ 3 个加载器 = 0.075
- × multi_loader_multiplier 1.2 = 0.09

最终难度：

```
(1.5 + 2.0) × (1 + 0.09) = 3.5 × 1.09 ≈ 3.8
```

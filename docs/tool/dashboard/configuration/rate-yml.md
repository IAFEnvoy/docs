---
sidebar_position: 6
title: rate.yml
description: Maintenance difficulty scoring coefficients
---

# rate.yml

Controls the maintenance difficulty scoring coefficients. The difficulty is **computed and cached in `data/mods.db`**:

```
Codacy base score = Codacy score (0 is treated as 0.1)

Architecture coefficient = Σ(values matched in rate.yml) ÷ total declared architectures
Version bonus (per MC version) = loader multiplier × (Σ status values across that version's loaders ÷ loader count)
                                loader multiplier: 1 loader = 1; multiple loaders = multi_loader_multiplier
Version coefficient = 1 + Σ(version bonus across all MC versions)

Final difficulty = (Codacy base score + Architecture coefficient) × Version coefficient
```

## Full Example

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

## Field Reference

### version

Bonus per support status, applied per MC version × loader combination.

| Status | Default | Meaning |
|--------|---------|---------|
| `All` | `0.075` | Fully supported |
| `Partly` | `0.05` | Partial support |
| `BugFix` | `0.025` | Bug fixes only |
| `Planned` | `0.04` | Planned but not released |

### architecture

Coefficient per architecture. If a mod declares several architectures, the coefficients of those found in `rate.yml` are summed and divided by the total number of declared architectures (unmatched entries count as `0`).

| Architecture | Default | Description |
|--------------|---------|-------------|
| `Fabric-Loom` | `0.5` | Standard Fabric build |
| `ModDevGradle` | `0.5` | Standard NeoForge build |
| `Architectury-Loom` | `2` | Multi-platform build (higher complexity) |
| `Stonecutter` | `0.8` | Multi-version build tool |

### multi_loader_multiplier

Multiplier used when a single MC version supports more than one loader. Default `1.2`.

## Calculation Example

A mod with:

- Codacy score: `1.5`
- One architecture: `Architectury-Loom` (coefficient 2.0 → architecture coefficient = 2.0)
- One MC version supporting 3 loaders, all marked `All`

Version bonus for that version:

- status total = 0.075 × 3 = 0.225
- ÷ 3 loaders = 0.075
- × multi_loader_multiplier 1.2 = 0.09

Final difficulty:

```
(1.5 + 2.0) × (1 + 0.09) = 3.5 × 1.09 ≈ 3.8
```

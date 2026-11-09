---
title: 龙息类型 JSON
sidebar_position: 3
---

# 龙息类型 JSON

龙息类型定义龙息的颜色渐变、基础伤害、着火时长、粒子密度以及附加的状态效果。

## 文件位置

将文件放入 `data/<namespace>/dragon_breath_type/` 目录。例如：

```text
data/example/dragon_breath_type/frost.json
```

该文件的注册表 ID 为 `example:frost`，可以在纯种龙的根级 `breath_type` 字段中引用。

## 字段

| 字段 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `colors` | Hex color string array | `[]` | 龙息渐变颜色，不含 `#`。 |
| `damage` | Float | `2.0` | 每次命中的基础伤害。 |
| `fire_time` | Integer | `0` | 目标被点燃的时长，单位为刻。`0` 表示不附加着火效果。 |
| `particle_density` | Integer | `3` | 龙息粒子密度。 |
| `effects` | Effect array | `[]` | 命中时可能施加的状态效果。 |

### 效果对象

| 字段 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `effect` | Status effect ID | **必填** | 例如 `minecraft:slowness`。 |
| `duration` | Integer | **必填** | 效果持续时间，单位为刻。 |
| `amplifier` | Integer | `0` | 效果等级，从 `0` 开始。 |
| `chance` | Float | `1.0` | 施加概率，通常介于 `0.0` 与 `1.0` 之间。 |

## 示例

```json
{
  "colors": ["b8efff", "4e91d9", "d8f3ff"],
  "damage": 3.5,
  "particle_density": 4,
  "effects": [
    {
      "effect": "minecraft:slowness",
      "duration": 100,
      "amplifier": 1,
      "chance": 0.75
    }
  ]
}
```

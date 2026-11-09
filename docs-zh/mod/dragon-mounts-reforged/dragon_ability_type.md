---
title: 龙能力类型 JSON
sidebar_position: 4
---

# 龙能力类型 JSON

`dragon_mounts:dragon_ability_type` 注册表不加载独立的数据包文件。能力对象放在纯种龙的 `abilities` 数组中，并通过其必填的 `type` 字段分发。

## 基本格式

```json
{
  "type": "dragon_mounts:frost_walker",
  "level": 2
}
```

所有内置能力都使用 `dragon_mounts` 命名空间。没有额外参数的能力只需要 `type` 字段。

## 内置能力

| `type` | 参数 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `fire_proof` | `range` (integer), `duration` (integer) | `10`, `40` | 为附近的主人提供抗火效果。 |
| `hot_feet` | `footprint_chance` (float) | `0.05` | 移动时留下燃烧的脚印。 |
| `ember_aura` | `range` (float), `fire_ticks` (integer) | `10.0`, `4` | 点燃附近的敌对生物。 |
| `infernal_pact` | `protect_dragon`, `protect_rider` (boolean) | 均为 `true` | 阻止相关的敌对生物（例如烈焰人）将龙或骑手作为目标。 |
| `frost_walker` | `level` (integer) | `1` | 为龙施加冰霜行者效果。 |
| `frost_aura` | `range` (float), `duration`, `amplifier` (integer) | `10.0`, `100`, `1` | 对附近的敌对生物施加缓慢。 |
| `nature_blessing` | `range`, `duration` (integer) | `10`, `40` | 为附近的主人提供生命恢复。 |
| `camouflage` | `range` (float) | `5.0` | 使龙与骑手不会被远处的目标选择发现。 |
| `aquatic_grace` | `duration`, `range` (integer) | `400`, `0` | 当龙在水中时为主人提供夜视。 |
| `swift_swim` | `range`, `duration`, `amplifier` (integer) | `2`, `40`, `1` | 在水中为龙与主人提供海豚的恩惠。 |
| `floral_trail` | `footprint_chance` (float), `grass_light_threshold` (integer) | `0.05`, `4` | 移动时生成草、花和蘑菇。 |
| `ender_cloak` | `range` (float) | `32.0` | 防止附近的主人或骑手激怒末影人。 |
| `void_walker` | `range` (float) | `5.0` | 防止附近的主人受到摔落伤害。 |
| `gem_guard` | `deflect_chance` (float) | `0.25` | 有概率弹开弹射物。 |
| `crystal_harmony` | `protection_chance` (float) | `0.1` | 有概率防止龙或骑手受到伤害。 |
| `echo_sense` | `range` (float), `duration` (integer) | `20.0`, `80` | 使附近的敌对生物发光。 |
| `ethereal_harmony` | `protect_dragon`, `protect_rider` (boolean) | 均为 `true` | 阻止亡灵生物将龙或骑手作为目标。 |
| `quick_flight` | `flying_speed_bonus` (float) | `0.0` | 增加飞行速度属性。 |

## 示例

```json
{
  "abilities": [
    {
      "type": "dragon_mounts:fire_proof",
      "range": 16,
      "duration": 100
    },
    {
      "type": "dragon_mounts:quick_flight",
      "flying_speed_bonus": 0.08
    },
    {
      "type": "dragon_mounts:ender_cloak"
    }
  ]
}
```

:::tip
所有参数都是可选的。只提供 `type` 时使用上表列出的 Codec 默认值。
:::

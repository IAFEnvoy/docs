---
title: Dragon Ability Type JSON
sidebar_position: 4
---

# Dragon Ability Type JSON

The `dragon_mounts:dragon_ability_type` registry does not load standalone data-pack files. Ability objects are placed in a purebred dragon's `abilities` array and dispatched by their required `type` field.

## Basic Format

```json
{
  "type": "dragon_mounts:frost_walker",
  "level": 2
}
```

All built-in abilities use the `dragon_mounts` namespace. An ability with no additional parameters only needs its `type` field.

## Built-in Abilities

| `type` | Parameters | Defaults | Summary |
| --- | --- | --- | --- |
| `fire_proof` | `range` (integer), `duration` (integer) | `10`, `40` | Gives fire resistance to the nearby owner. |
| `hot_feet` | `footprint_chance` (float) | `0.05` | Leaves fiery footprints while moving. |
| `ember_aura` | `range` (float), `fire_ticks` (integer) | `10.0`, `4` | Sets nearby hostile mobs on fire. |
| `infernal_pact` | `protect_dragon`, `protect_rider` (boolean) | both `true` | Prevents relevant hostile mobs, such as blazes, from targeting the dragon or rider. |
| `frost_walker` | `level` (integer) | `1` | Applies the Frost Walker effect to the dragon. |
| `frost_aura` | `range` (float), `duration`, `amplifier` (integer) | `10.0`, `100`, `1` | Applies Slowness to nearby hostile mobs. |
| `nature_blessing` | `range`, `duration` (integer) | `10`, `40` | Gives Regeneration to the nearby owner. |
| `camouflage` | `range` (float) | `5.0` | Hides the dragon and rider from distant target selection. |
| `aquatic_grace` | `duration`, `range` (integer) | `400`, `0` | Gives Night Vision to the owner while the dragon is in water. |
| `swift_swim` | `range`, `duration`, `amplifier` (integer) | `2`, `40`, `1` | Gives Dolphin's Grace to the dragon and owner in water. |
| `floral_trail` | `footprint_chance` (float), `grass_light_threshold` (integer) | `0.05`, `4` | Grows grass, flowers, and mushrooms while moving. |
| `ender_cloak` | `range` (float) | `32.0` | Prevents nearby owners or riders from angering endermen. |
| `void_walker` | `range` (float) | `5.0` | Prevents fall damage for nearby owners. |
| `gem_guard` | `deflect_chance` (float) | `0.25` | Has a chance to deflect projectiles. |
| `crystal_harmony` | `protection_chance` (float) | `0.1` | Has a chance to prevent damage to the dragon or rider. |
| `echo_sense` | `range` (float), `duration` (integer) | `20.0`, `80` | Makes nearby hostile mobs glow. |
| `ethereal_harmony` | `protect_dragon`, `protect_rider` (boolean) | both `true` | Prevents undead mobs from targeting the dragon or rider. |
| `quick_flight` | `flying_speed_bonus` (float) | `0.0` | Adds to the flying speed attribute. |

## Example

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
Every parameter is optional. Supplying only `type` uses the Codec defaults listed above.
:::

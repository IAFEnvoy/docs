---
title: "Adapting Origins data"
sidebar_position: 5
---

When converting Origins-NeoForge 1.21.1 actions or conditions to Saturn data for Minecraft 26.1.2, check type names, fields and context. Saturn reuses generic capabilities that can operate independently, but is not a direct Origins datapack compatibility layer and does not require Origins to be installed.

Complete fields, defaults, JSON examples and behavior notes are maintained in the [action and condition type reference](../types/index.md). This page covers equivalent types and adaptation limits between the two formats.

## Reusing existing capabilities

| Scope | Origins type | Saturn equivalent | Difference |
| --- | --- | --- | --- |
| Action composition | `and` | `sequence` | Action arrays also execute in sequence. |
| Entity action | `add_xp` | `add_experience` | Use points and levels fields. |
| Entity action | `fire_projectile` | `spawn_projectile` | Keep Saturn’s fields and activation context. |
| Entity action | `block_action_at` | `block_action` | Runs at the activation position; nested field is action. |
| Bi-entity action | `source_action` | `actor_action` | Runs an entity action on actor. |
| Block action | `add_block` | `set_block` | Uses Saturn’s block state definition. |
| Block action | `destroy` | `break_block` | Reuses existing block breaking. |
| Block action | `absolute_offset` | `offset` | Uses x, y and z offsets. |
| Item action | `consume` | `consume_item` | The field is count, not amount. |
| Item action | `damage` | `damage_item` | Keeps existing durability handling. |
| Item action | `merge_component` | `merge_components` | Keeps Saturn’s component patches. |
| Entity condition | `in_tag` | `entity_tag` | Block and item contexts use block_tag and item_tag. |
| Entity condition | `xp_levels` / `xp_points` | `experience_level` / `experience_points` | Uses comparison and compare_to. |
| Entity condition | `biome_in` | `on_block` + `biome_tag` | Compose block and biome checks; no extra BiomeCondition registry. |
| Entity condition | `ability` | `player_ability` | Distinguishes vanilla player flags from Saturn Ability skills. |
| Damage condition | `id` / `type` | `damage_type` | The field is damage_type. |
| Damage condition | `in_tag` | `damage_type_tag` | Uses existing damage type tags. |
| Delay | `delay` | timeline 的 `idle` / timeline `idle` | Use existing timelines instead of adding a global Timeout queue. |

## Adaptation differences

- Reuses Saturn’s four Action and five Condition families and MapCodec dispatch registries under the saturn namespace, without adding a separate execution framework.
- Numeric inputs use NumberProvider; comparisons use comparison and compare_to. Nested actions and conditions retain the parent formula, activation origin and extension data.
- side tests the logical level side, so an integrated server is a server. Commands, advancements, statistics, menus, vanilla predicates and inventory writes use server APIs. No client class references or new accessors/mixins are added.
- for_range and while use max_iterations per invocation, defaulting to 1024. for_range caps the count; while throws if its condition is still true after the limit, without rolling back previous actions.
- Inventories use vanilla command slot IDs, names and ranges. The selected hotbar slot and main-hand alias are deduplicated. Power inventories are excluded, and modify_inventory executes once per slot rather than retaining Origins’ process_mode iteration semantics.
- Shapes measure distances relative to the centre, correcting cube-axis signs and entity absolute-coordinate checks. Block positions are enumerated lazily. attachable tests the supporting face at the adjacent block’s actual position.
- grant_advancement and revoke_advancement with selection set to everything operate on the entire advancement registry, rather than only the referenced tree. The advancement field remains required but is ignored in this mode.
- fluid_height references a NeoForge FluidType, such as minecraft:water; submerged_in accepts a fluid ID and checks the eyes against its FluidType.

This is a port of capabilities, not a direct Origins datapack compatibility layer. Check the Saturn type page for fields even when a type ID is unchanged.

## Unsupported Origins types

| Scope | Reason or alternative |
| --- | --- |
| Power, Origin, entity sets and ResourceReference-dependent types | Depend on Origins runtime state. Saturn has its own Ability, Resource and DataStorage APIs. |
| elytra_flight_possible | Depends on Caelus; no additional required dependency is introduced. |
| using_effective_tool | Directly reads client mining state and game-mode internals; requires an additional side-safe state contract. |
| modify_death_ticks and modify_attack_cooldown | Depend on internal fields or accessors; this port adds no new mixins. |
| variable_execute_command | Depends on ResourceReference; use execute_command for ordinary commands. |
| Item loot-modifier modify | ItemActionContext currently supports in-place ItemStack changes, without a reliable channel to write back a replacement item type. |
| drop_inventory, replace_entity, random_teleport, raycast and entity explode | Involve additional stack write-back, entity copying, collision or ray behavior. No equivalent types are currently provided; region_apply handles region actions, and the block family already has explode. |
| moving | Depends on MovingEntity mixin state in Origins, which Saturn does not provide. |
| distance_from_coordinates | Requires spawn, dimension-scaling and precision contracts; there is currently no equivalent type. |

## Source

Adapted from [Origins-NeoForge](https://github.com/IAFEnvoy/Origins-NeoForge), primarily data/action/builtin, data/condition/builtin and supporting utilities, to Saturn contexts, Codecs and Minecraft 26.1.2 APIs. Installing Origins is not required.


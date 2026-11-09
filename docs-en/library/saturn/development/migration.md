---
title: "Integration and Migration"
sidebar_position: 4
---

> **What this document answers**: which part of MiXianTu was copied into Saturn, what shape it took, and what MiXianTu has to change later on.
> **Baseline**: the current Saturn working tree (`gradlew.bat compileJava` passes); the MiXianTu side is still unchanged and uses `com.iafenvoy.mxt`.
> **Not verified**: no GameTest run, no in-game test, no data pack loaded; this round only got as far as "it compiles".

---

## 0. Current state

| Item | Count |
|---|---|
| Java files | 547 (498 copied, 49 newly written on the Saturn side), 23,325 lines in total |
| Built-in registry entries | Registered (full table in §5); `regen` / `aura_pulse` and the content trigger signals are not ported |
| lang | `assets/saturn/lang/{zh_cn,en_us}.json`, 81 entries |
| KubeJS | `compileOnly` (`26.1.2-8.0.4`); the plugin plus 5 groups of common bindings are ported, content bindings and trigger bindings stay in the main mod |
| Commands | one `/saturn` tree (§3 item 15) |
| Abilities and triggers | Runtime, built-in ability types (10 kinds), common events, AbilityHooks, Sources and EntityTickStages are all present; word/storage/light_control and CultivationTriggerService stay on the content side |
| Compilation | `gradlew.bat compileJava` **passes** |
| Per-file rename map | [RENAME-TABLE.md](rename-table.md) |

Saturn is a **pure code library**: no built-in definitions (JSON) and no test package. Registries, entries, language files, the HUD (including the edit key bindings), commands and the script bridge are in place; `aura`, the entire wheel, quality, and the profiler UI and networking are explicitly out of scope.

---

## 1. One-time rename (D1: ids unified as `saturn`)

| Item | Old (MiXianTu) | New (Saturn) |
|---|---|---|
| Mod id / registry namespace | `mxt` | `saturn` |
| Java package | `com.iafenvoy.mxt` | `com.iafenvoy.saturn` |
| Class name prefix | `Mxt*` | `Saturn*` |
| Main class | `MiXianTu` (`MiXianTu.MOD_ID`) | `Saturn` (`Saturn.MODID`; `MOD_ID` is an alias with the same value) |
| Code registry ids | `mxt:entity_action_type` and 22 others, 23 in total | `saturn:*` |
| Registry default entry ids | `mxt:no_op` / `mxt:always` / `mxt:constant` / `mxt:empty` / `mxt:missing` / `mxt:self` / `mxt:self_hud` / `mxt:use` / `mxt:resource` (cost) | `saturn:*` |
| Data pack registry ids | `mxt:resource` / `mxt:ability` / `mxt:trigger` / `mxt:incomplete` | `saturn:*` |
| Data file directory | `data/<namespace>/mxt/<registry>/<entry>.json` | `data/<namespace>/saturn/<registry>/<entry>.json` |
| lang key prefix | `mxt.*` | `saturn.*` |
| Attachment ids | `mxt:resource_holder` / `mxt:ability_holder` | `saturn:*` |
| UI entry points | `key.mxt.*` / `screen.mxt.*` / `hud.mxt.*`; the wheel's `key.mxt.wheel*` and `wheel.mxt.*` are left untouched | `key.saturn.*` (`hud_layout` only) / `screen.saturn.*` / `hud.saturn.*` |
| Context extension key | `mxt:origin` | `saturn:origin` |
| HUD layout file | `config/<modid>/mxt-hud.json` | `config/saturn/hud.json` |

**Data file paths follow the namespace of the registry key only, not the entry id.** An entry can still be called `mxt:my_action`, but its file must live under `data/<package>/saturn/entity_action_type/`. Directories MiXianTu has to move: 27 bundled JSON files (`src/main/resources/data/mxt/mxt/**`) plus 392 fixtures in the test pack (`src/test-mod/resources/data/mxt_test/mxt/**`).

---

## 2. API changes

### 2.1 Removed (because aura does not go into the library)

| Removed item | Original location | What MiXianTu does |
|---|---|---|
| `Costs` (`validateAuras` / `auras(...)`) | `data/cost/Costs.java` | Kept in MiXianTu, replaced with its own class |
| `AuraCostSources` | `data/cost/context/AuraCostSources.java` | Kept in MiXianTu |
| `CostTarget.AuraStore` | `data/cost/CostTarget.java` | Deleted; aura payment uses its own `CostTarget` implementation (the interface is open) |
| `CostContext.auraSource`, `pool(...)`, `bank(...)`, `withAuraSource(...)` | `data/cost/context/CostContext.java` | Switched to `with("mxt:aura_source", source)` and read back with `get(...)` in the `Cost` implementation |
| `CostPayment.auras()`, `PaymentResult.auras()`, the aura branch of `beyondResources()` | `data/cost/CostPayment.java` | Not needed |
| `CostFailure.INSUFFICIENT_AURA` | `runtime/resulting/failures/CostFailure.java` | Use a failure constant with its own name |
| `api/AuraAccess`, `api/AuraCostSource` | `api/` | Not part of Saturn; MiXianTu keeps them as they are |
| `Ability.elementAffinity` / `elementAffinityMode` / `AffinityMode` | `data/ability/Ability.java` | Element affinity moves to MiXianTu's own conditions or a custom `AbilityType` |
| `element_count` / `element_*` on `EntityVariable` | `util/formula/variable/EntityVariable.java` | Switched to MiXianTu's own `FormulaVariable` |
| The 16 content caches and content validation in `RegistryCaches` | `registry/cache/RegistryCaches.java` | Kept in MiXianTu's own `RegistryCaches` |
| The aura HUD and the "resource → aura" use gate in `ResourceBarOverlay` | `screen/resourcebar/ResourceBarOverlay.java` | The aura bar stays in MiXianTu and is registered as its own `HudEntry` |
| The aura use gate in `ResourceTransactions` | `runtime/resource/ResourceTransactions.java` | Kept in MiXianTu's `ResourceUseService` |
| The `regen` resource value provider | `data/resource/builtin/RegenResourceValueProvider.java` | Reads the aura regeneration rate; Saturn keeps only `current`/`max`/`missing`/`constant` |
| The `aura_pulse` data storage | `data/storage/builtin/AuraPulse.java` | The aura pulse, not part of Saturn |
| profiler networking and UI | `network/payload/Profiler*`, `ProfilerSubscriptions`, `screen/profiling/*` | Saturn provides no UI and no data transfer; only the sampling core and `/saturn debug` remain |
| The 13 content sources of `FailureSources` | `runtime/resulting/FailureSources.java` | Saturn keeps only `COMMON` / `ABILITY` / `RESOURCE` |

### 2.2 Not copied (kept in MiXianTu)

| Category | Examples | Reason |
|---|---|---|
| Content builtins | 21 actions, 34 conditions (aura, cultivation, spirit root and physique, curses, quality, formations, secret realms, pills…) | All of them call MiXianTu services |
| Sword flight / mount abilities | `MountAbilityType`, `FlightDisplay`, `MountRender`, `MountPose`, `ItemMountRender`, the `mount_render_type` registry | Sword flight is content gameplay, and Saturn provides neither a `mount` type nor an appearance registry; the content side brings its own type and GeckoLib appearance |
| Ability types and rendering | The remaining 3 types (`word` / `storage` / `flight_control`), GeckoLib appearance | Depends on the content runtime and the rendering library |
| Wheel (whole thing) | Key bindings, `WheelSelectionState` / `WheelSelectionEntry`, `runtime/wheel/*`, `screen/wheel/*`, `WheelMenuScreen`, content pages, HUD grid and textures | Tightly coupled to page content; Saturn keeps only the common HUD framework and the key binding holder class |
| KubeJS content bindings | Event forwarding, `MxtKubeJsEventDispatcher`, the ability/cultivation/curse/aura/element/spirit_root/physique/technique/progression/quality/lifespan/soul/loot bindings | Depends on an event layer and gameplay runtime that Saturn does not have; Saturn ports only the 5 groups of common bindings plus the plugin shell |
| Quality entry | `util/matcher/builtin/QualityEntry` | Depends on `QualityRequirement` |
| Aura-related | `data/aura/*`, `AuraClientState`, content caches | D2 decided that aura does not go into the library |
| Content value types | `data/cultivation|item|quality|progression/*` | Worldview definitions |
| Half of the resource runtime | `ResourceContainerEntry` / `ResourceRegenStage` / `ResourceUseService` / `VesselPour*` | Depends on item components, cultivation methods and spiritual liquid vessels |
| Item host component | `mxt:storage` | Saturn has no item-side storage |

### 2.3 Rewritten (shape changed)

| File | What changed |
|---|---|
| `data/cost/context/CostContext.java` | The record gains a `Map<String, Object> data`; new `with(key, value)` / `get(key)`; the three aura members are removed |
| `data/cost/CostTarget.java` | `sealed` → a plain interface (addons can add targets) |
| `data/cost/CostPayment.java` | The aura projection and branches are removed |
| `data/ability/Ability.java` | Element affinity removed; the JSON has two fields fewer |
| `util/formula/variable/EntityVariable.java` | The element branch is removed |
| `registry/cache/RegistryCaches.java` | Only `ATTRIBUTE_NAMES` / `RESOURCE_NAMES` remain |
| `util/profiling/ServerProfiling.java` | `Source` becomes the registry entry `ProfilerSource` (`register` / `all` / `byPath`), with ids taken from the synced `saturn:profiler_source`; subscription fan-out and networking are removed |
| `screen/resourcebar/ResourceBarOverlay.java` | Accepts only bars from `saturn:resource` |
| `runtime/resource/ResourceTransactions.java` | The aura use gate is removed |
| `screen/hud/HudLayoutFile.java` | Writes to `config/saturn/hud.json` |
| `compat/kubejs/callback/SaturnJsCallbacks.java` | Clears only the six callback tables that Saturn has |
| `registry/SaturnResourceKeys.java` | 23 code keys + 4 data pack keys (was 56) |
| `registry/SaturnRegistries.java` | 23 `DefaultedRegistry` instances + `all()` (was 30) |
| `registry/SaturnDatapackRegistries.java` | Registers only `resource` / `ability` / `trigger` / `incomplete` (was 43) |
| `registry/SaturnAttachments.java` | Registers only `resource_holder` / `ability_holder` |
| `config/SaturnClientConfig.java` | Now reads the client file of `SaturnConfig`'s `ModConfigSpec` (`show_names` / `icons_in_center`) |
| `runtime/resulting/failures/CostFailure.java` | `INSUFFICIENT_AURA` removed |
| `runtime/ability/AbilityService.java` | The element affinity branch is removed (`Ability` no longer has that field); damage multipliers and criteria go through `AbilityHooks`; `word` validation goes through `AbilityHooks.validate` |
| `runtime/ability/AbilityEventBridge.java` | The quality gate, artifact abilities and Curios equipment now go through `AbilityHooks` |
| `runtime/Sources.java` | `Grant` / `Declaration` change from enums to records (path + constant), so content can add its own categories |
| `registry/cache/RegistryCaches.java` | Adds `TRIGGER_RULES_BY_SIGNAL` (an index of `saturn:trigger`) |
| `registry/SaturnAttachments.java` | Adds `TRIGGER_COOLDOWNS` (server-side only) |
| `runtime/resulting/failures/AbilityFailure.java` | `ELEMENT_AFFINITY` removed |
| `util/ClientPlayerNames.java` | Answers only for the players listed in the current connection; the half that queried the server is gone (Saturn has no name lookup network packet) |
| `util/InventoryUtil.java` | Content-side references removed from the Javadoc |
| `registry/SaturnContent.java` | Now just the summary table: the built-in entries of each registry are split into `registry/content/*` (23 classes) and registered together in the main class constructor; built-in entries grow from 47 to 288 |

### 2.4 Added (Saturn side)

`Saturn` (main class), `registry/content/*` (one built-in entry class per registry, with `SaturnContent` as the summary table), `registry/SaturnKeyMappings` (HUD edit key bindings and `KeyMappingHolder`), `command/SaturnCommands` + `SaturnDebugCommand` + `SaturnAbilityCommand` + `SaturnTriggersCommand` + `SaturnResourceCommand` + `command/client/{SaturnClientCommands,SaturnHudCommand}`, `compat/kubejs/{SaturnKubeJsPlugin,SaturnKubeJsApi}`, `api/AbilityHooks`, `runtime/ability/*`, `runtime/trigger/*`, `event/*`; resources `assets/saturn/textures/gui/incomplete.png`, `assets/saturn/lang/*.json`, `kubejs.plugins.txt`.

Common pieces added this round: `loot/{HasAbilityLootCondition,GrantAbilityLootFunction}` + `registry/SaturnLootRegistries` (`saturn:has_ability` / `saturn:grant_ability`), `util/dispatcher/{TickDispatcher,TickInterval,TickExecutionLimit}`, `util/{CloseableResources,ClientRenderResources,ClientLevelAccess,InventoryUtil,TooltipText,PlayerNames,ClientPlayerNames}`, `data/DescribedEntry`, `api/ItemUseCycle` + `event/ResolveItemUseCycleEvent` (a common long-press gesture, with `mixin/ItemUseCycleMixin` registered by `saturn.mixins.json`), `runtime/hold/{ItemUseCycles,ItemUseCyclesClient}`, `advancement/IdentifierCriterionTrigger` (an id-based criterion), `api/AliasManager` + `registry/SaturnAliases` (old id mapping), `SaturnClient` (client initialization: registers the four resource bar HUD elements).

---

## 3. MiXianTu action list (in order)

1. **Dependencies**: add Saturn to `build.gradle`; exp4j is left to Saturn.
2. **Delete packages**: remove from MiXianTu the packages Saturn now owns and rewrite imports across the repo to `com.iafenvoy.saturn.*` (mechanical; 732 of 1361 files import these packages).
3. **`MxtAttachments`**: delete `RESOURCE_HOLDER` / `ABILITY_HOLDER` and read `SaturnAttachments.*` instead; keep the other attachments.
4. **`MxtRegistries`**: delete the 23 keys and keep 7 (talisman/curse/aura_maximum/mount_render/formation_action/formation_stroke/secret_realm_generation).
5. **`MxtResourceKeys`**: delete 23 + 3 keys and keep 33.
6. **`MxtDatapackRegistries`**: delete the four registrations `resource` / `ability` / `trigger` / `incomplete`; delete `IncompleteMarker` together with its badge rendering, since Saturn now draws the badge (the texture is at `assets/saturn/textures/gui/incomplete.png`).
7. **Content builtin registration**: `DeferredRegister.create(SaturnRegistries.ENTITY_ACTION_TYPE, "mxt")`, keeping entry ids as `mxt:*`.
8. **aura**: `AuraAccess` / `AuraCostSource` stay in MiXianTu; `AuraCost` uses `context.get("mxt:aura_source")`; call sites change to `context.with("mxt:aura_source", source)`.
9. **Data files**: move the 27 + 392 JSON files from `data/*/mxt/` to `data/*/saturn/`.
10. **lang**: Saturn already has 81 entries; MiXianTu deletes the keys that moved (`hud.mxt.*`, HUD editing, the profiling part); the wheel's `key.mxt.wheel*` / `wheel.mxt.*` are all kept.
11. **Probes**: rewrite the GameTest imports in MiXianTu; the legs under `verify/` still test the mod's own services and are not ported.
12. **Docs**: change registry ids and the `mxt/` path prefix in `docs/` to `saturn/`; mark the removed fields.
13. **Aliases**: call `SaturnAliases.add("mxt")` in the mod constructor; in a `RegisterEvent` at LOWEST priority Saturn registers every `saturn:` entry a second time under `mxt:` (wrapping the value first to avoid `Adding duplicate value`), so existing data packs resolve without changing ids first. For entries that were renamed, switch the rule first with `SaturnAliases.set(custom)`.
14. **Key bindings**: `MxtKeyMappings` keeps all content key bindings, the five wheel keys and the 12 slot keys; only the HUD editing key now reads `SaturnKeyMappings.HUD_LAYOUT`. The wheel's state, pages, cells, HUD grid, textures and menu all stay in MiXianTu and are not registered with Saturn.
15. **profiler**: keep the UI and payloads and read data from Saturn's `ServerProfiling.snapshot`; register its own source buckets in the MiXianTu constructor.
16. **Commands**: Saturn takes over `/saturn` (profiler / registries / attachment / ability list|cast|grant|revoke / triggers list|rules|publish / resource / client hud) and also registers the same set of nodes at the root, following `commands.*` in `config/saturn-common.toml` (on by default). MiXianTu's `MxtCommand` keeps only the content attachment section and `/mxt wheel`; `AbilityCommand` and `TriggersCommand` are removed entirely.
17. **KubeJS**: Saturn's `SaturnKubeJsPlugin` provides `SaturnActions` / `SaturnConditions` / `SaturnCosts` / `SaturnValues` / `SaturnResources`; the MiXianTu plugin deletes these five groups of bindings (and keeps using the `Mxt*` global names so that scripts do not break), or the scripts switch to `Saturn*`.

---

## 4. Registry ownership

### 4.1 Code registries (Saturn, 23)

`ability_type`(empty), `ability_target_selector_type`(self), `cost_type`(resource), `data_storage_type`(empty), `trigger_type`(use), `number_provider_type`(constant), `formula_function`(round), `formula_variable`(zero), `resource_value_provider_type`(current), the four `*_action_type`(no_op), the five `*_condition_type`(always), `resource_bar_render_data_type`(missing), `resource_bar_context`(self_hud), `resource_bar_visibility_type`(always), `item_matcher_entry_type`(item), `timeline_entry_type`(idle) (`mount_render_type` goes back to the content side together with sword flight).

### 4.2 Data pack registries (Saturn, 4)

`saturn:resource`, `saturn:ability`, `saturn:trigger`, `saturn:incomplete`, with files under `data/<namespace>/saturn/<registry>/`.

### 4.3 Remaining in MiXianTu

7 code registries; 39 data pack registries (`realm_stage`, `element`, `technique`, `artifact`, `pill`, `talisman`, `curse`, `aura`, `aura_zone`, `item_binding`…).

---

## 5. Registered built-in entries (`registry/content/*`)

| Registry | Registered ids |
|---|---|
| `timeline_entry_type` | `action`, `branch`, `idle`, `wait_for` |
| `number_provider_type` | `constant`, `expression`, `context_variable`, `sum`, `uniform`, `binomial`, `weighted_list`, `conditional`, `js` |
| `formula_function` | `round`, `clamp`, `min`, `max` |
| `formula_variable` | `zero`, `random`, `caster`, `target` |
| `ability_type` | `active`, `triggered`, `modifier`, `aura`, `interval`, `channelled`, `targeted`, `empty`, `upkeep` |
| `ability_target_selector_type` | `self`, `area`, `ray`, `cone`, `js` |
| `data_storage_type` | `empty`, `cooldown`, `charges`, `toggle`, `timer`, `resource`, `target_lock`, `container`, `cast_deadline`, `channel_pulse`, `active_state`, `entry_began`, `idle_countdown`, `wait_countdown` |
| `item_matcher_entry_type` | `item`, `tag`, `wildcard`, `regex`, `ingredient` |
| `cost_type` | `resource`, `item`, `js` |
| `resource_value_provider_type` | `current`, `max`, `missing`, `constant`, `js` |
| `resource_bar_context` | `self_hud`, `target_overlay`, `boss_overlay` |
| `resource_bar_visibility_type` | `always`, `non_full`, `non_zero`, `recently_changed`, `resource_range`, `and`, `or`, `not` |
| `resource_bar_render_data_type` | `textured_bar`, `segmented_bar`, `radial_bar`, `text_only`, `boss_bar`, `missing` |
| `entity_action_type` | `no_op`, `sequence`, `chance`, `if_else`, `choice`, `send_message`, `js`, `dismount`, `extinguish`, `heal`, `add_resource`, `grant_ability`, `remove_ability`, `apply_effect`, `teleport`, `knockback`, `modify_ability_storage`, `spawn_entity`, `spawn_projectile`, `add_experience`, `add_velocity`, `exhaust`, `feed`, `gain_air`, `give_item`, `play_sound`, `remove_effect`, `set_fall_distance`, `set_no_gravity`, `set_on_fire`, `swing_hand`, `emit_game_event`, `passenger_action`, `block_action`, `self_bientity_action`, `equipped_item_action`, `riding_action`, `spawn_particles`, `spawn_effect_cloud`, `no_op`, `sequence`, `chance`, `if_else`, `choice`, `actor_action`, `target_action`, `send_message`, `js`, `mount`, `heal_target`, `transfer_resource`, `add_velocity`, `teleport` |
| `bi_entity_action_type` | `no_op`, `sequence`, `chance`, `if_else`, `choice`, `actor_action`, `target_action`, `send_message`, `js`, `mount`, `heal_target`, `transfer_resource`, `add_velocity`, `teleport` |
| `block_action_type` | `no_op`, `sequence`, `chance`, `if_else`, `choice`, `offset`, `send_message`, `js`, `set_block`, `break_block`, `schedule_tick`, `bonemeal`, `light_up`, `explode`, `spawn_entity` |
| `item_action_type` | `no_op`, `sequence`, `chance`, `if_else`, `choice`, `send_message`, `js`, `damage_item`, `consume_item`, `consume_health`, `cooldown`, `remove_enchantment`, `add_enchantment`, `merge_components` |
| `entity_condition_type` | `always`, `never`, `and`, `or`, `not`, `chance`, `js`, `sneaking`, `has_ability`, `partner`, `resource_compare`, `entity_tag`, `air`, `dimension`, `entity_type`, `fall_distance`, `glowing`, `health`, `exposed_to_sky`, `food_level`, `mob_effect`, `on_block`, `time_of_day`, `using_item`, `brightness`, `exposed_to_sun`, `experience_level`, `experience_points`, `relative_health`, `saturation_level`, `team`, `attribute`, `block_collision`, `can_have_effect`, `gamemode`, `passenger`, `attack_cooldown`, `equipped_item`, `main_hand_item`, `in_block`, `in_block_anywhere`, `scoreboard`, `riding`, `riding_recursive`, `passenger_recursive`, `riding_root`, `ability_storage_toggle`, `ability_storage_timer`, `ability_storage_resource`, `ability_storage_target`, `ability_storage_charges`, `ability_storage_cooldown`, `always`, `never`, `and`, `or`, `not`, `chance`, `actor_condition`, `target_condition`, `both`, `either`, `mutual`, `undirected`, `js`, `distance`, `team`, `relation`, `can_see`, `riding_recursive`, `same_team`, `relative_rotation` |
| `bi_entity_condition_type` | `always`, `never`, `and`, `or`, `not`, `chance`, `actor_condition`, `target_condition`, `both`, `either`, `mutual`, `undirected`, `js`, `distance`, `team`, `relation`, `can_see`, `riding_recursive`, `same_team`, `relative_rotation` |
| `block_condition_type` | `always`, `never`, `and`, `or`, `not`, `chance`, `offset`, `js`, `block_id`, `block_tag`, `biome_tag`, `hardness`, `height`, `light_level`, `slipperiness`, `blast_resistance`, `movement_blocking`, `adjacent` |
| `item_condition_type` | `always`, `never`, `and`, `or`, `not`, `chance`, `js`, `item_id`, `item_tag`, `item_matcher`, `amount`, `fuel`, `is_equipable`, `relative_durability`, `armor_value`, `durability`, `on_cooldown`, `ingredient`, `tool_ability`, `base_enchantment`, `has_component`, `component` |
| `damage_condition_type` | `always`, `never`, `and`, `or`, `not`, `chance`, `js`, `amount_range`, `directness`, `damage_type`, `damage_type_tag`, `fire`, `magic`, `projectile` |
| `trigger_type` |  + -9 ported vanilla criteria + `js` |

Not registered: `regen` (aura), `aura_pulse` (aura), `breakthrough` / `progression_level` (gameplay signals).

## 6. Verification

| Check | Result |
|---|---|
| Saturn `gradlew.bat compileJava` | Passes (547 files / 23,325 lines) |
| Saturn GameTest | No test package, not run |
| In-game / data pack loading | Not done |
| HUD edit key bindings and HUD rendering, item badges | Only compiled, never looked at in the client |
| MiXianTu side | Unchanged, not compiled |

---

## 7. Open questions and to be confirmed

1. **Content events**: 7 common events went into `event/`, but 17 content events (cultivation, curses, pills, formations, secret realms…) were not ported; whether those should also be extracted into the library is undecided. Script bindings for triggers are likewise not done yet.
2. **Root merging of client commands**: the client nodes hang under `/saturn` and rely on Brigadier merging same-named nodes; this is **not verified in-game**; if the server tree overrides them, switch to a separate top-level literal.
3. **aura payment key name**: `CostContext.with("mxt:aura_source", …)` is defined by MiXianTu; whether to register a "reserved key" prefix rule is open.
4. **KubeJS global names**: Saturn uses `Saturn*` and MiXianTu uses `Mxt*`; whether to unify them.
5. **Probes**: Saturn has no GameTest; whether to port part of the regression suite over from MiXianTu.
6. **Version and release**: the version number, the Maven coordinates and whether to release in lockstep with MiXianTu are not decided yet.

---

## 8. How the copy and rename were done (reproducible)

1. Pick files from the "framework candidates" list in MiXianTu's `research/audit/前置抽取评估.md`.
2. Replace in every file: `com.iafenvoy.mxt` → `com.iafenvoy.saturn`; `\bMiXianTu\b` → `Saturn`; `\bMxt(?=[A-Z])` → `Saturn`; `"mxt:` → `"saturn:`; `"mxt.` → `"saturn.`; then `.mxt.` → `.saturn.` inside strings once more.
3. Rename file names the same way, `Mxt*` → `Saturn*`, and write them to the same relative path under `src/main/java/com/iafenvoy/saturn/`.
4. Delete the aura-only files, rewrite the files in §2.3, fill in the skeleton from §2.4; the whole wheel is not copied.
5. Add `mavenCentral()`, the two KubeJS mavens, `jarJar` for `exp4j` and `compileOnly` KubeJS to `build.gradle`, then run `gradlew.bat compileJava`.

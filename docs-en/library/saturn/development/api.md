---
title: "Development API"
sidebar_position: 1
---

---

## 0. Dependencies and Installation

- NeoForge 26.1.2 (`neo_version=26.1.2.99`), Java 25.
- exp4j (formula evaluation) is `jarJar`-ed into Saturn's own jar, so dependents do not need to declare it.
- KubeJS is **`compileOnly`**: classes in `compat.kubejs` are only loaded when KubeJS is installed, and not having it installed does not affect startup.
- Mods that depend on Saturn do not need to declare an optional dependency in `neoforge.mods.toml`; Saturn is a hard dependency.

---

## 1. Namespace and Data Files

- Both the mod id and the registry namespace are `saturn`.
- Definitions are written to `data/<your namespace>/saturn/<registry path>/<entry>.json`.
- **Definitions and types are separate**: dynamic registry entries such as resource and ability use the file paths above; types such as `entity_action_type` are registered from Java with a MapCodec, and a data pack only picks a `type` in the action field — you cannot create a directory of the same name to register a new Java type.
- Most legacy Type entry points fall back to the registry's default entry when `type` is omitted (second column of the §2 table); information expressions require the object to spell out `type` explicitly, while raw scalars are treated as constants.

---

## 2. Registries

### 2.1 Code Registries (`SaturnRegistries`)

| Static field | Default entry |
|---|---|
| `ENTITY_VALUE_GETTER` | None; strictly looks up the parameter MapCodec and generates a parameterized entity value query |
| `INFORMATION_EXPRESSION_TYPE` | `constant` (expression objects still require an explicit type) |
| `ABILITY_TYPE` | `empty` |
| `ABILITY_TARGET_SELECTOR_TYPE` | `self` |
| `COST_TYPE` | `resource` |
| `DATA_STORAGE_TYPE` | `empty` |
| `TRIGGER_TYPE` | `tick` |
| `NUMBER_PROVIDER_TYPE` | `constant` |
| `FORMULA_FUNCTION` | `round` |
| `FORMULA_VARIABLE` | `zero` |
| `RESOURCE_VALUE_PROVIDER_TYPE` | `current` |
| `ENTITY_ACTION_TYPE` / `BI_ENTITY_ACTION_TYPE` / `BLOCK_ACTION_TYPE` / `ITEM_ACTION_TYPE` | `no_op` |
| `ENTITY_CONDITION_TYPE` / `BI_ENTITY_CONDITION_TYPE` / `BLOCK_CONDITION_TYPE` / `ITEM_CONDITION_TYPE` / `DAMAGE_CONDITION_TYPE` | `always` |
| `RESOURCE_BAR_RENDER_DATA_TYPE` | `missing` |
| `RESOURCE_BAR_CONTEXT` | `self_hud` |
| `RESOURCE_BAR_VISIBILITY_TYPE` | `always` |
| `ITEM_MATCHER_ENTRY_TYPE` | `item` |
| `TIMELINE_ENTRY_TYPE` | `idle` |

The code registries without a default entry are `OPEN_SCREEN_DATA` (the data type of screen-open requests) and `PROFILER_SOURCE` (sampling buckets); both are synced, and the entries of the latter are `ProfilerSource`, whose numeric id is its column in the sampling array.

```java
public static final DeferredRegister<MapCodec<? extends EntityAction>> ACTIONS =
        DeferredRegister.create(SaturnRegistries.ENTITY_ACTION_TYPE, MyMod.MODID);
```

### 2.1.1 Built-in Entries (`registry/content`)

One class per code registry (SaturnEntityActions, SaturnEntityConditions, SaturnTriggers…); each class holds its own DeferredRegister and registers in a static block; `registry/SaturnContent` is only an aggregate table, which the main class registers uniformly with .register(bus) in its constructor. For your own entries, just create another class plus this mod's DeferredRegister.

### 2.2 Data Pack Registries (`SaturnDatapackRegistries`)

`saturn:resource`, `saturn:ability`, `saturn:trigger`, `saturn:incomplete`, `saturn:information_group` and `saturn:information_row` are registered by Saturn, and you only write JSON. For information row/Group directories, parameters and expression examples, see [data-driven information rows](../guides/information.md).

- `saturn:incomplete` (`data/item/IncompleteMarker`): marks items that are not finished yet. The file holds a single `items` containing entries of `ItemMatcher` (item, tag, wildcard, regex, `ingredient`, and you can also use `type` to go through your own `item_matcher_entry_type`); any single match counts as a match, so overlaps need no ordering — every matching declaration draws the same corner marker. An empty `items` errors at load time: that can only be a file written halfway.
- The marker is drawn by `render/item/IncompleteMarkerRenderer` with the texture `assets/saturn/textures/gui/incomplete.png`; on the client it registers one `IItemDecorator` per item, so the marker applies to the "stack" rather than the "item class", and tags and matchers that need to read stack data work as well.

---

## 3. Extension Points

### 3.1 Payment: `Cost` + `CostContext`

Saturn only implements `saturn:resource` and `saturn:item`; implement the other channels yourself:

```java
public record MyAuraCost(NumberProvider amount) implements Cost {
    public static final MapCodec<MyAuraCost> CODEC = ...;

    @Override
    public Result<Transaction> prepare(CostContext context) {
        AuraCostSource source = context.get("mymod:aura_source").map(AuraCostSource.class::cast).orElse(null);
        if (source == null) return Result.failure(CostFailure.NO_CHANNEL);
        return Result.success(source.bind(context, this.amount().evaluate(context.formula())));
    }

    @Override
    public MapCodec<MyAuraCost> codec() { return CODEC; }
}
```

- `CostContext` is `record(payer, formula, origin, account, itemTarget, data)`; `data` is an extension bag with `with(key, value)` / `get(key)`, and Saturn only carries it around without interpreting it, with all keys namespaced.
- `CostTarget` is an **open interface**, so your `Transaction` can carry its own target type.
- `CostPayment.pay(List<Cost>, CostContext)`: first `prepare` everything, then trial-run `execute(true)` on everything, and finally `execute(false)` in order for the real deduction; a failed real deduction is logged and processing continues. Returns `Result<List<Debit>>`, and `CostPayment.resources(debits)` folds the receipts into a quantity table keyed by id.

### 3.2 Failures

Failure is a value, not an exception. `SimpleFailure.of("my_reason")` creates a constant; if you want your own lang namespace, wrap it in `FailureSource.of(your registry key)`. A failure reason can carry the affected resource (`withResource(id)`), so the language key can state which channel is missing.

Returns are always `Result<T>`: with data it is `Result<T>`, without data it is `Result<Void>` (`Result.success()`). Test the outcome with `instanceof Result.SuccessResult<?>` / `instanceof Result.FailureResult<?>`, read data with `getData()`, and read the reason with `getFailure()`; failure results carry no data.

### 3.3 Attachments

Saturn has only two entity attachments: `SaturnAttachments.RESOURCE_HOLDER` (numeric resources) and `SaturnAttachments.ABILITY_HOLDER` (ability grants and state). Use your own attachment for your own state; to sync dirty data per tick, extend `util.AbstractChangeTrackable` and refer to `SaturnAttachments.flushDirtyAttachments`.

### 3.4 Numeric Resources

- Definition: `saturn:resource` (`default_value` / `min` / `max` / `icon` / `particle_color` / `bars`).
- Read/write: `get` / `set` on `entity.getData(SaturnAttachments.RESOURCE_HOLDER)`; for batch deduction use `ResourceTransactions.tryConsume` (all or nothing).
- On player login the values are seeded once from `default_value` (`ResourceSeeding`): it only fills values that have no entry yet and leaves existing values alone, so logging in again does not change the balance. Without this step, a value that has never been touched reads as `0`, and writing `default_value` still cannot pay for consumption.
- `FormulaContext.withResource(resource)` lets that resource's formula read its own value; `ResourceService.formulaContext(...)` is a ready-made wrapper.

### 3.5 Formulas

- `NumberProvider` ships 8 built-in types (`constant` / `expression` / `context_variable` / `sum` / `uniform` / `binomial` / `weighted_list` / `conditional`), plus `js`.
- Register your own variables in `FORMULA_VARIABLE` and functions in `FORMULA_FUNCTION` (an exp4j `Function`).
- `FormulaContext` fields: `caster` / `target` / `player` / `registries` / `resource` / `random` + an explicit value table.

### 3.6 HUD and Resource Bars

- Adding a HUD: implement `HudEntry` (or extend `AbstractHudEntry`) and call `HudManager.register(entry)` during client initialization; the position is decided by `HudAnchor` (8 anchors) and `HudPlacement`, players drag it in `HudEditScreen`, and the layout lands in `config/saturn/hud.json`.
- Resource bars: bars written in a `saturn:resource`'s `bars` are drawn per resource, with the appearance chosen by the three registries `resource_bar_context` / `resource_bar_render_data_type` / `resource_bar_visibility_type`. A bar with `minimum == maximum` draws no fill: a zero-width interval has no ratio to speak of, and reading it as a full bar would draw "maximum equals current" (including a maximum computed as 0) as full.
- Bars that belong to no `saturn:resource` (for example a pool with no resource definition): implement `ResourceBarContributor` and call `ResourceBarContributors.register(contributor)` during client initialization; the callback receives `(LivingEntity, Layout, Anchor, List<ResourceBarRenderState>)`, and the entries you add are sorted, stacked and split into left/right columns together with the resource-declared bars. Columns are collected once per frame per column, so do not do heavy work in the callback.
- The four resource bar HUD elements (left/right columns, target, Boss) are registered by SaturnClient during client initialization (ResourceBarOverlay.registerEntries(), idempotent); the content side does not need to call it again.
- Item marker: `render/item/IncompleteMarkerRenderer` is Saturn's only registered `IItemDecorator` and reads `saturn:incomplete` (§2.2).
- Two client-side values (display names, icon position) come from the `ModConfigSpec` client file (`resource_bars.show_names` / `resource_bars.icons_in_center` in `config/saturn-client.toml`); in code read `SaturnClientConfig.showNames()` / `iconsInCenter()`.

### 3.7 Wheel (Not in Saturn)

The whole block stays on the content side: key bindings, selection state, page and slot types, the HUD grid and the `/saturn wheel` command are all in MiXianTu. Saturn keeps only the generic HUD framework (§3.6), the key binding holder `SaturnKeyMappings.KeyMappingHolder` and the ability activation entry point (§3.11).

### 3.8 Commands

Root node `/saturn`, with both server and client nodes hanging under it (Brigadier merges same-named nodes):

| Node | Side | Purpose |
|---|---|---|
| `information query <target> [<group>]` / `gui <target> [<group>]` | Server | Query in chat, or open the information screen for the executor; both require admin permission (level 3) |
| `profiler on` / `off` / `status [sources…]` | Server | Profiler toggle and readings (admin) |
| `registries` | Server | Data pack and code registry sizes; code tables with a default entry also report the default ID |
| `attachment status` | Server | The two Saturn attachments: resource entry count, ability source count, cooldown count |
| `ability list [target]` | Server | Abilities held by this body, and their sources |
| `ability cast <id>` / `grant <targets> <id>` / `revoke <targets> <id>` | Server | Cast, and grant/revoke under the command's own source (admin) |
| `triggers list [entity]` / `triggers rules <signal>` | Server | Subscriptions currently listening, and rules hit by a signal |
| `triggers publish <signal> [entity]` | Server | Publish a signal manually (admin) |
| `resource get <id>` / `list` | Server | Read the executor's resource values |
| `resource set/add <targets> <id> <amount>` | Server | Write values (admin), clamped by `min`/`max` |
| `hud` / `hud open` / `hud <element> reset` | Client | HUD framework diagnostics and editor |

**Root aliases and configuration.** Besides hanging under `/saturn`, every server node can also be registered at the root (`/information`, `/profiler`, `/ability`, `/triggers`, `/resource`, `/registries`, `/attachment`), controlled by `commands.<node>` in `config/saturn-common.toml` and **`true` by default**; when another mod already occupies the same literal at the root, the node is skipped and one log line is written instead of overwriting the other mod. The files are registered by NeoForge's `ModConfigSpec` (`SaturnConfig.COMMON_SPEC` / `CLIENT_SPEC`); Saturn does not ship a config screen.

The nodes for abilities and triggers are both present: their runtime has already moved into Saturn (§3.11).

### 3.9 Caching

`RegistryCache` subclasses self-register on construction; they are rebuilt on `TagsUpdatedEvent` (`shouldUpdateStaticData`) and cleared when the client logs out. The one pitfall: the class must have been initialized — hold a static field of your cache class once in **your** mod constructor. Saturn only `init()`s its own `RegistryCaches`.

### 3.10 KubeJS (Optional)

`compileOnly`; the entry point is `SaturnKubeJsPlugin` in `kubejs.plugins.txt`.

| Script global | Purpose |
|---|---|
| `SaturnActions` | Build the four kinds of action from script (`type: "js"`) |
| `SaturnConditions` | Same, for the five conditions |
| `SaturnCosts` | Build costs from script; `SaturnKubeJsApi.tryConsumeResources` settles a transaction directly |
| `SaturnValues` | Build `resource_value_provider` from script (`type: "js"`) |
| `SaturnResources` | Read and write an entity's `saturn:resource` values |

- Callback tables: `SaturnJsActionCallbacks` / `ConditionCallbacks` / `CostCallbacks` / `ValueCallbacks` / `SelectorCallbacks` / `TriggerMatchers`; `SaturnJsCallbacks.clear()` on script reload.
- There is **no** trigger binding (publishing signals and reading subscriptions belong to the dependent's runtime).
- Global names are `Saturn*` and do not collide with the content mod's `Mxt*`.

### 3.11 Ability and Trigger Runtime

Saturn ships a complete ability and trigger runtime; the content side only provides rules and content.

**Abilities** (`runtime.ability`): `AbilityService` (the whole flow of cast / charge / channel / single press), `AbilityActivationService` (client key and script activation entry), `AbilityGrantService` (granting and revoking by source), `AbilityModifierService` (passive attribute modifiers), `PassiveAttributeService` (attribute source table), `AbilityStorage` (per-ability state), `AbilityFeedback`, `AbilityEventBridge` (wiring for equipment/items/triggers).

**State containers** (`data.storage`): `DataStorageHolder<T>` is "the mutable state of some definition", and the generic parameter is **the address itself**, not `Holder<T>` — abilities write `DataStorageHolder<Holder<Ability>>` (the key is the holder), and if the address is a `UUID`, a `ResourceKey`, a name or anything else, write that type and the container still works; state kinds are addressed by class, and one (address, kind) pair is exactly one value. To persist it, give it a `codec(Codec<T>)` (for example `DataStorageHolder.codec(Ability.CODEC)`); if the address has no serializable form, omit the codec and use only the in-memory copy. The value, `DataStorage`, calls `copy()` on itself and records its own changes, and the tick receives a `DataStorageContext` (body / formula / current tick, containing no ability fields); pacing (such as `tickInterval`) still belongs to each host's own loop. A saved entry is `{"id": <address>, "value": …}`, and when the definition leaves the data pack only that entry is dropped.

**Built-in ability types**: `active`, `triggered`, `modifier`, `aura`, `interval`, `channelled`, `targeted`, `empty`, `upkeep`. Register your own type in `ABILITY_TYPE` by implementing `AbilityType`; if it has to run actions, also add `AbilityEffect` / `ActionCarrier`, for press-and-hold add `Togglable`, to read the clock add `CooldownSource`, and for channels add `ChannelSource`.

**Triggers** (`runtime.trigger`): `TriggerDispatcher` (subscription table + publishing), `TriggerRuleService` (`saturn:trigger` rules: conditions, chance, cooldown), `TriggerPublishing`, `TriggerSubscription`, `TriggerRehydrators`, `TriggerLifecycleEvents`, plus the two bridges to vanilla criteria (`VanillaTriggerBridge` / `VanillaTriggerPollBridge`). Rule cooldowns are stored in `SaturnAttachments.TRIGGER_COOLDOWNS`.

**Advancement completion**: `saturn:advancement_completed` is published on the server when it receives NeoForge's `AdvancementEarnEvent`, and means the conditions of the whole Minecraft advancement have been completed, not that a single criterion's progress changed. The optional `advancement` field of `AdvancementCompletedTrigger` filters by advancement ID; if omitted it matches every advancement, including hidden advancements and recipe unlocks. The signal's `actor` is the entity that completed it, and `TriggerPayload.ADVANCEMENT` holds that advancement's `Identifier`, which subscriptions, conditions and actions can read.

For example `data/example/saturn/trigger/first_diamond.json`:

```json
{
  "trigger": {
    "type": "saturn:advancement_completed",
    "advancement": "minecraft:story/mine_diamond"
  },
  "action": {
    "type": "saturn:send_message",
    "message": { "text": "Diamond advancement completed" }
  }
}
```

This trigger can also be used directly in a `TriggerSubscription` or a triggered ability, reusing the existing condition, chance and cooldown machinery. It only forwards the completion event of that moment: logging in does not replay existing advancements, and completing again after a revoke publishes again; persisted deduplication, binding baselines and reward ledgers are up to the consumer. This entry point is provided in Saturn first; System has not yet switched its advancement listener or configuration.

**Hooks**: register each provider with its own mod id through `api.AbilityHooks.register(ownerId, hooks)`. Reusing an id replaces only that provider; null removes only that provider. Damage multipliers multiply, every permission check must pass, all commit callbacks run in registration order, ability lists are deduplicated, and equipment is combined by stack identity. The legacy `set(...)` updates a separate compatibility slot without replacing named providers; new integrations use `register`.

**Events** (`event`): `AbilityUseEvent.Pre/Post`, `AbilityTriggeredEvent`, `ResourceConsumeEvent.Pre/Post`, `CollectAbilityGrantsEvent`, `CollectPassiveAttributesEvent`, `CollectTickStagesEvent`, `TriggerRehydrateEvent`. Content events (cultivation, curses, pills, formations, secret realms…) are not in Saturn.

**Sources and tick order**: `runtime.Sources` defines generic factories and open `Grant` / `Declaration` categories; consumers own their gameplay categories. The collection event accepts any source id. Declaring an id gives the collector ownership of its entire grant set; withdrawing it revokes that set, and ownership is saved with the attachment. Independent grants must use different ids. Reconciliation adds new sources before removing old ones to preserve still-granted ability state; legacy `saturn:grant/...` sources remain managed. `EQUIPPED` identifies additional equipment. `runtime.EntityTickStages` contains only library stages (`RESOURCES` / `TRIGGERS` / `ATTRIBUTES` / `EQUIPMENT` / `ABILITIES` / `CASTS` / `CHANNEL`); consumers contribute their own order values through `CollectTickStagesEvent`.

Timeline `ticks` applies only its explicit scale; deadlines use `unscaledTicks`. Consumers calculate environmental or gameplay multipliers. Registry fallback entries use the `saturn:` namespace.

**What the content side has to do itself**: the `word` / `storage` / `flight_control` ability types, `CultivationTriggerService` (publishes cultivation progress signals), and content events plus their KubeJS bindings.

### 3.12 Common Utilities and Loot Entries

- `util/dispatcher`: `TickDispatcher` schedules one-shot or periodic tasks by key (`TickInterval` sets the interval, `TickExecutionLimit` sets the per-tick execution cap); it is pure Java and owned by the creating thread, and can `reschedule` / `cancel` / `advanceTo`.
- `util/{CloseableResources,ClientRenderResources}`: slots for closeable resources (released on level unload or shutdown); `ClientLevelAccess` is the access point for client registries.
- `util/InventoryUtil`: atomic move-in/move-out of exact stacks; `util/TooltipText`: tooltip numbers, signs and separators (`tooltip.saturn.separator`).
- `data/DescribedEntry`: a codec wrapper for `value + optional description` (`codec(valueCodec, key)`), usable with any `T`.
- `util/{PlayerNames,ClientPlayerNames}`: resolve names by UUID — the server asks the online list and the name cache, while the client only answers for players listed in the current connection; no network query is sent, so names must be recorded when written (`displayName`).
- Loot entries: `saturn:has_ability` (condition: whether this entity holds a given ability) and `saturn:grant_ability` (function: grant, with the default source `saturn:loot`), which only read `saturn:ability` and the ability attachment.
---

### 3.13 Long-Press Gestures and ID-Based Criteria

- `api/ItemUseCycle` + `event/ResolveItemUseCycleEvent`: **generic long-press binding**. After a single right click, `ItemUseCycles` fires one `ResolveItemUseCycleEvent` on `RightClickItem`, and a claiming provider supplies a gesture (`id` / `durationTicks` / `animation` / `canStart` / `tick` / `finish` / `isConsumption`); the click itself is hooked onto `ItemStack#use` by `ItemStackUseCycleMixin` in `saturn.mixins.json` (items that override `Item#use` or even skip `super` are still caught), and `getUseDuration` / `getUseAnimation` / `finishUsingItem` are hooked onto `Item` by `ItemUseCycleMixin`. Vanilla use components (`consumable`, `blocks_attacks`, `kinetic_weapon`, wearable) take priority: any result other than the native `PASS`, a native replacement of the stack, or a native duration makes the framework step aside. Gesture state is kept per entity and per stack by weak reference, and the client discovers it on its own from the vanilla synchronized use marker.
- `advancement/IdentifierCriterionTrigger`: a single criterion implementation that decides by id whether it counts (`definition` is optional and matches every invocation when absent). On the content side, use `DeferredRegister.create(Registries.TRIGGER_TYPES, "<your namespace>")` to register one instance per purpose, then call `trigger(player, definitionId)` at the right moment.

### 3.14 Aliases (`AliasManager`)

Built-in entries that were moved over are now all called `saturn:<path>`, and old data packs' `mxt:<path>` has to keep resolving:

```java
public MyMod(IEventBus bus) {
    SaturnAliases.add("mxt");                 // mxt:<path> becomes a second id for saturn:<path>
    // When some entries were renamed, change the rule first:
    SaturnAliases.set((namespace, id) -> Optional.of(...));
}
```

- `api/AliasManager`: `Optional<Identifier> alias(String namespace, Identifier id)`, returning an old id of some built-in entry, or empty if the namespace was never used that way; `AliasManager.SAME_PATH` puts the same path into the content side's namespace.
- `registry/SaturnAliases`: `set(manager)` / `add(namespace)`. Inside a **`RegisterEvent` at `EventPriority.LOWEST`**, it walks every entry of the built-in registrars plus the 2 vanilla loot registrars and **registers the same value once more** under the old id — by then each registrar's own entries are registered, the holders are bound, and the registry is not yet frozen.
- Why the wrapper layer: the registry throws `Adding duplicate value` for "the same object hanging under two ids" (`MappedRegistry` checks for duplicates with an `IdentityHashMap`). So `MapCodec` is rebuilt as an equivalent instance with `xmap(identity, identity)`, `Function` delegates through `SimpleFunction`, and `FormulaVariable` and `ResourceBarContext` delegate through record-style wrappers.
- Skipped: old ids the registry already occupies (still used by the content side itself), `saturn`'s own namespace, and attachments — an attachment id lives on the entity, so a second id would become a second attachment rather than a rename.
- `player_view_field` does not get aliases either: field IDs correspond to saved facts, and a second record would collect twice, so it must not be used as a rename mechanism.
- Timing: `add` must be called in the mod constructor; adding it after setup logs one warn and is ignored.
- **Formula functions and formula variables do not take part in aliasing**: both are resolved by name (functions by `getName`, variables by `names` / `prefixes`), so a second id adds no lookup path and would only make the same name appear twice in the registry, while the formula index throws on duplicate names. Old data writing `mxt:round` or `mxt:caster_` never went through a registry id in the first place, so no alias is needed.
- Difference from NeoForge's `DeferredRegister.addAlias`: that one only records the alias in `IRegistryExtension` and syncs it with the registry snapshot, and in the current version vanilla lookups (`Registry#get` / `byNameCodec`) do not go through `resolve`; what actually makes old ids resolvable is the second registration here.

## 4. What Saturn Does Not Do Yet (Dependents Must Not Treat These as Existing Capabilities)

| Missing | Impact |
|---|---|
| Wheel | Key bindings, selection state, page and slot types, the HUD grid and `/saturn wheel` are all on the content side; Saturn only provides the HUD framework and `AbilityActivationService`. |
| Content-related ability types | The `word` (detoxification/self-healing), `storage` (artifact storage) and `flight_control` (sword flight) types and `CultivationTriggerService` depend on the content runtime and stay on the content side. |
| Script bindings for triggers | The `js` trigger type is in Saturn, but the binding that hooks subscriptions/publishing into scripts is on the content side. |
| Aura / pool / bank | Not in Saturn; `Cost` + `CostTarget` + `CostContext.with(...)` is your channel. |
| Quality | Neither the `quality` matcher entry nor `QualityRequirement` is in Saturn. |
| Item-side storage | `DataStorageHolder` only hangs on `AbilityAttachment`, with no item component. |
| Profiler screen and networking | Only `/saturn profiler`; for a graphical interface read `ServerProfiling.snapshot` yourself — `ProfilerFrame` ships its own `CODEC` and `STREAM_CODEC`, so just put it in your own packet. |
| Player view tests | There are already independent core checks and main source set information row GameTests; other systems are outside their verification scope. |
| Built-in data pack definitions | Information row/Group JSON is included; gameplay resources and ability definitions are provided by the content mod. |

---

## 5. Layout Conventions

- Public API is all under `com.iafenvoy.saturn`: `data.*` data models, `registry.*` registries, `runtime.*` runtime, `screen.*` client, and the optional script bridge `compat.kubejs`.
- Record field names in `data.*` are the JSON field names, so changing a field means breaking data packs.
- Internal classes (`builtin/*`, the details of `util/profiling`) are not promised to be compatible.

## 6. Player Views and Information Rows

`api.playerview` provides read-only views, writers and the host query contract. Entry points, definitions and snapshots are in `data.information`, DTOs in `data.information.model`, value interfaces in `data.information.getter`, and expressions in `data.information.expression`. `EntityValueGetter<T>`'s parameter MapCodec is registered into `SaturnRegistries.ENTITY_VALUE_GETTER` with a `DeferredRegister`; `valueCodec()` handles the result payload on its own, and `schemaVersion()` defaults to `1`. Each query can implement `capture(Entity)`, `readSaved(SavedPlayerViewContext)` and the read-only snapshot projection `fallback(PlayerView)`.

`data.information.PlayerViews` collects the queries and dependencies needed by the default queries of types without required parameters, by what the caller explicitly requests, and by the rows enabled in the current world, deduplicating by full parameters and isolating failures. The 26 built-in types live in `data.information.getter.builtin`, including selecting attributes, resources, effects and scoreboard objectives by ID. Saturn only parses the data passed in: it does not read player files, does not save archives, and does not sync player information itself. The IDs, schemas and payload formats of the old parameterless fields are preserved; parameterized results are stored separately in `queries`, and unknown envelopes and query definitions are kept. `NOT_CAPTURED` from save parsing does not create an envelope, leaving room for the host to fill in. The old Field / Contributor / SavedReader APIs have been removed; see [Getter registration and migration](player-views.md#registering-typed-extensions).

Display extensions are declared row by row through the `saturn:information_row` data definition, with the type `InformationRow`; `InformationGroup.rows` references a single row or a tag via `Either<Holder<InformationRow>, TagKey<InformationRow>>`, so the same row can be reused across groups. Evaluation yields a flat `InformationEntry` that stores label/value/tooltip directly and references the original Row and Group with Holders; group queries return `Holder<InformationGroup>`, and the title, order, importance and so on are no longer copied into a second model. `PlayerInformation` only queries the native Row / Group registries and holds no separate Java definitions or registrars. `collect(view, group)` collects by group, `collectAll(view)` collects everything, and both entry points are kept. The `saturn:getter` expression embeds getters with parameters, and the composite result can optionally take a `path`; for example, querying by attribute ID does not depend on the attribute's position in the list. `InformationContext(language, registries)` lets you specify the current world's definitions explicitly.

The old direct Java row/group registration overloads, `PlayerInformationRegistry`, `PlayerInformationRowProvider`, the parameterless code group enum `groups()` and the single-group result accessor `group()` have all been removed. New rows/groups use the data pack registries, and custom values/computation register MapCodecs with the getter / expression intrinsic registries; enumerate the current groups with `groups(view[, context])`, including empty groups in the registry. Collect-all, collect-by-group, the screen and the result's `groups()` are kept. Without a registry context the query is empty and does not fall back to code or a global world.

A row JSON's `importance` is an int; larger means more important, default `0`. Result rows read it from the original definition through `importance()`, and `document.withMinimumImportance(minimum)` keeps rows at or above the threshold, preserving the original display order.

The `CODEC` of `InformationRow` / `InformationGroup` is a Holder Codec, and `DIRECT_CODEC` is the definition Codec; `InformationEntry.CODEC` and the document Codec need the current RegistryOps. Display results are used directly through `entry.label()/value()/tooltip()`, and the old Result/Content nesting has been removed.

For complete signatures, fields, NBT input, Codecs, screens and the verification scope see [player views and display rows](player-views.md); for JSON definitions and custom Types see [data-driven information rows](../guides/information.md).

The information commands are `/information query <target> [<group>]` and `/information gui <target> [<group>]`; both require `Permissions.COMMANDS_ADMIN` (level 3) and keep the `/saturn information query/gui ...` entry points. Player names, UUIDs or single-entity selectors are accepted; omitting group collects everything, supplying a group filters by that group, and ID completion comes from the current Group registry. `query` uses `InformationText` to output text only to the executor and works from the console; `gui` requires a player executor and ships the already-evaluated `InformationDocument` and the group selection through the `saturn:information_gui` client payload, opening `PlayerInformationScreen` on the executor's client. Both return the number of logical rows. The GUI does not send raw snapshots and does not refresh automatically; an oversized document suggests viewing by group. Command hints include the Chinese and English translation keys.

## 7. FileAccess File Codecs

`com.iafenvoy.saturn.util.FileAccess` provides a shared Codec file boundary; the public entry points are:

| Entry | Write format | Read format |
| --- | --- | --- |
| `FileAccess.JSON` | Pretty-printed JSON | JSON |
| `FileAccess.NBT` | Uncompressed NBT with a standard root header | Auto-detects uncompressed / GZIP, compatible with standard / legacy root headers |
| `FileAccess.NBT_COMPRESSED` | GZIP-compressed NBT with a standard root header | Same as `NBT` |

`encode(codec, value)` / `decode(codec, bytes)` work on byte arrays; `save(codec, path, value)` / `load(codec, path)` work on files. The compression option only decides how writing is done and does not restrict reading; the two NBT entry points can read each other's output and do not depend on the file extension.

`save` for every format finishes encoding in memory first, then saves atomically through `FileAccess.write(path, bytes)`: it creates parent directories automatically, creates a separate temporary file in the same directory as the target, writes it fully and calls `force(true)`, and finally replaces the target atomically. Relative file names work too; when writing or the atomic move fails, the original target is preserved instead of falling back to a direct overwrite, and when the method exits normally it tries to clean up the temporary file, logging a warning if cleanup fails. The separate temporary file keeps concurrent writes from truncating each other's staging content, but read-modify-write transactions at the business layer still need the caller's own lock.

Callers that have already done a capacity check or digest through `encode` can use the public static method `FileAccess.write(Path, byte[]) throws IOException` directly; it only writes the bytes passed in, without a second encode or compression, and exceptions are the caller's responsibility. The existing `save` keeps reporting success or failure as a boolean and logs the full exception on failure.

```java
byte[] bytes = FileAccess.NBT_COMPRESSED.encode(MyData.CODEC, data).orElseThrow();
// Check the byte budget or compute a digest before committing these exact bytes.
FileAccess.write(path, bytes);
```

New NBT uses vanilla's `NbtIo.writeUnnamedTag`, keeping the root type and the empty-name field so regular NBT editors can read it. On read, compression is detected by the GZIP magic number, and the omitted-root-name format produced by the earlier `writeAnyTag` is supported; every parse must consume the root data completely, to avoid reading a fake empty object after a misalignment. A read error is only logged when every format attempt fails, and successfully reading a compatible old file produces no warning. Reading never rewrites the file; saving afterwards through any entry point writes that entry point's compression mode and standard header.

NBT byte handling is isolated in the package-private `NbtFiles`, which does not inherit from `FileAccess`; the NBT singletons are created through private anonymous adapters, avoiding a parent static initialization that references an independently initializable named subclass. The public `FileAccess` type, its existing methods and the JSON behavior are preserved.

2026-11-08 build record: `gradlew compileJava jar --console=plain` passes; the IDE's static checks on `FileAccess` and `NbtFiles` no longer report class-loading deadlock warnings. The game was not started and no tests were run, so opening in real external editors, restoring old files and the compression round trip have not yet gone through acceptance testing.

Atomic save is a newly added API that will ship with the next Saturn update, without changing the version number or downstream dependencies. System currently keeps its own `AtomicFiles`; after upgrading to a dependency that includes this API, `AtomicFiles.replace(path, bytes)` can be replaced with `FileAccess.write(path, bytes)` and the duplicate implementation removed. The earlier active cleanup of the fixed-name `.tmp` should be removed along with it, since Saturn now cleans up the new temporary file when the save method exits.

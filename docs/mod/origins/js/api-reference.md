---
sidebar_position: 1
---

# API Reference

## JS Action / Condition Types

All custom types use the `origins_js:` namespace prefix. For the standard types these wrap, see the corresponding documentation:

| JSON `type` | Registration Method | Callback Args | Standard Docs |
|-------------|---------------------|---------------|---------------|
| `origins_js:js_entity_action` | `registerEntityAction` | `(entity, params)` | [Entity Action](../types/action/entity_action_types) |
| `origins_js:js_block_action` | `registerBlockAction` | `(level, pos, direction, params)` | [Block Action](../types/action/block_action_types) |
| `origins_js:js_item_action` | `registerItemAction` | `(level, entity, slotAccess, params)` | [Item Action](../types/action/item_action_types) |
| `origins_js:js_bientity_action` | `registerBiEntityAction` | `(actor, target, params)` | [Bi-entity Action](../types/action/bientity_action_types) |
| `origins_js:js_entity_condition` | `registerEntityCondition` | `(entity, params) => bool` | [Entity Condition](../types/condition/entity_condition_types) |
| `origins_js:js_block_condition` | `registerBlockCondition` | `(level, pos, params) => bool` | [Block Condition](../types/condition/block_condition_types) |
| `origins_js:js_item_condition` | `registerItemCondition` | `(level, itemStack, params) => bool` | [Item Condition](../types/condition/item_condition_types) |
| `origins_js:js_bientity_condition` | `registerBiEntityCondition` | `(actor, target, params) => bool` | [Bi-entity Condition](../types/condition/bientity_condition_types) |
| `origins_js:js_biome_condition` | `registerBiomeCondition` | `(biomeHolder, pos, params) => bool` | [Biome Condition](../types/condition/biome_condition_types) |
| `origins_js:js_damage_condition` | `registerDamageCondition` | `(damageSource, amount, params) => bool` | [Damage Condition](../types/condition/damage_condition_types) |
| `origins_js:js_fluid_condition` | `registerFluidCondition` | `(fluidState, params) => bool` | [Fluid Condition](../types/condition/fluid_condition_types) |
| `origins_js:js_power` | `powerBuilder(id).grant/.../...register()` | Builder: `.grant((holder, params) => ...)` | [Power Types](../types/power) |

---

## HolderWrapper API

:::warning

Using [`HelperWrapper`](#helperwrapper-api-recommended) is **recommended** for querying and manipulating power state. It uses the new PowerHelper API internally, which is safer and more flexible than the older HolderWrapper methods.

:::

Available methods on the wrapper returned by `OriginsJS.getHolder(entity)`:

### Origin Management

See [Origin JSON Format](../json/origin) and [Layer JSON Format](../json/layer) for data structure details.

| Method | Description |
|--------|-------------|
| `setOrigin(layerId, originId)` | Assign an origin to a layer |
| `clearOrigin(layerId)` | Remove the origin from a layer |
| `hasOrigin(originId)` | Check if entity has the given origin (in any layer) |
| `hasOriginInLayer(layerId, originId)` | Check in a specific layer |
| `hasLayer(layerId)` | Check if the layer has any origin |
| `getOriginId(layerId)` | Get the origin ID string for a layer, or `null` |
| `getAllOrigins()` | Returns `[[layerId, originId], ...]` |
| `hasAllOrigins()` | Whether all layers are assigned |
| `fillAutoChoosing()` | Fill auto-choosing layers |
| `randomOrigin(layerId)` | Randomly assign an origin |

### Power Management

See [Power JSON Format](../json/power) for data structure details. See [`/power` command](../misc/commands/power) for command equivalents.

| Method | Description |
|--------|-------------|
| `grantPower(source, powerId)` | Grant a power from a source |
| `revokePower(source, powerId)` | Revoke a power from a source |
| `revokeAllPowers(source)` | Remove all powers from a source |
| `hasPower(powerId)` | Check whether the entity has a power |
| `getAllPowerIds()` | List all power ID strings |

### Resource (Integer resource bar)

See [Resource (Power Type)](../types/power/regular#originsresource) for the underlying power type.

| Method | Description |
|--------|-------------|
| `getResource(powerId)` | Get the current resource value |
| `setResource(powerId, value)` | Set the resource to a specific int |
| `addResource(powerId, delta)` | Add/subtract to the resource |

### Cooldown (Usage cooldown timer)

See [Cooldown (Power Type)](../types/power/regular#originscooldown) for the underlying power type.

| Method | Description |
|--------|-------------|
| `getCooldown(powerId)` | Get remaining cooldown ticks |
| `startCooldown(powerId)` | Start the cooldown |
| `canUseCooldown(powerId)` | Check whether the cooldown is ready |

### Entity Set (Per-power entity tracking set)

See [Action On Set (Entity Action)](../types/action/entity_action_types#originsaction_on_set) and [Set Size (Condition)](../types/condition/entity_condition_types#originsset_size) for types that interact with entity sets.

| Method | Description |
|--------|-------------|
| `addToEntitySet(powerId, uuid)` | Add an entity (by UUID string) |
| `removeFromEntitySet(powerId, uuid)` | Remove an entity |
| `isInEntitySet(powerId, uuid)` | Check if an entity is in the set |
| `getEntitySetSize(powerId)` | Get the number of entities in the set |
| `getEntitySetMembers(powerId)` | Get all UUID strings in the set |

---

## HelperWrapper API (Recommended)

Available on the wrapper returned by `OriginsJS.getHelper(entity)` or `holder.getHelper()`.
Uses the new PowerHelper API internally. This is the **recommended** way to query and manipulate power state.

### Active State

| Method | Description |
|--------|-------------|
| `anyActive()` | Check if ANY power is currently active |
| `noneActive()` | Check if no power is currently active |
| `hasActive(powerId)` | Check if a specific power (by ID) has any active instance |
| `hasNoneActive(powerId)` | Check if a specific power has no active instances |

### Toggle

| Method | Description |
|--------|-------------|
| `toggle(key)` | Toggle a power by key (e.g. `"primary"`, `"secondary"`) |

### Stream / List / GetFirst

| Method | Description |
|--------|-------------|
| `streamActive(powerId)` | Stream all active instances of the power type |
| `listActive(powerId)` | List all active instances |
| `listActive(powerId, filter)` | List active instances matching a predicate |
| `getFirst(powerId)` | Get the first active instance, or `null` |
| `getFirst(powerId, filter)` | Get the first active instance matching a predicate, or `null` |

### Execute

`execute(powerId, (holder, power) => { ... })` — Run a callback on every active instance.

| Method | Description |
|--------|-------------|
| `execute(powerId, action)` | Execute callback on every active instance |
| `execute(powerId, filter, action)` | Execute callback on matching active instances |

The callback receives `(OriginDataHolder, Power)`.

### Modify

Apply modifier power effects to a base value. Only works on powers that implement `ModifierPowerHelper` (e.g. `origins:modify_attribute`).

| Method | Description |
|--------|-------------|
| `modifyInt(powerId, base)` | Modify an int base value |
| `modifyInt(powerId, filter, base)` | Modify int with predicate filter |
| `modifyFloat(powerId, base)` | Modify a float base value |
| `modifyFloat(powerId, filter, base)` | Modify float with predicate filter |
| `modifyDouble(powerId, base)` | Modify a double base value |
| `modifyDouble(powerId, filter, base)` | Modify double with predicate filter |

### Reduce

Fold over all active instances, accumulating a result.

| Method | Description |
|--------|-------------|
| `reduceDouble(powerId, identity, reducer)` | Reduce double. reducer: `(holder, acc, power) => newAcc` |
| `reduce(powerId, identity, reducer, combiner)` | Generic reduce with custom type and combiner |

### Apply Modifiers

Apply a list of Modifiers to a base value.

| Method | Description |
|--------|-------------|
| `applyModifiers(modifiers, base)` | Apply modifiers (int/float/double) |

### Component Access

| Method | Description |
|--------|-------------|
| `getComponent(powerId, class)` | Get a component attached to a power, or `null` |
| `getComponentFor(power, class)` | Get component from a specific power instance |
| `getComponentHolder(powerId, class)` | Get a component holder, or `null` |

### Resource / Cooldown / Entity Set

Same as HolderWrapper, available directly:

| Method | Description |
|--------|-------------|
| `getResource(powerId)` / `setResource(powerId, value)` / `addResource(powerId, delta)` | Resource management |
| `getCooldown(powerId)` / `startCooldown(powerId)` / `canUseCooldown(powerId)` | Cooldown management |
| `addToEntitySet(powerId, uuid)` / `removeFromEntitySet(powerId, uuid)` / `isInEntitySet(powerId, uuid)` / `getEntitySetSize(powerId)` / `getEntitySetMembers(powerId)` | Entity Set management |

---

## Static Shortcut Methods

```javascript
OriginsJS.getPlayerHolder(player)
OriginsJS.getHelper(entity)            // Get HelperWrapper directly
OriginsJS.grantPower(entity, source, powerId)
OriginsJS.revokePower(entity, source, powerId)
OriginsJS.hasPower(entity, powerId)
OriginsJS.setOrigin(entity, layerId, originId)
OriginsJS.hasOrigin(entity, originId)
OriginsJS.powerBuilder("mypack:power").grant(...).tick(...).register()

// Resource
OriginsJS.getResource(entity, powerId)
OriginsJS.setResource(entity, powerId, value)
OriginsJS.addResource(entity, powerId, delta)

// Cooldown
OriginsJS.getCooldown(entity, powerId)
OriginsJS.startCooldown(entity, powerId)
OriginsJS.canUseCooldown(entity, powerId)

// Entity Set
OriginsJS.addToEntitySet(entity, powerId, uuid)
OriginsJS.removeFromEntitySet(entity, powerId, uuid)
OriginsJS.isInEntitySet(entity, powerId, uuid)
OriginsJS.getEntitySetSize(entity, powerId)

// PowerHelper shortcuts
OriginsJS.anyPowerActive(entity)
OriginsJS.noPowerActive(entity)
OriginsJS.togglePower(entity, key)
```

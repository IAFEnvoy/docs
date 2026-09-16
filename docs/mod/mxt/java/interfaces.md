---
title: "Interfaces"
description: "The public interfaces a Java addon implements: SpiritAccess, SpiritItemAccess, Cost and HotbarEntry."
sidebar_position: 3
---

# Interfaces

These are the interfaces a Java addon implements or consumes directly. They are the seams between the framework and your content: aura exchange, item charge, costs and the client hotbar.

## Overview

| Interface | Purpose |
|-----------|---------|
| `SpiritAccess` | The aura access interface implemented by block entities such as display stands and containers. |
| `SpiritItemAccess` | The interface implemented by chargeable items. |
| `Cost` | The abstraction for what an ability, a formation or another action consumes. |
| `HotbarEntry` | A pure client-side entry rendered by the shared hotbar. |

## `SpiritAccess`

The aura access interface implemented by block entities such as display stands and containers. `add` and `extract` handle one aura type at a time and return the amount that is left after the operation; `simulate=true` only simulates and does not change any state.

| Member | Description |
|--------|-------------|
| `Object2IntMap<Holder<Resource>> getCapacity(@Nullable LivingEntity entity)` | Returns the data-driven capacity for each resource this target can accept. |
| `int add(@Nullable LivingEntity entity, Holder<Resource> resource, int amount, boolean simulate)` | Attempts to move one resource; the return value is the unaccepted remainder. |
| `int extract(@Nullable LivingEntity entity, Holder<Resource> resource, int amount, boolean simulate)` | Attempts to extract one resource; the return value is the unavailable remainder. |
| `static int requireNonNegative(int amount)` | Rejects a negative amount with an `IllegalArgumentException`. |

## `SpiritItemAccess`

The interface implemented by chargeable items. Besides the aura type, the add and extract operations and the simulate parameter, the capacity is computed dynamically from the item through `getCapacity`, so a capacity must never be hard-coded in Java.

| Member | Description |
|--------|-------------|
| `Object2IntMap<Holder<Resource>> getCapacity(@Nullable LivingEntity entity, ItemStack stack)` | Returns the current data-driven capacity of this stack, including every item in the stack. |
| `int add(@Nullable LivingEntity entity, ItemStack stack, Holder<Resource> resource, int amount, boolean simulate)` | Attempts to add one resource to this stack; the return value is the unaccepted remainder. |
| `int extract(@Nullable LivingEntity entity, ItemStack stack, Holder<Resource> resource, int amount, boolean simulate)` | Attempts to extract one resource from this stack; the return value is the unavailable remainder. |

:::info

Because the capacity comes from the item's own data rather than from the Java class, two stacks of the same item can report different capacities when their data differ. `SpiritItemAccess` is also what the spirit storage tooltip and the `SpiritStorageNotFullCondition` condition read.

:::

## `Cost`

The abstraction for what an ability, a formation or another action consumes. It provides player-facing check and consume methods, and a new cost type must be dispatched through the built-in registry rather than by writing a Java class name into JSON.

| Member | Description |
|--------|-------------|
| `boolean check(Player player)` | Returns whether the player can pay this cost. |
| `void consume(Player player)` | Consumes the cost from the player. |
| `MapCodec<? extends Cost> codec()` | The codec of the concrete cost type. |
| `Codec<Cost> TYPED_CODEC` | The type-dispatched codec read from the `type` field. |
| `Codec<Cost> CODEC` | The codec used by data files; it also accepts the legacy resource shorthand `{ "id": ..., "amount": ... }` next to a typed cost. |
| `Codec<List<Cost>> LIST_CODEC` | A list of costs, used by the fields that accept several costs at once. |

Register a new cost type through `MxtRegistries.COST_TYPE`, as shown in [Registries and Data Tables](./registries.md).

## `HotbarEntry`

The pure client-side entry interface. It provides a name, an optional icon, an accent colour and the press, held-tick and release callbacks used by the shared hotbar.

| Member | Description |
|--------|-------------|
| `Component name()` | The entry's display name. |
| `Identifier id()` | A stable option ID used by configurable hotbar layouts; may be `null`. |
| `Optional<IconReference> icon()` | An optional icon, either an item or a texture. |
| `int accentColor()` | The accent colour drawn on the entry. |
| `void onPress(Player player)` | Called when the entry is pressed. |
| `void onPressTick(Player player)` | Called every client tick while the entry is held. |
| `void onRelease(Player player)` | Called when the entry is released. |
| `float cooldown(Player player)` | The remaining cooldown fraction; `0` means ready. |
| `boolean canPress(Player player)` | Whether the entry may be pressed at all. |
| `void render(...)` | Draws the entry; override it to change the visuals without changing the shared overlay. |

See [Hotbar Entries](./hotbar.md) for a complete implementation example.

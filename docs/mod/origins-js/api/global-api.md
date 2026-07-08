---
sidebar_position: 1
title: "Global API"
description: "OriginsJS global object — all top-level methods"
---

# Global API

All methods are accessed through the global `OriginsJS` object.

---

## Entity Access

### `getHolder(entity)`

```ts
(entity: Entity) => HolderWrapper | null
```

Returns the [`HolderWrapper`](holder-wrapper) for the given entity. Returns `null` for non-living entities or entities without origin data.

### `getPlayerHolder(player)`

```ts
(player: Player) => HolderWrapper | null
```

Same as `getHolder`, semantically clearer for players.

---

## Power Management

### `grantPower(entity, source, powerId)`

```ts
(entity: Entity, source: string, powerId: string) => void
```

Grants a power to an entity. `source` identifies where the power came from (e.g. `"origins_js:script"`, `"origins:origin"`).

### `revokePower(entity, source, powerId)`

```ts
(entity: Entity, source: string, powerId: string) => void
```

Revokes a previously granted power.

### `hasPower(entity, powerId)`

```ts
(entity: Entity, powerId: string) => boolean
```

Returns `true` if the entity currently has the given power.

---

## Origin Management

### `setOrigin(entity, layerId, originId)`

```ts
(entity: Entity, layerId: string, originId: string) => void
```

Sets the origin for the entity on the given layer.

### `hasOrigin(entity, originId)`

```ts
(entity: Entity, originId: string) => boolean
```

Returns `true` if the entity has the given origin in **any** layer.

---

## Resource &amp; Cooldown

### `getResource(entity, powerId)`

```ts
(entity: Entity, powerId: string) => number
```

Returns the resource value of a power. Always returns `0` on 1.20.1 — use Apoli's built-in Resource power type instead.

### `setResource(entity, powerId, value)`

```ts
(entity: Entity, powerId: string, value: number) => void
```

Not directly supported in 1.20.1.

### `addResource(entity, powerId, delta)`

```ts
(entity: Entity, powerId: string, delta: number) => void
```

Not directly supported in 1.20.1.

### `getCooldown(entity, powerId)`

```ts
(entity: Entity, powerId: string) => number
```

Returns remaining cooldown ticks. Always returns `0` on 1.20.1.

### `startCooldown(entity, powerId)`

```ts
(entity: Entity, powerId: string) => void
```

Not directly supported in 1.20.1.

### `canUseCooldown(entity, powerId)`

```ts
(entity: Entity, powerId: string) => boolean
```

Not directly supported in 1.20.1.

:::note

Resource and cooldown APIs are limited on 1.20.1 due to Origins API constraints. Prefer Apoli's built-in Resource / Cooldown power types when possible.

:::

---

## Power Builder

### `powerBuilder(id)`

```ts
(id: string) => PowerBuilder
```

Returns a [`PowerBuilder`](powers) for registering JS-defined powers.

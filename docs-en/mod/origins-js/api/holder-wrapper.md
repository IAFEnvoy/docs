---
sidebar_position: 2
title: "HolderWrapper"
description: "Per-entity origin & power operations"
---

# HolderWrapper

Returned by [`OriginsJS.getHolder(entity)`](global-api#getholderentity). Wraps the entity's origin and power components.

---

## Origin Methods

### `setOrigin(layerId, originId)`

```ts
(layerId: string, originId: string) => void
```

Sets the origin for a specific layer.

```js
holder.setOrigin("origins:origin", "origins:avian");
```

### `clearOrigin(layerId)`

```ts
(layerId: string) => void
```

Clears the origin from the given layer.

### `hasOrigin(originId)`

```ts
(originId: string) => boolean
```

Returns `true` if the entity has the given origin in **any** layer.

### `hasOriginInLayer(layerId, originId)`

```ts
(layerId: string, originId: string) => boolean
```

Returns `true` if the entity has the given origin in the **specific** layer.

### `hasLayer(layerId)`

```ts
(layerId: string) => boolean
```

Returns `true` if an origin is assigned to that layer.

### `getOriginId(layerId)`

```ts
(layerId: string) => string | null
```

Returns the origin ID for the layer, or `null` if none.

### `getAllOrigins()`

```ts
() => string[][]
```

Returns an array of `[layerId, originId]` pairs.

### `hasAllOrigins()`

```ts
() => boolean
```

Returns `true` if every origin layer has an origin assigned.

---

## Power Methods

### `grantPower(source, powerId)`

```ts
(source: string, powerId: string) => void
```

Grants a power.

```js
holder.grantPower("origins_js:script", "origins:fire_immunity");
```

### `revokePower(source, powerId)`

```ts
(source: string, powerId: string) => void
```

Revokes a power.

### `revokeAllPowers(source)`

```ts
(source: string) => void
```

Revokes **all** powers that were granted from the given source.

### `hasPower(powerId)`

```ts
(powerId: string) => boolean
```

Returns `true` if the entity has the given power.

### `getAllPowerIds()`

```ts
() => string[]
```

Returns all power IDs currently held by the entity.

---

## Resource / Cooldown Methods

| Method | Signature | Notes |
|--------|-----------|-------|
| `getResource(powerId)` | `string => number` | Always `0` on 1.20.1 |
| `setResource(powerId, value)` | `(string, number) => void` | Not supported on 1.20.1 |
| `addResource(powerId, delta)` | `(string, number) => void` | Not supported on 1.20.1 |
| `getCooldown(powerId)` | `string => number` | Always `0` on 1.20.1 |
| `startCooldown(powerId)` | `string => void` | Not supported on 1.20.1 |
| `canUseCooldown(powerId)` | `string => boolean` | Not supported on 1.20.1 |

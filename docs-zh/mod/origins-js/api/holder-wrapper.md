---
sidebar_position: 2
title: "HolderWrapper"
description: "面向单个实体的起源与能力操作"
---

# HolderWrapper

由 [`OriginsJS.getHolder(entity)`](global-api#getholderentity) 返回。它包装了实体的起源组件与能力组件。

---

## 起源方法

### `setOrigin(layerId, originId)`

```ts
(layerId: string, originId: string) => void
```

设置特定起源层上的起源。

```js
holder.setOrigin("origins:origin", "origins:avian");
```

### `clearOrigin(layerId)`

```ts
(layerId: string) => void
```

清除给定起源层上的起源。

### `hasOrigin(originId)`

```ts
(originId: string) => boolean
```

如果实体在 **任意** 起源层中都拥有给定起源，返回 `true`。

### `hasOriginInLayer(layerId, originId)`

```ts
(layerId: string, originId: string) => boolean
```

如果实体在 **特定** 起源层中拥有给定起源，返回 `true`。

### `hasLayer(layerId)`

```ts
(layerId: string) => boolean
```

如果该起源层已分配起源，返回 `true`。

### `getOriginId(layerId)`

```ts
(layerId: string) => string | null
```

返回该起源层的起源 ID，若没有则返回 `null`。

### `getAllOrigins()`

```ts
() => string[][]
```

返回由 `[layerId, originId]` 对组成的数组。

### `hasAllOrigins()`

```ts
() => boolean
```

如果每个起源层都已分配起源，返回 `true`。

---

## 能力方法

### `grantPower(source, powerId)`

```ts
(source: string, powerId: string) => void
```

授予一个能力。

```js
holder.grantPower("origins_js:script", "origins:fire_immunity");
```

### `revokePower(source, powerId)`

```ts
(source: string, powerId: string) => void
```

撤销一个能力。

### `revokeAllPowers(source)`

```ts
(source: string) => void
```

撤销从给定来源授予的 **所有** 能力。

### `hasPower(powerId)`

```ts
(powerId: string) => boolean
```

如果实体拥有给定能力，返回 `true`。

### `getAllPowerIds()`

```ts
() => string[]
```

返回实体当前持有的所有能力 ID。

---

## 资源 / 冷却方法

| 方法 | 签名 | 备注 |
|--------|-----------|-------|
| `getResource(powerId)` | `string => number` | 在 1.20.1 上始终为 `0` |
| `setResource(powerId, value)` | `(string, number) => void` | 1.20.1 不支持 |
| `addResource(powerId, delta)` | `(string, number) => void` | 1.20.1 不支持 |
| `getCooldown(powerId)` | `string => number` | 在 1.20.1 上始终为 `0` |
| `startCooldown(powerId)` | `string => void` | 1.20.1 不支持 |
| `canUseCooldown(powerId)` | `string => boolean` | 1.20.1 不支持 |

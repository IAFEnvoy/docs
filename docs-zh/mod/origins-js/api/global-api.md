---
sidebar_position: 1
title: "全局 API"
description: "OriginsJS 全局对象 —— 所有顶层方法"
---

# 全局 API

所有方法都通过全局 `OriginsJS` 对象访问。

---

## 实体访问

### `getHolder(entity)`

```ts
(entity: Entity) => HolderWrapper | null
```

返回给定实体对应的 [`HolderWrapper`](holder-wrapper)。对于非生物实体或没有起源数据的实体，返回 `null`。

### `getPlayerHolder(player)`

```ts
(player: Player) => HolderWrapper | null
```

与 `getHolder` 相同，但对玩家而言语义更清晰。

---

## 能力管理

### `grantPower(entity, source, powerId)`

```ts
(entity: Entity, source: string, powerId: string) => void
```

向实体授予一个能力。`source` 用于标识该能力的来源（例如 `"origins_js:script"`、`"origins:origin"`）。

### `revokePower(entity, source, powerId)`

```ts
(entity: Entity, source: string, powerId: string) => void
```

撤销先前授予的能力。

### `hasPower(entity, powerId)`

```ts
(entity: Entity, powerId: string) => boolean
```

如果实体当前拥有给定能力，返回 `true`。

---

## 起源管理

### `setOrigin(entity, layerId, originId)`

```ts
(entity: Entity, layerId: string, originId: string) => void
```

设置实体在指定起源层上的起源。

### `hasOrigin(entity, originId)`

```ts
(entity: Entity, originId: string) => boolean
```

如果实体在 **任意** 起源层中拥有给定起源，返回 `true`。

---

## 资源与冷却

### `getResource(entity, powerId)`

```ts
(entity: Entity, powerId: string) => number
```

返回能力的资源值。在 1.20.1 上始终返回 `0` —— 请改用 Apoli 内置的 Resource 能力类型。

### `setResource(entity, powerId, value)`

```ts
(entity: Entity, powerId: string, value: number) => void
```

在 1.20.1 上不直接支持。

### `addResource(entity, powerId, delta)`

```ts
(entity: Entity, powerId: string, delta: number) => void
```

在 1.20.1 上不直接支持。

### `getCooldown(entity, powerId)`

```ts
(entity: Entity, powerId: string) => number
```

返回剩余的冷却 tick 数。在 1.20.1 上始终返回 `0`。

### `startCooldown(entity, powerId)`

```ts
(entity: Entity, powerId: string) => void
```

在 1.20.1 上不直接支持。

### `canUseCooldown(entity, powerId)`

```ts
(entity: Entity, powerId: string) => boolean
```

在 1.20.1 上不直接支持。

:::note

由于 Origins API 的限制，资源与冷却相关 API 在 1.20.1 上功能有限。条件允许时，请优先使用 Apoli 内置的 Resource / Cooldown 能力类型。

:::

---

## 能力构建器

### `powerBuilder(id)`

```ts
(id: string) => PowerBuilder
```

返回一个 [`PowerBuilder`](powers)，用于注册由 JS 定义的能力。

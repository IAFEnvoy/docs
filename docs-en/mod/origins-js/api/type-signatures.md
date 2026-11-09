---
sidebar_position: 6
title: "Type Signatures"
description: "TypeScript-style signatures for IDE users"
---

# Type Signatures

TypeScript-style signatures for IDE / documentation reference.

---

## `OriginsJS`

```ts
interface OriginsJS {
    // Entity access
    getHolder(entity: Entity): HolderWrapper | null;
    getPlayerHolder(player: Player): HolderWrapper | null;

    // Power management
    grantPower(entity: Entity, source: string, powerId: string): void;
    revokePower(entity: Entity, source: string, powerId: string): void;
    hasPower(entity: Entity, powerId: string): boolean;

    // Origin management
    setOrigin(entity: Entity, layerId: string, originId: string): void;
    hasOrigin(entity: Entity, originId: string): boolean;

    // Resource
    getResource(entity: Entity, powerId: string): number;
    setResource(entity: Entity, powerId: string, value: number): void;
    addResource(entity: Entity, powerId: string, delta: number): void;

    // Cooldown
    getCooldown(entity: Entity, powerId: string): number;
    startCooldown(entity: Entity, powerId: string): void;
    canUseCooldown(entity: Entity, powerId: string): boolean;

    // Actions
    registerEntityAction(id: string, cb: (entity: Entity, params: JsonObject) => void): void;
    registerBlockAction(id: string, cb: (world: Level, pos: BlockPos, direction: Direction | null, params: JsonObject) => void): void;
    registerItemAction(id: string, cb: (world: Level, entity: Entity | null, slot: SlotAccess | null, params: JsonObject) => void): void;
    registerBiEntityAction(id: string, cb: (actor: Entity, target: Entity, params: JsonObject) => void): void;

    // Conditions
    registerEntityCondition(id: string, pred: (entity: Entity, params: JsonObject) => boolean): void;
    registerBlockCondition(id: string, pred: (world: Level, pos: BlockPos, params: JsonObject) => boolean): void;
    registerItemCondition(id: string, pred: (world: Level, stack: ItemStack, params: JsonObject) => boolean): void;
    registerBiEntityCondition(id: string, pred: (actor: Entity, target: Entity, params: JsonObject) => boolean): void;
    registerBiomeCondition(id: string, pred: (biome: Holder<Biome>, pos: BlockPos, params: JsonObject) => boolean): void;
    registerDamageCondition(id: string, pred: (source: DamageSource, amount: number, params: JsonObject) => boolean): void;
    registerFluidCondition(id: string, pred: (state: FluidState, params: JsonObject) => boolean): void;

    // Power
    powerBuilder(id: string): PowerBuilder;
}
```

---

## `HolderWrapper`

```ts
interface HolderWrapper {
    setOrigin(layerId: string, originId: string): void;
    clearOrigin(layerId: string): void;
    hasOrigin(originId: string): boolean;
    hasOriginInLayer(layerId: string, originId: string): boolean;
    hasLayer(layerId: string): boolean;
    getOriginId(layerId: string): string | null;
    getAllOrigins(): string[][];
    hasAllOrigins(): boolean;

    grantPower(source: string, powerId: string): void;
    revokePower(source: string, powerId: string): void;
    revokeAllPowers(source: string): void;
    hasPower(powerId: string): boolean;
    getAllPowerIds(): string[];

    getResource(powerId: string): number;
    setResource(powerId: string, value: number): void;
    addResource(powerId: string, delta: number): void;
    getCooldown(powerId: string): number;
    startCooldown(powerId: string): void;
    canUseCooldown(powerId: string): boolean;
}
```

---

## `PowerBuilder`

```ts
interface PowerBuilder {
    grant(cb: (entity: LivingEntity, params: JsonObject) => void): PowerBuilder;
    revoke(cb: (entity: LivingEntity, params: JsonObject) => void): PowerBuilder;
    tick(cb: (entity: LivingEntity, params: JsonObject) => void): PowerBuilder;
    active(cb: (entity: LivingEntity, params: JsonObject) => void): PowerBuilder;
    inactive(cb: (entity: LivingEntity, params: JsonObject) => void): PowerBuilder;
    isActive(pred: (entity: LivingEntity, params: JsonObject) => boolean): PowerBuilder;
    register(): void;
}
```

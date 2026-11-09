---
title: Souls
description: Create souls on death or through commands, preserve entity snapshots, display apparitions and configure their lifetime.
---

# Souls

<span id="souls" />

A soul is an independent apparition captured from a living entity or player. Its snapshot retains the original type, UUID, name, equipment, inventory, attributes and mod data serialized with that entity. Players also retain the profile used for their skin. Player statistics, advancements and other mods' separate databases are outside this snapshot.

Souls are created by default when creatures or players die, with snapshots captured before death drops. Disable automatic creation with **Server Config → Souls → Create souls on death**. Death drops still follow vanilla rules.

Explicit creation through commands does not kill the original entity, move items or change a player's game mode. It also works when death generation is disabled.

## Create and reclaim {#create-and-reclaim}

These commands require permission level 2. Omitting the target selects yourself.

```mcfunction
/mxt soul create
/mxt soul create @e[type=minecraft:sheep,sort=nearest,limit=1]
/mxt soul reclaim
/mxt soul reclaim @e[type=minecraft:sheep,sort=nearest,limit=1]
```

An original entity can have one active soul at a time; another death does not create a duplicate while that soul is valid. To reclaim it, select the original entity and ensure the soul's chunk is loaded. The command does not force chunks to load.

Reclaiming removes the soul and clears the original entity's association. It does not restore a body or copy equipment or inventory back. Do not substitute `/kill` for reclaiming: it cannot clear the original entity's association.

## Lifetime {#lifetime}

**Server Config → Souls → Soul lifetime** defaults to `6000` game ticks (about 5 minutes at 20 TPS); `0` keeps souls permanently. This applies to souls created on death or through commands, including existing souls when the setting changes.

The clock uses server game time. Time passes while a chunk is unloaded or a player is offline, but stops while the server is shut down. Loaded souls check expiry in their tick; unloaded souls disappear on their first tick after loading. No chunks are force-loaded.

Expiry also clears the original entity's association. If that entity is unavailable, cleanup occurs when it loads, logs in, or next attempts to create or reclaim a soul. Expiry is automatic cleanup: it does not fire cancellable reclaim events or return items from the snapshot.

## Appearance and persistence {#appearance-and-persistence}

The apparition shows the body's outline in translucent pale cyan. Ordinary creatures retain their model and variant; players use the skin associated with their saved profile. It gently floats, runs no AI, takes no damage and has no collision. Its chunk unloads and saves normally.

The complete snapshot stays on the server. Clients receive appearance information, without the inventory or complete attachments. Equipment remains in the saved snapshot; held items, name tags, leashes, fire and independent particles are omitted from the apparition. Entities with a dedicated rendering path or an unavailable original appearance show a generic apparition.

## Related {#related}

- [Administrator commands](./commands/mxt.md)
- [Script reclaim interface](../kubejs/api/souls.md)

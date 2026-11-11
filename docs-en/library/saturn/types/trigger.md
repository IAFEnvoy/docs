---
title: "Trigger"
sidebar_position: 23
---

# Trigger

A trigger matches published server signals. It can be used in trigger rules or triggered abilities; registration itself does not perform any action. See the [trigger lifecycle](../guides/triggers.md).

### `saturn:advancement_completed` {#saturnadvancement_completed}

Publishes a signal when a whole Minecraft advancement is completed, optionally filtered by advancement ID.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:advancement_completed` |
| `advancement` | Resource ID | no | omitted | Minecraft advancement ID; when omitted, any advancement completion is accepted. |

New in the current source: the signal is `TriggerSignals.ADVANCEMENT_COMPLETED`, and `TriggerPayload.ADVANCEMENT` holds the `Identifier` of the completed advancement. Hidden advancements and recipe unlocks are included; logging in does not replay existing advancements, and completing an advancement again after it was revoked triggers again. Deduplicating persisted state is the subscriber's responsibility. System has not switched over yet, and the existing `system-advancements.json` keeps its original behavior.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:advancement_completed",
  "advancement": "minecraft:story/mine_diamond"
}
```

</details>

### `saturn:attack` {#saturnattack}

Publishes a signal when an entity attacks a target.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attack` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attack"
}
```

</details>

### `saturn:block_break` {#saturnblock_break}

Publishes a signal when a player breaks a block.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_break` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_break"
}
```

</details>

### `saturn:block_use` {#saturnblock_use}

Publishes a signal when a player interacts with a block.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_use` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_use"
}
```

</details>

### `saturn:bred_animals` {#saturnbred_animals}

Publishes a signal to the relevant players when animals breed successfully.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:bred_animals` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `parent` | Vanilla predicate | no | omitted | Predicate for the parent entity. |
| `partner` | Vanilla predicate | no | omitted | Predicate for the partner entity. |
| `child` | Vanilla predicate | no | omitted | Predicate for the child entity. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:bred_animals"
}
```

</details>

### `saturn:brewed_potion` {#saturnbrewed_potion}

Matches the parameters of the vanilla brewed potion criterion when a player brews a potion.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:brewed_potion` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `potion` | Resource ID | no | omitted | Potion ID. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:brewed_potion"
}
```

</details>

### `saturn:changed_dimension` {#saturnchanged_dimension}

Publishes a signal when a player switches dimension.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:changed_dimension` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `from` | Resource ID | no | omitted | Source dimension ID. |
| `to` | Resource ID | no | omitted | Destination dimension ID. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:changed_dimension"
}
```

</details>

### `saturn:consume_item` {#saturnconsume_item}

Decreases the count of the item stack in the context.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:consume_item` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate that filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:consume_item"
}
```

</details>

### `saturn:death` {#saturndeath}

Publishes a signal when an entity dies.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:death` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:death"
}
```

</details>

### `saturn:effects_changed` {#saturneffects_changed}

Publishes a signal when a player's status effects change.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:effects_changed` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `effects` | Vanilla predicate | no | omitted | List of status effects, or a vanilla effect predicate. |
| `source` | Vanilla predicate | no | omitted | Input collection, resource path or context parameter; see the usage on this page. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:effects_changed"
}
```

</details>

### `saturn:enter_block` {#saturnenter_block}

Polls the block a player enters and matches the block state.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:enter_block` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `block` | Resource ID | no | omitted | Block ID or block argument. |
| `state` | Vanilla predicate | no | omitted | Block state property predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:enter_block"
}
```

</details>

### `saturn:entity_hurt_player` {#saturnentity_hurt_player}

Publishes a signal when a player is hurt by an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entity_hurt_player` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `damage` | Vanilla predicate | no | omitted | Vanilla damage predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:entity_hurt_player"
}
```

</details>

### `saturn:entity_killed_player` {#saturnentity_killed_player}

Publishes a signal when a player is killed by an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entity_killed_player` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `entity` | Vanilla predicate | no | omitted | Vanilla entity predicate. |
| `killing_blow` | Vanilla predicate | no | omitted | Predicate for the fatal damage source. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:entity_killed_player"
}
```

</details>

### `saturn:equip` {#saturnequip}

Publishes a signal when an entity's equipment changes.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:equip` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:equip"
}
```

</details>

### `saturn:fall_after_explosion` {#saturnfall_after_explosion}

Matches the movement caused by an explosion and the fall that follows.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fall_after_explosion` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `start_position` | Vanilla predicate | no | omitted | Predicate for the start position. |
| `distance` | Vanilla predicate | no | omitted | Distance or vanilla distance predicate. |
| `cause` | Vanilla predicate | no | omitted | Predicate for the entity that caused the event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fall_after_explosion"
}
```

</details>

### `saturn:fall_from_height` {#saturnfall_from_height}

Matches signals by the recorded fall start position and distance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fall_from_height` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `start_position` | Vanilla predicate | no | omitted | Predicate for the start position. |
| `distance` | Vanilla predicate | no | omitted | Distance or vanilla distance predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fall_from_height"
}
```

</details>

### `saturn:filled_bucket` {#saturnfilled_bucket}

Matches the resulting item when a player fills a bucket.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:filled_bucket` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:filled_bucket"
}
```

</details>

### `saturn:fishing_rod_hooked` {#saturnfishing_rod_hooked}

Matches the rod, entity and caught item parameters when fishing completes.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fishing_rod_hooked` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `rod` | Vanilla predicate | no | omitted | Item predicate for the fishing rod. |
| `entity` | Vanilla predicate | no | omitted | Vanilla entity predicate. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fishing_rod_hooked"
}
```

</details>

### `saturn:hurt` {#saturnhurt}

Publishes a signal when an entity takes damage.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:hurt` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:hurt"
}
```

</details>

### `saturn:inventory_changed` {#saturninventory_changed}

Matches vanilla item and slot predicates against changes in the inventory snapshot.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:inventory_changed` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `slots` | Vanilla slot range object | no | `{}` | Vanilla inventory slot count predicate. |
| `items` | Vanilla predicate array | no | `[]` | Item matcher entries, item predicates or item lists. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:inventory_changed"
}
```

</details>

### `saturn:item_durability_changed` {#saturnitem_durability_changed}

Matches item durability and the durability delta.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_durability_changed` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |
| `durability` | Number or range object | no | `{}` | The durability parameter of this type. |
| `delta` | Number or range object | no | `{}` | Range of the durability change. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:item_durability_changed"
}
```

</details>

### `saturn:item_use` {#saturnitem_use}

Publishes a signal when an entity finishes using an item.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_use` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:item_use"
}
```

</details>

### `saturn:kill` {#saturnkill}

Publishes a signal when an entity kills another entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:kill` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:kill"
}
```

</details>

### `saturn:levitation` {#saturnlevitation}

Polls the distance and duration of a player's levitation.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:levitation` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `distance` | Vanilla predicate | no | omitted | Distance or vanilla distance predicate. |
| `duration` | Number or range object | no | `{}` | Duration, usually measured in game ticks. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:levitation"
}
```

</details>

### `saturn:lightning_strike` {#saturnlightning_strike}

Matches the involved player, the lightning and nearby entities when a lightning strike occurs.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:lightning_strike` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `lightning` | Vanilla predicate | no | omitted | Lightning entity predicate. |
| `bystander` | Vanilla predicate | no | omitted | Bystander entity predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:lightning_strike"
}
```

</details>

### `saturn:location` {#saturnlocation}

Reads the entity's position and dimension.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:location` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:location"
}
```

</details>

### `saturn:nether_travel` {#saturnnether_travel}

Matches the start position and distance of Nether travel.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:nether_travel` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `start_position` | Vanilla predicate | no | omitted | Predicate for the start position. |
| `distance` | Vanilla predicate | no | omitted | Distance or vanilla distance predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:nether_travel"
}
```

</details>

### `saturn:player_hurt_entity` {#saturnplayer_hurt_entity}

Publishes a signal when a player deals damage to an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:player_hurt_entity` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `damage` | Vanilla predicate | no | omitted | Vanilla damage predicate. |
| `entity` | Vanilla predicate | no | omitted | Vanilla entity predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:player_hurt_entity"
}
```

</details>

### `saturn:player_interacted_with_entity` {#saturnplayer_interacted_with_entity}

Publishes a signal when a player interacts with an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:player_interacted_with_entity` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |
| `entity` | Vanilla predicate | no | omitted | Vanilla entity predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:player_interacted_with_entity"
}
```

</details>

### `saturn:player_killed_entity` {#saturnplayer_killed_entity}

Publishes a signal when a player kills an entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:player_killed_entity` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `entity` | Vanilla predicate | no | omitted | Vanilla entity predicate. |
| `killing_blow` | Vanilla predicate | no | omitted | Predicate for the fatal damage source. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:player_killed_entity"
}
```

</details>

### `saturn:ride_entity_in_lava` {#saturnride_entity_in_lava}

Matches the distance a player travels while riding in lava.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ride_entity_in_lava` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `start_position` | Vanilla predicate | no | omitted | Predicate for the start position. |
| `distance` | Vanilla predicate | no | omitted | Distance or vanilla distance predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ride_entity_in_lava"
}
```

</details>

### `saturn:shot_crossbow` {#saturnshot_crossbow}

Publishes a signal when a player shoots a crossbow.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:shot_crossbow` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:shot_crossbow"
}
```

</details>

### `saturn:slept_in_bed` {#saturnslept_in_bed}

Publishes a signal when a player sleeps in a bed.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:slept_in_bed` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:slept_in_bed"
}
```

</details>

### `saturn:started_riding` {#saturnstarted_riding}

Publishes a signal when a player starts riding.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:started_riding` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in a player model node it is a player UUID parameter. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates and Saturn EntityCondition / ItemCondition are different formats.

Omitting an optional range of the vanilla criterion, or writing an empty range object, means no extra restriction is added for that range; the player predicate still follows the criterion's vanilla format.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:started_riding"
}
```

</details>

### `saturn:tame_animal` {#saturntame_animal}

Publishes a signal when a player successfully tames an animal.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tame_animal` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in the player model node it is the player UUID argument. |
| `entity` | Vanilla predicate | no | omitted | Vanilla entity predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates are a different format from Saturn EntityCondition / ItemCondition.

Omitting an optional range in a vanilla criterion, or writing an empty range object, means no restriction is added for that range; player predicates still follow the vanilla format of that criterion.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:tame_animal"
}
```

</details>

### `saturn:thrown_item_picked_up_by_player` {#saturnthrown_item_picked_up_by_player}

Publishes a signal when a player picks up an item that carries thrower information.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:thrown_item_picked_up_by_player` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in the player model node it is the player UUID argument. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |
| `entity` | Vanilla predicate | no | omitted | Vanilla entity predicate. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates are a different format from Saturn EntityCondition / ItemCondition.

Omitting an optional range in a vanilla criterion, or writing an empty range object, means no restriction is added for that range; player predicates still follow the vanilla format of that criterion.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:thrown_item_picked_up_by_player"
}
```

</details>

### `saturn:tick` {#saturntick}

Publishes a signal on each server-side entity tick.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tick` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:tick"
}
```

</details>

### `saturn:used_totem` {#saturnused_totem}

Publishes a signal when a player consumes a totem to avoid death.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:used_totem` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in the player model node it is the player UUID argument. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates are a different format from Saturn EntityCondition / ItemCondition.

Omitting an optional range in a vanilla criterion, or writing an empty range object, means no restriction is added for that range; player predicates still follow the vanilla format of that criterion.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:used_totem"
}
```

</details>

### `saturn:using_item` {#saturnusing_item}

Publishes a signal while an entity is using an item.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:using_item` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in the player model node it is the player UUID argument. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates are a different format from Saturn EntityCondition / ItemCondition.

Omitting an optional range in a vanilla criterion, or writing an empty range object, means no restriction is added for that range; player predicates still follow the vanilla format of that criterion.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:using_item"
}
```

</details>

### `saturn:villager_trade` {#saturnvillager_trade}

Publishes a signal when a player completes a trade with a villager.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:villager_trade` |
| `player` | Vanilla predicate | no | omitted | Vanilla player predicate; in the player model node it is the player UUID argument. |
| `villager` | Vanilla predicate | no | omitted | Villager entity predicate. |
| `item` | Vanilla predicate | no | omitted | Vanilla ItemPredicate, filters the item in this event. |

The parameters reuse the Codec of the corresponding Minecraft 26.1.2 criterion, but the signal is published by Saturn and does not create or grant vanilla advancements. Vanilla player / entity / item predicates are a different format from Saturn EntityCondition / ItemCondition.

Omitting an optional range in a vanilla criterion, or writing an empty range object, means no restriction is added for that range; player predicates still follow the vanilla format of that criterion.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:villager_trade"
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:js` {#saturnjs}

Calls a callback registered by KubeJS and passes the params argument.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:js` |
| `signal` | Resource ID | yes | — | ID of the signal the script trigger subscribes to. |
| `id` | String | yes | — | Identifier of the callback, option or entry. |
| `params` | Object | no | `{}` | Parameter object passed to the script or formula. |

Registered only when KubeJS is installed. The JSON only selects an existing callback; it never executes JavaScript strings from the JSON directly.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:js",
  "signal": "saturn:tick",
  "id": "example_callback",
  "params": {}
}
```

</details>

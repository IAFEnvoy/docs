---
title: "Triggers and Subscriptions"
sidebar_position: 1
---

A trigger consists of two parts: "a game event publishes a signal" and "a rule or subscription matches the signal". `Trigger` stores only the matching parameters, while `TriggerRule` combines matching with conditions, chance, cooldown and entity actions.

## Responding to events with a data pack

```json title="data/example/saturn/trigger/first_diamond.json"
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

For the structure see [Trigger rules](../data/trigger.md); for every matching type see the [trigger catalogue](../types/trigger/index.md). Vanilla criterion port types reuse the JSON parameters of the corresponding criterion: Saturn bridges the event or polls the state and does not create advancements.

## Java subscriptions

```java
TriggerDispatcher.register(new TriggerSubscription(
        player.getUUID(), "example:module", "first_diamond",
        new AdvancementCompletedTrigger(
                Optional.of(Identifier.parse("minecraft:story/mine_diamond"))),
        signal -> true,
        signal -> handleCompletion(player, signal),
        false
));
```

`owner` is the player or entity UUID; `module` and `identity` only need to be unique within this owner. The gate additionally filters matching results; the listener runs synchronously on the server, so expensive requests should be handed to the caller's worker thread. `oneShot=true` consumes this in-memory subscription after the callback returns successfully; it does not mean the persisted business has already completed.

Clean up your own subscriptions with `clearModule(owner, module)`. Subscriptions are not saved to disk; after an entity joins, the server starts or a data pack reloads, rebuild them from the state saved by the host with `TriggerRehydrateEvent.rehydrate(module, rebuild)`; Saturn clears the index when an entity leaves and when the server shuts down.

## Publishing custom signals

`TriggerPublishing.publish(type, actor, FormulaContext, enrich)` first checks the listeners and then builds the context. `TriggerContext` contains actor, target, level, position, item, block, damageSource and formula values; extra objects use namespaced payload keys. `TriggerDispatcher.publish` handles data pack rules first and then the actor's subscriptions, filtering out FakePlayer.

## Boundaries of advancement events

`saturn:advancement_completed` is published when the whole advancement completes. The payload's `TriggerPayload.ADVANCEMENT` is an `Identifier`. Omitting the filter ID includes hidden advancements and recipe unlocks. It is not re-sent on login; completing an advancement again after it was revoked publishes again.

System still uses its own advancement rules, binding baseline and event ledger; this entry point is reserved in the current Saturn source and has not yet replaced System's listener. If the business requires that a reward is only granted once, the business storage should record an idempotency key instead of relying only on oneShot.

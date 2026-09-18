---
title: "Trigger Rule (trigger)"
description: "Datapack event rules: react to a published signal by running a condition and an action on its actor."
---

# Trigger Rule (trigger)

A `trigger` entry is a standalone event reaction. When a signal is published, every rule whose trigger matches it evaluates its condition against the actor and, if the condition holds, runs its action. That is the whole feature: no ability has to own the reaction, so a content pack can turn any published signal into an effect — for example "when a block is broken, add `1` to a resource".

:::info Trigger rules, trigger matchers and signals
Three things share the word *trigger* and they are not the same thing:

- **A rule** (this page, `mxt/trigger`) is data: signal matcher + condition + action.
- **A trigger matcher** is the intrinsic [`mxt:trigger_type`](../../java/registries.md) registry: how a signal is matched. The built-in matchers are one per signal (`mxt:tick`, `mxt:attack`, `mxt:block_break`, …) and `mxt:js` lets a script match anything it likes. Abilities use the same matchers for the triggers they own.
- **A signal** is the runtime notification itself. MiXianTu publishes one per event (`mxt:tick`, `mxt:hurt`, `mxt:breakthrough`, …) and scripts can publish their own through the KubeJS runtime API.
:::

## File Location

Trigger rule files go in `data/<namespace>/mxt/trigger/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/trigger/qi_from_mining.json` has the ID `example:qi_from_mining`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `trigger` | `Trigger` | **required** | Which signal this rule reacts to, written like an ability trigger: `{"type": "mxt:block_break"}` for a built-in signal, or a scripted matcher that inspects the whole signal. |
| `condition` | `EntityCondition` | `mxt:always_true` | Evaluated against the signal's actor with the event's formula context. One condition or an array, which requires all of them. |
| `action` | `EntityAction` | `mxt:no_op` | Runs for the actor once the condition holds. One action or an array, which runs in order. |

A rule needs an actor. Signals published without one reach subscriptions but never a rule, because both the condition and the action belong to one entity.

The condition and the action receive the event context as their parent context, so the formula values the publisher put into it are readable: a rule reacting to `mxt:hurt` can size its effect with `damage`, and a script that publishes a custom signal with `MxtTriggers` can read its own payload the same way.

## Example

```json
// data/example/mxt/trigger/qi_from_mining.json
{
  "trigger": {"type": "mxt:block_break"},
  "condition": {"type": "mxt:health", "comparison": ">=", "compare_to": 1},
  "action": {"type": "mxt:add_resource", "resource": "example:qi", "amount": 1}
}
```

```json
// data/example/mxt/trigger/qi_from_damage.json
{
  "trigger": {"type": "mxt:hurt"},
  "condition": {"type": "mxt:resource_compare", "resource": "example:qi", "min": 10},
  "action": {"type": "mxt:add_resource", "resource": "example:qi", "amount": "damage / 2"}
}
```

:::note How a rule is dispatched
Rules are indexed by the signal their trigger names while the server cache is built, so publishing a signal costs one map lookup and rules of other signals are not touched. A rule that publishes a signal its own action reacts to is skipped while it is already running, which keeps a self-triggering rule from recursing; a rule that throws is logged and does not stop the other rules or the subscriptions of that signal.
:::

:::tip Adding a resource is not the only action
`action` is the shared entity action list, so a rule can grant an ability, apply a curse, play a sound, run a sequence, or use `mxt:chance` and `mxt:if_else` to make the reaction conditional. See [Entity Action Types](../types/action/entity_action_types.md).
:::

:::tip Growing a technique's mastery
A rule is the natural place to grow the resource a [cultivation technique](./technique.md#advancement) measures its mastery with — that is what makes the technique advance without any code. The reverse direction works too: a technique that reaches a new level publishes `mxt:technique_stage`, so a rule can react to the promotion itself, with `stage` (the rank reached) available as a formula value.
:::

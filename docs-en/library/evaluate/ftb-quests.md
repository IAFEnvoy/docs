---
title: FTB Quests
description: Infer item acquisition costs from repeatable FTB Quests tasks that consume items and grant fixed rewards.
sidebar_position: 5
---

Optionally install **FTB Quests `26.1.2.8+`** and its dependencies. Evaluate's built-in `evaluate:ftb_quests` instance reads the server's loaded quest book. Without FTB Quests, it contributes no relationships and other evaluators continue to work.

## Configuration

Replace the built-in file to change its settings:

```json title="data/evaluate/evaluate/evaluator/ftb_quests.json"
{
  "type": "evaluate:ftb_quests",
  "repeatable_only": true,
  "extra_value": 0.0
}
```

| Field | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | Yes | — | `evaluate:ftb_quests`. |
| `repeatable_only` | Boolean | No | `true` | Require the effective repeatability setting, including chapter defaults. |
| `extra_value` | Finite, nonnegative `double` | No | `0` | Extra cost per exchange, divided across the reward count. |
| `comment` | String | No | — | Optional description. |

Set `repeatable_only` to `false` to include one-time item-consuming quests. Their rewards are available only a limited number of times, so the resulting candidates do not represent sustainable acquisition.

## Eligible exchanges

The whole quest must satisfy these rules:

- Every required task is a built-in FTB item task that actually consumes items. Inherited chapter and global consumption settings are respected.
- Optional tasks are excluded from the input cost, and at least one required input remains.
- Every reward is a built-in fixed item reward, without `random_bonus` or conditional `only_one` behavior.
- Item stacks are valid, and input tasks do not use custom item filters or crafting-only restrictions.

The entire quest is skipped for collection tasks, other required objective types, random or choice rewards, XP, currency, commands, custom rewards, or missing mod items. Mixed reward bundles are also skipped, even when they include a fixed item reward.

## Calculation

```text
Candidate value per reward item =
    (sum(consumed count × input value per item) + extra_value) / reward count
```

Two iron ingots worth `256` each, a reward of four tokens, and extra value `2` give each token candidate value `(2 × 256 + 2) / 4 = 128.5`.

| Detail | Behavior |
| --- | --- |
| Repeated input/reward entries | Counts are aggregated for identical items and components. |
| Reward quantity | Uses FTB's separate `count`, without multiplying the count stored inside the item stack. |
| Distinct fixed rewards | Each reward type bears the full input cost; costs are not split and other rewards are not credited. |
| Components ignored by the task | Uses the default item stack as an accepted input. |
| Strict or fuzzy component matching | Uses the configured accepted stack as the representative input. |
| Unknown input | Blocks that reward candidate. |
| Oversized quantity | Tasks above `Integer.MAX_VALUE` or overflowing aggregated counts are skipped with a warning. |

Only payment-to-reward relationships are added. Reward values are not used to infer payments in reverse. Quest results can feed recipes and other quests in the [shared graph](./calculation.md); fixed base values stay protected and final overrides do not propagate.

Player progress is not used. Unlock dependencies, cooldowns, and team size are not assigned a cost or reward multiplier. Each relationship uses one listed reward bundle.

## Loading and updates

FTB Quests 26 stores JSON5 quest files under `config/ftbquests/quests/` and loads the book in `ServerStartedEvent`. Evaluate's initial calculation runs after that load.

After changing files on disk, run `/ftbquests reload quests`. FTB editor changes and quest reloads trigger a cache-clear event before some mutations finish, so Evaluate waits until the next server tick to rebuild the graph and invalidate client value caches. Removed exchanges disappear from the next snapshot.

An ordinary `/reload` reloads Evaluate settings and recalculates against the book already in memory. It does not reread FTB quest files. See [runtime and reloads](./runtime.md) for the distinction.

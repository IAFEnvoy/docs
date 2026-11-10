---
title: Warrior and Scholar Example
description: Download a tested plan with multiple resources, linked professions, talents, attributes and rewards.
sidebar_position: 5
---

This is the `example:default` plan from the current GameTest suite, with three resources, four option groups, two presets, abilities and delayed actions. The downloads contain only this example and do not require the test mod.

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href={useBaseUrl('/resources/starting-point-buy/example-26.1.2-datapack.zip')} download data-no-link-preview>Download data pack</a>

<a href={useBaseUrl('/resources/starting-point-buy/example-26.1.2-resources.zip')} download data-no-link-preview>Download English and Chinese resource pack</a>

## Install and open

1. Install Starting Point Buy and Saturn 1.3 for Minecraft 26.1.2.
2. Put the data pack ZIP in a test world's `datapacks/`. Put the resource pack ZIP in the client's `resourcepacks/` and enable it.
3. Reopen the world. Players who have not completed the plan are offered it automatically; you can also run `/spb open example:default`.
4. Choose Warrior start or Scholar start, check the balances, and confirm.

The resource pack supplies example translations; without it, translation keys may appear. Confirmation is required before closing, and damage is ignored while the screen is open. The example uses the same `example` namespace as the test mod; you do not need both copies installed. The tutorial also uses `example:points`; try the two packs in separate test worlds to avoid overriding that resource.

## Data layout

```text
data/example/
├── saturn/resource/{points,fate,strength}.json
├── saturn/ability/{sword_training,archery,alchemy,strong_body}.json
└── spb/
    ├── plan/default.json
    ├── group/{profession,talents,attributes,drawbacks}.json
    └── option/{warrior,scholar,archery,alchemy,strength,indebted}.json
```

Initial defaults are `8` points, `2` fate and `0` strength. Existing players may already have different real values; the Plan does not grant resource defaults again every time it opens.

| Option | Points per unit | Other changes or interactions |
| --- | --- | --- |
| warrior | `-2` | Strength `+1`, archery discount, four strength units allowed |
| scholar | `-1` | Two talent slots instead of one; at most two strength units |
| archery | `-3 + selected_example_warrior` | Fate `-1` |
| alchemy | `-2` | Fate `-1` |
| strength | `-1` | Strength `+1` |
| indebted | `+2` | Fate `-1`; a drawback that refunds points |

Profession is a required single-choice group; talents and drawbacks allow multiple choices; attributes count total units. Completion requires exactly `0` points, non-negative fate and all quantity and resource limits.

## Check the calculations

| Selection | points / fate / strength | Expected result |
| --- | --- | --- |
| warrior + strength×4 + archery | `0 / 1 / 5` | Completes |
| scholar + strength×2 + archery + alchemy | `0 / 0 / 2` | Completes |
| scholar + strength×4 + archery | `0 / 1 / 4` | Cannot complete: four strength units exceed the new limit of two |

Warrior points are `8 - 2 - 4 - 2 = 0`; strength is `0 + 1 + 4 = 5`. Warrior grants sword training, archery grants its ability, and final strength of at least four triggers strong body. Warrior also schedules two bread and a welcome message.

The third row demonstrates that a valid balance is not enough: dynamic quantity rules must also pass. Apply Warrior start, then select scholar to reproduce it.

## When modifying the example

- Presets have no `key`; the first is `preset_1` and the second is `preset_2`.
- Formulas use full-ID names: `selected_example_warrior`, `resource_example_points` and `group_example_talents_distinct`.
- Plan `title` is optional; omitting it hides the heading. It is not a schema version.
- Actions, outcomes and rules still retain stable keys.
- Reopen the world after changes. Committed actions retain frozen results. Use [administrator unlock](../usage.md) to repeat testing.

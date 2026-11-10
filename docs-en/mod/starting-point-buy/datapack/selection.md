---
title: Groups and Options
description: Configure single choice, multiple choice, repeatable purchases, dynamic limits and prerequisites.
sidebar_position: 2
---

A Group controls choice mode and group counts. An Option defines quantities, prices, conditions and rewards. Neither has a `key` field: formula aliases come from full registry IDs.

## Group

File: `data/<namespace>/spb/group/<path>.json`.

| Field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `title` | Text component | yes | — | Group heading |
| `description` | Text component | no | omitted | Group description |
| `mode` | `single` / `multiple` | yes | — | Single or multiple choice |
| `count_mode` | `distinct` / `total` | no | `distinct` | Count selected kinds or total units |
| `min_count` | NumberProvider | no | `0` | Minimum group count, rounded up |
| `max_count` | NumberProvider | no | `1` for single; group capacity for multiple | Maximum group count, rounded down |
| `visible_condition` | Saturn EntityCondition | no | always visible | Group visibility |
| `options` | Array of Option IDs or `#tags` | yes | — | Options and display order |

```json title="data/example/spb/group/profession.json"
{
  "title": {"text": "Profession"},
  "mode": "single",
  "min_count": 1,
  "max_count": 1,
  "options": ["example:warrior", "example:scholar"]
}
```

`single` always allows at most one option, and every Option in the group must have `hard_max: 1`. Choosing another option clears the previous choice in the same edit. `min_count: 1` makes the group mandatory; omitting it allows no selection.

If a multiple-choice group has four training units and one archery unit selected, its `distinct` count is `2` and its `total` count is `5`. Default group capacity is the number of option kinds or the sum of their `hard_max` values respectively. An explicit maximum is still capped by group capacity.

A dynamic limit such as `"max_count": "1 + selected_example_scholar"` raises the group's allowance from one to two when scholar is selected. Limits must produce a valid non-negative range; an invalid range blocks completion.

## Option

File: `data/<namespace>/spb/option/<path>.json`.

| Field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `name` | Text component | yes | — | Option name |
| `description` | Text component | no | omitted | Hover description |
| `icon` | Saturn IconReference | no | omitted | Item or texture icon |
| `hard_max` | Positive integer | no | `1` | Fixed hard cap, also limiting network edits |
| `min_count` | NumberProvider | no | `1` | Minimum quantity when selected, rounded up |
| `max_count` | NumberProvider | no | `hard_max` | Dynamic maximum, rounded down and capped by `hard_max` |
| `visible_condition` | Saturn EntityCondition | no | always visible | Visibility |
| `enabled_condition` | Saturn EntityCondition | no | always enabled | Allow increasing the quantity; removal remains possible |
| `validation_rules` | Validation rule array | no | `[]` | Prerequisites, exclusions and combinations checked when selected |
| `resource_changes` | Existing resource ID → NumberProvider | no | `{}` | Signed contribution per unit |
| `outcomes` | [Outcome](./rewards.md) array | no | `[]` | Commit rewards when selected and conditions pass |

```json title="data/example/spb/option/strength.json"
{
  "name": {"text": "Strength training"},
  "icon": {"id": "minecraft:iron_pickaxe"},
  "hard_max": 4,
  "min_count": 1,
  "max_count": "2 + 2 * selected_example_warrior",
  "resource_changes": {"example:points": -1, "example:strength": 1}
}
```

This permits four units for warrior and two otherwise. Each unit costs one point and adds one strength. Referenced options and resources must be available in the Plan; this option is part of the [complete example](./example.md).

`q=0` always means unselected and does not have to meet the Option's `min_count`. To require a choice, use a Group minimum or a completion rule. Multiple units multiply `resource_changes`; they do not automatically duplicate rewards.

Use an object such as `{"id":"minecraft:iron_sword"}` for an item icon; Saturn interprets bare strings as texture IDs. See [common data types](../../../library/saturn/data/common.md#items-and-icons).

## Visibility, availability and validation

`visible_condition` controls display, `enabled_condition` controls increases, and `validation_rules` permit temporarily invalid drafts while blocking confirmation. Embed rules in an Option:

```json
{
  "validation_rules": [
    {
      "key": "requires_warrior",
      "condition": {
        "type": "spb:compare",
        "left": "selected_example_warrior",
        "operator": ">=",
        "right": 1
      },
      "message": {"text": "Choose warrior first."}
    }
  ]
}
```

Rule `key` and `condition` are required. `message` is optional, defaulting to a failure message containing the key. An exclusion can compare `selected_example_a + selected_example_b <= 1` on the relevant options; define both IDs before referencing them.

Hiding an option does not exempt it from quantity or rule checks. Selections that become hidden, disabled or over their dynamic limit keep their quantities and remain removable in the screen. Changing a prerequisite recalculates the whole draft, without automatically clearing other choices or reversing an old purchase price.

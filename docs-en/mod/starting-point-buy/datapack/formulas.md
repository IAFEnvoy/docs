---
title: Formulas and Comparisons
description: Generated variable names, evaluation order, linked choices, completion balances and spb:compare.
sidebar_position: 3
---

Number fields use Saturn [NumberProvider](../../../library/saturn/types/number.md) directly: a constant, formula string or typed number object. Formulas use exp4j rather than JavaScript; combine Boolean logic with Saturn EntityConditions.

## Generated variable names

Replace `:`, `/`, `-` and `.` in the **full registry ID** with `_`. The namespace is included and other valid ID characters are preserved. For example, `example:warrior` becomes `example_warrior`, and `my-pack:skills/fire.ball` becomes `my_pack_skills_fire_ball`.

| Variable | Meaning | Example |
| --- | --- | --- |
| `input_<name>` | Named input captured at session creation | `input_bonus` |
| `base_<resource_alias>` | Frozen resource baseline | `base_example_points` |
| `selected_<option_alias>` | Current option quantity | `selected_example_warrior` |
| `group_<group_alias>_distinct` | Selected kinds in a group | `group_example_talents_distinct` |
| `group_<group_alias>_total` | Sum of selected units in a group | `group_example_attributes_total` |
| `resource_<resource_alias>` | Final value after all contributions | `resource_example_points` |

Resources, groups and options have no configurable `key`. A normalisation collision between entries of the same kind in a Plan rejects the entire data pack load, such as `example:a-b` and `example:a_b`. No loading-order suffix is added, and reordering resources, groups or options does not rename them.

`inputs` map names remain configurable. Presets use positional identities `preset_1`, `preset_2`, etc., and do not create selection variables. Outcome, action and rule keys remain configurable stable identifiers used for rewards and diagnostics.

## Evaluation order

```text
Capture inputs and resource baselines
  → Read the complete selection quantities
  → Count all groups: distinct / total
  → Evaluate per-unit resource contributions × quantities
  → Calculate final resource values
  → Evaluate visibility, availability, limits, completion rules and rewards
```

Each final resource value equals its baseline plus all selected contributions. Every edit recalculates the complete draft, so a repeatable formula produces the same result for the same selection regardless of purchase order.

`resource_changes` can read `input_*`, `base_*`, `selected_*` and `group_*`, but **cannot read `resource_*`**. Reading a final balance to determine its own price creates a phase dependency and is rejected during loading. Quantities, conditions and rewards may read final `resource_*` values.

## Linked choices

This fragment uses IDs from the [complete example](./example.md):

```json
{
  "resource_changes": {
    "example:points": "-3 + selected_example_warrior",
    "example:fate": -1
  }
}
```

Archery costs three points normally and two for warrior, while always costing one fate. A quantity limit can use `"2 + 2 * selected_example_warrior"`; scholar can add a talent allowance with `"1 + selected_example_scholar"`.

For a random start, put the random provider in Plan `inputs` and read `input_<name>` so each recalculation does not reroll it. Formula decoding and numerical fallback follow Saturn directly. SPB adds no provider whitelist or strict expression evaluator. Errors already handled internally by Saturn with a fallback are not reclassified as SPB failures; verify formulas with logs. SPB still checks plan variable scope, resource bounds, invalid quantities and exceptions that propagate from evaluation.

## `spb:compare`

This condition is embedded in Saturn EntityCondition fields; it is not a standalone registry file.

| Field | Type | Required | Default | Purpose |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `spb:compare` |
| `left` | NumberProvider | yes | — | Left operand |
| `operator` | Comparison operator | yes | — | `==`, `!=`, `<`, `<=`, `>` or `>=` |
| `right` | NumberProvider | yes | — | Right operand |
| `epsilon` | Finite non-negative number | no | `1e-8` | Absolute tolerance |

```json
{
  "type": "spb:compare",
  "left": "resource_example_points",
  "operator": "==",
  "right": 0
}
```

With positive `epsilon`, `==` requires an absolute difference at most the tolerance, and `!=` requires a larger difference. `<` means `left < right - epsilon`, while `<=` means `left <= right + epsilon`; greater-than comparisons are symmetric. With `epsilon: 0`, Saturn comparison predicates are used directly, including `Double.equals` equality, where `-0.0` and `0.0` differ. Set the tolerance explicitly when finer precision is needed.

## Allowed completion balances

Use these conditions in Plan `completion_rules`, supplying each rule's own `key`:

| Rule | Condition |
| --- | --- |
| Spend everything | `left: resource_example_points`, `operator: ==`, `right: 0` |
| Allow leftovers, forbid overspending | Same left, `operator: >=`, `right: 0` |
| Keep between one and three points | Two rules: `>= 1` and `<= 3` |
| Satisfy multiple currencies | Check both `resource_example_points` and `resource_example_fate` |

Normal Saturn resource conditions read real player resources and suit external activation conditions. To test an uncommitted balance, read these explicit draft `resource_*` variables.

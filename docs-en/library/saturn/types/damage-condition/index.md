---
title: "Damage condition"
sidebar_position: 0
---

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

| Type | Purpose |
| --- | --- |
| [`saturn:always`](./always.md) | The condition is always true. |
| [`saturn:never`](./never.md) | The condition is always false. |
| [`saturn:and`](./and.md) | Matches only when every sub-condition holds. |
| [`saturn:or`](./or.md) | Matches when any sub-condition holds. |
| [`saturn:not`](./not.md) | Inverts the match result of the sub-condition. |
| [`saturn:chance`](./chance.md) | Decides whether the check succeeds based on a given chance. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:amount_range`](./amount_range.md) | Checks whether the damage amount is between min and max, inclusive. |
| [`saturn:directness`](./directness.md) | Checks whether the damage is direct damage. |
| [`saturn:damage_type`](./damage_type.md) | Checks the type of the damage source. |
| [`saturn:damage_type_tag`](./damage_type_tag.md) | Checks whether the damage type belongs to the given tag. |
| [`saturn:fire`](./fire.md) | Checks whether the damage source is fire damage. |
| [`saturn:magic`](./magic.md) | Checks whether the damage source is magic damage. |
| [`saturn:projectile`](./projectile.md) | Checks whether the damage comes from a projectile matching the type or condition. |

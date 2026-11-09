---
title: "Bi-entity condition"
sidebar_position: 0
---

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

| Type | Purpose |
| --- | --- |
| [`saturn:always`](./always.md) | The condition is always true. |
| [`saturn:never`](./never.md) | The condition is always false. |
| [`saturn:and`](./and.md) | Matches only when every sub-condition holds. |
| [`saturn:or`](./or.md) | Matches when any sub-condition holds. |
| [`saturn:not`](./not.md) | Inverts the match result of the sub-condition. |
| [`saturn:chance`](./chance.md) | Decides whether the check succeeds based on a given chance. |
| [`saturn:actor_condition`](./actor_condition.md) | Lets the actor be checked by an entity condition. |
| [`saturn:target_condition`](./target_condition.md) | Lets the target be checked by an entity condition. |
| [`saturn:both`](./both.md) | Checks the same entity condition against both the actor and the target; matches only when both hold. |
| [`saturn:either`](./either.md) | Checks the same entity condition against the actor and the target; matches when at least one side holds. |
| [`saturn:mutual`](./mutual.md) | Requires the bi-entity condition to hold both in the original order and with the actor and target swapped. |
| [`saturn:undirected`](./undirected.md) | Matches if the original order or the swapped actor and target order matches once. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:distance`](./distance.md) | Checks whether the distance between the actor and the target is within the maximum. |
| [`saturn:team`](./team.md) | Reads or checks the scoreboard team of the entity. |
| [`saturn:relation`](./relation.md) | Checks whether the actor and the target are allied to each other. |
| [`saturn:can_see`](./can_see.md) | Checks the line of sight between the two sides with a block and fluid ray. |
| [`saturn:riding_recursive`](./riding_recursive.md) | Checks multi-level riding relationships. |
| [`saturn:same_team`](./same_team.md) | Checks whether the actor and the target are on the same team. |
| [`saturn:relative_rotation`](./relative_rotation.md) | Compares the rotation difference between the actor and the target on the given axes. |

---
title: "Block condition"
sidebar_position: 0
---

Checks the block or environment at the context position. Embedded in BlockCondition fields.

| Type | Purpose |
| --- | --- |
| [`saturn:always`](./always.md) | The condition is always true. |
| [`saturn:never`](./never.md) | The condition is always false. |
| [`saturn:and`](./and.md) | Matches only when every sub-condition holds. |
| [`saturn:or`](./or.md) | Matches when any sub-condition holds. |
| [`saturn:not`](./not.md) | Inverts the match result of the sub-condition. |
| [`saturn:chance`](./chance.md) | Decides whether the check succeeds based on a given chance. |
| [`saturn:offset`](./offset.md) | Moves the block context by the given offset before checking or running the child. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
| [`saturn:block_id`](./block_id.md) | Checks whether the block at the current position is the given type. |
| [`saturn:block_tag`](./block_tag.md) | Checks whether the block belongs to the given tag. |
| [`saturn:biome_tag`](./biome_tag.md) | Checks whether the biome at the current position belongs to the given tag. |
| [`saturn:hardness`](./hardness.md) | Compares the hardness of the context block. |
| [`saturn:height`](./height.md) | Compares the Y coordinate of the block position. |
| [`saturn:light_level`](./light_level.md) | Compares the light level of the given light layer. |
| [`saturn:slipperiness`](./slipperiness.md) | Compares the slipperiness of the block. |
| [`saturn:blast_resistance`](./blast_resistance.md) | Compares the blast resistance of the block. |
| [`saturn:movement_blocking`](./movement_blocking.md) | Checks whether the block blocks movement. |
| [`saturn:adjacent`](./adjacent.md) | Counts how many adjacent positions satisfy a block condition. |

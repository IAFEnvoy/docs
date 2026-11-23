---
title: Lifespan integration
description: Connect Reincarnation to MiXianTu's character panel, breakthroughs and cultivation data.
---

# Lifespan integration

<span id="lifespan" />
<span id="how-the-server-settles-it" />
<span id="after-it-runs-out" />
<span id="character-panel" />
<span id="server-config" />
<span id="reincarnation-lifespan" />
<span id="related" />

[Reincarnation](../../reincarnation/index.md) is an optional integration. Its lifespan row appears in the MiXianTu character panel when the player has a ledger. Reincarnation owns the [ageing rules and lifespan settings](../../reincarnation/lifespan.md), [archive and administrator commands](../../reincarnation/commands.md), and [scripting API](../../reincarnation/kubejs.md).

## Lifespan grants on breakthrough {#where-the-numbers-come-from}

Configure the [realm stage's `success_action`](../datapack/json/realm_stage.md) to grant or spend life after a successful breakthrough. For packs that support installations without Reincarnation, that action must be in content loaded only when Reincarnation is installed.

## Cultivation data on rebirth {#reincarnation-retention}

Under the default reset policy, rebirth clears MiXianTu's cultivation (realms and progress), minor stages, active tribulation, spirit roots and physiques, techniques and soul values. The following example uses the [Reincarnation retention tag](../../reincarnation/datapack.md#attachment-retention) to keep spirit roots and physiques, techniques, and soul values.

```json title="data/reincarnation/tags/neoforge/attachment_types/keep_on_rebirth.json"
{
  "replace": false,
  "values": ["mxt:spirit_identity", "mxt:technique", "mxt:soul_stats"]
}
```

To retain cultivation progress, minor stages, or tribulation state, add `mxt:cultivation`, `mxt:minor_stages`, or `mxt:tribulation` respectively. [Reincarnation's reset settings](../../reincarnation/index.md#reset-settings) govern Saturn resource retention and determine whether the tag applies.

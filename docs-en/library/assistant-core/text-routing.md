---
title: Routing Lexicons
description: Customize local routing synonyms and concept weights with data packs.
sidebar_position: 3
---

## Client text annotations {#annotations}

[See the Annotation Processor guide for registration and a runnable demo.](./annotation-processor.md)

## Data pack routing lexicons {#routing-lexicon}

`RoutingLexicon.forScope(server, scope)` supplies synonyms and concept weights from server data packs. The host can pass `concepts()` and `weights()` to `LexicalIndex`. The index encodes examples and player text with the same lexicon. Synonyms map to a shared concept dimension, and the configured weight multiplies its TF-IDF weight.

Add JSON under `data/<namespace>/assistant_core/routing_lexicon/`. This entry applies to Psychic and maps “when does work finish” to the same concept as “how much longer” in its status examples.

```json title="data/example/assistant_core/routing_lexicon/en.json"
{
  "scope": "psychic:spirit_call",
  "language": "en",
  "concepts": {
    "remaining_time": ["how much longer", "when does work finish"]
  },
  "weights": {
    "remaining_time": 1.2
  }
}
```

| Field | Format |
| --- | --- |
| `scope` | Required resource ID selected by the host. |
| `language` | Required routing language key. Psychic uses `zh` and `en`. |
| `concepts` | Optional map of concept IDs to arrays of aliases. IDs can use lowercase letters, digits, underscores, periods, and hyphens. |
| `weights` | Optional map of concept IDs to weights. Values range from 0.1 to 5.0 and default to 1.0. |

Run `/reload` and retry the same phrase to check its match. Data pack priority applies when files share a resource ID. Distinct files merge in resource ID order. For a repeated normalized alias or weight, the later file in that order supplies the value. The lexicon affects vector matching. The host still applies target selection, argument validation, and confidence thresholds.

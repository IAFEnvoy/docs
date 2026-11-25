---
title: Chat Configuration
description: Configure client-side names, data pack lexicons, offline routing, and model fallback.
sidebar_position: 2
---

## How names and quantities are recognized

Before sending a `!` instruction, the client annotates the original text using item and block names from its current language and resource packs, plus the material word lists sent by the server. The server validates registry references by ID, then selects the companion and task. You can also enter an explicit ID such as `minecraft:raw_iron` to distinguish entries with the same name.

Add material aliases and local units at `data/<namespace>/psychic/material_language/<name>.json`. The built-in English words include a stack of 64 and half a stack of 32. This example lets `fetch 2 bundles raw metal` resolve to 16 raw iron. After changing the material language data pack registry, reopen the world or restart the server.

```json title="data/example/psychic/material_language/en_us.json"
{
  "language": "en_us",
  "items": {
    "minecraft:raw_iron": ["raw metal"]
  },
  "blocks": {
    "minecraft:barrel": ["supply barrel"]
  },
  "units": {
    "bundle": 8,
    "bundles": 8
  },
  "quantities": {
    "half a bundle": 4
  }
}
```

| Field | Purpose |
| --- | --- |
| `language` | Minecraft locale such as `en_us`. Omit it to apply the entry to every locale. |
| `items`, `blocks` | Maps from item or block IDs to arrays of aliases. |
| `units`, `quantities` | Unit multipliers or fixed quantities from 1 to 64. |
| `digits`, `ten` | Custom single-character digits and a tens marker. |

All fields are optional. Maps such as `units` default to empty, and the built-in English and Chinese lists still participate in matching. Reload client resources after changing a display name in a resource pack.

## Tune local intent matching

The local router tries task `commands` and structured arguments before matching examples for tasks without arguments. Add a routing lexicon under `data/<namespace>/assistant_core/routing_lexicon/` with `scope` set to `psychic:spirit_call`. Use `zh` or `en` as the routing language. Run `/reload` to apply synonym and concept weight changes. For example, adding “when does work finish” to `remaining_time` can map it to the companion's status task. [Synonyms, weights, and a complete example](../../library/assistant-core/text-routing.md#routing-lexicon)

## Configure model fallback

When local routing cannot resolve an instruction, Psychic can ask a model to choose among the companion's available tasks. Set `PSYCHIC_MODEL_API_KEY` in the environment of the game process hosting the world. For a DeepSeek endpoint, you can also use `DEEPSEEK_API_KEY`. On multiplayer this process runs on the server. In single-player it runs in your local game.

Open Psychic's server settings from the Mods menu, or edit the `ai` section of `config/psychic/psychic-server.json` in the game directory. Only server operators can edit a remote server's settings. Changes take effect the next time the server starts. On first use, Psychic imports existing settings from `config/psychic-ai.toml`.

| Setting | Default | Purpose |
| --- | --- | --- |
| `enabled` | `true` | Enables model fallback. Set it to `false` to disable fallback. |
| `endpoint` | `https://api.deepseek.com/chat/completions` | OpenAI-compatible Chat Completions endpoint. |
| `model` | `deepseek-chat` | Model name sent to the endpoint. |
| `api_key_required` | `true` | Requires a configured key. Set to `false` for a compatible local endpoint that accepts requests without a key. |
| `output_token_parameter` | `max_tokens` | Request field for the output token limit. |

When fallback is enabled and the endpoint's key requirements are met, the model can receive the original instruction and recognized references. The server validates the chosen task, target permissions, and arguments. Local instructions remain available without a model.

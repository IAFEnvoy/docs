---
title: "Config files"
sidebar_position: 0
---

All configuration lives under `config/system/`. On first read, missing files are copied from the matching default resource under `resources/defaults/` in the JAR; existing files are kept. Inside the JAR the actual path of a default resource is `/defaults/<file name>`.

| File | Side | Purpose |
| --- | --- | --- |
| [`system-agent.json`](./agent.md) | Server | Agent execution budget |
| [`system-storage.json`](./storage.md) | Server | Storage capacity |
| [`system-model.json`](./model.md) | Server | Model endpoint |
| [`system-search.json`](./search.md) | Server | Web search endpoint |
| [`system-search-pricing.json`](./search-pricing.md) | Server | Web search billing estimate |
| [`system-semantic.json`](./semantic.md) | Server | Local semantic routing |
| [`system-advancements.json`](./advancements.md) | Server | Advancement-triggered workflows |
| [`system-speech-pricing.json`](./speech-pricing.md) | Client | Speech billing estimate |
| [`system-client.json`](./client.md) | Client | Interface and pinned cards |
| [`system-speech.json`](./speech.md) | Client | Speech synthesis and narration |
| [`system-asr.json`](./asr.md) | Client | Speech recognition |

## Editing and saving

Client settings are all opened from `/system settings`, and are saved automatically once a change takes effect. When editing files directly, close the related screens first; the server reads the configuration on resource reload, and the client reads it on client resource reload; parameters that require rebuilding the runtime (for example the storage budget) still need a restart. `ConfigInstance.set(...)` marks the config dirty automatically, and saves are merged per tick; do not modify a snapshot in Java and forget to mark it.

Configuration fields mostly use lenientOptionalFieldOf: a formatting error in a single item is treated as that field being absent, and a nested object failure may also fall back to that field's default value as a whole. This does not mean invalid values have taken effect; after editing, check the log and verify the settings.

## Config files, data packs and world saves

Rewards, shop offers, lottery pools and system / module definitions go in the [data pack](../data/index.md), and card layouts go in the client resource pack. AI default modes and player authorization belong to the current world save and are managed through `/system ai`; player data, conversations and the database go in `<world>/system/`, and accumulated model usage still belongs to the world SavedData. TTS / ASR keys and speech usage stay on the client and are not aggregated by the server.

---
title: "Local semantic routing"
sidebar_position: 6
---

File: `config/system/system-semantic.json`. Side: **server**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `mode` | String | no | `"enforce"` | off disables it, shadow computes in the background, enforce actually uses it for decisions; lowercase. |
| `maxCharacters` | Integer | no | `240` | Text length budget for local matching, positive integer. |
| `minCoverage` | Number | no | `0.9` | Lexical coverage threshold, 0–1. |
| `defaultThreshold` | Object | no | `{"score":0.9,"margin":0.15}` | Default score / margin, both 0–1. |
| `languages` | Array | no | `["zh","en"]` | List of supported base language codes, such as zh and en. |
| `lexicalThresholds` | Object | no | `{}` | Overrides thresholds by workflow ID or ID@language. |
| `examples` | Object | no | `{}` | Workflow ID → language → array of example utterances. |
| `cacheEntries` | Integer | no | `1024` | Capacity of the global routing cache. |
| `cacheSeconds` | Integer | no | `300` | Number of seconds a cache entry stays valid. |
| `entriesPerPlayer` | Integer | no | `32` | Number of cache entries per player. |
| `modeScores` | Object | no | `{"functions":-0.1,"freeChat":0.03}` | Score offset for functions and freeChat, range -1 to 1; the final threshold is clamped to 0–1. |

Similarity and the gap between candidates are not probabilities. Function mode uses the functions offset to match locally as much as possible, while free chat, when allowed, uses the freeChat offset to raise the matching bar. See [Local routing](../development/routing.md) for details.

## Bundled default file

```json title="config/system/system-semantic.json"
{
  "mode": "enforce",
  "maxCharacters": 240,
  "minCoverage": 0.9,
  "defaultThreshold": {
    "score": 0.9,
    "margin": 0.15
  },
  "languages": [
    "zh",
    "en"
  ],
  "lexicalThresholds": {},
  "examples": {},
  "cacheEntries": 1024,
  "cacheSeconds": 300,
  "entriesPerPlayer": 32,
  "modeScores": {
    "functions": -0.1,
    "freeChat": 0.03
  }
}
```

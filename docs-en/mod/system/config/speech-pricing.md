---
title: "Speech billing estimate"
sidebar_position: 8
---

File: `config/system/system-speech-pricing.json`. Side: **client**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `version` | Integer | no | `1` | Pricing table format version. |
| `currency` | String | no | `"CNY"` | Currently CNY only. |
| `asOf` | String | no | `"2026-10-25"` | Reference date of the price list; does not mean live official prices. |
| `rates` | Array | no | See the bundled price list | List of price entries, see the table below. |

## rates entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `provider` | String | required for a valid entry | empty | Provider ID. |
| `model` | String | required for a valid entry | empty | Model name. |
| `region` | String | required for a valid entry | empty | Region. |
| `unit` | String | required for a valid entry | omitted | characters, tokens or calls; case-insensitive. |
| `units` | Positive integer | required for a valid entry | no valid default | Number of units the price applies to. |
| `input` | Non-negative decimal number or string | required for a valid entry | omitted | Price of the input characters / tokens / calls. |
| `output` | Non-negative decimal number or string | required for a valid entry | omitted | Price of output tokens; must be 0 for units other than tokens. |

Entries are matched by provider, model and region; when the price is missing or the billing unit does not match, only usage is recorded and the amount stays unpriced; duplicate entries keep the first one. A missing price is never treated as free. Prices are local estimates, not the provider's bill, and `asOf` in the bundled table only indicates the reference date. A completed NLS recognition is estimated as calls.

## Bundled default file

```json title="config/system/system-speech-pricing.json"
{
  "version": 1,
  "currency": "CNY",
  "asOf": "2026-10-25",
  "rates": [
    {
      "provider": "aliyun",
      "model": "qwen3-tts-flash",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 0.8,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen3-tts-flash",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 0.733924,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-flash",
      "region": "beijing",
      "unit": "TOKENS",
      "units": 1000000,
      "input": 1.5,
      "output": 12
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-flash",
      "region": "singapore",
      "unit": "TOKENS",
      "units": 1000000,
      "input": 1.677,
      "output": 13.636
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-plus",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.4,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-plus",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 2.19,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-plus",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.4,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-plus",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.49884,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-flash",
      "region": "beijing",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1,
      "output": 0
    },
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.0-tts-flash",
      "region": "singapore",
      "unit": "CHARACTERS",
      "units": 10000,
      "input": 1.12413,
      "output": 0
    },
    {
      "provider": "aliyun-nls",
      "model": "sentence-recognition",
      "region": "shanghai",
      "unit": "CALLS",
      "units": 1000,
      "input": 3.5,
      "output": 0
    },
    {
      "provider": "aliyun-nls",
      "model": "sentence-recognition",
      "region": "beijing",
      "unit": "CALLS",
      "units": 1000,
      "input": 3.5,
      "output": 0
    },
    {
      "provider": "aliyun-nls",
      "model": "sentence-recognition",
      "region": "shenzhen",
      "unit": "CALLS",
      "units": 1000,
      "input": 3.5,
      "output": 0
    }
  ]
}
```

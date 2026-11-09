---
title: "Usage and cost"
sidebar_position: 6
---

Special types in quest narration that cannot be formatted directly are organized by the server-side `QuestNarration` through the same `ExecutionContext.model` / `ModelGateway`, and the actual tokens are counted against the player who triggered the request. Common templates, text cache hits and other requests that wait for a result after merging do not add model calls; when organization fails or the notification is closed early, the model usage that has already happened is still kept. The text cache and the optional client-side whole-sentence audio cache are independent of each other.

The same page also shows the ASR attempt count and the estimated cost, as well as the failed/cancelled, incomplete and unpriced counts. Successful recognitions are estimated at the user-specified CNY 3.5 / 1000 calls, and the cost is controlled by the `CALLS` entry of the existing pricing configuration; an existing configuration has to add the ASR entry itself and is not overwritten automatically. ASR has no token fields and is never mixed into AI / TTS tokens. For details see [Speech recognition and billing](asr.md#usage-and-cost).

`/system usage` opens the personal usage screen and does not require a current system binding. The full workbench has a "Usage statistics" entry in the top-right corner; in full or simple mode, entering `/usage` or "Usage statistics" also opens it. Administrators can switch to the server-wide list with `/system usage all` or "All players" in the screen; a normal player's request is rejected by the server even if the server-wide parameter is forged.

The screen reuses the single `assistant.css` and shows server-side AI input, output, total tokens, cache hits, Search/Fetch billed call counts and estimates, and the TTS / ASR calls and cost of the current client account on the same page. AI and TTS each show attempt, failure and unknown-usage counts, and speech additionally shows the unpriced count. The player detail contains server-side AI and web calls, name, UUID and last call time, and does not contain other players' speech data. The server-wide list is sorted by total AI tokens in descending order, 8 players per page, and includes players who are offline or whose system was revoked; refreshing, paging and viewing statistics call no AI and write no conversation history. Characters and tokens are never added together.

The screen title is "Usage statistics". The dashboard is split into separate panels for AI, web, TTS and ASR, with the call/failure counts placed below their panel: AI shows total tokens, input, output and cache hits in that order; TTS shows the estimated cost, billed characters, total tokens, input and output in that order; ASR shows the attempt count and the estimated cost. TTS / ASR are labeled "My local", and even when "Server-wide usage" is switched on they show only the current account's own speech records and never mix in the server summary or other players' rows. Speech statistics refresh automatically after the API callback, and a server-side AI read failure does not affect the display of local speech data.

## Unified metering entry point

All model requests go through `ModelGateway.complete(player, ...)`, which calls the network adapter and records the ownership, actual usage and result of one call. Routing, sign-in and extension modules use `ExecutionContext.model(...)`, and the context checks authorization and budget before entering the same gateway; modules do not accumulate tokens themselves. What `AgentEngine.model()` exposes is the gateway, not the underlying HTTP client.

`OpenAiCompatibleClient` reads the `usage` of the HTTP response before validating `choices`, `finish_reason` or the model body, so truncation, a body JSON error or a later business rejection does not lose the token usage that has already been returned. The gateway's `finally` counts once, and after a cancellation or `revoke` it does not depend on the original player's business file. Rule hits, local TF-IDF, the exact intent cache, pure tool execution and screen refreshes make no model calls and count no tokens. For provider configuration see [Model API and DeepSeek compatibility](model-api.md).

Accounting basis:

| Field | Meaning |
| --- | --- |
| Input tokens | API `prompt_tokens` |
| Output tokens | API `completion_tokens` |
| Total tokens | API `total_tokens` |
| Cache hit tokens | Prefers `prompt_tokens_details.cached_tokens` and falls back to DeepSeek's `prompt_cache_hit_tokens` when it is missing; it is part of the input and is not added to the total again |
| Model attempts | Calls that entered the gateway, including those with a missing key, a network failure and a cancellation |
| Failure | The network adapter returned no valid model reply; a later module business validation failure is not counted as a failed call again |
| Usage not returned | The number of responses whose usage is missing or invalid, or of timeouts/network failures where usage could not be obtained |

When usage is not returned, the budget estimate is not used to fill in real tokens, and this cannot be used to assert that the provider did not bill. Historical versions did not persist actual usage, so previous consumption cannot be backfilled. A custom `ModelClient` adapter must implement the overload that takes a `Consumer<Usage>` and report usage; an adapter that is compatible with the old overload can still be called, but it is marked as unknown usage.

## TTS usage and pricing

TTS is requested on the client. Alibaba Cloud synthesizes as an SSE stream by default, and each JSON event reads `TtsProvider.Usage`; the callback passes the cumulative snapshot of the current request. `AssistantSpeech` keeps the latest valid value and records it only once when the stream completes, fails or is cancelled, without adding intermediate events to the final event; when the stream disconnects before the end, only the usage returned before that can be kept, which may not equal the final cloud bill. Non-streaming providers still call usage back before validating the audio and downloading the WAV, and usage already received is not revoked by a later download, decode or playback failure. `SpeechUsageTracker` records start/completion locally and produces no Minecraft usage report; statistics do not depend on the generation of the narration queue, so revoking a binding or discarding old audio does not delete known consumption. Voice previews also count; a whole-sentence cache hit, a queued message whose synthesis has not started, a muted skip and OpenAL fallback playback do not add request counts.

| Model | Billing unit read |
| --- | --- |
| `qwen3-tts-flash` (including supported dated versions) | `usage.characters` |
| `qwen-audio-3.1-tts-flash` | `usage.input_tokens`, `output_tokens`, `total_tokens`; when the total is missing, only the actual input and output are added |
| `qwen-audio-3.1-tts-plus` / `qwen-audio-3.0-tts-plus` / `qwen-audio-3.0-tts-flash` | `usage.characters` |

Token-billed models may also return `characters`, and character-billed models may also return token fields that are 0; only the corresponding billing unit is written into the TTS summary, to avoid double counting. Missing or invalid usage is marked as unknown, and the local text length or audio duration is not used to fill it in. New providers should implement the overload that takes a `Consumer<Usage>`, and streaming providers should call back with cumulative snapshots; a provider that only implements the old overload can still synthesize, but its usage is unknown.

The default file follows the previously checked [official Alibaba Cloud model prices](https://help.aliyun.com/zh/model-studio/model-pricing), with a snapshot date of **2026-10-25**; these are not prices updated online:

| Model | Beijing | Singapore |
| --- | --- | --- |
| `qwen3-tts-flash` | CNY 0.8 / 10,000 characters | CNY 0.733924 / 10,000 characters |
| `qwen-audio-3.1-tts-flash` | input CNY 1.5, output CNY 12 / million tokens | input CNY 1.677, output CNY 13.636 / million tokens |
| `qwen-audio-3.1-tts-plus` | CNY 1.4 / 10,000 characters | CNY 2.19 / 10,000 characters |
| `qwen-audio-3.0-tts-plus` | CNY 1.4 / 10,000 characters | CNY 1.49884 / 10,000 characters |
| `qwen-audio-3.0-tts-flash` | CNY 1 / 10,000 characters | CNY 1.12413 / 10,000 characters |

Character rules: a Chinese character (including traditional forms and Japanese/Korean han characters) counts as 2, while other letters, digits, punctuation, spaces, kana and Hangul letters count as 1; SSML tags are not counted. The implementation uses the response values directly and does not recalculate them. For example, the response of `qwen-audio-3.1-tts-flash` in the earlier reproduction test had input 37, output 81 and total 118 tokens, together with 69 characters; the Beijing estimate is `37 × 1.5 / 1000000 + 81 × 12 / 1000000 = 0.0010275` CNY, and those 69 characters are not charged again. That historical test is not backfilled into the world save automatically.

`SpeechPricingConfig` matches the price exactly by provider, model, region and unit from the client configuration; after the cost of each request is calculated it is stored in the immutable `SpeechUsage`, accurate to one billionth of a CNY and rounded. A later unit price change does not recalculate the accumulated cost. An unconfigured provider/model/region, a mismatched unit or missing usage is not priced and counts as "unpriced", so the amount on the page is only a subtotal of the part with a known price. Amounts exclude AI cost, voice creation cost, free quota, discounts and billing adjustments; the provider's bill prevails.

### Pricing configuration

The client reads `config/system/system-speech-pricing.json` when it first uses cost estimation. When the file does not exist, it is first copied verbatim from `defaults/system-speech-pricing.json` inside the JAR, and then the generated configuration is read; the source default file is at `src/main/resources/defaults/system-speech-pricing.json`. An existing configuration is never overwritten, and upgrading the JAR does not reset locally modified prices; after the configuration is deleted, the default file is copied again on the next load. The server does not read or sync a player's speech price table.

Changes take effect through a client F3+T resource reload or a client restart. Prices are calculated only on the client and need no server involvement; historical cost is not recalculated. Below is a complete example that configures a price for only one model:

```json
{
  "version": 1,
  "currency": "CNY",
  "asOf": "2026-10-25",
  "rates": [
    {
      "provider": "aliyun",
      "model": "qwen-audio-3.1-tts-flash",
      "region": "beijing",
      "unit": "TOKENS",
      "units": 1000000,
      "input": 1.5,
      "output": 12
    }
  ]
}
```

- `version` defaults to `1` and `currency` is fixed to `CNY`; `asOf` is the price date recorded by the administrator, the recommended format is `YYYY-MM-DD`, and it does not trigger an online update.
- `provider`, `model` and `region` must match the request metadata exactly, and the same combination must not repeat.
- `unit` is `CHARACTERS`, `TOKENS` or `CALLS` for ASR; `units` is the number of units the price corresponds to, for example a character price is usually `10000`, a token price is usually `1000000`, and ASR defaults to `1000`.
- `input` / `output` are the CNY input / output price per `units`, use a non-negative amount, accept a JSON number or a decimal string, use `BigDecimal` internally and are saved as a JSON number; after calculation it is rounded to one billionth of a CNY per call. Character or call billing uses `input`, and `output` must be `0`; token billing multiplies the actual input and output tokens separately.
- `rates: []` can turn off cost estimation for new requests while actual usage is still recorded. There is no additional hard limit on the configuration size or the number of price entries; configuration fields use `lenientOptionalFieldOf`, a wrong header field falls back to the default and unknown fields are ignored. An entry with an invalid amount or unit, or missing key price information, is skipped while the other valid entries are kept, duplicates keep the first, and a missing or invalid amount is not treated as free. A wholly invalid `rates` field falls back to an empty table.

When the configuration is missing but cannot be copied, the file is unreadable or the JSON syntax is broken, the original file is kept and a log entry is recorded, new requests are marked as "unpriced", the JAR unit price is not silently applied, and the assistant, TTS or usage statistics are not disabled because of it. The accumulated historical amount stays unchanged.

## Personal speech data boundary

The TTS / ASR API keys are configured by each client itself, and all calls and costs are stored independently by `LocalSpeechUsage` per current client account UUID, with no screen for querying other accounts or players. The data accumulates across servers and cannot be used as a basis for server-side charging, rewards or budgeting. The usage reporting message, the server-side speech ledger and the statistics snapshot fields have been removed, and an administrator also cannot obtain other players' TTS / ASR records from a server-wide query.

Local accounting starts by accumulating one attempt and marking it as unknown usage and unpriced; on completion the actual units and cost are filled in and the unknown count is corrected. ASR starts accounting after authentication and the WebSocket handshake complete and before the first recognition command is sent; token issuance and handshake failures do not count as recognition attempts. A streaming TTS "request failure" means the stream did not complete normally, is missing the final marker, was cancelled or has invalid PCM; at that point the valid usage already called back is still kept. Non-streaming Alibaba Cloud treats a parseable 2xx JSON as a completed request, so a local download, decode or playback error is not a failure of that request. When an old provider does not implement the observation callback, whether its synthesis method returns or throws distinguishes success from failure. A local parameter validation failure and a cancellation that has not yet entered a worker thread do not count as a request.

Each request captures its own local ledger, so a late result after a cancellation, a disconnect or a server switch still completes the record of the original account; it does not depend on the MC connection and is never written to another account. Start and completion are persisted separately, and the completion callback is deduplicated through an atomic flag; requests left incomplete by a process interruption stay unknown. `SpeechUsage` and `RecognitionUsage` are immutable statistics objects, ledger creation captures only the account and the file path, and the first load, price reading and calculation, TTS / ASR merging and file saving are all queued onto the dedicated `system-speech-usage` single-thread executor; the initial load is always queued before the ledger's first update. The screen reads the latest immutable snapshot through a volatile field without taking the disk write lock or waiting for a background task; before the first load completes it returns an empty snapshot, which the usage page's existing tick then refreshes. The file is still written by replacing a temporary file, and a normal JVM exit drains the queued records through an independent shutdown hook that waits at most three seconds, without blocking the game render thread. The ledger uniformly isolates RuntimeException / LinkageError from the statistics calculation, keeps the previous snapshot and records the full exception, and does not treat a billing or configuration class initialization failure as a speech request failure; a file load or save failure is likewise logged and does not interrupt speech features.

```text
<client game directory>/config/system/speech-usage/<client account UUID>.json
```

The record contains only this person's statistics values and accumulated cost; it saves no key, audio or narrated text and is not cleared by `revoke`, `forget` or a server switch. The API price table belongs to the current client installation and is not a server-wide price.

## World save data

`TokenUsageData` uses Minecraft 26.1's `SavedDataType` and Codec and is registered in the server-global `SavedDataStorage`, sharing the same lifecycle as game saved data such as raids. The file is:

```text
<world save>/data/system/token_usage.dat
```

This is a standalone NBT data file; it does not use a player attachment and is not stored in `<world save>/system/players/<UUID>.dat`, and consumption in different dimensions accumulates to the same UUID. The name is used only for display; after the player renames, the name is updated and the same UUID record is kept. Accumulated counts use 64-bit non-negative integers and keep the maximum value on overflow. The adjustment of the unified directory for player-managed files does not change the location of this SavedData or the way vanilla reads and writes it.

The gateway worker thread puts immutable consumption records into a queue, and the server main thread merges and marks them dirty on a tick or before statistics are read. On a normal shutdown the Agent is closed first, then the remaining records are merged and Minecraft saves the world normally; the network thread is never blocked writing to disk for each request. An abnormal power loss may lose the part that has most recently not been saved with the world, consistent with the save semantics of ordinary SavedData.

The server ledger stores AI and web calls. The internal `PlayerUsage` is a mutable class, and the name and call counts are updated directly; the four AI token counts are wrapped in the immutable `data/usage/TokenUsage` record. The server-wide summary uses a separate accumulation object, and web requests are stored separately by the immutable SearchUsage with the Search/Fetch attempts, successes, billing, unknown counts and estimated cost; the saved data Codec does not read or output speech statistics.

`snapshot()` returns an immutable `data/usage/TokenUsageSnapshot` object containing only paging information, the AI/web summary and the player details, and the list is copied and does not expose the mutable ledger. `TokenUsageResponseS2C` encodes the snapshot object, the error state and the `open` flag that opens the page through a dedicated `StreamCodec`, and the client reads the type field directly and then displays the current account's local speech statistics separately; there is no TTS / ASR field on the network. The current network protocol is **1**, and client and server must be updated together; each packet carries at most 8 players, and the name, error key and request ID are all length-limited.

`revoke`, `forget`, turning off memory and granting again do not delete the accumulated statistics. `revoke` still resets the daily model call quota in the player's business file; that quota and the long-term usage ledger are separate records. There is currently no game command to clear statistics.

This round passed compilation, packaging and static resource checks; Minecraft was not launched, so the screen display, restart recovery, permission switching and the in-game behavior before and after revoke have not been accepted.

## Web call counts and pricing

Search and Fetch are recorded through the same `SearchGateway`, and the server network call's finally records once even when it meets a cancellation, a revoke or a later model failure. The worker thread only queues immutable records, and `AssistantUsage.drain()` updates the world ledger on the main thread. The two operations separately count attempts, successful decodes, successful billing, unknown results and cost; a successful empty result is not billed. HTTP failures and results that cannot be confirmed are viewed separately, and a local timeout is not interpreted as the provider certainly being free.

Both default to CNY 5 / 1000 calls, that is CNY 0.005 per call, read from the server-side `config/system/system-search-pricing.json`; when it is missing for the first time it is copied from the JAR's `defaults/system-search-pricing.json`. The price fields are the decimal strings `searchPerThousand` and `fetchPerThousand`, the unit price is snapshotted for each request, and a later price change does not recalculate history; changes take effect on the server with `/reload`. Search and Fetch each show their own counts and amount and are not added to model or TTS tokens. Reasoning models still go through ModelGateway, and their tokens are counted normally against the same player.

Web cost does not include model tokens, free quota or discounts and defers to the actual provider bill; unknown calls may still be charged. For web authorization and the adjustable loop see [Web search and fetch](search.md).

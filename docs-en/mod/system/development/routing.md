---
title: "Local semantic routing"
sidebar_position: 7
---

Offline and standard modes use the `modeScores.functions` threshold, while extended mode uses the higher `modeScores.freeChat` threshold; extended first tries local and AI routing and only then chats, and free mode skips routing. The strategy is decided by `ConversationStrategy` / `ConversationMode`; see [execution modes](../guides/ai-modes.md) for the complete flow.

It currently uses a pure-Java domain vocabulary, sparse TF-IDF matching and a per-player exact intent cache. The default distribution contains no ONNX Runtime, DJL, Caffeine, native libraries, external dictionaries or trained models, and downloads no runtime dependencies. The routing implementation, declarations, results and diagnostics all live in `com.iafenvoy.system.agent.routing`.

The goal is to balance distributability with the number of model calls. The model service defaults to DeepSeek, and other OpenAI-compatible services can be configured; see [Model APIs](../guides/model-api.md) for details. The complete System JAR needs to carry no inference runtime, and the `jar` packaging task enforces that the whole artifact stays at or below **10,000,000 bytes**. That is the limit for System itself and its embedded resources/libraries; installation dependencies such as Minecraft, NeoForge and the original UI mods are counted separately. The routing runtime libraries were not moved to an external download to get around the size limit.

## How to reduce calls

```text
Structured buttons / current number
  → explicit commands and phrases
  → the player's own exact intent cache
  → synonym normalization + sparse TF-IDF matching
  → hand low-confidence cases to the model service once
  → modules execute within their own budget
```

Structured requests and explicit commands take priority. A successful local match only omits the remote request that chooses which module to use; the module still reads live data. Sign-in still has the model choose the reward on the spot. Claiming, payment and other write capabilities never go direct through local matching or the intent cache.

An API key is not a prerequisite for sending a message. When the model key is missing or the player has turned external AI off, commands, the intent cache and high-confidence local matching still run first; only when a model fallback is needed and cannot be called does it return the "command to be confirmed" option card. The card lists, with priority, the registered read-only operations among this round's vector candidates that are available to the player; candidates whose arguments cannot be parsed independently produce no operation. When there is no suitable candidate it shows the available read-only shortcuts and suggests `/help`. Clicking a button executes it through the existing `CardActionRequest` as a new explicit request, without asking the AI to redo routing and without ever selecting a low-scoring candidate automatically.

Candidates use the `ModuleRouting.shortcut` label by default; a query without a no-argument shortcut can declare an option label in `RoutingProfile.read(...).choice("translation.key")` and reuse the same argument extractor. Item queries, item sources, the manual and help already declare labels; the manual also provides button argument decoding. Hint mode `hints`, unresolved arguments and disabled capabilities do not gain local direct access this way; clicking still checks the card version and module permissions as usual. Workflows that need model calls themselves, such as sign-in, still require a configured model.

For example, the Chinese terms for "shop", "store" and "storefront" and the English "shop/store/market" all normalize to the same domain feature in their respective language vocabularies. Chinese unknown characters and English unknown words are kept as well, adjacent features are added and TF-IDF is computed; unfamiliar content is not all discarded so that a single familiar keyword still matches. Item registry IDs occupy a placeholder among the matching features, but the actual argument must be re-parsed into a unique ID from **this request's original text**, never copied from an example sentence.

Similarity is aggregated per module from its most similar example sentence, comparing first place `s1` with second place `s2` from a **different module**. Local direct access requires all of the following:

- The module explicitly registers `direct=true`, allows interaction, has `writeSteps=0`, and all of its declared tools are read-only.
- The score, the margin against other modules and the input feature coverage all reach their thresholds, and the topics/unknown words in the input are also covered by the candidate example sentence.
- The arguments of this request parse independently, and no conservative filter such as negation, conditions, references or compound requests is triggered.
- Recognized write action words such as execute/claim/pay cannot go direct locally; event rules still name the module directly and skip chat routing.

Similarity and coverage are **not accuracy or probability**. This implementation is good at covered domain expressions and synonymous rephrasings, and generalizes complex semantics less well than a neural network; unfamiliar expressions are left to the AI. The default `0.9` score, `0.15` margin and `0.9` coverage are a conservative engineering starting point; there is no annotated-set acceptance, and no specific hit rate or saving ratio is promised. The execution layer also rejects write tools coming from local matching/the intent cache, and shop confirmation checks the explicit routing origin as well.

The built-in direct range covers help, your own overview, the inbox, shop browsing, item ID queries, and quest queries once FTB is installed. No-argument queries open the overview/list by default; search, filtering and paging use explicit commands or the current options. The default FTB query lists only a short table of in-progress quests; "view 1", "view quest name" and `/view` go straight to the detail module through the command layer, without relying on the model or the conversation history. Item aliases that cannot be parsed independently are handed to the model. Read-only dispatch can still misunderstand a request; thresholds cannot replace acceptance against real corpora.

## Notification button vectors

`LexicalIndex<T>` provides shared TF-IDF encoding, precomputed example vectors and cosine retrieval; the server-side `SemanticIndex` keeps the original module configuration and read-only protection, while the client-side `NotificationVoiceCommands` indexes the fixed button text of the current notification plus resource pack example sentences. Button actions are not limited to confirm, details or open; a new localization key automatically matches on its text, and additional phrasings can be added per key and language in `assets/system/routing/notification-buttons.json`, with the cache rebuilt after a resource reload. There are no model files, extra dependencies or embedding API calls.

A notification first matches the complete text and example sentences, then compares the vector scores of different button texts; it requires a similarity of at least 0.9, a coverage of at least 0.9 and a lead of at least 0.15 over second place, while unknown topics or complex expressions such as negation and conditions fall back to ordinary chat routing. Buttons use word features that keep the original verb and do not reuse the server-side domain aliases that unify claiming, purchasing and similar actions into `write`, so different write actions are not mistaken for the same operation. Low scores never confirm a notification automatically, and duplicate texts that map to several actions also fall back to main chat matching.

The vectors store only button templates, never player recordings or the original query text; the same button set and language reuse the in-memory index. A hit can only execute a trusted action already carried by the currently visible notification, and is still bound by the busy state, the lifetime of the original notification/connection and server-side business authorization. This path is equivalent to explicitly operating the current button and does not relax the server-side local-routing restriction on arbitrary write requests.

## Configuration and upgrades

The `config/system/system-semantic.json` generated on first run defaults to `mode=ENFORCE`, uses the built-in small vocabulary and example sentences directly, and needs no extra deployment steps. See [system-semantic.json](https://github.com/IAFEnvoy/System-Mod/blob/master/examples/agent/system-semantic.json) for a complete example. The mode, matching thresholds, text limit, cache capacities and new-entry TTL are read directly from the config instance and use the current values after a resource reload; the index is still built only at startup, so changing example sentences or index languages, or enabling the local index when it was OFF at startup, requires a normal restart.

```json
{
  "mode": "ENFORCE",
  "maxCharacters": 240,
  "minCoverage": 0.9,
  "defaultThreshold": {"score": 0.9, "margin": 0.15},
  "languages": ["zh", "en"],
  "lexicalThresholds": {},
  "examples": {},
  "cacheEntries": 1024,
  "cacheSeconds": 300,
  "entriesPerPlayer": 32
}
```

The above is the standalone `system-semantic.json` file. Overrides per module/language can be written as `lexicalThresholds["system:shop@zh"]={"score":0.95,"margin":0.2}`; language-level keys take priority over module-level keys, and `defaultThreshold` is used where there is no override. The score/margin range is 0..1 and the coverage range is 0.5..1. Lowering the bar increases misrouting; evaluate with real expressions first.

| Mode | Behavior |
| --- | --- |
| `ENFORCE` | High-confidence read-only requests go direct and the rest fall back to a single model call; some LLM read-only routes that pass validation can be cached |
| `SHADOW` | Computes candidates and counters but does not go direct, does not cache and does not offer candidates to the model; used for observation |
| `OFF` | Skips the local index and cache while keeping explicit commands and model routing |

The routing config only reads the current lexical-tfidf-v1 definition; it offers no ONNX config migration and never downloads or uses old model weights.

The language is still read from the client setting already synced by Minecraft; the model context always injects a trusted `requestContext.playerLanguage`, adding no client language packet. Only Chinese and English vocabularies are configured by default, and other languages or non-matching scripts fall back. Similarity scores are never used as tool authorization.

## Exact intent cache and isolation

The cache records only "this complete normalized input has been successfully judged to be a certain read-only module". An entry is written only when a module returned by the LLM completes execution, that profile allows local direct access, the current arguments can be extracted independently by the parser and agree with the LLM arguments, and there is no unfamiliar-topic gap. Not every AI judgement automatically becomes a public training sample, and errors, write operations, claim/quote references and dynamic business answers are never cached.

On a hit, arguments are still re-parsed from the current text, the read-only module is validated again, and the tool is executed to query the latest state. The key contains the player-specific scope, run generation, memory generation, language and the SHA-256 of the normalized text, and the original text is not kept in memory. Two players never share an intent cache, and an instance is bound only to the modules/vocabulary/strategy of the current startup.

It uses a bounded JDK `LinkedHashMap`: by default at most 1024 entries globally, at most 32 per player, with a TTL of 300 seconds, evicted in access order. There is no disk cache and no extra dependency. Clearing memory, changing preferences, revoking, disconnecting and shutting down the server all clean up the corresponding scope; late writes check the scope and player generation, and switching history saving off means the intent cache is neither read nor written. The local vocabulary and shared example sentences contain no player information and remain usable.

With external AI turned off, explicit entries and local read-only direct access still work; model-requiring fallbacks and AI sign-in are rejected by the existing preference checks. A missing key likewise does not affect local processing.

## Extension and diagnostics

An extension declares `ModuleRouting<I>` in the module's `routing()` and then registers the module only once in `AssistantRegistrationEvent`. Commands, semantic profiles, the model catalog and read-only shortcuts are all created by `ModuleRegistry`; there is no separate installation list of built-in profiles any more. One profile per module, and extra example sentences can be appended through `examples` in `system-semantic.json`; there is no additional hard cap on the number of modules, languages or example sentences. Extra example sentences only affect registered profiles; when the optional FTB module is absent its executable profile is not created. The matching text length, cache capacity, per-player capacity and TTL come from the config, whose parser only requires these values to be positive; similarity, margin and coverage are in the 0..1 range.

For example, add an example sentence in `examples` of `system-semantic.json` as `{"system:shop":{"en":["browse the system shop"]}}`. There is no need to swap the inference engine or modify routing business branches just to add one common expression; a new module can also match with example sentences in its own words. The vocabulary is only a few domain aliases, extra example sentences may use words absent from the vocabulary, and unknown words stay in the features.

```java
@Override
public ModuleRouting<EmptyInput> routing() {
    return ModuleRouting.<EmptyInput>defaults()
            .command(AgentCommand.literal(EmptyInput.INSTANCE, "extension", "extension status"))
            .semantic(RoutingProfile.read(text -> EmptyInput.INSTANCE,
                    List.of("Check extension status"), List.of("Show extension status")))
            .shortcut("example.action.status", EmptyInput.INSTANCE);
}
```

This example suits only an overview query without arguments. A business argument parser must validate the current request; return `null` when arguments are missing or ambiguous, and never fill them from history. A trusted Java extension must not hide side effects outside its tools. All registration happens before `engine.start()` and is frozen afterwards. `RoutingProfile.hints(...)` only contributes candidate samples and cannot execute directly; `explicitOnly()` still exposes the capability to the model with `explicitOnly: true`, requiring the model to be very confident before choosing it, and forbids semantic matching and intent cache direct access. `structuredOnly()` excludes the module from the model catalog and from return-value decoding, which suits payment confirmation. Rejection samples are registered through `engine.modules().reject(identifier, RoutingProfile.hints(...))`; they take part in the margin computation between different intents but have no callable module and are never sent as model candidates.

`/system routing` requires administrator permission and also works from the console. It outputs the algorithm `lexical-tfidf-v1`, the mode, the status, the number of example sentences, the number of cache entries, counters for each dispatch/fallback reason, and the module/language/score/margin/coverage of the most recent match. It contains no original player text or UUID; the latest match is a server-wide shared snapshot. `DIRECT` and `CACHE_HIT` count local paths that save the routing request and `SHADOW_DIRECT` counts candidates; none of them proves a judgement is correct. Local timing excludes the model and subsequent module execution.

This round covered only compilation and static checks; the game was not started, no model service was called, no classifier was trained and no accuracy/performance test was run. Coverage, misrouting and call counts still need to be measured with a separate annotated corpus and a real server before deciding whether to introduce an optional small supervised classifier.

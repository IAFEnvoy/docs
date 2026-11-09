---
title: "FTB guide index"
sidebar_position: 8
---

FTB checkmark quests are often used for modpack tutorials. They continue to be filtered out of in-progress quests and unlock notifications, while remaining queryable as an independent knowledge source; a query does not check the quest, consume materials or claim rewards.

## Usage

- The quest page of the full interface provides a "query guide" input box; enter a keyword or question and press Enter to query.
- The assistant input box accepts `/guide <keyword or question>`.
- The vanilla chat bar accepts `/system guide <keyword or question>`, and the command and completions are provided by the existing module command registration chain.
- Administrators or the console use `/system ftb reload` to re-ingest the guide quests currently loaded by FTB and rebuild the index; this does not change player progress or rewards.
- Natural language can select guide retrieval through the existing local routing or model routing; uncertain intents are still handled by the original routing.
- Ordinary knowledge questions enter the core `system:question`: it first merges local shared / player knowledge and readable guides, then answers by source; it searches only when nothing is found locally, the search module is enabled and this request explicitly allows network access. `/question <question>` forbids the network fallback, while `/search <question>` allows it.

Results show at most five different sources ordered by relevance, including the quest name, chapter and matched passage; a long original can be expanded in full. When no sufficiently relevant content is found, it shows "not found" and does not produce unsourced operating instructions. Guide quests can still be queried after completion, but native visibility always applies. This entry point does not change the numbered cache used by the proactive quest query.

## Ingestion and permissions

The rules currently in effect were confirmed with the user: only native CheckmarkTask quests, or quests that have no objectives, have guide body text and do not belong to the starter gift. Quests with ordinary mixed objectives, pure item-acquisition objectives and gift packs do not enter this index. "Guide" here is a structural filter that does not use AI to judge the writing style automatically; any quest description that meets the conditions can become a source.

Guide reading uses `FtbQuestReader.guideCandidates / guideReadable` separately and must not reuse the in-progress view that filters INTRODUCTION. Before returning, it checks that the chapter is still hidden, the quest's visibility for the current team, hideDetailsUntilStartable and hideTextUntilComplete. The completion state itself does not invalidate a guide that was originally visible.

The shared index may store the static quest body, but not players, teams, progress, reward claim state or permissions. A query first builds the set of IDs that the current player is allowed to read, and candidates do not fill their quota with hidden documents; after the background retrieval finishes, it returns to the server thread to re-check whether the quest, team, language and body still match. Entries whose permissions or content have changed are not returned. Hidden content is not sent to the client with the index.

## Implementation and size

This is a pure Java **local sparse vector index**: it reuses the word, Chinese character and adjacency features of LexicalIndex together with TF-IDF and cosine similarity, segments text at about 480 characters, and adds title matching. It is not a neural embedding and introduces no ONNX, model files, Redis or separate database process. When domain aliases are disabled, the specific words in item registry IDs are kept, so that all item IDs are not collapsed into the same feature; the original alias behaviour of intent routing is preserved.

The current return conditions are a similarity of at least 0.08 and a query feature coverage of at least 0.25. They are heuristic thresholds for filtering irrelevant fragments and **do not represent answer accuracy or probabilistic confidence**. This lexical method covers keywords and approximate expressions, but cannot guarantee arbitrary paraphrase or cross-language semantic matching.

Guides are stored through the unified AgentDatabase in the `system:ftb_guides` table of `<world save>/system/database/shared.dat`, with the original text per language; quest background classification also goes into a separate table of the same shared database, and the file is GZIP-compressed NBT. The per-player database uses `players/<UUID>.dat` and is reserved for other modules. For typed interfaces, cleanup rules and command semantics, see [tiered local database](database.md). The disk does not serialize TF-IDF vectors; the first query builds them in the background and an explicit reload rebuilds them in advance.

FtbQuestKnowledge caches the static snapshot of each language, avoiding reparsing the whole body on every query; each time only the player's authorized IDs are recomputed, and the body is checked again before matched sources are returned. FTB's native ClearFileCacheEvent or the manual command invalidates the snapshot, and translations and quest edits are re-ingested afterwards; a file modified by hand on disk must first be loaded through FTB's own entry point. A reload uses a generation to invalidate old queries; when the database is corrupted, it reports an error and keeps the file instead of silently overwriting it with an empty database. The two old separate cache files are no longer read or migrated.

Game objects and permission checks happen only on the server queue; vector building, retrieval and file I/O run in the background. The first query can ingest automatically, with no client upload or manual export of quest files.

For the version, dependency size, adaptation and performance analysis of a future disk vector backend, see [JVector index evaluation](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/jvector-evaluation.md). The Codec file database and sparse in-memory index described above are still in use, and JVector is not integrated.

## API and code entry points

`/guide` and the guide button on the quest page execute local retrieval directly and do not request an embedding or chat model; when natural language is ambiguous, the existing intent routing may still request the model once. For ordinary Q&A, `system:question` hands the authorized matched fragments to the text model for organization when external AI is allowed, and checks the current access permission both before sending and after; it does not search when local results exist. Automatic TTS reading of the result notice belongs to the existing independent speech feature, and the whole interaction cannot be called "free of external requests" on that basis.

- `data/database/AgentDatabases / AgentDatabase / DatabaseTable`: unified persistence of the two-level scopes, documents and other Codec tables.
- `data/database/KnowledgeIndex`: segmentation, sparse vectors and hit filtering.
- `compat/ftb/FtbQuestKnowledge`: the FTB static corpus, invalidation generations and manual re-ingestion.
- `compat/ftb/FtbQuestGuideTool`: game snapshot, authorized IDs, asynchronous retrieval and review before returning.
- `compat/ftb/FtbQuestReader`, `FtbQuestText`: structural filtering, visibility and reading in the player's language.
- `module/builtin/quest/QuestGuideModule`: the single retrieval tool, commands and the routing description.
- `QuestGuideInput / QuestGuideOutput`: action and card Codecs dispatched by registry, with common DTOs that do not reference FTB or client classes.
- `assets/system/cards/quest_guide.json`: matched passages and expandable original text; the quest page is still assembled by QuestSystemClientModule.

When the FTB module is not installed or not enabled, this workflow is not assembled and the FTB adapter is not loaded. For cross-version sync items, see [FTB cross-version record](../development/ftb-ports.md).

---
title: "Shared and per-player databases"
sidebar_position: 9
---

The current file-based document database uses Codec encoding and keeps the local sparse TF-IDF; it does not integrate JVector, SQLite, external processes or an embedding API. What is unified is the access point for knowledge and extension data; the responsibilities of the existing player business transactions, module DataStorage and usage ledger are unchanged.

## Scope and files

Each world save has one AgentDatabases created and closed by AssistantServer, which injects the query tool and the quest service through ModuleContext; AgentEngine does not hold a business database. A static singleton cannot be shared across world saves.

```text
<world>/system/database/
  shared.dat
  players/
    <UUID>.dat
```

- **Shared database**: `databases.shared()`. All players in the same world save reuse the static knowledge; the FTB guides and the quest background categories are both stored here.
- **Per-player database**: `databases.player(uuid)`. Each UUID gets its own file, data tables and in-memory index; it is loaded on the first actual read or write, and the file is created on the first write. Q&A reads the current player's private knowledge, and other extensions can still declare their own tables; the existing PlayerData and voice keys have not been moved in.

Both scopes use the same AgentDatabase API; searches are not merged automatically and there is no fallback to another player's data. The database entry point is a trusted server-side extension API; future Tools must take the player UUID from the current execution context and must not accept an arbitrary UUID supplied by the model. Shared knowledge also does not mean that any player can read every source; permissions are still checked by the business module.

The per-player database is deleted on revoke / reset and the old handle is invalidated at the same time (handled by the AgentLifecycle.revoked hook registered by the server); the shared database and the cumulative usage are not deleted. After the world save is closed, all open database handles are invalidated. There is currently no user interface for per-player databases, no cross-player query and no client sync entry point.

## Typed data tables

`DatabaseTable<T>` consists of a namespace ID and a `Codec<T>`, and the same ID must keep the same structure. Values are converted through the Codec into the private Dynamic storage; business callers read and write Java objects directly and do not pass a bare JsonObject.

```java
public static final DatabaseTable<String> NOTES = new DatabaseTable<>(
        Identifier.fromNamespaceAndPath("example", "notes"), Codec.STRING);

// Capture databases from ModuleContext at installation; all file access stays on workers.
engine.maintenance(() -> {
    AgentDatabase database = databases.player(playerId);
    database.put(NOTES, "home", "A private note");
    return database.get(NOTES, "home");
});
```

- `get(table, key)`: queries one value; a missing value returns Optional.empty.
- `entries(table)`: reads a typed snapshot of that table.
- `put(table, key, value)` / `remove(table, key)`: adds, changes or removes a single value.
- `replace(table, values)`: replaces the given table as a whole and does not touch other tables in the same database.
- `AgentDatabase.documents(source)`: declares the document table of that source, keyed by language with a list of Documents as the value.
- `prepareIndex(source, language)` / `search(source, language, allowedIds, query, limit)`: builds and reuses the in-memory passage index for that database, source and language.

FTB's table ID is `system:ftb_guides`, and background decisions use `system:quest_backgrounds`. Other modules use tables in their own namespace and do not need a new storage file or registration with the FTB adapter.

## Q&A knowledge tables

`DatabaseQueryTool.KNOWLEDGE` declares the `system:knowledge` document table, keyed by player language (for example `zh_cn`) with a `List<KnowledgeIndex.Document>` value. A server-side extension can write public or private material from the background:

```java
engine.maintenance(() -> {
    databases.shared().put(DatabaseQueryTool.KNOWLEDGE, "zh_cn", publicDocuments);
    databases.player(playerId).put(DatabaseQueryTool.KNOWLEDGE, "zh_cn", privateDocuments);
    return null;
});
```

There is currently no automatic import of arbitrary data tables, no cross-language fallback and no knowledge editing interface. Material placed in the shared knowledge table must be safe to disclose to the players of the same world save; the player table is queried only in the current execution context of that UUID and does not accept another UUID from the model.

The core `system:question` first calls the single-behavior tool `database.query`, which aggregates at most 5 passages each from the current player's table and the shared knowledge table; when the FTB feature is enabled it also obtains at most 5 authorized guides through the exported `ftb.guide`. The shared raw FTB corpus cannot be searched directly, so that quest visibility cannot be bypassed. Other business data tables and the background category cache do not enter Q&A retrieval.

When material is found it can be handed to the text model for an answer; when external AI is off or the organizing pass fails recoverably, only the raw text is shown. Only an empty result leads to this request's authorization and the search module, and a database error is not treated as an empty result. After the model organizes the material, the local sources are queried again and checked. See [Database Q&A and web search](search.md) for authorization and call budgets.

Data is saved as GZIP-compressed NBT through `FileAccess.NBT_COMPRESSED`, and the Dynamic values inside a table also use NbtOps. Reads are automatically compatible with existing uncompressed files and the old root header, and later saves use the standard header and GZIP. A database that does not exist is treated as empty in memory, and the file is created only on the first write; if an existing file fails to decode, a storage error is reported and the original file is kept instead of being overwritten with an empty database.

Every successful write replaces the file on disk before publishing the in-memory state; writes to the same database are serialized, and different player databases are independent. Temporary files use `<file name>.tmp` in the same directory, are flushed through `AtomicFiles` and then replace the target atomically; when atomic moves are not supported the write is refused. Read or write failures report a storage error; deleting a player database does not require decoding first, so reset still works. It provides no cross-database transactions, SQL or multi-process writes.

The index is invalidated when the data is updated, and building and sorting run in the background; sorting a stable index does not hold the database write lock. The disk stores the original documents and ordinary table values, and the TF-IDF vectors remain in-memory derived data. The current backend is a small-scale file backend, and a single write rewrites the complete file of that scope; large volumes or high write rates will need a new backend to be evaluated later.

## FTB reindexing

An administrator or the console runs:

```text
/system ftb reload
```

The entry point is registered with the available FTB System module, requires permission level 2 and does not require the executor to be bound to System. It reads **the definitions FTB has currently loaded**, re-collects the guide quests that match the rules, removes sources that were deleted or no longer match, and rebuilds the vector index. The reported counts are deduplicated by distinct quest ID. The currently cached languages, the languages of online players and the FTB fallback language are processed together; other languages are generated on their first query afterwards, and the corpus of an old language is not kept as a fallback.

Quest definitions and localization are read only on the server thread, while file writes and index building use the Agent's bounded background queue. Running it while it is busy reports busy; when a new native edit invalidation event occurs, an in-flight old query or old reload must not return old results, and an administrator can run the command once more. The reload replaces only the guide data table and does not modify the per-player databases, other shared tables, FTB completion state or rewards; background decisions are still reused by content and prompt fingerprint, so the model is not requested again pointlessly.

If you edited FTB's files on disk directly, make the definitions take effect through FTB's own reload entry point first, then run this command. This does not call FTB's load / save / submit and does not replace the native quest file reload. FTBQuestsEvent.ClearFileCache also invalidates the static text snapshot automatically, so the next query re-collects; before a query result is returned, the team, language, quest visibility, body hidden conditions and actual content are still re-checked.

The old `system-database/`, `system-quest-knowledge.json` and `system-quest-backgrounds.json` are no longer read or written and are not migrated automatically; guides are re-collected from native FTB and background decisions are regenerated on demand. Old files are not deleted automatically.

Currently this has only passed compilation and static checks; Minecraft was not started, and file persistence, player isolation, concurrent reloads and native edit events have not been accepted in practice yet. See the [FTB cross-version record](../development/ftb-ports.md) for the 26.1.2 sync entry point.

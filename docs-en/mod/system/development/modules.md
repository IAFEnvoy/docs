---
title: "Module lifecycle"
sidebar_position: 5
---

The public API and runtime live in `com.iafenvoy.system.module`, and the client caches live in `module.client`. The built-in server definitions and client implementations are `module.builtin.*SystemModule` and `*SystemClientModule` respectively, and the storage classes are gathered in `module.builtin.storage`. Concrete Agent workflows live in `module.builtin.<feature>`; single-behavior Minecraft tools live in `assistant.tool`, and local knowledge and search tools sit next to their workflows. `agent` keeps the common contracts and the execution machinery such as AgentModule, AbstractAgentModule and ToolRegistry. Execution ledger implementations live separately in `data.store`.

Core additionally provides `system:reasoning`, which composes several local read-only tools, while ordinary operations still go through the existing deterministic workflows. An extension tool can opt in to this capability through `.forReasoning(description)`; its parameters must provide a SchemaMapCodec, and write operations cannot join. The generic ReActLoop is shared with search: the loop, the tool list and the observations are each an independent context inside the request, while the budget still belongs to the original ExecutionContext. For the entry point and the `reactIterations` configuration, see [Generic ReAct loop](react.md).

## Two layers of modules

Module implementation types and module configuration instances are separate:

| Entry | Contents |
| --- | --- |
| `SystemRegistries.SERVER_MODULE` / `system:server_module` | Static `MapCodec<? extends ServerModule>` type registry, registered by `SystemServerModules` |
| `SystemResourceKeys.SYSTEM_MODULE` / `system:system_module` | Native synchronized data pack registry; the entries are `data.module.SystemModule`, and the server configuration is decoded by `server.type` |
| `SystemClientModules` | Plain implementation Map initialized on the client only; the `client` field of a data pack entry only stores an Identifier from that table |
| `SystemResourceKeys.SYSTEM` / `system:system` | System name, description and module IDs/tags/conditions; references the dynamic module instances above |

For example, `data/example/system/system_module/daily.json`:

```json
{
  "order": 80,
  "server": { "type": "system:signin" },
  "client": "system:signin"
}
```

This configuration instance has the ID `example:daily` and the server implementation type `system:signin`. The system's `modules` lists `"example:daily"`; `/system module add/remove/list`, manual player overrides and `has_module` also use the configuration instance ID. The module tag path is `data/<namespace>/tags/system/system_module/<path>.json`.

The top-level `order` is the display priority of the client entry: higher values come first, and the default is 0; a missing or malformed value falls back to the default. ClientModuleBindingsCache sorts everything in descending order before publishing the Workspace snapshot and keeps the original order for equal values; configurations that share a client implementation take the highest order, and a permanent local entry reads the definition with the same ID. The built-in player information is 100, ranking before the other built-in modules. This field does not affect module permissions, initialization dependencies or server-side workflow candidate selection.

Both `server` and `client` can be omitted: a server-only module writes only server, and a client-only contribution writes only client. The client is always an ID; ClientModule, the client Codec and UI classes are never decoded on the server. A dedicated server loads only the server module classes; the former ClientHooks has been split into adjacent client implementation classes.

| Interface | Responsibility |
| --- | --- |
| `ServerModule` | Provides `codec()`, dependency availability, storage, the runtime factory and the install hook |
| `ToolModule` | Exports `List<Tool>`, callable only from inside Agent workflows, with no player command or intent entry |
| `WorkflowModule` | Provides `List<AgentModule<?>>`, including server-event workflows such as advancements |
| `SharedModule extends WorkflowModule` | Additionally provides `serverCommands(root)`; no longer extends ClientModule |
| `CoreModule extends SharedModule` | Infrastructure; for a bound player, an installed configuration of this kind is always enabled and cannot be removed |
| `CatalogModule<T> extends SharedModule` | Sign-in, shop and lottery declare the catalog registry and optional IDs/tags, and catalog permissions are merged from the definitions the player has enabled |
| `ClientModule` | Client-only screens, commands and local card actions |

Types are expressed by interfaces, and `available()` only checks optional dependencies. Core, binding and usage implement CoreModule; player, items, sign-in, inbox, shop, lottery and quests implement SharedModule; advancements implement WorkflowModule; search implements ToolModule. Chat, settings, speech and basic interface operations stay resident in the client-local catalog and do not depend on registry synchronization after entering the world save.

## Server assembly and commands

`ServerModule.CODEC` dispatches through the static type registry with `byNameCodec().dispatch("type", ServerModule::codec, codec -> codec)`. Built-in types without parameters return a singleton through `MapCodec.unit(new ...())`; sign-in, shop and lottery are immutable records carrying rewards / offers / pools and use RecordCodecBuilder.mapCodec. The dynamic registry stores an independent SystemModule wrapper and does not register the same singleton repeatedly as multiple MC registry values.

Example of extending a type Codec:

```java
public static final DeferredRegister<MapCodec<? extends ServerModule>> TYPES =
        DeferredRegister.create(SystemResourceKeys.SERVER_MODULE, "example");
public static final DeferredHolder<MapCodec<? extends ServerModule>, MapCodec<ExampleModule>> EXAMPLE =
        TYPES.register("example", () -> ExampleModule.CODEC);
```

An extension mod binds TYPES at its public entry point. When there are no parameters, use MapCodec.unit; when parameters are needed, implement an immutable record, read the fields with RecordCodecBuilder.mapCodec, and have codec() return the same registered instance. The parameters sit inside the server object of the data file, flat alongside type; no second, hand-written JSON parsing layer is added. The client also decodes the synchronized server data, so module classes and their Codecs must not reference net.minecraft.client or optional mod implementation classes.

ModuleManager reads the dynamic configurations from the current server's RegistryAccess, filters them by available(), then installs pure tools first, workflows next and finally each instance's PlayerModule. Each configuration has its own ModuleContext, which exposes the `id()` of the current entry; the common base dependencies, AgentEngine and the module registry, are passed to the constructor and exposed as fixed fields through `engine()` / `modules()` instead of being placed in the service Map. Other services are created by AssistantServer and injected with `put(ContextType<T>, T)`, and modules obtain the matching type with `get(ContextType<T>)` without a cast. The built-in service keys live in ContextTypes and include GAME, COMMERCE, CATALOGS, DATABASES, SEARCH, NARRATION and DISPLAYS. Do not store server, player or runtime objects in global singleton definitions.

Adding a service only requires declaring a type key and injecting the object; the fields, constructor and getters of ModuleContext stay unchanged. For example:

```java
public static final ContextType<MyService> SERVICE = new ContextType<>("example:service");

// Inject before installing modules; lookup returns MyService directly.
context.put(SERVICE, service);
MyService installed = context.get(SERVICE);
```

ContextType is distinguished by object identity, and the name is only for diagnostics; registration and lookup must share the same key constant, since a new key with the same name neither overrides the original key nor confuses the generic parameter. put does not accept null, and get reports an error containing the key name when a service was not injected. The configuration contexts share the service Map of this installation, while the ID and the tool cache stay independent; AssistantServer or ModuleManager still creates and closes services, and the Context itself does not take over their lifecycle.

After the built-in services have been injected, ModuleManager publishes `ModuleContextEvent` once on the server thread through `NeoForge.EVENT_BUS`, and only then hands out the configuration contexts and installs tools and workflows. An extension mod can add its own services synchronously there, after which every configuration context obtains the same instance:

```java
@SubscribeEvent
public static void moduleContext(ModuleContextEvent event) {
    event.context().put(SERVICE, new MyService());
}
```

The listener registers on the game event bus, not the mod loading bus; read the fixed fields through `event.context().engine()` / `modules()`. The context of this event has no configuration ID yet, so do not call id(), and do not inject asynchronously later or keep the service in a static variable across world saves. A service that needs lifecycle management can implement PlayerModule and be created through sharedRuntime; a plain put does not close the object automatically. An exception thrown by the event aborts this assistant assembly and follows the same initialization cleanup path. The former AssistantRegistrationEvent stays after the built-in module assembly, for adding workflows and tools directly to AgentEngine.

During installation, `context.sharedRuntime(type, factory)` lets configurations of the same kind share a PlayerModule. That table belongs only to this ModuleContext, is indexed by the runtime Class, is not keyed by server and is not kept across world saves. ModuleManager deduplicates by object identity when running validate/tick/close and also closes created instances in reverse order if initialization is interrupted; `runtime(type)` lets trusted server entry points look up an installed instance. Each configuration's player Session is still created and closed independently, and a shared runtime must merge the references to player-level resources itself.

Different configurations may provide workflows of the same kind with the same action ID. ModuleRegistry keeps the candidates by configuration instance ID; the command / model / semantic catalogs are declared only once, and at execution time the candidate enabled for that player and its corresponding tools are selected. The entry Codec, workflow type, version, interaction / event properties, tool contract and read-only permission must match; parameters may affect execution and budgets, but the same action type should not declare different routing contracts. When a player has several candidates enabled at once, they are sorted by module instance ID and the first is chosen; a data pack should usually make the conditions of variants of the same kind mutually exclusive. Once a flow is selected its owner is kept, and removing that configuration cancels its in-flight and queued operations instead of switching to another set of parameters midway.

The available entries of the three catalogs are declared separately by CatalogModule and are unioned over the configurations of the same kind that the player has enabled, not limited to the first configuration selected when running a workflow. The corresponding registries are system:signin_rewards, system:shop_offers and system:lottery_pools; the field accepts an ID, a tag or a mixed array and reuses Saturn's keyOrTagList — omitting it means the whole table and an empty array means nothing, while the built-in modules explicitly use the matching #system:default. `assistant.commerce.CommerceCatalogs.available(player)` is the unified player catalog entry point; it receives the workflows and trading services through ModuleContext, and listings, model candidates, state, quotes and charging share the same filtering. See [Catalog options](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/datapacks.md#模块目录可选项) for details.

The game commands of each server implementation type are assembled only once. SystemCommand only creates the `/system` root node, collects SharedModule.serverCommands and then connects the common Agent commands. The binding, usage and core modules are responsible for grant/revoke/reset, usage, and opening the interface / ask / routing / module management respectively. Tab completion and module management read the IDs from the current world's system_module registry.

### Tool-only modules

A tool module implements ToolModule and provides codec() and `tools(context)`; each Tool performs exactly one behavior, and a group of behaviors is composed with a List. When assembled, a workflow obtains the exported tools with `context.tool(type)` and adds them to its own tool allowlist; execution still goes through ExecutionContext.tool uniformly.

ToolRegistry keeps handlers separated by module instance. A workflow tool uses the instance of its current owner; an externally exported tool is chosen at call time from the export modules the player has enabled. Budgets, event authorization, write receipts and the tool type identity check are retained. A tool module cannot implement WorkflowModule at the same time; a tool that is not enabled cannot bypass permissions by sending a request directly.

A missing required tool disables the workflow; Descriptor.optionalTools declares optional read-only dependencies instead, and a missing feature there does not affect the workflow's local paths. Execution still checks the module that owns the tool, and declaring an optional entry does not enable that module automatically. The FTB module can also export its guide Tool at install time, so that generic Q&A reuses the same permission and retrieval handler.

### Item source lookup

`system:items` assembles two workflows: `system:item_query` (name / ID lookup) and `system:item_sources` (the sources of a single item). The latter provides `/system recipe <item ID> [scope]`, semantic routing, a stable action ID and the click action of the item source card: each item cell carries its registry ID, and clicking it shows how to obtain the item directly, so the player does not have to retype it; the tool ID is `game.item_sources`, and the input is `item_id` plus an optional `scope`. `ItemSourceOutput` is both the tool result and a registered CardData, and the workflow sends the card through `AgentResult.data` instead of splicing serialized JSON into the message body. The following is only an encoding example of a tool snapshot:

```json
{"item":"minecraft:iron_ingot","scope":"loot","sources":[
  {"kind":"loot","id":"minecraft:entities/zombie","type":"loot_table",
   "outputs":[{"items":["minecraft:iron_ingot"],"count":1}],"notes":["weight 1"]}],"truncated":false}
```

The item source card reuses the shop's `grid`, `offer_cell_content` and `CardPagination`: icons and names are centered, the registry ID and the stack limit go into the extra lines of the vanilla item tooltip, and the duplicated text listing is dropped. The default full mode has 6 columns and at most 3 rows, with a single page shrinking to its content; local paging creates only the current page's DOM. The server still reads at most 20 matches in batches, and while more remain it shows a separate "More items" entry that keeps using the original query and offset to request the next batch, distinct from the local previous / next page. Per-item actions are added to the button table before the batch action and keep their original index; clicking a notification shows the sources as a PUSH view and can return, the compact mode lets the player choose by item name / number, and an empty result shows a localized hint.

`scope` defaults to `all`, the full query that runs every registered source; you can also write just the path of one source (`recipe`, `loot`, `tag`) or its full ID (`system:recipe`). Scopes are enumerated by `ItemSourceProviders` at assembly time, so a new Provider appears in tab completion automatically; an unregistered scope is rejected (`INVALID_INPUT`) instead of silently returning an empty list. On the command line it is `/system recipe minecraft:diamond loot`, and omitting the second word means a full query; semantic routing narrows to the corresponding scope only when the request contains keywords such as "drops / loot / recipe / crafting / tag", and otherwise keeps the full query. Semantic routing prefers an explicit registry ID in the request (`CommandArguments.singleItemId`) and, when there is none, uses `ItemNameIndex` to do a longest match against the local display-name table ("how do I get a diamond pickaxe" → `minecraft:diamond_pickaxe`, where a longer name wins over a shorter prefix word); that table is built once at server startup while assembling `system:items`, its names come from the server language, a dedicated server only has server resources and may fail to match Chinese names, in which case it falls back to model routing.

Defaults are not written into the JSON: `type` defaults to an empty string, `station`, `inputs` and `notes` default to an empty array, `count` defaults to 1, `scope` defaults to `all` and `width` defaults to 0. A slot's `items` uses ItemStackTemplate.CODEC (either a bare ID or with components), and the amount is stored separately in count; the entries are alternatives, not materials that are all consumed together. `width > 0` means shaped crafting: inputs keep the gaps and repeated materials and are no longer cut off at the old limit of 16 slots. There are at most 8 candidate examples per slot, at most 4096 tables are checked for loot and at most 64 tags. The aggregated result puts recipes first, then loot and tags, sorts each kind by ID and then keeps the first 64 entries with `truncated` set.

The client `item_sources.json` uses the `system:item_sources` node; the body first shows three category buttons with counts for "recipes / loot / tags", and empty categories are greyed out; the first non-empty category is selected by default. Recipes default to 4 entries per page, arranged in two columns in full mode, and at most 2 entries per page in a single column in compact / notification mode; the crafting station is shown as a compact icon next to the title. Loot defaults to 12 entries per page and shows the table ID and the merged entry notes; tags default to 24 entries per page, arranged as compact tags that wrap automatically. Loot / tags show the category description only once and do not repeat the item icon lookup for every entry. A template can change the capacities with recipe_page_size / loot_page_size / tag_page_size, and all these fields are lenientOptionalFieldOf.

Previous page / page number / next page are independent of the notification's bottom buttons, and a single page or an unavailable direction at either end is greyed out. The node reuses CardPagination, and the category selection and the page number of each category are stored separately in the current card's CardUiState, so switching category or page rebuilds only the current page's DOM without sending a packet, requesting AI or replaying speech. Recipes still show the ingredient slots → output and amount; shaped crafting keeps positions and is padded to the vanilla 3×3 size, item hover uses the vanilla tooltip, and multiple candidates are marked +N with examples listed in the tooltip. An unknown Provider kind falls into the recipe category while keeping the full source display, and an unknown mod recipe keeps its type ID and readable materials without guessing machine conditions. A localized hint is used when there are no sources or the result is truncated.

Sources are provided by `ItemSourceProvider`; `ItemSourceProviders` runs them sorted by ID and catches exceptions per source, so a failure in one optional integration does not affect the others. There are three built-in ones:

| Provider | `kind` | Contents |
| --- | --- | --- |
| `system:recipe` | `recipe` | Reads the server `RecipeManager` and generates an independent source per RecipeDisplay; recognizes shaped / shapeless, furnace, smithing and stonecutting displays, and falls back to placementInfo materials for other displays. ItemStackTemplate keeps the item components, type stays the recipe type ID and width keeps the shaped layout |
| `system:loot` | `loot` | Encodes each loot table once with `LootTable.DIRECT_CODEC` and scans item / tag entries; the index is kept in a WeakHashMap keyed by table instance, so it expires naturally once the old tables are reclaimed after a data pack reload |
| `system:tag` | `tag` | The item tags the item belongs to, one per entry; this is a classification dimension rather than a crafting step, so it only has `outputs` |

Other mods can call `ItemSourceProviders.register(...)` during construction to add their own sources and may return a custom `kind`; the new Provider path also becomes a valid `scope`.

All three built-in sources have coverage limits and do not pretend their results are complete: `Recipe#display()` returns an empty list by default and is overridden by only 9 vanilla recipe classes, so `CustomRecipe` subclasses such as item repair, map extension, banner duplication and fireworks, as well as mod recipes that do not implement `display()`, report no inputs or outputs; brewing is not a `Recipe` and is not in `RecipeManager` either. On the loot side only static entries are parsed, tags are expanded into items (at most 8 per table), nested `minecraft:loot_table`, `minecraft:dynamic` and `minecraft:empty` are skipped, and the random amount of `set_count` is not folded into `count`. The tag source reports only the membership and does not say where the tag is obtained. These recipe gaps need JEI's category projection to fill, and that exists only on the client, which the server-side tool does not depend on.

## Player lifecycle

ServerModule.runtime(context) returns the PlayerModule of that module configuration, or explicitly shares the same instance:

1. Runs validate after all workflows are assembled.
2. binding(player) captures the first binding data on the main thread and returns a callback that runs inside a PlayerData transaction.
3. When the module is enabled, creates the player Session, creates the declared DataStorage inside the transaction and calls initialize.
4. When initialization succeeds and the connection and activation generation are still valid, publishes the whole batch of available IDs and then calls ready.
5. Dispatches tick only to ready player Sessions; PlayerModule.tick is the server maintenance entry point of that configuration.
6. Closes the Session when its condition fails, when it is removed, on disconnect, on revoke or on failure; on server shutdown the runtimes are closed in reverse order.

Client-only data entries also take part in permission and state synchronization, but have no server workflow, storage or business runtime.

ServerModule.storages() returns a list of ModuleStorage, containing the owner, the storage type ID, the Java type, the MapCodec and the factory. The Codec is registered separately in Saturn's DATA_STORAGE_TYPE; business code calls ModuleData.get(data, STORAGE) inside the transaction. Storage is still isolated by ModuleStorage.owner: built-in configurations of the same kind share that feature's ledger, so renaming a configuration entry does not grant a second daily sign-in or duplicate orders. An extension that needs a separate ledger should declare a different owner.

The manager ticks by the declared storage.owner and deduplicates equal owners; a dynamic module ID must not stand in for the storage owner. Storage that detects its own rewrites ticks and calls markDirty when the state changed; copy deep-copies mutable members. Per-tick operations use in-memory transactions and never block on a file lock; dirty data is merged and saved asynchronously every second. revoke/reset deletes the player's business files, while the standalone usage statistics are kept.

## Client contributions

A client implementation is registered through the client-only entry point:

```java
SystemClientModules.register(Identifier.parse("example:daily"), new ExampleClientModule());
```

The data pack fills in `"client": "example:daily"`, and no ClientModule type is added to the public MC registry. The built-in client implementations are collected in the public static fields of registry.SystemClientModules; a dedicated server never loads that class or module.builtin.*ClientModule. An unknown client ID merely lacks the corresponding screen and takes no part in server-side business dispatch.

ClientModuleCaches.BINDINGS groups the client IDs by the synchronized dynamic entries, and each kind of UI is assembled once. ClientModuleContext holds the list of associated configuration IDs, and an operation is allowed as long as any of those IDs is enabled in the current player's synchronized state. The Workspace, text commands, tab completion and local actions all reuse that permission check. The permanent local catalog uses an empty association list, so settings, notification dismissal and basic interface operations remain available before entering the world save.

Binding and command data are both stored directly in their own Cache classes. ClientModuleBindingsCache rebuilds on client tag synchronization (including single-player connections) and clears when the client exits, and no longer filters the shared static data of Saturn's RegistryCache; server load events do not build client contributions. The first read prefers the registry of the current connection and assembles the local features only when there is no connection, while keeping the registry already received during the configuration phase; after the connection registry changes it rebuilds on demand. Client game commands are copied from ClientCommandCache, and asynchronous tab completion discards stale results by revision. Resource templates are still maintained by their own resource reload listener.

Full mode always shows the chat log and no longer provides a "conversation" entry or a navigation group title. Modules declare a workspace, text, buttons and callbacks; SETTINGS-style entries are all placed in the top-right corner, and the other entries are laid out directly on the left; interface binding and display only iterate the cache and do not hard-code a feature switch. Clicking an entry that has a page again collapses the toolbar through WorkspaceContext instead of running the module's open callback; the toolbar is shown below the log and above the input box. Instant queries without a page and standalone settings pages still run their original action. Local card actions are dispatched from the binding cache, and server actions still send a structured request.

## Data pack enablement and conditions

SystemDefinition.modules' Either becomes `Holder<SystemModule> | TagKey<SystemModule>` and reads the dynamic system_module registry. The reference format, condition, tag merging and manual add/remove rules are unchanged; see [Data packs](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/datapacks.md#系统模块定义) for details. An unknown direct ID reports a data pack error, and an optional tag member can use required:false.

The Codec of an optional FTB definition stays safe in public: when the dependency is absent, available() is false and the workflow, runtime and storage hooks are skipped. The FTB notification check inspects the implementation Codec of enabled modules, so renaming the quest module or using a custom entry ID does not lose notifications. The FTB adapter is still loaded reflectively only when the dependency exists. Search provides a module configuration only in the test source set and no longer appends to the default tag; administrators must configure it explicitly or add it manually.

The FTB adapter holds a single FtbQuestAccess, knowledge index and notification tracker through a shared FtbQuestRuntime. Notification listeners are registered per instance, installed on validate and unregistered on close; there is no static SERVERS/ACCESS table or process-level installed marker. Client echoes and files from other servers are both filtered out. Several FTB definitions share one notification upkeep, and the query and reward references are cleared only after every player Session reference has been released; an explicit submission calls this instance's notification bridge directly, and `/system ftb reload` looks up the same knowledge index from ModuleManager.

system and system_module are both native data pack registries: they are read when the world loads and synchronized at login, and they are not retained reload listeners, so adding or changing parameters requires a normal server restart or re-entering the world save. The resource reload of tags still follows vanilla rules. There is no compatibility layer for the old module registry / tag paths.

## Web search module

The server type is system:web_search and it exports only two single-behavior Tools, Search and Fetch; the client implementation SearchSystemClientModule can pair with the search page independently. A development dynamic entry keeps server.type / client but is not enabled automatically. Core `system:question` handles questions uniformly: it first queries private / shared knowledge and readable FTB guides and answers from the material when something matches; only when the local result is empty and the current request allows network access does it call an enabled search tool. Submitting from the search page also queries the stores first, and ordinary questions do not authorize a network fallback. See [Database Q&A and web search](../guides/search.md) for details.

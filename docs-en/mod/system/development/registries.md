---
title: "Registry index"
sidebar_position: 6
---

The keys of all formal registries are collected in [`SystemResourceKeys`](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/registry/SystemResourceKeys.java), and the instances in [`SystemRegistries`](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/registry/SystemRegistries.java). Code definitions join the built-in root registry through NeoForge `NewRegistryEvent`, entries are declared through `DeferredRegister`, and the mod loading flow freezes them all. Protocol types and card nodes use the formal registries; ASR / TTS use independent plain factory Maps, as described below.

## Client module binding cache

The public entry points are `module.client.ClientModuleCaches.BINDINGS` and `COMMAND`. `ClientModuleBindingsCache` directly stores the Workspace list and the local card action Map; `ClientCommandCache` directly stores the command declarations and the compiled tree. SystemClientMod calls `ClientModuleCaches.init()` during client construction, creating the caches early without reading the module registry early.

The binding cache coordinates the lifecycle of both pieces of data as a whole: it rebuilds from the client registry when `TagsUpdatedEvent.ClientPacketReceived` arrives, and clears both at once when the client logs out. It does not extend Saturn's shared static RegistryCache: its shouldUpdateStaticData filter skips the client synchronization of single-player connections, and content built early during server loading may be cleared again by a world switch. Client contributions only listen to client events and must not rely on server tag events to initialize them on their behalf.

The first read prefers the current connection's registryAccess; local always-on features are assembled only when there is no connection and no tag synchronization has arrived yet. When the tag packet already provides a registry but the local player has not been created yet, that snapshot is kept; a change of the connection's registry instance triggers a rebuild on demand, so an empty registry cache does not stay occupied. Each round walks the modules only once, the temporary node Builder is released after the command tree is compiled, and Workspaces and local actions are published as immutable collections. The cache no longer wraps another Bindings / Registry object; the old ClientModuleBindings and ClientCommandRegistry have been removed. Built-in local card actions are declared through localAction in the corresponding ClientModule.register, and extensions use the same entry point; CardController only performs dispatching. Player state and interface Documents are not part of this cache, and resource pack JSON continues to be maintained by CardTemplates' resource reload listener.

## System's own built-in registries

The fields in the table below correspond to the keys of SystemResourceKeys and the instances of SystemRegistries. Code types are created on both sides, declared and frozen by NewRegistryEvent / DeferredRegister; numeric ID synchronization is not enabled except for the two request / response protocol tables, and encoding and decoding go through the by-name Codec.

| Registry ID | Public field | Entry type | Built-in declaration |
| --- | --- | --- | --- |
| `system:server_module` | `SERVER_MODULE` | `MapCodec<? extends ServerModule>` | SystemServerModules |
| `system:card_data_type` | `CARD_DATA_TYPE` | `MapCodec<? extends CardData>` | SystemCardDataTypes |
| `system:action_type` | `ACTION_TYPE` | `MapCodec<? extends AgentAction>` | SystemActionTypes |
| `system:agent_request_type` | `AGENT_REQUEST_TYPE` | `StreamCodec<? super RegistryFriendlyByteBuf, ? extends AgentRequest>` | SystemRequestTypes |
| `system:agent_response_type` | `AGENT_RESPONSE_TYPE` | `StreamCodec<? super RegistryFriendlyByteBuf, ? extends AgentResponse>` | SystemResponseTypes |
| `system:card_node_type` | `CARD_NODE_TYPE` | `MapCodec<? extends CardNode>` | SystemCardNodeTypes |

There are 6 code registries in total. Only the card node DeferredRegister is bound in SystemClientMod; the dedicated server keeps its table empty. ClientModule has been moved out of the MC registries, and SystemRegistries and SystemResourceKeys no longer reference that interface.

### Built-in modules

The server types include core, binding, usage, player, items, signin, inbox, shop, lottery, advancement, ftb_quests and web_search, all in the system namespace. Each type provides CODEC / codec(), parameterless types use the MapCodec.unit singleton, and ServerModule.CODEC dispatches by type from SERVER_MODULE.

Dynamic configurations are registered separately in `system:system_module` and accessed through `SystemDataPackRegistries.modules(RegistryAccess)`. Built-in dynamic entries use the same-name ID, and extensions can create different IDs and parameters for the same type; the static SERVER_MODULE cannot be used to query module configurations or to obtain a player's available entries.

The top-level `order` of a module definition is synchronized to the client with the registry, defaults to 0, and the larger the value, the earlier it is placed. ClientModuleBindingsCache sorts Workspaces as a whole after assembly; multiple configurations of the same client implementation take the highest value, and equal values keep their original order. The built-in player information is set to 100 and is displayed first.

Client implementations live in a plain Map in SystemClientModules, initialized through the client entry point and exposed as public static fields. A data entry's client is an Identifier into that Map; the server never resolves client implementations. Built-in dual-side features are split into adjacent *SystemModule / *SystemClientModule classes and no longer share ClientHooks or a single implementation class. Chat, settings, speech and basic interface contributions are always present locally, and the rest check permissions by dynamic configuration ID.

| Interface | Purpose |
| --- | --- |
| ToolModule | Server-side pure tool collection, with no player-initiated request entry point |
| WorkflowModule | Server-side workflows and lifecycle; advancements use this type |
| SharedModule | Extends WorkflowModule and adds server-side game commands; does not extend ClientModule |
| CoreModule | Extends SharedModule; required once bound and cannot be removed |
| CatalogModule | Extends SharedModule; provides the registry keys of the three business catalogs and optional ResourceKey/TagKey lists |
| ClientModule | Client interface, local actions and clientCommands |

Categories are expressed as interfaces, and available() only checks dependencies. Both pure tools and workflows keep the owner by configuration ID. The Agent workflow and tool catalog support multiple candidates of the same type and select the implementation according to the modules currently enabled for the player; the client cache groups by client ID and assembles only one UI. See [Functional modularity](modules.md) for details.

### Card data and action payloads

There are 31 card types: `chat`, `text`, `selection`, `binding`, `shop_offer`, `shop_catalog`, `shop_quote`, `player`, `items`, `item_sources`, `delivery_state`, `reward`, `entitlement`, `purchase`, `quest`, `quest_guide`, `claim`, `sign_in_status`, `shop_order`, `lottery_catalog`, `lottery_pool`, `lottery_prize`, `quest_list`, `quest_unlocked`, `quest_notice`, `quest_startup`, `starter_gift`, `quest_submit`, `web_search`, `knowledge_answer`, `quest_pin`. `quest_unlocked` uses QuestUnlockedOutput and the existing quest_list template to aggregate the quests unlocked in the same batch; the common payload does not reference FTB classes. State and history are no longer registered as cards.

There are 24 action types: `free_chat`, `help`, `player_query`, `inbox`, `sign_in`, `item_query`, `item_sources`, `deliver`, `shop`, `shop_quote`, `shop_purchase`, `lottery`, `lottery_preview`, `lottery_draw`, `quest_query`, `quest_guide`, `quest_detail`, `quest_claim`, `starter_gift`, `starter_gifts`, `quest_submit`, `advancement_followup`, `question`, `reasoning`.

All built-in entries are exposed as `public static DeferredHolder`. Card implementations implement `CardData` and action implementations implement `AgentAction`; both create and pass data objects directly, and each implementation's `codec()` returns its own registered MapCodec:

```java
CardData card = snapshot;
AgentAction call = QuestDetailInput.byId(id);
```

The shared DTOs of the `agent` package (`ClientState`, `History`, `SignInStatus`, `ShopOrder`, `QuestList`, `QuestNotice`, `QuestEvent`) each have their own file and only hold data; they do not handle type registration. Card implementations provide `MapCodec`, `codec()` and `buildCard()`; the template and the display content are described once by CardBuilder, the root `CardData.CODEC` uses the formal registry's `byNameCodec().dispatch("type", ...)`, and data fields are flattened. `AgentAction.CODEC` dispatches from ACTION_TYPE by `moduleId` to the action's own MapCodec, with the parameters flattened directly:

```jsonl
{"type":"system:player","name":"..."}
{"moduleId":"system:quest_detail","questId":"0123456789abcdef"}
```

A registered action type does not mean it is executable: `ModuleRegistry` still checks whether the corresponding workflow is installed on the current server, whether the MapCodec instances are identical, and the player's feature permissions. FTB DTOs/Codecs are always registered on both sides, while the actual FTB tools and workflows depend on install detection.

`SystemCardDataTypes` is only responsible for the card data Codecs. `CardData.buildCard()` returns a CardBuilder, and building produces a CardView containing the template, parameters, buttons and narration. The client CardPresentation resolves Components and item names and reads the assets templates; it registers no rendering mappings, parameter builders or client card behavior. Data IDs and resource IDs can differ; see [Client JSON cards](../cards/overview.md#data-and-rendering-binding).

### Protocol types

| Registry | Built-in entry ID | Corresponding type |
| --- | --- | --- |
| `system:agent_request_type` | `system:chat`, `system:invoke`, `system:control`, `system:preferences`, `system:card_action` | `ChatRequest`, `InvokeRequest`, `ControlRequest`, `PreferencesRequest`, `CardActionRequest` |
| `system:agent_response_type` | `system:reply`, `system:notice`, `system:open`, `system:binding`, `system:state`, `system:history` | `ReplyResponse`, `NoticeResponse`, `OpenResponse`, `BindingResponse`, `StateResponse`, `HistoryResponse` |

The two protocol tables register `StreamCodec`s: the root `STREAM_CODEC` reads the synchronized numeric ID with `ByteBufCodecs.registry(...)`, then `StreamCodec.dispatch` calls the entry's own `streamCodec()` directly, without going through `Codec` / JSON and without dispatching by `type` string or ID Map. Both tables therefore enable numeric ID synchronization (`sync(true)`), and the registration order must match on both sides; unknown IDs are thrown during stream decoding. The network version remains `1`.

Requests and responses live in separate files under `agent.request` and `agent.response`, each defining its own `STREAM_CODEC`, and `SystemRequestTypes` / `SystemResponseTypes` only reference and register these instances. `ControlRequest` keeps the enum form and encodes by ordinal; the navigation enum is `OpenResponse.View` and the binding change enum is `BindingResponse.Change`, likewise encoded by ordinal. The root interfaces keep only the unified dispatch entry point and the common contracts.

Quest reads need no type registry: `ftb.query` / `ftb.find` always return `List<QuestBriefOutput>`, `ftb.detail` always returns `QuestOutput`, and the starter gift tools always return `StarterGiftOutput`, each using the corresponding Codec directly. Name disambiguation and starter gift display are handled by the combined tools in `QuestDetailModule`; for details see [FTB adapter and boundaries](overview.md#ftb-adapter-and-boundaries).

A Codec accesses the registry only on the first encode or decode, avoiding resolving not-yet-bound Holders early during static initialization. Keep using `Codec.lazyInitialized` when declaring new recursive Codecs, and do not call `.get()` on other DeferredHolders early in static fields.

### Card nodes

SystemCardNodeTypes declares 18 MapCodecs: text, markdown, title; image, item, player, ftb_icon; flex, grid; container, groups, details; button, link; divider, progress; player_information, recipe. The IDs are all in the system: namespace and are placed in the corresponding sub-package of screen.card.node by function. Only the physical client binds the DeferredRegister; the dedicated server loads neither AUI nor the node implementations.

CardNode only provides codec/css/render; the text projection, plain-text eligibility, title, children and collection index are each provided by capability interfaces. The recursive children Codec uses CardTemplate.NODES for lazy initialization. One client built-in registry is enough; no additional registries are needed per category.

CardData and nodes each use their own registry. For example, SystemCardDataTypes.ITEM_SOURCES is still an item source snapshot, and the client displays it with a combination of groups / grid / recipe, so no business list node is registered. FtbIconNode accepts a single FtbIconData, and the adapter is loaded reflectively only on clients with FTB installed.

button declares click/value directly: link opens a URL locally, return-val sends a string carrying a source, and local only invokes a trusted callback. The server-side CardButtonEvent supports an extensible string protocol, and unhandled events enter ModuleRouting.button according to the built-in CardEventValue rules; no button type registry is added. Buttons in the body are kept separate from the confirm, return and bottom-bar actions managed by the notification code.

The quest pin injects callbacks and state bindings through QuestCardBindings' client build event extension; DisplayCardCache keeps weak references and updates the buttons in the connection when pinRevision changes. progress remains an independent generic node. The quest list groups the existing query results, and the page number, grouping and collapse state are all kept in CardUiState, without changing the server data pack registries.

JSON example: `{"type":"system:item","item":"{{result_items.0}}"}`. For the full fields, capability interfaces, resource paths and examples see [Client JSON cards](../cards/overview.md).

### Speech provider Map

| Factory entry | Built-in key | Extension registration | Create instance |
| --- | --- | --- | --- |
| [`TtsProviders`](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/TtsProviders.java) | `aliyun` | `TtsProviders.register(id, factory)` | `TtsProviders.create(config.provider())` |
| [`AsrProviders`](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/AsrProviders.java) | `aliyun-nls` | `AsrProviders.register(id, factory)` | `AsrProviders.create(config.provider())` |

The internal `Map<String, Supplier<...>>` uses ConcurrentHashMap and is maintained by the public `register` methods; it takes no part in MC registration, freezing or synchronization, and does not need to be bound to the mod event bus. Providers look up the factory by the exact full string in the configuration; each call returns a new instance that is closed according to the original session lifecycle, and a namespace is never added automatically. The default keys are `aliyun` and `aliyun-nls`, and extensions may use names such as `example:voice` themselves. The pricing table additionally matches provider names that have no namespace after completing them to `system:`. Unknown providers still report a `provider` error.

## Data pack and external registries

| Source / registry key | Declaration entry | Query / purpose |
| --- | --- | --- |
| System module data pack registry `system:system_module` | `SystemDataPackRegistries`, `SystemResourceKeys.SYSTEM_MODULE` | `modules/moduleIds(RegistryAccess)`; module configuration, server type dispatch and client ID |
| System data pack registry `system:system` | `SystemDataPackRegistries`, `SystemResourceKeys.SYSTEM` | `SystemDataPackRegistries.get/ids(RegistryAccess, ...)`; system name, description and module definitions |
| Sign-in reward registry `system:signin_rewards` | `SystemDataPackRegistries`, `SystemResourceKeys.SIGNIN_REWARDS` | Server-side SignInRewardEntry; module rewards filtering |
| Shop offer registry `system:shop_offers` | `SystemDataPackRegistries`, `SystemResourceKeys.SHOP_OFFERS` | Server-side ShopOfferEntry; module offers filtering |
| Lottery pool registry `system:lottery_pools` | `SystemDataPackRegistries`, `SystemResourceKeys.LOTTERY_POOLS` | Server-side LotteryPool; module pools filtering |
| Saturn `SaturnResourceKeys.ENTITY_ACTION_TYPE` | `SystemEntityActions` | `system:add_module`, `system:remove_module` |
| Saturn `SaturnResourceKeys.ENTITY_CONDITION_TYPE` | `SystemEntityConditions` | `system:has_module`, `system:has_system` |
| Saturn `SaturnRegistries.DATA_STORAGE_TYPE` | `SystemDataStorages` | DataStorage Codec for module permissions, advancements, Agent logs, transactions, inbox, sign-in and persistent cards; `DISPLAY_CARDS` corresponds to system:display_cards |
| Vanilla `Registries.SOUND_EVENT` | `SystemSoundEvents` | `system:notification` |
| Client key mapping registration event | `SystemKeyMappings` | `CATEGORY`, `TOGGLE_INTERFACE`, `VOICE_INPUT`; registered with a NeoForge dedicated event |
| Saturn HUD registration table | `SystemHudEntries` | `NOTIFICATIONS` / `DISPLAY_CARDS`; layout keys `system.notification` / `system.cards`, registered once on the physical client, sharing the AuiHudEntry coordinate bridge and the Saturn editor / layout storage |

Systems and module definitions are queried through `RegistryAccess`, read when the world loads and synchronized when connecting; changing a definition or its parameters requires reopening the world or restarting the server, and tags still follow the vanilla resource reload rules. The static `SystemRegistries` cannot be used to query world data pack entries. The system file path is `data/<entry namespace>/system/system/<path>.json`; for the format see the [data pack documentation](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/datapacks.md).

The three catalog tables are loaded on the server only and register no network Codec; the paths stay `data/<namespace>/system/signin_rewards`, `shop_offers` and `lottery_pools`, and the tags live in `data/<namespace>/tags/system/<catalog name>/<path>.json` respectively. Module selection fields use Saturn's `RegistryCodecs.keyOrTagList` / `matchesKeys`, supporting IDs, `#tag` and mixed arrays, and configuration synchronization only encodes the resource keys. The three built-in modules reference `#system:default` of each table, and tags are never mixed across tables; for the exact semantics and examples see [Module catalog options](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/datapacks.md#模块目录可选项). `CatalogReloadListener` is no longer registered, so changing an entry requires reloading the world.

The `modules` of a system definition may reference dynamic `SYSTEM_MODULE` entries or tags, for example `"system:signin"`, `"#example:basic"` or `{ "id": "#example:basic", "condition": ... }`. `ModuleDefinition`'s Either is a `Holder<SystemModule>` or a `TagKey<SystemModule>`, evaluated by Saturn's `RegistryCodecs.holderOrTag` / `matches` against the current world's registry. The module tag path is `data/<namespace>/tags/system/system_module/<path>.json`; the client state synchronizes the configuration IDs that are actually enabled. For the full data format see [Data packs](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/datapacks.md#系统模块定义).

`SystemDataPackRegistries.ids(access)` provides the list of system IDs in the current world save, and `get(access, id)` looks up a specific definition; `/system grant <system ID> [player]` uses the former for completion and the latter for validation. The player stores its own binding ID, and both module evaluation and client display read by that ID; `current(access)` with a fixed default selection is no longer provided.

## How to register extensions

### New card or action types

An extension mod declares and binds its own DeferredRegister in the entry point that loads on both sides:

```java
public static final DeferredRegister<MapCodec<? extends CardData>> CARDS =
        DeferredRegister.create(SystemResourceKeys.CARD_DATA_TYPE, "example");
public static final DeferredHolder<MapCodec<? extends CardData>, MapCodec<ExampleOutput>> EXAMPLE =
        CARDS.register("example", () -> ExampleOutput.CODEC);

// In the common mod constructor:
CARDS.register(bus);
```

`ExampleOutput` implements `CardData`, `codec()` returns the registered `ExampleOutput.CODEC` instance, and `buildCard()` returns a CardBuilder describing the template, parameters and buttons; business code creates `ExampleOutput` directly. Action types implement `AgentAction` and register the implementation class's MapCodec directly into `SystemResourceKeys.ACTION_TYPE`:

```java
public static final DeferredRegister<MapCodec<? extends AgentAction>> ACTIONS =
        DeferredRegister.create(SystemResourceKeys.ACTION_TYPE, "example");
public static final DeferredHolder<MapCodec<? extends AgentAction>, MapCodec<ExampleInput>> EXAMPLE_ACTION =
        ACTIONS.register("example", () -> ExampleInput.CODEC);

// In the common mod constructor:
ACTIONS.register(bus);
```

A workflow's `inputCodec()` and the input object's `codec()` must return the same registered instance; business calls pass `new ExampleInput(...)` directly. `AbstractAgentModule` obtains both the registration ID and the input Schema from the SchemaMapCodec passed in, so no extra type wrapper is passed. Parameterless actions also define their own Codecs; the built-in ones use HelpInput, PlayerQueryInput, InboxInput, SignInInput and StarterGiftsInput, while tools may still share an EmptyInput that is not registered as an action.

### New card nodes

Bind it only in the client entry point:

```java
public static final DeferredRegister<MapCodec<? extends CardNode>> NODES =
        DeferredRegister.create(SystemResourceKeys.CARD_NODE_TYPE, "example");
public static final DeferredHolder<MapCodec<? extends CardNode>, MapCodec<BadgeNode>> BADGE =
        NODES.register("badge", () -> BadgeNode.CODEC);

// In a client-only mod constructor:
NODES.register(bus);
```

`BadgeNode.codec()` returns `BadgeNode.CODEC`, and the JSON writes `"type":"example:badge"`. Do not register nodes in `ClientModule.register(context)` or during a resource reload any more; by then the built-in registries are already frozen.

### New speech providers

Register the name and constructor reference through the factory entry during client initialization; no DeferredRegister is needed:

```java
TtsProviders.register("example:voice", ExampleTtsProvider::new);
AsrProviders.register("example:recognition", ExampleAsrProvider::new);
```

Fill `example:voice` or `example:recognition` into the corresponding configuration's `provider`. A `register` with the same name replaces the existing factory, so extensions should use their own namespace and complete the configuration before starting a speech session. New protocol/authentication fields, settings forms and billing units are still adapted by the corresponding provider and are not supported automatically just because a factory was added.

### Querying existing entries

```java
var type = SystemRegistries.CARD_DATA_TYPE.getValue(Identifier.parse("system:player")); // nullable
var optional = SystemRegistries.CARD_DATA_TYPE.getOptional(Identifier.parse("system:player"));
var id = SystemRegistries.CARD_DATA_TYPE.getKey(SystemCardDataTypes.PLAYER.get());
SystemRegistries.CARD_DATA_TYPE.forEach(entry -> { /* inspect registered types */ });
```

Protocol extensions use the same DeferredRegister pattern with the generic changed to the corresponding `MapCodec<? extends Root>`, and the root object's `codec()` returns the registered instance. Registering a Codec only handles serialization; new requests/responses must still provide behavior in the corresponding Handler, and new cards describe their content through their own `buildCard()` and provide an assets template.

## Runtime registration tables that remain

`ModuleRegistry`, `ToolRegistry` and `CommandRegistry` are the workflow, tool and command indexes of each Agent service instance. Client commands are assembled by `ClientCommandCache`, and pages and local actions by `ClientModuleBindingsCache`. ModuleRouting.button decodes the button string parameters, CardController dispatches local actions from the binding cache, and CardButtonEvent handles the server-side strings. These handle runtime behavior only and do not handle Codec type registration. ClientCards/ServerCards store the in-connection messages and versions, and ASR/TTS use the provider factory Maps. Card layout is taken directly from CardView.template, with no extra rendering or card behavior registration table.

`ClientModuleCaches.COMMAND` stores the assistant execution tree, the completion tree and the game client's `/system` node; registration, compilation, access and cleanup logic all live in `ClientCommandCache`. The binding cache is responsible for calling begin / finish / clear, avoiding duplicate assembly by two independent Saturn callbacks or a dependency on event order; get ensures that the whole round of binding assembly has completed, revision increments on cleanup and rebuild, and the interface rejects stale asynchronous completions by version number. RegisterClientCommandsEvent copies the nodes from this cache instead of walking the modules again. The cache only stores declarations and callbacks; permissions, buttons and quest candidates are evaluated in real time. On MC 26.1.2 the client configuration finishes by applying tags and publishing TagsUpdatedEvent.ClientPacketReceived, and the login/command packet merge then triggers client command registration; server command construction happens before the ServerDataLoad tag event, so the two sides must not be assumed to have the same order.

`TypeDispatch` is a utility that selects an internal handler by Java class, the resource template Map is a reload snapshot, and the player/session/cache Maps are business state. These are not part of MC's built-in registries and should not be frozen into global registries by this migration.

The data source Map for persistent cards lives in each server's `AssistantCardDisplays`; modules register the source ID, the owning module configuration ID and a read-only reader through `context.get(ContextTypes.DISPLAYS)`, and it is not placed in a global MC registry. References are kept in the core `DisplayCardsDataStorage`, with refresh / login / close driven by ModuleManager; the client's `DisplayCardCache` directly holds the mirror, the version and pending requests. This display pipeline is independent of the notification authorization and chat history of ClientCards/ServerCards.

ModuleContext's AgentEngine and module registry are fixed fields, read through engine() / modules(); the other service Map associates typed objects with `ContextType<T>` keys, and the built-in keys are collected in `module.ContextTypes`. This Map is not an MC registry and is not serialized or shared across world saves; extensions can declare their own keys in ModuleContextEvent on the game bus, injecting through put and reading through get, without adding unified fields or type registrations.

## Search module entry points

The server type Codec is SystemServerModules.SEARCH, and the client Map implementation is SystemClientModules.SEARCH; the development dynamic entry sets both server.type and client to system:web_search but is no longer appended to the default module tag. The search type only exports tools and registers no standalone AgentAction. The core action `SystemActionTypes.QUESTION_ACTION` has the ID `system:question` and corresponds to QuestionInput; the local answer card is `SystemCardDataTypes.KNOWLEDGE_ANSWER` / `system:knowledge_answer`, while online answers continue to use `WEB_SEARCH` / `system:web_search`. The templates are `knowledge_answer.json` and `web_search.json` respectively. The tool keys DATABASE_QUERY / QUEST_GUIDE / WEB_SEARCH / WEB_FETCH correspond to `database.query` / `ftb.guide` / `web.search` / `web.fetch`.

WebResearch has been migrated into the generic ReActLoop; each loop builds a local MapCodec table from the tool context and dispatches by `type=web.search|web.fetch|answer`, with the tool parameters in input. It is not an MC registry and does not add a separate global AgentAction. The cross-capability read-only workflow is registered separately as `SystemActionTypes.REASONING_ACTION` / `system:reasoning`; its tool list is built from the operations that modules currently enabled for the player explicitly declare forReasoning, and the observations are likewise dispatched by the tool Type's Codec. QuestionModule's ModuleRouting.explicit parses the current explicit web-access phrasing; ordinary questions are routed to system:question by the model, allowWeb defaults to false, and is true only when it is very confident that external queries are currently authorized. Q&A semantic examples are candidate hints only and never cache authorization; execution always queries the database first, and the web gate opens only when the local result is empty and optional tools are enabled. `explicitOnly()` and `structuredOnly()` remain available as generic routing declarations. See [ReAct loop](react.md) for details.

The free chat action `system:free_chat` uses FreeChatInput, and the reply card `system:chat` uses ChatOutput and chat.json; the core module installs the workflow, and structuredOnly excludes it from the model intent catalog. The full free mode assembles available capabilities from the original workflow table and ToolRegistry, ToolProvider can append registered read-only types, and the catalog is ordered by LOCAL / WORKFLOW / PAID; it is not a new MC registry. For administrator / player permissions, typed observations and extension interfaces see [Free chat](../guides/ai-modes.md).

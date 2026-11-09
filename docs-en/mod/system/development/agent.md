---
title: "Agents and module extensions"
sidebar_position: 3
---

The four execution strategies, the send-box mode menu, administrator and player permissions, and free-mode function calling are described in [AI modes and administrator permissions](../guides/ai-modes.md).

`com.iafenvoy.system.agent` is responsible only for execution, routing, budget, session memory and the Agent contract. Concrete workflows live in `module.builtin.<feature>`; Minecraft business logic, main-thread bridging and game tools live in `assistant`, data and loading live in `data`, and quest text and speech behavior live in `speech`. For the full dependency direction and extension points see [Package responsibilities and data flow](architecture.md). The command parser and router contain no business `switch` on module IDs.

Outer built-in module definitions live in `module.builtin`; their business DataStorage lives in `module.builtin.storage`. The Agent execution journal interface `AgentJournal` lives in `agent.storage`, while the implementation `AgentJournalDataStorage` and the file storage live in `data.store` and are injected when the server side is assembled. `AgentStore` likewise declares only the transaction interface; the engine does not depend directly on CoreSystemModule, the Saturn storage implementation or any concrete feature module.

The Agent root package keeps the public contracts `AgentResult`, `AgentException`, `AgentFailure` and `AgentLifecycle`; other types are split into sub-packages by responsibility:

| Sub-package | Contents |
| --- | --- |
| `execution` | AgentEngine, interactive/event executors, ExecutionContext, ExecutionPolicy, the bounded task queue and the session read/write service; closely cooperating internal methods still use package visibility |
| `module` | AgentAction, AgentModule, AbstractAgentModule and ModuleRegistry, declaring workflows, action types and entry points |
| `tool` | ToolRegistry, ToolContext and ToolObservation, responsible for tool types, instances, scopes and typed observations |
| `command` | AgentCommand, CommandRegistry and CommandArguments, responsible for the Brigadier entry point and argument parsing |
| `react` | ReActLoop, ReActContext and ReActTool, responsible for the generic bounded loop and loop-independent state |
| `storage` | AgentStore, AgentJournal and ConversationMemory, responsible for storage contracts and history context projection; actual persistence is still implemented by data.store |
| `routing` / `model` | Hybrid routing, semantic index and cache; model interfaces, gateways and protocol implementations |
| `request` / `response` | Request/response base interfaces, implementations and MapCodec |

`AbstractAgentModule` provides the shared implementation of registration ID, schema and tool allowlist for concrete workflows. Business input and output are placed together in `data.input` / `data.output`, and shared tool keys are placed in `module.builtin.BuiltinTools`. Shared codecs, schemas and HTTP utilities stay in the outer `util`. The `agent.module` here is the Agent workflow contract, which is separate from the outer `module`'s responsibilities of feature installation and lifecycle management.

Execution budgets, model connections, semantic routing and advancement rules are managed by the ConfigInstance of `AgentConfig`, `ModelConfig`, `SemanticConfig` and `AdvancementConfig`; reads use `INSTANCE.get()`, and commits use `INSTANCE.set(next)` and automatically mark the config for saving. The engine constructor receives only an AgentStore, a ModelClient and a transaction journal resolver; the shop catalog, search, database and quest narration are assembled by AssistantServer and injected into the modules that need them through ModuleContext. Dynamic config reads and startup snapshots still follow each consumer's existing behavior.

## Register once, many entry points

`ModuleRegistry` is the source of the current server's capabilities. `engine.registerModule(module)` does all of the following at once:

1. Checks the already shared and registered `MapCodec<I>`, the module Identifier and the tool allowlist.
2. Validates all command aliases and tool instance conflicts, then registers the module's tool List.
3. Binds the command argument parser, semantic examples and argument extractor, so the module ID never has to be filled in again.
4. Records model visibility and read-only shortcuts for use by the model catalog, clarification prompts and help.

`engine.start()` validates policies and event references, freezes the registries and builds the semantic index. After startup, registering further tools, modules or profiles is forbidden. Optional modules that are not installed are not registered, so they never appear in commands, help, completions, semantic executable candidates or the model catalog.

A server-only `ToolModule` is first installed into the engine ToolRegistry by ModuleManager and keeps the feature ID it belongs to; it registers no workflow or player entry point. Consumers obtain the shared tool instance with `ModuleContext.tool(type)` and add it to a workflow's tool allowlist; besides the existing budget, event and write checks, `ExecutionContext.tool` also checks whether the feature that exports the tool is enabled for the current player. Concrete model planning is the workflow's job, and a pure tool never becomes an intent routing target.

Action inputs implement `AgentAction`, and `codec()` returns the MapCodec of that class; the Codec is first registered on `SystemResourceKeys.ACTION_TYPE` through a DeferredRegister, and the built-in declarations are exposed by `SystemActionTypes`. The module's `inputCodec()` returns the same instance; buttons, commands and model routing all build the input object directly. The type and the Codec must be available on both sides, and definitions must not reference classes of optional mods that are not installed; see [Registry index](registries.md) for details.

## Responsibility boundaries

| Type | Responsibility |
| --- | --- |
| `AgentEngine` | Execution lifecycle, public entry points, unified module execution and invalidation generations; owns no concrete business services |
| `AgentStore` / `AgentJournal` | Player transaction and execution receipt interfaces, implemented by the host and injected |
| `AgentLifecycle` | Revoke, disconnect and permission-change hooks; businesses clean up their own caches |
| `AssistantBindings` / `CommerceTransactions` | Binding and deletion of business data, transactions and their quotes; both live in assistant |
| `ModuleContext` | Always provides `engine()` / `modules()`, injects extension services through `ContextType<T>` at install time, and publishes `ModuleContextEvent` before assembly |
| `InteractiveExecutor` | Interactive queue, per-player exclusivity, cancellation, fingerprint deduplication and history write-back |
| `EventExecutor` | Persistent events, rule authorization, state changes, recovery and event deduplication |
| `ConversationService` | History clearing, preferences and bounded history reads |
| `TaskExecutor` | Shared bounded thread pools, rejection, shutdown and future completion |
| `ModuleRegistry` / `CommandRegistry` | Capability registration and the entry points, commands, help and completions generated from declarations |
| `HybridRouter` | Selects modules; does not execute business flows |
| `SemanticRouter` / `SemanticIndex` | Read-only local matching, confidence thresholds and player-isolated intent cache |
| `ExecutionContext` | Per-task budget, authorization, current language, model requests and a single tool call |
| `AgentModule<I>` | Combines a flow with multiple tools within its own policy |
| `ToolRegistry.Tool<I, O>` | One tool type, one handler, one behavior |

The execution result `AgentResult` **no longer extends** Saturn's result type: Saturn 1.2's `Result<T>` is a `sealed interface` that only allows its own `SuccessResult` / `FailureResult` implementations, so types carrying extra fields now hold their own state and derive `isSuccess()` / `isFailure()` from `Status` (`PARTIALLY_SUCCEEDED` counts as a failure). Agent keeps its own message text, silent output and Status enum; SUCCEEDED, FAILED and PARTIALLY_SUCCEEDED are encoded as stable lowercase strings. `partial()` marks partial success, but it still counts as a failure; `withPresentation(...)` only produces a display copy. `AgentResult.CODEC` is still used across the network and in world saves, and the Failure implementation class is never transmitted. The shop's `CommerceCosts.Prepared` expresses rejection with `Optional<Failure>`: a quote must present a price whether pricing succeeded or not, so the price is held separately and only the "rejection reason" is optional. Search entries, model replies and audio-stream parse state are data payloads and do not use the operation success/failure contract.

`AgentException` stores only a Saturn `Failure`, read through `failure()`, and no longer accepts a string code. Built-in reasons are declared centrally by the `AgentFailure implements Failure` enum, which keeps the `system.error.*` translation keys. Extensions can pass their own Failure directly without joining the built-in enum. At async boundaries, `AgentException.failure(Throwable)` extracts the original value from the exception chain, and unknown exceptions map to `MODULE_FAILED`; wrapping preserves the cause. `AgentResult.error(Failure)` uses the original value's key / message, and text carrying parameters such as resource names can also be passed into cards. The ReAct recovery set and the degradation callbacks use Failure; only search provider error codes and persisted order receipt names are converted by `AgentFailure.fromCode`, and unknown names uniformly degrade to MODULE_FAILED. The network still sends translatable message keys or Components and never serializes Failure implementation classes.

When the outer ServerModule registers a workflow it records the ownerId, and ModuleManager publishes a per-player permission snapshot after the module activates successfully; help, completions, semantic candidates, the model catalog and the executors share the same availability filter, and ExecutionContext re-checks permissions at the tool and model entry points. Infrastructure and ownerless standalone extension workflows are not optional business modules. Structured buttons, exact commands, local semantics and model selection all ultimately produce the same `AgentAction`. Interaction and events share `AgentEngine.execute`, where permissions, policy selection and partial-success reporting are handled centrally; event recovery continues to use the persisted policy and the receipts of already-completed operations.

## Player module storage

Player-private records live in `<world save>/system/players/<UUID>.dat`, and conversation and request playback caches live in `<world save>/system/chat/<UUID>.dat`; both are read and written as GZIP-compressed NBT through `FileAccess.NBT_COMPRESSED`, each has its own limit and is replaced atomically, and a slow cache write does not block business writes. PlayerData.moduleData uses Saturn's `DataStorageHolder<Identifier>`; the holder key is the ServerModule ID, the concrete Java type distinguishes multiple storages of the same module, and the Codec type ID is independent.

Storages are declared by `ServerModule.storages()`, which returns ModuleStorage declarations containing owner, Codec ID, Java type, MapCodec and factory; the declarations are read from the server config of `system:system_module` in the current world; the static SystemRegistries.SERVER_MODULE only registers MapCodec types. Built-in codecs are registered to Saturn's DATA_STORAGE_TYPE by the DeferredRegister of SystemDataStorages, and codecs from extensions must be registered separately. Different modules can reuse the same storage type and codec; data is separated by ModuleStorage.owner, and built-in configs of the same kind share that feature's journal. Business access uniformly goes through `ModuleData.get(data, SomeSystemModule.STORAGE)`; do not add feature accessors to PlayerData. For the full declarations and lifecycle see [Functional modularity](modules.md#player-lifecycle).

Apart from the Agent execution journal in `data.store`, the built-in business Storages live in `module.builtin.storage`. A Storage's collection fields stay private, and full-collection getters are provided for the Codec; business code queries, writes and iterates inside transactions through methods such as `getTask`, `putDelivery` and `streamPurchases`, and capacity checks are also encapsulated in the corresponding Storage. Collection additions and removals, task state and budget, step receipts, order state and reward state all call `markDirty()` through the Storage's mutating methods; repeated unlocks, repeated rewards and assigning the same state do not produce a new dirty mark. Event tasks and step receipts are limited by both entry count and encoded byte size: when the limit is exceeded, terminal entries are reclaimed in insertion order, crash-recovery markers such as `QUEUED` / `RUNNING` are never reclaimed, and `STORAGE_FULL` is reported only when the whole table consists of non-terminal entries. Ledger objects returned from reads are for querying only; newly created objects may be populated directly before they are written. Cross-storage sign-in and rewards, and debits and order submission, are still orchestrated by the caller within the original transaction.

ModuleManager uniformly handles module start/stop, session create/init/ready/tick/close, Saturn DataStorage ticks and asynchronous saving. Only initialized modules are published to the Agent and the client; callbacks from old connections, old system generations or removed modules cannot reactivate a session. Main-thread storage ticks attempt in-memory transactions only, while file writes are batched on the maintenance thread; ordinary business write transactions still land on disk atomically. Reads and transaction results never expose mutable cache references, and failed transactions do not pollute already-committed in-memory data. Deactivation keeps sign-in, order and idempotency records; revoke/reset deletes the player file and caches, while usage SavedData is kept separately.

`TaskExecutor` does not change the size of any queue: interactive 4/32, event 2/64, maintenance 2/32. When a queue is full, `BUSY` is returned immediately; on shutdown, queued futures that have not started return `CANCELLED`. These queues never wait for the model on the game thread; game APIs continue to be scheduled onto the main thread by the platform queue.

## Declaring entry points for a Module

For example, `routing()` of the query module below registers the English command `/item <query>` and its Chinese alias. The two lists passed to `RoutingProfile.read` contain Chinese and English natural-language examples, respectively; keep each list in its corresponding language.

```java
@Override
public ModuleRouting<ItemQueryInput> routing() {
    return ModuleRouting.<ItemQueryInput>defaults()
            .command(AgentCommand.argument("<query>", text ->
                    new ItemQueryInput(text, 0),
                    "item", "物品"))
            .semantic(RoutingProfile.read(text -> {
                String id = CommandArguments.singleItemId(text);
                return id == null ? null : new ItemQueryInput(id, 0);
            }, List.of("查询物品 minecraft:diamond"),
               List.of("Look up item minecraft:diamond")));
}
```

Commands without arguments use `AgentCommand.literal(input, aliases...)`, and resource-ID arguments use `AgentCommand.identifier(name, parser, aliases...)`; `argument` turns the required `<query>` / optional `[query]` into a native greedyString node. Complex commands can construct `new AgentCommand<>(aliases, name -> LiteralArgumentBuilder.<AssistantCommandSource>literal(name).then(...))` directly, and describe arguments and permissions with native ArgumentType, requires and suggests. The command callback only hands the input implementing AgentAction to `source.action(input)` and never runs business logic during parsing; CommandRegistry checks action ownership and Codec, then enters the original workflow execution.

CommandRegistry builds only one Brigadier CommandDispatcher per server instance; parsing, help and the nodes synchronized to `/system` share the declarations. Native server commands are built before AgentRuntime, so after the first startup `SystemCommand.install` appends the workflow nodes, and RegisterCommandsEvent on resource reload assembles with the existing runtime; platform administration commands take precedence. Arguments synchronized to the client must use ArgumentTypes that MC has already registered; custom arguments specific to the assistant are not automatically registered as network types. After module enable changes and revoke/reset, the native command tree filtered by current permissions is re-sent.

Explicit command syntax errors such as `/view` and `/system view` return an input error, and an unknown slash command does not trigger the model; ordinary text that does not match completely continues into semantic and model routing. English literal aliases ignore case, while quest names and arguments keep their original text. Client-side local commands and the completion tree are cached through a separate `ClientCommandCache`, while quest candidates and buttons still fetch the current results in real time; see [Functional modularity](modules.md).

`RoutingProfile.read` is a request for local direct routing; the registry additionally requires that the module is interactive, that the write budget is zero, that all declared tools are read-only, and that the similarity, score gap, coverage and utterance guard checks pass. Similarity is not the probability of being correct. Write flows use `RoutingProfile.hints` to provide examples, and are still decided by the model or invoked from an explicit entry point.

When routing confidence is low and no model is configured or the player has turned AI off, `RouteDecision` uses the `LOCAL_FALLBACK` source and carries read-only candidate actions, and the interactive executor shows `SelectionCardData`. `ModuleRegistry.suggestions` generates the options from registered shortcuts, profile argument extractors and the optional `.choice(labelKey)`; arguments are parsed only from this request's original text, and when no suitable candidate exists it falls back to generic shortcuts. A click is a new structured request executed through the original card controller and server authorization, and no longer calls model routing; the candidate itself is neither executed nor written to the successful-routing cache. When the model voluntarily asks for clarification, this request's candidates are likewise shown first.

`.shortcut(labelKey, input)` declares a read-only button in the clarification prompt; when it is not set, nothing is shown. The model selection policy is stored uniformly through ModuleRouting.Selection:

| Declaration | Model capability catalog and return value decoding | Local semantic / intent cache direct routing |
| --- | --- | --- |
| `defaults()` | Participates in matching normally, `explicitOnly: false` | Subject to the read-only, argument, similarity and other thresholds |
| `explicitOnly()` | Still selectable, `explicitOnly: true`; used only when highly confident about the current intent, otherwise clarify | Forbidden; can only provide candidate hints to the model |
| `structuredOnly()` | Not exposed | Forbidden |

`explicitOnly` is a generic flag passed to the model, requires no fixed keywords and does not add a confirmation model call; the prompt asks the model to judge from the current request rather than treating local similarity as confidence. Operations such as payment confirmation continue to use `structuredOnly()` and are triggered through a registered exact command or a structured button. The execution entry point checks the source uniformly instead of having every module repeat the check.

Rejection examples are registered separately with `engine.modules().reject(identifier, RoutingProfile.hints(...))`. Their IDs must not conflict with a module, they have no executable entry point, and they only participate in local score-gap and fallback decisions.

## Keeping a Tool to a single behavior

The module constructor takes tool instances and combines them with a `List`:

```java
super(INPUT_TYPE, "Perform a bounded workflow.", Input.CODEC,
        List.of(queryTool, creditTool), true, false, policy);
```

At execution time they are called separately:

```java
Snapshot state = context.tool(QUERY_TYPE, "snapshot", input);
Receipt receipt = context.tool(CREDIT_TYPE, "credit", creditInput);
```

Do not add an `operation` field to a Tool to dispatch a set of behaviors. When the same tool is used by multiple modules, reuse the same instance and `ToolRegistry.Type`. Write tools declare idempotency and event permission; on recovery a stable `stepId` maps to the existing receipt, so completed operations are not executed again. The world save keeps only one global operation receipt and no additional unused per-task step table.

Event tasks and write-step receipts share the `State` enum (in the `data.store` package). Events default to `QUEUED`, are `RUNNING` while executing and `WAITING` while the player is offline; these three states allow recovery, and terminal states are recorded from the execution result as `SUCCEEDED`, `FAILED` or `PARTIALLY_SUCCEEDED`. Steps default to `RUNNING`, meaning the execution intent has been recorded but the result is not yet confirmed; `DONE` means the result has been persisted and can be replayed with the original result Codec. The world save still uses the same-named strings; explicitly invalid states are rejected by the Codec, and unknown business states are not retried as new operations. Incomplete non-idempotent tools still report EFFECT_UNKNOWN.

A Descriptor's `tools` are required tools and `optionalTools` are optional read-only tool IDs; the two must not overlap. Optional entries can be called only while the exporting module is enabled, and their absence neither disables the local workflow nor automatically registers a handler or grants the module. ExecutionContext.tool checks the declaration, the exporting module's permission and the read-only property at the same time; required and optional calls share the existing tool / step budget. Knowledge Q&A uses this mechanism to connect the FTB guide books and web search.

## Commands and completions on both sides

The assistant input box obtains command candidates from the server registry through the state snapshot. `HelpModule` generates module command descriptions from the same registry, and quest commands are not shown when FTBQ is not installed. Client UI page switching, settings, history and current action selection are still handled by the client; their execution and completion share the local command table.

Game chat's `/system <instruction>` uses the generic argument node and forwards to the same Agent command parser, and completions read the registry in real time. The platform's `grant/revoke/reset`, `usage` and `routing/ask/simple/full` have been folded into the `commands(root)` of the binding, usage and core features respectively. New Agent commands only require changing the workflow declaration; commands that need a standalone Brigadier node are contributed by the owning feature. Client local commands, completions and `/system settings` are also assembled from client features, so extensions should avoid existing aliases.

## Requests, responses and type dispatch

`AgentRequest.STREAM_CODEC` and `AgentResponse.STREAM_CODEC` read the synchronized numeric IDs from the official built-in registries `SystemRegistries.AGENT_REQUEST_TYPE / AGENT_RESPONSE_TYPE` and call the entry's own `streamCodec()` directly through `StreamCodec.dispatch`; an instance's `streamCodec()` returns the same registered StreamCodec. Built-in entries are registered on both sides through the DeferredRegister of `SystemRequestTypes / SystemResponseTypes`, so there is no longer a DispatchRegistry or a hand-built type Map. Unknown IDs throw during stream decoding, and definitions must not reference classes of optional mods. Card data implements the public card package's `CardData`, and the root Codec dispatches each implementation's MapCodec in the same way. buildCard returns a CardBuilder containing template, arguments, buttons and SpeechContent, which the client then builds into a CardView; it does not consult the client module table or business services. Actions likewise implement AgentAction and are dispatched by the registered MapCodec; card buttons carry the source CardRef and the action ID/string arguments through CardActionRequest, and ModuleRouting.button adapts and validates the original input Codec. For the list of entries see [Registry index](registries.md).

Requests are implemented as `ChatRequest`, `InvokeRequest`, `ControlRequest`, `PreferencesRequest` and `CardActionRequest` under `agent.request`, and responses as `ReplyResponse`, `NoticeResponse`, `OpenResponse`, `BindingResponse`, `StateResponse` and `HistoryResponse` under `agent.response`. Each implementation maintains a static `STREAM_CODEC`, and `SystemRequestTypes` / `SystemResponseTypes` only handle registration; the root interfaces no longer inline implementations. `ControlRequest` is an enum encoded by ordinal; the navigation and binding enums are held by the corresponding responses.

The following are the semantic fields of each request; JSON is not sent over the wire, `type` corresponds only to a registry numeric ID, and the remaining fields are written by their own stream codecs:

```jsonl
{"type":"system:chat","text":"Show my inventory"}
{"type":"system:invoke","call":{"moduleId":"system:player_query"}}
{"type":"system:control","action":"STATE"}
{"type":"system:preferences","history":true,"external":true}
```

Response types are `system:reply`, `system:notice`, `system:open`, `system:binding`, `system:state` and `system:history`. State and history do not occupy a card type; history is restored read-only and does not narrate or execute buttons; history entries are discriminated by `role`, and `assistant` carries an `AgentResult` object directly instead of a nested JSON string. Replies correlate the request UUID, notices go straight into the message queue; navigation carries `CURRENT/SIMPLE/FULL`, and binding changes carry `BOUND/REVOKED/INVALIDATED`. Request IDs are only for correlation and no longer pass operation strings such as `bound/open/event/revoked`. The network protocol is 1, and both sides must be updated together.

Server requests and client responses use util.TypeDispatch to dispatch runtime behavior; control actions and NLS events use a Map. Cards themselves provide display and narration through buildCard, and ClientCards handles SHOW/REPLACE/REMOVE by ID/version, with no more per-type refresh or narration handler registration. ReplyResponse completes the request regardless of whether cards are included; the client tracks page ownership and timeouts so that a late update cannot take over a new page. See [Card data flow](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/card-flow-design.md) for details.

The FTB query Tools use fixed return types: `ftb.query` lists currently executable or claimable quests and `ftb.find` searches readable quests, both returning `List<QuestBriefOutput>`; `ftb.detail` returns a single `QuestOutput` by ID or by the player's index in the last list, and throws a business error when it does not exist or is not viewable. `QuestDetailModule` handles name search, ambiguous candidate display and reading a single detail; the detail snapshot's `starterGift` only marks the quest category, and when a gift is encountered the Module calls the shared gift list tool again. Quest queries no longer define polymorphic results or a type registry. Quest objects and team progress are read only on the compat layer's server thread, and what is passed to the Agent is a data snapshot with a Codec.

Model routing still keeps the external `capabilityId` field; the decoded Map contains only the currently selectable Modules and `clarify`, and an uninstalled module is never exposed just because a shared input type exists.

New business capabilities continue to be registered through Modules. To add a protocol request, add the request type and its `MapCodec` registration, then register the execution handler in `AssistantRequests.registerRequests()`; to add a response, register the type Codec and the client handler together, with no more string checks or type switches. Type implementations keep interfaces without default methods, Codecs are declared in the implementation classes, registration is centralized in the `registry` package, and the root Codec accesses the registry lazily so that subclass static initialization does not recursively read a Codec that has not been assigned yet.

## Database-first Q&A with web fallback

The core module assembles `QuestionModule`, whose action is `system:question` / QuestionInput and whose only required tool is `database.query`. It first queries the current UUID's private and shared `system:knowledge` tables and the enabled FTB authorized guide books; when material is found it runs at most one model pass to organize it and shows the local sources, re-querying the database before sending. When no model is configured, external AI is disabled or the organizing pass fails recoverably, the original text is kept and there is no fallback to the web; a database query exception is not treated as an empty result either.

SearchSystemModule implements only ToolModule and exports `web.search` / `web.fetch`, which must be explicitly granted by a data pack or an administrator; the development default tag does not enable it either. Q&A opens the web gate for this ExecutionContext only when local results are empty, allowWeb=true, the tool-exporting module is enabled and the external service permits it; both web tools check that gate every time. `/question` uses false, while `/search` and an explicit submission from the search page use true; ordinary questions are recognized by the model but default to false, and true is set only when it is highly confident that the current request authorizes external queries. Semantic examples are hints only and neither route nor cache authorization; events, history and document bodies cannot enable the web.

Once permitted, `WebResearch` provides a compact SearchObservation and an independent tool context, and the generic ReActLoop chooses `web.search`, `web.fetch` or `answer` by dispatching on this request's tool MapCodec, with the final organization decoding only Answer. Only URLs returned by this retrieval may be fetched, and citation numbers are verified by the server. Q&A defaults to 6 loop rounds / 6 model calls / 9 tool calls / 20 steps / 90 seconds, with a 20-second single model call; database queries, internal FTB queries, the review pass and web access share the budget, overridden per `system:question`. Repeated retrieval or recoverable exploration failures switch to organizing existing material instead of retrying paid tools. Every web tool call checks cancellation, module permission and the external service preference, and is metered through SearchGateway; model tokens continue to be recorded by ModelGateway. General cross-capability analysis reuses the same loop through the core `system:reasoning`, defaults to 3 rounds, exposes only the read-only tools that enabled modules declare voluntarily, and does not grant web access automatically. See [Generic ReAct loop](react.md) and [Q&A and web access](../guides/search.md) for details.

Module implementation is separated from configuration: SystemModule data pack entries provide server/client, and the system references a dynamic config ID or tag; ServerModule.CODEC dispatches the registered MapCodec by type. Workflows and tools of the same type in different configs are selected by the owner enabled for the player, and the execution context stores the selected owner and keeps checking permissions. ClientModule is registered only in the client Map, and server classes no longer implement or reference client interfaces; the client merges UI by client ID and checks permissions by the associated config ID.

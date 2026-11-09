---
title: "AI modes and administrator permissions"
sidebar_position: 2
---

The full and simple interfaces share one mode menu to the left of the message input box. Each entry shows its name in large text and its description in small text; the initial mode comes from the current world save's `defaultMode` (default **standard**). Switching is saved automatically to `mode` in the server-side PlayerData and takes effect after the server confirms it, and survives relogging. This replaces the previous external AI / free chat switches and the top-bar override switch; history saving is still controlled separately on the settings page.

## Four execution strategies

| Mode | Execution order for text requests |
| --- | --- |
| Offline `offline` | Explicit commands → local intent cache / sparse vector matching → option card; neither the model nor server-side web search is called |
| Standard `standard` (default) | Explicit commands → local matching → one AI-assisted routing → workflow or option card; the AI can serve required modules such as sign-in and knowledge organization, but does not free-chat directly |
| Extended `extended` | Explicit commands → local matching with a higher threshold → AI-assisted routing; a single free-form answer only happens when the model cannot pick a capability |
| Free `free` | Text goes directly into a bounded ReAct conversation where the AI picks enabled capabilities, observes results and answers; client commands, local matching and the separate AI routing step are skipped |

`ConversationStrategy` defines the execution strategy interface; the four enum constants of `ConversationMode` each implement `route` and only order the shared `Routes.local / assisted / chat` steps. `HybridRouter` implements the steps and continues to own commands, candidates, model routing and local options. Adding a strategy does not require piling mode branches into the router. Networking and world saves use an enum Codec; adding a built-in mode means updating the menu, languages and permission semantics together.

Structured card buttons keep executing their original actions and are never treated as chat by free mode. Management requests such as mode selection and the history switch do not go through the model either. Free mode turns off text command completion; the other three modes still support it. All four execution modes are selected from the same menu to the left of the send box.

Offline state does not turn AI-dependent workflows into a separate local business: for example, sign-in, which needs the model to choose a reward, reports that the current mode is unavailable. Speech recognition and narration still use the client-side personal switches and account, independent of the server-side conversation execution mode.

`modeScores.functions=-0.1` in `system-semantic.json` applies to offline and standard, and `modeScores.freeChat=0.03` applies to extended. With the default base score 0.9 this yields 0.8 / 0.93 respectively; coverage, candidate margin, read-only restrictions, complex sentences and argument parsing conditions still apply. The mode is part of the cache key, so switching modes clears that player's routing cache and invalidates older executions.

## Default mode and host permissions

Each world save stores a top-level `defaultMode` in the SavedData `system:ai_access` (`<world save>/data/system/ai_access.dat`), supporting `offline` / `standard` / `extended` / `free` and defaulting to `standard`. It determines both the initial mode of new players and the upper limit of selectable modes for ordinary players. The order is offline < standard < extended < free, so a standard limit allows only offline / standard, while an extended limit also allows extended. Administrators use `/system ai default` to view the current value and `/system ai default <mode>` to change the default level.

Preferences saved by existing players are not overwritten; after the limit is lowered they execute downgraded according to current permissions and the interface is synced, and the original preference can be restored once the limit is raised again. Changing the default level marks the world save data dirty and refreshes online players immediately; both new player construction and decoding when the mode field is missing read the default from the current world save.

Single-player players and the **host** of a LAN game can select all four modes by default and do not inherit the AI / free chat disables from defaults. Identification uses the server-side `getSingleplayerProfile().id()`; LAN guests and OPs on a dedicated server are treated as ordinary players, without relying on Minecraft client classes. The host still takes the world save's defaultMode as the initial choice and is not switched to free mode automatically. Daily call limits, concurrency and per-workflow budgets keep their original rules; the highest mode permission does not mean unlimited calls.

Per-player UUID overrides in `/system ai` keep the highest priority, and the host is equally subject to explicit disable / freechat disable / limit. An ordinary player's `enable` raises the limit to standard when the default is offline; `freechat enable` explicitly raises it to the free ceiling but still needs the overall AI permission and a non-zero quota. After `reset` removes the overrides, ordinary players fall back to the configured limit and the host returns to the default permission for all modes. A boolean true in defaults does not raise the defaultMode ceiling; only an explicit player-level grant can.

## Administrator permissions and syncing

Administrator permissions are independent of player preferences. The server syncs the current player's `maxMode`, `allowAi`, `allowFreeChat`, `modelCallsPerDay`, the model configuration availability state `modelConfigured` and the saved mode to the client, and the menu disables options by the same rules and shows a greyed-out reason:

- The model requires an API key but the environment variable is unconfigured or only whitespace: only offline is selectable, every player (including the host) automatically executes in offline mode, and the menu and settings page report the missing key. Only the boolean state is synced; neither the key nor the environment variable name is sent.
- Options above the mode limit are greyed out and the current limit is shown; a saved higher mode is lowered to the limit.
- AI disabled or daily quota set to 0: only offline is allowed and the current execution drops to offline.
- Free chat disabled: at most offline and standard are allowed; a lower mode limit still applies.
- After the administrator allows it again, the still-saved original mode is restored; the player can also pick another allowed mode to overwrite the preference.

Client buttons cannot modify administrator permissions. The server rechecks permissions when it receives a mode change, and every routing, model request and tool execution still validates the current authorization. Daily used counts are still decremented and checked on the server; the menu greys out the quota when the administrator configured 0, not when the client estimates a remaining quota.

Model availability is checked only locally, without requesting the model API; it does not verify whether the key is correct or the service is reachable. With `apiKeyRequired=false` in `system-model.json`, keyless APIs are allowed and a missing key does not disable AI. Reloading the model config also refreshes the state of online players; removing the key cancels in-flight interactions, and once the config is restored the retained mode preferences and current permissions are applied again. Changing startup environment variables requires restarting the process; if the variable already exists, changing only the environment variable name or apiKeyRequired in the config and running `/reload` re-evaluates it. The client-side TTS / ASR keys and switches remain independent.

Administrators run the following commands in vanilla chat or the console; permission level 2 is required. Both the default level and player arguments support completion; per-player rules are saved by UUID:

| Command | Effect |
| --- | --- |
| `/system ai default [mode]` | View or change the current world save's default AI level / mode ceiling; omitting the mode shows the current value |
| `/system ai <player> enable` / `disable` | Allow / deny AI and server-side paid search under the unified gate |
| `/system ai <player> freechat enable` / `disable` | Allow / deny extended and free modes without affecting already granted standard-mode features |
| `/system ai <player> limit <count>` | Change the daily model call limit; 0 disables model modes without clearing used counts |
| `/system ai <player> status` | View effective permissions and limits; status can be omitted |
| `/system ai <player> reset` | Remove player overrides and restore the default rules for ordinary players / the host, without clearing personal preferences or used quota |

Changes take effect immediately and are written to the current world save by the automatic world save or a normal exit after `setDirty` is called; permission changes cancel in-flight interactions, sync the interface and send a vanilla chat notice. This data is independent of player business files and is not deleted by revoke, reset or clearing a conversation. Player overrides and default rules are both managed by SavedData; AI levels are no longer read from `config/system/`.

For ordinary players, boolean permissions and limits resolve as "player override → world save defaults → built-in default", and the world save's defaultMode ceiling is applied; the host skips the boolean permissions in defaults but still inherits the daily limit. Unset allowAi / allowFreeChat are true; modelCallsPerDay still inherits modelCallsPerPlayerDay from `system-agent.json`. 0 means no further model calls are accepted that day. allowAi=false also turns off free chat and the paid search behind the unified external service gate; local tools, TTS and ASR keep their own permissions and account configuration.

The settings page shows the current player's administrator permissions, mode ceiling and daily model limit read-only. The client can only change the two personal preferences history and mode; it cannot write administrator configuration or view other players' permissions.

## Function calling and budget in free mode

The core workflow `system:free_chat` is still structuredOnly and ordinary model intent routing cannot select it by itself. The fallback of extended mode produces only one answer. Free mode reuses `ReActLoop`: by default at most 6 rounds, 6 model calls, 16 underlying tool calls, 32 steps, 6 write steps and a 90-second total deadline, with a single model call capped at 30 seconds. The last round may only answer; `policies["system:free_chat"]` in `system-agent.json` changes the limits in one place.

`ChatActions` merges two kinds of capabilities: the workflows available to the current player in ModuleRegistry that the model is allowed to select, and the read-only Tools already exposed in ToolRegistry plus the read-only Tools that a `ToolProvider` adds for this request. Workflows support parameterized instances of enabled modules; underlying Tools keep their real input / result Codec and execute through an independent ToolContext. Players, items, item sources, quest lists / lookup / details, the manual, the database and gift previews can be read directly without wrapping a business workflow around them first. The database still includes the manual after the native FTB visibility check.

The catalog is ordered `ToolPriority.LOCAL` → `WORKFLOW` → `PAID`, with same-level entries sorted by ID; each description includes `priority`, prompting the model to prefer the relevant local reads, then ordinary workflows, and only then extra paid capabilities. Q&A (which may go online or make extra model calls), combined analysis and AI sign-in are marked PAID; Search / Fetch are marked PAID as well. This priority refers to extra cost beyond the current conversation's reasoning; it does not mean free chat itself is free, nor does it require walking every unrelated local tool. When the available evidence is enough, answer directly instead of reading the same information again through tools and workflows.

The explicit-entry flag still prompts the model to use the capability with care; structuredOnly final confirmation actions do not enter the catalog. Underlying write tools do not accept ToolProvider additions, and purchases, lottery draws, quest submission and gift claiming still follow the original authorization / confirmation flow. The read-only domain is filtered by enabled modules, exact Type instances and SchemaMapCodec; the module permissions of the tools already used are checked again before and after each call and before the final answer, so an extension entry cannot be used to reach a disabled feature. Extended mode still only provides one chat fallback and does not get these tools.

Nested workflows execute inside the same Agent worker and ExecutionContext and do not re-queue or acquire their own player execution lock. Their owner, origin, authorization set, policy and step prefix are temporarily isolated and restored afterwards; model, tool, write and total step counts are shared, and the sub-policy only shrinks the remaining allowance and deadline. Each call is assigned its own write-step prefix so several workflows do not collide on the same step name. The loop keeps the real result card and its buttons, and shows the results obtained so far even on failure / when the limit is reached, without claiming that a failed operation succeeded.

Going online still goes through the existing knowledge Q&A workflow: free mode prefers to query database.query directly, and only when the evidence is insufficient considers system:question; the latter re-queries the database in code and may search only when the result is empty, the search module is enabled and **the current request explicitly allows going online**. Raw Search / Fetch are not exposed to free chat automatically and do not gain online authorization by being ordered last; the existing paid tool handler continues to recheck authorization.

The loop distinguishes workflow from tool through the kind discriminator of ChatObservation, and raw query results keep their type through the ToolObservation Codec of this request's tool allowlist. The model can read the source and query results directly, and when the result is CardData the interactive card is kept as well; confirmation cards, failure states and partial results returned by workflows keep their original behavior.

When history is enabled, only up to the player's 20 most recent applicable messages, 16 KiB in total, are sent; assistant history takes only the ChatOutput body. History, cards and tool results are all treated as untrusted data. Answers use Markdown cards and reuse history, narration and the unified ModelGateway usage metering.

## System personality

A system definition can reference `data/example/system/prompts/personality/sign_in.txt` through `"personality_prompt": "example:personality/sign_in"`. The field is an optional Identifier; when omitted only the base prompt is used. The default system ships with `system:personality/default`, which uses a restrained system-voice tone, addressing the player as "host" in the Chinese localization and as Host in English.

AssistantServer looks up the server-side system definition from the current binding ID in this player's world save, then renders that TXT with the prompt snapshot of the ExecutionContext; the Agent layer only receives the text returned by the PromptProvider and does not query Minecraft registries. ChatSupport first builds the base instruction and then appends the personality, and both chat entry points share that flow; the ReAct of free mode captures the whole prompt at the start and does not read it again in later rounds. The personality and the base prompt belong to the same system message, add no model calls, and are still counted in the input and token budget. Permissions, tool allowlists and structured output keep their original code constraints.

Personality files support `{{player_language}}`. When none is specified, there is no current binding or the referenced file does not exist, the base instruction is used and a missing file is recorded as a server warning. Editing the TXT takes a `/reload`; changing the reference in the system definition requires reopening the world / restarting the server. Each execution keeps its original prompt snapshot, so a reload only affects new requests. The personality body is not synced to the client separately; it is sent to the configured provider together with the model request.

## Extension entry points

`engine.chat().prompts(PromptProvider)` can replace the base prompt provider; the default file `data/system/system/prompts/free_chat.txt` is loaded by the txt reload listener and contains direct answering, tool priority and the ReAct protocol. Replacing the base provider still appends the system personality; `engine.chat().personality(PromptProvider)` can replace that contribution separately, and its default game bridge is installed by AssistantServer.

An underlying Tool is first registered with ToolRegistry in the original way, and `.forReasoning("description")` exposes a read-only operation carrying a SchemaMapCodec to analysis and free mode; PAID operations never enter the analysis catalog that only allows local reads. `.withPriority(ToolPriority.PAID)` marks extra cost, execution still has to pass the external service gate, and the handler is responsible for its own business authorization. Tools without a published description can be added per request through the interface below; unregistered, disabled, write and schema-less types are filtered out and never gain permission because a callback returned them:

```java
engine.chat().tools(context -> List.of(MY_READ_TOOL));
```

The callback runs only when the full free mode builds its tool domain and does not affect extended mode. It returns the original registered `ToolRegistry.Type` instance; a different instance with the same ID cannot impersonate the original tool. A conflict with a workflow ID keeps the original workflow. Workflows declare their cost level through `routing().priority(ToolPriority.PAID)`; features that need to change game state or produce a confirmation card still use a workflow.

This round only covered compilation and static checks; Minecraft was not started and no real model was requested. The menu layout, mouse / keyboard operation and actual model tool selection still need in-game acceptance.

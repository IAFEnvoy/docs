---
title: "Generic ReAct loop"
sidebar_position: 4
---

`agent.react.ReActLoop` uniformly executes model decision → one tool → observation → next decision, and finally produces the answer. It is shared by ordinary multi-step analysis, web search and free-mode function calling; existing deterministic workflows such as exact instructions, local semantic direct routing, quest viewing and sign-in still execute directly and do not make an extra call to the loop.

## Entry point and default budget

The core workflow `system:reasoning` handles questions that require combining several local read-only capabilities, for example finding a quest, reading its requirements, and then querying where an item comes from. Model routing selects it only when multi-step combination is needed; single operations and ordinary knowledge questions continue to select the existing capabilities. It can also be entered explicitly by typing `/reason <request>` in the assistant input box; the command, completions and the client command snapshot are registered automatically with the core workflow, and no new page is added.

| Workflow | Loop limit | Model limit | Tool limit | Total steps | Total deadline | Single model call timeout |
| --- | --- | --- | --- | --- | --- | --- |
| `system:reasoning` | 3 | 4 | 8 | 14 | 60 s | 12 s |
| Web fallback of `system:question` | 6 | 6 | 9 | 20 | 90 s | 20 s |
| Free mode of `system:free_chat` | 6 | 6 | 16 | 32 | 90 s | 30 s |

One round is one model decision attempt; the final answer, invalid output and repeated actions all count as a round. The last round is forced to `finalOnly` and may not execute further tools. Three rounds therefore usually execute at most two tools before the answer is organized. Model calls used by routing count toward the workflow's total model budget but not toward loop rounds; after one model routing pass, a natural-language search has at most 5 model calls left even though the loop limit is 6. Database lookups, FTB queries inside the database, the review pass and web steps share the tool / step budget.

The setting is `policies.<workflow ID>.reactIterations` in `config/system/system-agent.json`; 0 disables loop invocation for that workflow, and a missing or invalid value falls back to 3. When there is no override policy, the module default policy is used, and Q&A defaults to 6. A policy override is still a complete object, so the other fields must be provided as well; you can copy the [complete configuration example](https://github.com/IAFEnvoy/System-Mod/blob/master/examples/agent/system-agent.json). For example:

```json
{
  "policies": {
    "system:reasoning": {
      "modelCalls": 4,
      "toolCalls": 8,
      "steps": 14,
      "writeSteps": 0,
      "inputBytes": 65536,
      "outputTokens": 1536,
      "totalTokens": 262144,
      "ttlMillis": 60000,
      "modelTimeoutMillis": 12000,
      "reactIterations": 3
    }
  }
}
```

`ExecutionPolicy` still controls tokens, UTF-8 input bytes, model / tool call counts, write steps and the total deadline. All loop calls continue to go through the same `ExecutionContext.model/tool` execution kernel, retaining server-wide model concurrency, the player's daily quota, cancellation, memory generation, revocation and billing; creating a new loop does not top up these quotas. The round count is read from the loop snapshot, so a policy change applies to new requests and does not change a loop that is already running.

## Context and tool permissions

- `ExecutionContext`: the lifetime, module permissions and total budget of this player request; shared within the same request.
- `ToolContext`: created independently for each loop; it freezes the tool Type, the actual handler and the owning configuration instance, and generates an independent stepId prefix. Before use, after return and before the final output, it checks the player state and the owner of the tools already used; module invalidation, revocation, forgetting, cancellation and the external preference being turned off do not enter the compensation pass.
- `ReActContext<O>`: the independent question, prompt snapshot, tool catalog, typed observations, set of repeated actions and round count. It is not attached to the player save, a global singleton or another player's context.
- `ReActTool<I,O>`: a single tool action that provides a parameter SchemaMapCodec, a description, a deduplication key and the observation projection. Return values are still encoded through the Codec; ordinary analysis builds the `ToolObservation` dispatch from this request's tool list, keeping the original typed parameters and results instead of manually assembling business JSON.

Ordinary analysis reads only the read-only operations that are declared explicitly with `Tool.forReasoning(description)` in the registry. That declaration requires the input to have a SchemaMapCodec, and write tools cannot declare it. It currently covers the database, player information, item query / source, and FTB quest query / find / detail; the handler is selected by the module configuration enabled for the player, and the FTB implementation classes are not loaded when FTB is not installed. Undeclared tools are never granted automatically.

Extension mods can append `.forReasoning("English description")` to their own read-only tool factory, and the owning module registers it as usual. Do not mark a handler with side effects as read-only; like the existing AgentModule, a Java extension is trusted code and not a sandbox.

To customize a loop, use `context.tools(TYPE_A, TYPE_B)` to obtain the subset of tools declared by that workflow, call them inside a `ReActTool` handler through `tools.call(type, input)`, then build a `ReActContext` and run `ReActLoop.run`. The workflow provides its own final answer MapCodec, completion / degradation functions and business authorization guard; the loop contains no database, search, shop or FTB-specific logic.

The recoverable reason set uses `Set<? extends Failure>`, and the degradation callback receives a Saturn `Failure`; the built-in reasons come from `AgentFailure`. The loop uses `AgentException.failure()` directly and no longer decides by string error code, while permission and cancellation failures still terminate first.

## Search migration and fallback

`WebResearch` keeps only the Search / Fetch parameters, summary trimming, the observed-URL restriction, citation review and card building. The old SearchStep dispatch and the private while loop have been removed, and SearchObservation is kept as search evidence. The call format is uniform:

```json
{"type":"web.search","input":{"query":"short query"}}
```

Fetching uses `web.fetch`, and the final answer uses `{"type":"answer","text":"answer","sources":[1]}`. The last round also accepts an object that contains only the answer fields. Search still always queries the database first, and local results do not switch to the web; a search tool context is created only when local results are empty, the network is explicitly allowed for this request, the search module is available and the external service is enabled. The ordinary analysis tool catalog does not contain Search / Fetch, so enabling the search module does not automatically grant web access.

Repeated actions are not executed again and move on to final organization. When evidence already exists, recoverable model or search errors switch to organization at most once within the remaining quota; authorization and cancellation errors terminate directly. Round, model, token, tool or time budgets are not increased automatically for compensation, and billed requests are not retried automatically. Search keeps the sources it has already obtained; when ordinary analysis fails to organize, the card results already obtained are kept and the user is told that the analysis was not completed, and tool JSON is never passed off as the player's answer.

The prompts are in `data/system/system/prompts/react.txt` and `web_search.txt`, and are reloaded through the existing txt reload listener and `/reload`. Each model request is still `system` and `user` JSON, with the observations placed explicitly in the input; the vendor's native tool_calls are not used, and the model's private reasoning text is not saved.

This verification consisted of compilation, resource and static checks; the game was not started, and no real model or search API was requested.

Free mode binds tools from the existing workflow catalog, executes nested within the same ExecutionContext, shares counting, tightens the sub-policy and isolates write-step prefixes; it keeps the original confirmation action and the real result card. The chat fallback of extension modes answers only once and does not run the tool loop. See [the four modes](../guides/ai-modes.md).

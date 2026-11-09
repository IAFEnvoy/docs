---
title: "Database Q&A and web search"
sidebar_position: 7
---

The server feature module `system:web_search` is an optional ToolModule that exports only two read-only tools, `web.search` and `web.fetch`, and no longer provides a separate Q&A workflow. The core module's `system:question` uniformly handles database queries, answering from material and the approved web fallback. The development data keeps the search module definition but no longer appends search permission to the default tag; the release JAR does not ship that module definition. Enabling the module, binding, logging in and opening the search page all make no request to the search service.

## Database first

The Q&A order is fixed by the code and does not rely on the model following it voluntarily:

1. Call `database.query` to query the current player's private database, the `system:knowledge` document table of the shared database, and the authorized guides exported by the enabled FTB module.
2. When matching material exists, call the model at most once, answer only from those fragments, and show the local sources in a collapsed card. When no model is configured, external AI is off, the quota is insufficient or the recoverable organization fails, the material is kept; it does not switch to a web search.
3. When no matching material exists, it enters web ReAct only if **the search module is enabled, this request explicitly allows network access and the external service is not disabled**; otherwise it returns the corresponding notice.

A database read error is not "no results" and must not lead to a web search. A matching fragment ends the local lookup branch, and even if the material is incomplete the model is not switched to the web; the database is queried again and the sources are reviewed before the answer is sent, and old results are cancelled when permissions or the body have changed. A general query reads only the specified knowledge table and does not scan business ledgers, background caches or other players' files. The raw shared FTB corpus must go through the native visibility check, and the whole `system:ftb_guides` table must not be read directly.

## Triggers and authorization

- Assistant input `/question <question>`, or game chat `/system question <question>`: queries local material only and does not allow web access.
- Assistant input `/search <question>`, `/websearch <question>`, or game chat `/system search <question>`: still queries local material first, and allows a paid web call when the local result is empty.
- Explicitly saying "search the web for me ..." or "please look this up online ...", or `search the web ...` in English; a fixed phrase can go straight to Q&A that allows the web fallback.
- Other natural expressions that look up material are judged by the routing model, for example "look up what the two modes of a redstone comparator do" or `look up how a comparator works`, without needing the word "web".
- In "Modules → Web search" of the full interface, enter a question and press Enter or click search.

`system:question` takes part in ordinary model routing; its `QuestionInput.allowWeb` defaults to false and is set to true only when the model is highly confident that the current request explicitly allows querying external material. When only the authorization is unclear, it keeps querying locally; only an unclear question itself is clarified. An ordinary question, a negative statement about the web, authorization from the previous turn, history content and quest events are not treated as search authorization. Local state, quests, rewards, shop offers and item names / registry IDs are handed to the corresponding capabilities first; item mechanics and usage belong to knowledge Q&A. Q&A semantic examples only give the model candidate hints and are neither direct-routed locally nor written into the intent cache, so `allowWeb=true` is never cached. Natural-language intent judgment is done by the model rather than a deterministic keyword check; use `/search` when you need to specify it explicitly.

The execution context opens the web gate for this request only after the database query is empty and the authorization conditions hold; every Search/Fetch still checks the module access and the external service preference. After the module becomes invalid, is revoked, is cancelled or "external AI" is turned off, no further billable request is made; requests already sent may still be billed.

A search module can be configured explicitly by an administrator in the system definition, or managed with `/system module add/remove <player> system:web_search` (the module ID follows the data pack instance). It is not a required module; removing it does not affect the local database and game queries. An empty query never adds the module to a player automatically.

## Configuration and shared key

The connection is configured in `config/system/system-search.json`:

```json
{
  "baseUrl": "https://api.deepseek.com/v1",
  "apiKeyEnvironment": "SYSTEM_DEEPSEEK_API_KEY",
  "maxResponseBytes": 4194304
}
```

By default it reads the same server environment variable `SYSTEM_DEEPSEEK_API_KEY` as the DeepSeek text model, so no separate key is needed. The search connection is still configured separately: after switching to another OpenAI-compatible text model you can keep DeepSeek search; if the model's key environment variable is renamed, the `apiKeyEnvironment` of the search must be changed as well.

`baseUrl` is a prefix that includes `/v1`, to which `/tools/search` and `/tools/fetch` are appended respectively; do not fill in a full operation URL. HTTPS is required for the remote end, while a loopback address may use HTTP; authentication information, query parameters and fragments are not allowed. Each request snapshots the connection information inside the config lock, and the network wait does not hold the lock. The maximum response is 4 MiB by default; anything beyond it fails and is not used as a complete result.

All configuration is managed by `ConfigInstance`; when a file is missing it is copied from the JAR's `defaults/<file name>`, and an existing file is not overwritten; fields use `lenientOptionalFieldOf`. After initialization, the search connection and the pricing configuration can be reloaded with the server's `/reload`, while the module execution policy is applied after a restart.

## Independent ReAct budget

Once the local result is empty and permission has been granted, `WebResearch` provides the generic `agent.react.ReActLoop` with the Search / Fetch tools, an independent ToolContext and search evidence, and runs model choice → one tool → compact evidence for the next round. It outputs only typed actions and the final answer and does not require the model to output a chain of thought. The first step must be a Search, and the last round decodes only the Answer, organizing the results already obtained. The whole `system:question` defaults to at most **6 loop rounds, 6 model calls, 9 tool calls, 20 steps and a 90-second total deadline**; a model call takes at most 20 seconds, and HTTP at most 15 seconds, constrained by the remaining total time. The tool budget includes `database.query`, its internal FTB query and the local result review; the web loop uses the remaining budget, and Search and Fetch share the quota. Rounds include the final organization; routing consumes only the model budget and not loop rounds. For the generic mechanism and context boundaries, see [ReAct loop](../development/react.md).

Adjust it separately by workflow ID in the `policies` of `config/system/system-agent.json`, without changing modules such as sign-in and quest. For example:

```json
{
  "policies": {
    "system:question": {
      "modelCalls": 8,
      "toolCalls": 11,
      "steps": 24,
      "writeSteps": 0,
      "inputBytes": 65536,
      "outputTokens": 1536,
      "totalTokens": 524288,
      "ttlMillis": 90000,
      "modelTimeoutMillis": 12000,
      "reactIterations": 6
    }
  }
}
```

`steps` must cover the total steps of the model and the tools, with one model organization reserved at the end; the byte and token budgets must also match the round count. If natural language goes through model routing, that model call also counts toward this Q&A's total budget; an explicit command can skip this routing. The former `policies["system:web_search"]` no longer controls Q&A, and `system:question` must be used instead. The client wait time is synced from the server and includes the longest available interactive workflow deadline and the transmission margin. Model calls are also subject to the server-wide concurrency and the player's daily model quota, and there is no automatic retry for the search service.

Each Search takes 5 summaries and does not attach the page body proactively. The model chooses Fetch only when the summaries are insufficient; only the exact URL actually returned by this retrieval may be fetched, and new links inside the page are not followed. Source numbers are assigned by the server, and a model citation of an unknown number is rejected; the final result card shows the answer and the sources, and TTS reads only the answer.

When retrieval material already exists, the workflow reserves one model call and a time window for the final organization; if the remaining time cannot hold both one tool request and one model organization, it organizes directly. Repeated queries, repeated fetches, or recoverable model / tool errors in the exploration phase all switch to finalOnly and answer from existing material instead of falling back to the source list; this organization still counts toward the original model calls, steps, tokens, concurrency and daily quota, and it does not retry a tool that has already been billed. Only when the final organization fails or the hard budget is exhausted are the sources kept, and the server log records the stable error code, the number of model calls, the number of sources and the remaining time, without recording keys, player questions or web page bodies. Revocation, cancellation, module invalidation and turning off the external service do not enter the compensation organization.

`web_search.txt` requires the model to distill the facts relevant to the question from the web pages, merge duplicate information, and omit navigation, ads, boilerplate and irrelevant background. The final answer gives the conclusion first, usually one short paragraph or 2–4 brief points; usage questions provide the operating steps, controls and a short example, comparison questions add only the key differences and applicable scenarios, necessary numbers, conditions and uncertainties are kept, and detail is expanded only when the user asks for it. The answer does not repeat the question, the retrieval process, source titles, URLs or long summaries; citation numbers stay in the body, sources are shown separately by the card, and no extra compression model call is added.

The "sources and summaries" of the search card are collapsed by default through the generic `system:details` node; when expanded, each source takes its own block, with a preview of at most three summary lines under the title and long content ending in an ellipsis; consecutive whitespace in titles and summaries is collapsed into a space by the server. Source titles use `system:link`, obey the Minecraft link toggle and the vanilla confirmation setting, and can open the web page to read the full text. The collapsed title and the links use separate text children, and expanding immediately invalidates the subtree layout and submits a reflow. Collapsing and expanding are local display operations and do not repeat the search or call the model. Both assistant interfaces are interactive, while the HUD requires entering the chat bar first. The prompt can be overridden by a data pack and reloaded with the server's `/reload`, and the card JSON and styles can be overridden by a client resource pack.

## Data and security boundaries

- The search service receives only the query terms, result count and body toggle exported by the current request; Fetch receives the URL of the selected page. The workflow fills in no location, player UUID, inventory or history.
- The organization model receives the current question, the player language, the sources of this retrieval and the limited page bodies. Information the player actively typed is still contained in the current question.
- Source titles, summaries and bodies are all treated as untrusted material and carry no tool authorization. The workflow holds only Search and Fetch and cannot write game state, claim rewards or make payments.
- A single title keeps at most 200 Unicode code points, a summary 700 and a Fetch body 5,000; the model is explicitly informed of the truncation and does not claim to have read the full text.
- External HTTP is executed by the shared `HttpTransport`, which forbids redirects, limits bytes and timeouts, and does not send the DeepSeek key to search result domains.

## Billing and usage

Search and Fetch both default to **5 CNY per 1,000 successful requests that returned results**, that is **0.005 CNY** each; the number of search results does not count as requests and does not mix into tokens. One Search plus one Fetch is 0.01 CNY, and the model organization tokens are billed separately. According to the official documentation, empty results are not billed; a timeout, network interruption or unparseable result is marked unknown and is not inferred to be free.

The server pricing configuration is `config/system/system-search-pricing.json`, and the default file comes from the JAR's `defaults/system-search-pricing.json`:

```json
{
  "searchPerThousand": "5",
  "fetchPerThousand": "5"
}
```

The unit price uses a decimal string; each request snapshots the price and stores the cost, accurate to one billionth of a CNY; a price change does not recalculate history. `SearchGateway` uniformly records the player, Search/Fetch, attempts, successes, billing, unknowns and cost, and finally writes them to the standalone world SavedData `<world save>/data/system/token_usage.dat`. The usage page gains a web panel, and administrators can query the whole server under the existing permissions; revoke/reset/forget do not clear the accumulated usage. TTS/ASR stay client-private.

This amount is an estimate; it does not include model tokens, free quotas or billing adjustments, and the vendor's actual bill prevails.

## Interface and errors

Underneath, the standalone `SearchProvider` / `DeepSeekSearchClient` is still provided, and a synchronous call must run on a worker thread. Game modules should use it through `ExecutionContext.tool` → `SearchGateway` to avoid bypassing authorization, budgets and player metering.

| Error code | Meaning |
| --- | --- |
| `SEARCH_INVALID_REQUEST` | The query or URL does not match the interface Codec; nothing was sent |
| `SEARCH_NOT_CONFIGURED` | The server key is missing; nothing was sent |
| `SEARCH_TIMEOUT` | The wait timed out and no automatic retry was made |
| `SEARCH_UNAVAILABLE` | Network error, the client is closed, or the response exceeded the limit |
| `SEARCH_HTTP_ERROR` | HTTP status other than 200; the original exception keeps the status code and exposes neither the body nor the key |
| `SEARCH_INVALID_RESPONSE` | HTTP 200, but the result cannot be decoded |

## Basis and verification

- [Official usage guide and pricing](https://api-docs.deepseek.com/zh-cn/guides/search)
- [Search Schema](https://api-docs.deepseek.com/zh-cn/api/search)
- [Fetch Schema](https://api-docs.deepseek.com/zh-cn/api/fetch)

The implementation boundaries are based on a source code review; it was compiled with `compileJava testModClasses --console=plain`, without starting Minecraft, running tests or calling the billable API. In-game interaction, actual vendor responses and billing still require a run-time acceptance check.

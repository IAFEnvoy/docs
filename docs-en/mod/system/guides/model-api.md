---
title: "Model connection"
sidebar_position: 3
---

The default is still `https://api.deepseek.com`, `deepseek-chat` and the environment variable `SYSTEM_DEEPSEEK_API_KEY`. The model config is independent of the execution budget, and there is no migration from the old aggregate config. The model protocol adapter is `OpenAiCompatibleClient`, which sends non-streaming requests in the OpenAI Chat Completions format, with the underlying HTTP handled by the separate `com.iafenvoy.system.util.HttpTransport`. All routing, sign-in and extension modules still go through `ModelGateway` uniformly, and actual token usage continues to be accumulated per player.

## Configuration

The server model config lives in `config/system/system-model.json`; after a change it is read again through a resource reload and later requests use the current config directly, while in-flight requests keep their original payload and connection parameters. Below are the model fields of the default config:

```json
{
  "providerType": "auto",
  "baseUrl": "https://api.deepseek.com",
  "model": "deepseek-chat",
  "apiKeyEnvironment": "SYSTEM_DEEPSEEK_API_KEY",
  "apiKeyRequired": true,
  "jsonMode": true,
  "outputTokenParameter": "max_tokens",
  "thinkingEnabled": false,
  "reasoningEffort": "high"
}
```

| Field | Meaning |
| --- | --- |
| `providerType` | `auto`, `openai` or `deepseek`. `auto` enables the DeepSeek branch only for `deepseek.com` and its subdomains, and uses the generic OpenAI format for other addresses |
| `baseUrl` | API prefix without `/chat/completions`. The custom prefix is kept and the path is appended, so `/v1`, `/compatible-mode/v1` and similar work; a trailing `/` is removed |
| `model` | The model ID sent as-is; the target service decides which names are available |
| `apiKeyEnvironment` | Name of the server environment variable the key is read from, not the key itself |
| `apiKeyRequired` | `true` by default. A local service without authentication can set `false`; if the environment variable still has a non-empty value, the Bearer header is sent as usual |
| `jsonMode` | By default `response_format: {"type":"json_object"}` is sent. Set `false` when the service does not support this parameter; the local side still strictly requires a JSON object |
| `outputTokenParameter` | `max_tokens` (default) or `max_completion_tokens`; only one of them is sent each time, and the value still comes from the module execution budget |
| `thinkingEnabled` | Used by the DeepSeek branch only, `false` by default, which sends `thinking.type=disabled` explicitly; when enabled it sends `enabled` |
| `reasoningEffort` | Sends `reasoning_effort` only on DeepSeek with thinking enabled, `high` by default, and an empty string omits it. The values that actually work depend on what the target model supports |

Remote addresses use HTTPS; `localhost`, `127.0.0.1` and `[::1]` allow HTTP, which makes local model services easier. The address may not embed a username / password, query parameters or a fragment, and redirects are not followed. The outbound target always comes from the server config.

Submitting a message and local command / vector matching do not require a configured model. `ModelClient.checkConfigured()` only validates the local config and sends no network request; `ExecutionContext.model` checks the external AI preference and the config before waiting for a model concurrency slot, deducting the daily call quota and recording usage. The OpenAI adapter reports `MODEL_NOT_CONFIGURED` when `apiKeyRequired=true` and the environment variable is empty or unset; `false` keeps supporting local services without authentication, and an empty environment variable name also counts as no key provided. When the request is actually built, the key and connection parameters are still re-read inside the config lock.

When routing finds no configured model or AI turned off, it returns clickable local action options instead of turning the whole message into a key error; normal low-confidence routing can still be handed to a configured model. This degradation happens only at the stage where an action is selected and does not replace AI behaviors that are required, such as sign-in reward decisions. See [Local routing](../development/routing.md) for details.

To switch to a normal compatible service, change `baseUrl`, `model` and `apiKeyEnvironment`, and optionally set `providerType=openai` explicitly. If the service uses the newer output limit field, also set `outputTokenParameter=max_completion_tokens`. Some models do not support JSON mode, in which case `jsonMode` can be turned off, but the existing prompts must still be followed and JSON returned directly.

The following snippets are meant to be merged into `system-model.json`; for the complete default example see [system-model.json](https://github.com/IAFEnvoy/System-Mod/blob/master/examples/agent/system-model.json):

- [Generic compatible service](https://github.com/IAFEnvoy/System-Mod/blob/master/examples/agent/model-openai-compatible.json): replace the example domain and model ID with the actual values.
- [Local service](https://github.com/IAFEnvoy/System-Mod/blob/master/examples/agent/model-local.json): the example port is 11434; fill in the actual model ID you have deployed.
- [DeepSeek thinking switch](https://github.com/IAFEnvoy/System-Mod/blob/master/examples/agent/model-deepseek-thinking.json): once enabled, the model used must support the corresponding parameters; the existing output token and timeout budgets also cover the reasoning cost and can be adjusted in the module policy.

## Provider differences

The implementation references `E:\Go\ModList-Dashboard\agent\llm.go`: it takes the generic OpenAI request as the base and injects the thinking-related fields only for DeepSeek. When calling DeepSeek through a third-party proxy, set `providerType=deepseek` explicitly; when calling the official domain but the proxy needs fully generic fields, it can be forced to `openai`. The model name is never used to guess the provider.

Each call from this mod is still an independent `system` and `user` JSON decision; the generic ReActLoop feeds tool results back as typed observations in the input to support multi-round selection and answering, and does not use the provider's native `tool_calls` protocol. Therefore only `message.content` is used as the restricted decision, and `reasoning_content` is neither stored nor cached across players; the reasoning content feedback mechanism of Dashboard's native tool loop does not apply to the independent requests here. See [Generic ReAct loop](../development/react.md) for rounds, permissions and budgets.

The base request contains `model`, `messages`, `stream=false` and the chosen output token limit field; `response_format` is sent according to the config. The generic branch does not attach DeepSeek's `thinking` or `reasoning_effort`. The returned content must still have `finish_reason=stop` and valid JSON, and responses are not retried or repaired automatically. What is implemented here is a text interface compatible with Chat Completions; it does not include Responses, a native tool loop, images or streaming output.

## Usage

Web search is a separate protocol using `SearchProvider` and `DeepSeekSearchClient`, and does not go through Chat Completions. It is only a tool used after database-first Q&A has been authorized and is not added to ordinary multi-step analysis automatically; tool calls and model tokens are billed separately. Search is configured separately in `config/system/system-search.json`; see [web search and fetch](search.md).

Generic usage reads `prompt_tokens`, `completion_tokens` and `total_tokens`. For cache hits it prefers OpenAI's `prompt_tokens_details.cached_tokens` and falls back to DeepSeek's `prompt_cache_hit_tokens`, counting them only once. A missing or invalid usage is still marked as unknown usage; usage is read before the model body is validated, so a body error does not erase known consumption.

## HTTP tool reuse

`HttpTransport` depends only on the JDK and not on Minecraft, the Agent config, Gson or model error codes. Each instance reuses one `HttpClient`; the default connection timeout is 5 seconds and can also be given in the constructor. All requests forbid redirects and do not retry automatically, and the owner closes the instance. `postJson(endpoint, json, headers, timeout, maxResponseBytes)` sends UTF-8 JSON; `send(HttpRequest, maxResponseBytes)` accepts any method, headers and a JDK `BodyPublisher` and can be used later for audio bytes, files or multipart requests. It returns a standard `HttpResponse<byte[]>`, keeping the status code, response headers and raw bytes, and the text is decoded by the protocol caller.

Every call must specify a positive response byte limit and a request timeout; the response is length-limited while chunks are received and the deadline covers the complete response body, so a timeout or thread interruption cancels the in-flight request and an interruption keeps the thread flag. The tool waits for the result synchronously and must be called on a worker thread. Status code checks, JSON decoding, the source of the auth key and outbound target validation are the responsibility of the specific API integration; the model integration still uses `ModelSettings` fixed endpoint validation, the 64 KiB response limit and token statistics. A JDK request timeout and a full-response wait timeout both map to `MODEL_TIMEOUT`, and other I/O failures map to `MODEL_UNAVAILABLE`.

`stream(HttpRequest, maxResponseBytes, StreamConsumer)` delivers response information and byte[] chunks through serial callbacks and returns `HttpResponse<Void>`; the total byte limit and the deadline still cover the whole stream. Callbacks run on the HTTP worker thread and must not access MC main-thread state or block waiting for playback. Callers can parse SSE with the separate `ServerSentEvents`, which buffers UTF-8 lines and events under a length limit and supports data across chunks, multiline data and CR/LF. Alibaba Cloud TTS already uses this path to play PCM while receiving it, and the original complete JSON/WAV response interface is kept. See [Speech synthesis and voices](tts.md) for details.

For the API fields see the [official OpenAI Chat Completions documentation](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create). Compatible services may support different parameter ranges; refer to the provider's documentation. This round only compiled, packaged and ran static checks; no real model request was made and Minecraft was not started.


WebSocket speech recognition reuses HttpTransport.webSocket(endpoint, headers, timeout, listener); a connection timeout or interruption cancels the handshake, an established connection is closed by the provider, and the protocol layer enforces the message size, audio duration and task deadline. See [Voice input](asr.md) for details.

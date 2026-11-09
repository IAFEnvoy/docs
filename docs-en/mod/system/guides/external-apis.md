---
title: "External APIs and data"
sidebar_position: 10
---

Free chat uses the same server-side Chat Completions API, sending the current text and the player's own history trimmed according to that player's settings; it reuses the existing account, billing and limits. In this mode no tools or web search are called this round. See [free chat](ai-modes.md).

This page is compiled from the current repository code; checked 2026-10-30. It describes the external requests made by this mod's built-in implementation and does not cover the network behavior of Minecraft, the loader or other mods, nor models, TTS, ASR or payment implementations registered by third-party extensions themselves.

## Overview

| Feature | Request initiator | External service | When it is requested | Default state |
| --- | --- | --- | --- | --- |
| AI intent detection, sign-in reward selection, special quest text organization, quest background filtering | Minecraft server; the internal server in single player | The configured OpenAI Chat Completions-compatible service, DeepSeek by default | When the model is actually needed and the current player allows external AI | The default provider is DeepSeek; the server must configure a key |
| Web search and fetch | Minecraft server worker thread | The separately configured DeepSeek Search / Fetch API | When the local database query is empty, the search module is enabled and the current request explicitly allows network access | Not granted automatically; an ordinary question does not count as authorization; reuses the DeepSeek environment variable |
| Text-to-speech (TTS) | Minecraft client | Alibaba Cloud Bailian / DashScope | Narrating the current message when auto-read is on, or a manual preview | Auto-read is off by default |
| Speech-to-text (ASR) | Minecraft client | Alibaba Cloud Intelligent Speech Interaction NLS | When the player turns on voice input and records actively | Off by default |
| NLS temporary token issuance | Minecraft client | Alibaba Cloud NLS Meta `CreateToken` | When an active recognition has no reusable token, the token is about to expire or the authorization cache is invalid | Triggered on demand with voice input; not requested when settings are saved |
| Non-streaming TTS audio download | Minecraft client | The Alibaba Cloud OSS address named in the TTS response | When non-streaming synthesis is called and an audio URL is returned | Normal in-game narration uses streaming PCM and does not need this download |
| Voice design, cloning, query, deletion and temporary upload | Standalone Python tool | Alibaba Cloud Bailian and OSS | When the corresponding subcommand of `tools/voice_design.py` is run manually | Not executed automatically while the mod runs |

FTB Quests queries, submissions and reward claims call the local server's Java API; there is no separate HTTP or stdio MCP service. Lightweight intent matching also runs locally and does not request an embedding API.

FTB [guide search](quest-guides.md) uses the local sparse TF-IDF on the server; the guide button on the quest page and `/system guide` do not request the chat or embedding API. Ordinary Q&A goes into `system:question`, and authorized passages found locally can be handed to the text model for an answer; the index, the whole corpus, other players' data and progress are not sent as a whole. Vague natural language may still go through model intent detection first, and when auto-narration is on the existing TTS is still called.

## 1. Server text model API

### Address and protocol

- Method: `POST`; requests and responses are JSON, currently with `stream=false`.
- Path: `/chat/completions` is appended to `baseUrl` from `config/system/system-model.json`.
- Default full address: `https://api.deepseek.com/chat/completions`, default model `deepseek-chat`.
- For example, with `https://example.com/v1` as `baseUrl` the actual request is `https://example.com/v1/chat/completions`; do not append `/chat/completions` again in the config.
- It can be replaced with another OpenAI-compatible service. Remote addresses must use HTTPS, while an HTTP service on a loopback address is also allowed.
- Authentication: the server environment variable named by `apiKeyEnvironment` is read, `SYSTEM_DEEPSEEK_API_KEY` by default, and placed in `Authorization: Bearer ...`. When a local service without a key is allowed, `apiKeyRequired` can be turned off.

DeepSeek's `thinking` and `reasoning_effort` compatibility only changes the parameters of the same request and does not add another API request. For the model, JSON mode and output token parameters see [Model API](model-api.md).

### Which behaviors call the model

| Call scenario | Main content sent to the model | Cases where the request can be avoided |
| --- | --- | --- |
| Intent routing fallback | The current input, a limited amount of recent conversation verbatim and a summary of earlier results, local candidate modules with similarity, descriptions of available modules and their input schema, the player language, the routing prompt | Structured actions such as buttons, explicit commands, high-confidence local read-only matches or a valid intent cache hit |
| Free chat / extension fallback | The current message, a limited amount of the player's own chat history, the player language, the base chat prompt and the persona TXT body referenced by the currently bound System; full free mode additionally includes the available tool descriptions and this turn's observations | Offline / standard mode, the administrator disabling free chat or the model, the player turning AI off; a successful route in extension mode does not enter the chat fallback |
| AI sign-in reward selection | The current player's name, health and maximum health, experience level, dimension, language, date and the candidate reward definitions from the data pack | When the player has already signed in that day, the recorded result is returned directly and nothing is selected again |
| Narration organization of special quest requirements or rewards | Objective or reward types that cannot be formatted directly, the native title, objective counts and known limits, plus the language and the organizing prompt | Common objectives are formatted directly; an organized passage cache hit; the corresponding narration is not enabled |
| Local knowledge Q&A organization | The current question, the player language, matched passages from the current player's private / shared knowledge and authorized FTB guides, their titles and categories | Nothing is organized when the database query is empty, external AI is off or no model budget remains; on a recoverable failure the sources are shown without searching |
| Web retrieval decision and organization | The current question, the player language, this request's source summaries and a limited amount of page text, the remaining tool budget | It runs only after the local result is empty, the search module is enabled and this request explicitly allows network access |
| Quest background filtering | The quest title, the raw visible FTB description, the language and the background filtering prompt | Detail or background narration is off; the description is empty, the title is duplicated or the description is only a URL; a valid background cache hit |

All built-in model requests go through `ExecutionContext.model → ModelGateway → OpenAiCompatibleClient` and share permissions, quotas, concurrency limits and usage statistics. One natural-language operation may first call routing and then the model logic of the feature itself; not every message results in exactly one request.

The sign-in model receives only a dedicated projection of the current player and is not sent the online player list or the full inventory. Routing may send the player's recent input verbatim and restricted fields from earlier results such as quest, reward or claim references; text the player enters on purpose may also contain personal information. The whole world save, the entire chat history or all player records are never packaged and sent automatically.

Special quest organization and background filtering use only the quest definitions and do not send the player's inventory, current quest progress or a whole conversation; the quest text itself may still contain content written by the data pack author. Background results are stored in the `system:quest_backgrounds` table of `system/database/shared.dat` in the current world save (GZIP-compressed NBT) and are reused by quest ID, language and content fingerprint; a successful "no background" conclusion is cached as well.

After the player selects the "offline" mode, these model calls and server-side web search are all disabled; local queries and existing caches can still be used. Voice features have their own switches and keys, and the offline chat mode does not turn off client TTS or ASR together.

Implementation entry points:

- [Model HTTP client](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/agent/model/OpenAiCompatibleClient.java)
- [Model connection config](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/config/file/ModelConfig.java)
- [Intent routing](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/agent/routing/HybridRouter.java)
- [Sign-in model input](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/data/output/SignInDecision.java)
- [Quest narration organization](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/quest/QuestNarration.java) / [Background filter cache](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/quest/QuestBackgrounds.java)

## 2. Client TTS API

The config file is the client-side `config/system/system-speech.json`. The key comes from `apiKey` in the config; when it is empty the client environment variable `DASHSCOPE_API_KEY` is read. The client requests Alibaba Cloud directly and does not have the Minecraft server send the request on its behalf.

### Domain selection

| Region | No Workspace ID | Workspace ID set |
| --- | --- | --- |
| Beijing `beijing` | `https://dashscope.aliyuncs.com` | `https://<workspace>.cn-beijing.maas.aliyuncs.com` |
| Singapore `singapore` | `https://dashscope-intl.aliyuncs.com` | `https://<workspace>.ap-southeast-1.maas.aliyuncs.com` |

### Synthesis API

| Model | Method and path |
| --- | --- |
| The default `qwen3-tts-flash` and the date versions the adapter allows | `POST /api/v1/services/aigc/multimodal-generation/generation` |
| `qwen-audio-3.1-tts-flash`, `qwen-audio-3.1-tts-plus`, `qwen-audio-3.0-tts-flash`, `qwen-audio-3.0-tts-plus` | `POST /api/v1/services/audio/tts/SpeechSynthesizer` |

Authentication uses `Authorization: Bearer ...`. The request sends the actual text to be read, the model, the voice ID, the synthesis language or language hint; Qwen-Audio also sends the format and sample rate. The text may contain a host name, quest titles, quest requirements, rewards or an allowed background, depending on the current message and the voice settings; a whole chat history is never passed to TTS automatically. Using an existing custom voice sends only the voice ID, and normal synthesis does not upload the cloning sample again.

Current in-game narration sends `X-DashScope-SSE: enable` and receives the SSE / PCM audio stream within the same HTTP request, instead of starting a new synthesis request for each audio fragment. The final audio URL returned by the API is not used for streaming playback. Auto-read is off by default, and a manual preview calls the synthesis API actively; the local notification sound does not call TTS.

The optional whole-sentence audio cache is off by default; once enabled and hit, the local audio is played directly without calling the synthesis API and without adding cloud usage. Muting, a missing key or another state that does not allow playback skips normal automatic synthesis. Closing the screen or confirming a notification cancels the current request and playback, but a request that has already reached the provider cannot be guaranteed to produce no usage.

### Retained non-streaming audio download

The non-streaming `synthesize` uses the same synthesis API. If the response gives an audio URL, the client sends a separate `GET` to download the WAV; if Base64 audio is returned directly no download is needed.

The download address must be an Alibaba Cloud OSS domain the adapter allows (the host ends with `.aliyuncs.com` and contains `.oss-`), and an HTTP address is upgraded to HTTPS. The download carries no Bailian Bearer key and does not follow redirects. This path exists in the code; current normal in-game narration prefers the SSE streaming path described above.

Implementation entry points: [Alibaba Cloud TTS adapter](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/aliyun/AliyunTtsProvider.java), [synthesis request fields](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/data/speech/AliyunTtsMessage.java), [narration session](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/tts/AssistantSpeech.java).

## 3. Client ASR API

- Protocol: WebSocket over TLS, address `wss://nls-gateway-cn-<region>.aliyuncs.com/ws/v1`.
- Currently supported regions: `shanghai`, `beijing`, `shenzhen`, Shanghai by default; for example `wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1`.
- Config: client `config/system/system-asr.json`, using a separate NLS project `appKey` and Alibaba Cloud `accessKeyId` / `accessKeySecret`, not the Bailian TTS API key.
- When the config is empty, `ALIYUN_NLS_APP_KEY`, `ALIYUN_AK_ID` and `ALIYUN_AK_SECRET` are read respectively. The automatically issued token goes into the handshake request header `X-NLS-Token`, and the AppKey goes into the recognition command header.
- Issuance: `GET https://nls-meta.cn-shanghai.aliyuncs.com/` with Action `CreateToken`, Version `2019-02-28` and RegionId fixed to `cn-shanghai`. It sends the AccessKey ID, a UTC timestamp, a unique nonce and the format and signature parameters; the AccessKey Secret is only used locally to compute HMAC-SHA1 and is not put into the request directly.
- The token is cached in memory only; `ExpireTime` is checked at actual recognition time and a new token is issued when two minutes or less remain; a credential change triggers a new fetch. On a 401 / 403 handshake the cache is cleared, a new token is issued and one reconnect happens, before the recognition command has been submitted; a billed task that has already started is not retried. Issuance failures and handshake failures do not count as ASR attempts.
- The same connection sends `SpeechRecognizer.StartRecognition`, PCM audio frames and `StopRecognition`, and receives intermediate results and the final recognized text.

Voice input is off by default; once enabled, the recording session opens only when the player actively starts voice input. It sends this microphone recording (16 kHz, 16-bit, mono PCM) plus the AppKey, task ID, message ID and parameters needed for recognition, and does not send the whole chat history. A single recording is currently at most 60 seconds, and closing the related screen or notification cancels the session.

After a successful recognition the text fills the input box, or is submitted directly according to the "send immediately after recognition" setting; notification speech first matches the current notification buttons and only falls back to the main chat handling when nothing matches. If AI intent detection is needed afterwards, the server model requests of section 1 may still occur; ASR itself is not a model routing request.

Token issuance happens only in a recognition session the player started actively, and opening the settings or saving credentials does not access the network; the signed URL, Secret, token and upstream body are never written to the log. Simple Voice Chat is only used as an optional recording device source; without it Java Sound is used, and the ASR audio is uploaded to NLS directly by this mod's client. Only when the player sends the recognized text or performs a notification action does it enter the normal assistant request; the AccessKey, token and ASR / TTS usage are not uploaded to the Minecraft server.

Implementation entry points: [Token issuance and caching](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/aliyun/AliyunNlsToken.java), [Alibaba Cloud ASR adapter](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/aliyun/AliyunAsrProvider.java), [ASR config](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/config/file/RecognitionConfig.java), [Recording and recognition session](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/speech/asr/AssistantRecognition.java).

## 4. APIs used by the standalone voice tool

The following requests happen only when [tools/voice_design.py](https://github.com/IAFEnvoy/System-Mod/blob/master/tools/voice_design.py) is run manually; they do not run automatically with MC startup, opening the settings page or ordinary message narration. The tool can read the client voice config, but it is not an in-game background task.

| Operation | Method and path / target | Content sent |
| --- | --- | --- |
| `design` voice design | `POST /api/v1/services/audio/tts/customization`, model `voice-enrollment`, action `create_voice` | Text description of the voice, preview text, target model, voice prefix, language and audio parameters |
| `clone` voice cloning | The same customization API, action `create_voice` | Base64 data of the selected WAV, target model, prefix, language, sample duration and preprocessing options |
| `list` / `query` / `delete` | The same customization API, with actions `list_voice` / `query_voice` / `delete_voice` | The prefix and page number, or the specified voice ID |
| `synthesize` test synthesis | `POST /api/v1/services/audio/tts/SpeechSynthesizer` | Test text, model, voice and WAV parameters; when a URL is returned, an additional `GET` to OSS downloads it |
| `upload` get a temporary upload policy | `GET /api/v1/uploads?action=getPolicy&model=<model>` | The target model and the Bailian Bearer key |
| `upload` upload a file | `POST` to the HTTPS OSS `upload_host` returned in the previous step | The selected audio file and the signed form fields, without the Bailian Bearer key |

Voice management and synthesis reuse the domain selection of section 2; the tool's voice management operations are currently restricted to the Beijing region. Temporary upload policies use the compatibility domains `dashscope.aliyuncs.com` or `dashscope-intl.aliyuncs.com` and do not switch to the workspace domain even when a Workspace ID is given.

`clone` submits the sample as Base64 directly and does not call the temporary upload first. `upload` is a separate subcommand that returns an `oss://` resource address; uploading does not mean a voice has been created or synthesis has been completed. The tool's key comes from the specified config, `DASHSCOPE_API_KEY` or a hidden input, and is not written into the exported voice config.

## 5. Server DeepSeek web search and fetch API

The feature module `system:web_search` exports only the Search/Fetch tools and calls `DeepSeekSearchClient` through `SearchGateway`. The core `system:question` always queries the local database first; only when the result is empty, the search module is enabled and this request is explicitly authorized does it enter WebResearch with a budget. `/search <question>`, an explicit request for network access or a submit from the search page allows the fallback, while `/question` and ordinary questions do not. For natural language the model still decides the current authorization, and history and material text do not grant permission; a database query error, a hit whose organization fails, sign-in, binding and events never start a search. The search module is not added to players automatically.

- Config: `config/system/system-search.json`, copied from the JAR defaults on first use; it is independent of the text model config and still reads the environment variable `SYSTEM_DEEPSEEK_API_KEY` by default.
- Search: `POST https://api.deepseek.com/v1/tools/search`, sending the query derived from the current question, a fixed 5 results and options without body text; built-in workflows do not fill the raw question and location fields and do not collect player data or the IP automatically.
- Fetch: `POST https://api.deepseek.com/v1/tools/fetch`, sending the page URL provided by the caller to DeepSeek, which fetches the Markdown; the local machine does not access that page directly.
- Search card links are handed to Minecraft's vanilla link flow only after the player clicks them, and the system browser is opened according to the link switch and confirmation settings; the browser then visits the target site on its own, and the mod does not attach the DeepSeek key to that URL. Expanding a source summary sends no network request.
- Authentication: `Authorization: Bearer ...` is sent only to the configured API address, the key is not attached to result URLs or icon addresses, and results are not fetched automatically.
- Search / Fetch are each estimated at 5 CNY per thousand successful requests that returned results and go into the player's world usage ledger separately; an empty result is not priced, and unknown results are listed separately. Model tokens are counted separately. All messages use Codec, and the network reuses the `HttpTransport` that limits length, applies timeouts, forbids redirects and does not retry automatically.

See [web search and fetch](search.md) for detailed configuration, response fields, calling methods and official material.

## 6. Which operations do not access external APIs additionally

- Player and item queries, FTB queries / explicit submission / reward claims, starter gift claiming, shop and lottery settlement: the built-in logic reads or modifies the server game state directly; executing these operations through an explicit command or a trusted button does not itself need the cloud. When natural language first goes through the model fallback, or the result triggers TTS or special quest narration, the corresponding requests may still occur.
- Binding success notifications, quest completion / unlock events and the message queue: event generation and fixed text are handled locally; with voice on, TTS and on-demand quest text organization may be triggered separately.
- Semantic matching and conversation compression: use local lexical / TF-IDF, caches and deterministic history projections; there is no embedding, vector database, Redis, separate summarization model or automatic model download request.
- Usage statistics and cost estimates: AI usage is recorded by the server from model responses, and Search/Fetch counts and estimates are recorded by the server gateway; TTS / ASR usage is stored on the local machine by client account only, and rates are read from the config under the client `config/system`; provider billing, balance or real-time pricing APIs are never requested, and voice usage is not reported to the MC server.
- Prompt and reward data pack reload, config loading and notification sound playback: these read local resources or the world save and do not call the cloud.

Assistant requests, card actions and AI usage queries between the client and server use Minecraft custom network payloads and are not a new public HTTP API. The TTS key, the NLS AccessKey / token and voice usage all stay on the client and are not sent to the game server.

According to the current built-in source, this mod has no additional telemetry, advertising, update check or general data upload interface. The external request implementations are concentrated in `OpenAiCompatibleClient`, `AliyunTtsProvider`, `AliyunNlsToken`, `AliyunAsrProvider`, `DeepSeekSearchClient` and the Python tool above; after adding a provider or another third-party extension this list should be updated as well.

## Scope of the check

This list is compiled from the request calls, address concatenation, configs and serialized fields in the source. No provider API was actually requested, no key was used for connectivity or billed calls, and the game was not started nor tests run. Domains and paths reflect the current code; the availability, quotas and billing of provider APIs are subject to the actual service.

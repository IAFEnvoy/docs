---
title: Integration Guide
description: Connect agent networking, registries, AI access controls, and speech.
sidebar_position: 1
---

The Assistant Core Java API lives under `com.iafenvoy.assistant`. The host assembles workflows and supplies invocation permissions, prompts, storage, credentials, and UI.

## Registration and transport

Create a registrar for action codecs with `DeferredRegister.create(AssistantResourceKeys.ACTION_TYPE, MOD_ID)` and attach it to the host mod's event bus. Use the same pattern for the other protocol types. Register entries under the host's namespace.

| Registry key | Entry |
| --- | --- |
| `ACTION_TYPE` | Action `MapCodec` |
| `CREDENTIAL_TYPE` | Credential `MapCodec` |
| `AGENT_REQUEST_TYPE` | Request `StreamCodec` |
| `AGENT_RESPONSE_TYPE` | Response `StreamCodec` |

Create an `AssistantChannel<A>` with the host namespace and the attachment `StreamCodec`. Supply the server request and error handlers in `RegisterPayloadHandlersEvent` and the response handler in the client-side `RegisterClientPayloadHandlersEvent`. Use `request(id, request, attachment)` to send optional data and pass a UUID string as `id`. `ConnectionSessions` can associate asynchronous requests with their original connections.

## Routing, execution, and AI modes

| Use case | API |
| --- | --- |
| Match a local intent | `LexicalIndex`, `IntentRouter`, `SemanticRouter` |
| Combine local and model routing | `HybridRouter` |
| Assemble workflows and tools | `ModuleRegistry`, `ToolRegistry` |
| Run tools or a ReAct loop | `ToolExecutor`, `ReActLoop`, `ReActContext` |
| Connect an OpenAI-compatible endpoint | `ModelSettings`, `OpenAiCompatibleClient`, `ModelGateway` |

The host supplies the endpoint, model, and API key. It checks which workflows the player can invoke and validates tool arguments against the current game state. Use `AiManagementCommands.register` to add AI management commands to the host's Brigadier command tree. Implement its `Host` interface to supply permissions, persistence, and online status updates. The available conversation modes are `offline`, `standard`, `extended`, and `free`.

## TTS and ASR

| Factory | Built-in providers |
| --- | --- |
| `AssistantServices.TTS` | DeepSeek and Aliyun DashScope |
| `AssistantServices.ASR` | DeepSeek and Aliyun NLS |

Create a provider with the matching `SpeechCredentials` and call `close()` after use. The host stores credentials, controls recording and playback, handles results, and tracks usage.

On the client, create a `RecognitionRecording` for each ASR session. Call `open()` on a background thread, then pass the recording to the ASR provider. `finish()` stops capture and keeps the buffered frames. `close()` cancels capture and clears the buffer. With Simple Voice Chat installed, the integration can capture independent 16 kHz PCM from its selected input device and suppress voice chat transmission during recording. Java Sound provides input when Simple Voice Chat is absent.

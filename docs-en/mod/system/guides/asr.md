---
title: "Voice input"
sidebar_position: 5
---

## Usage

Type `/settings` in the assistant input box to open the unified settings, then select the "Voice input" tab. Recognition is off by default, and every control saves automatically to the client-side `config/system/system-asr.json` as soon as it is changed, separately from the Bailian TTS configuration; switching tabs or closing the settings needs no extra save. The AppKey, AccessKey ID and Secret can be filled in one at a time, and the complete credentials are validated only when recognition starts.

1. Create a project in the Alibaba Cloud Intelligent Speech Interaction console, obtain the **AppKey**, and choose a one-sentence recognition model that supports **16 kHz**. The recognition language and dialect are set in the project console; the API does not accept the game language as a model selection parameter.
2. Fill in the project **AppKey**, an Alibaba Cloud **AccessKey ID / AccessKey Secret** with NLS permission and the recognition region (Shanghai / Beijing / Shenzhen), then enable it; changes are saved automatically. The Bailian `DASHSCOPE_API_KEY` cannot be used here. The temporary token is obtained by the program automatically and is no longer entered by hand.
3. Hold **F8** to record and release to stop; the key can be changed in the game's "Controls → System Assistant" and supports keyboard/mouse and modifier keys. When a notification is visible, a notification command is recorded first; with no notification, the assistant of the current mode opens; pressing it inside the full or simple assistant keeps the draft. In the vanilla chat bar it can also record a notification command when a notification exists, and other screens do not trigger it. You can also click "Voice input" or type `/listen` / "Voice input", then click stop. Speak after you see "Recording"; interim results appear above the input box or at the bottom of the notification.
4. Release the key or click "Stop recording" and wait for the final recognition; the result is appended to the input box draft, and by default you press Enter to send after confirming. "Send immediately after recognition" can be enabled in the speech recognition settings, so that a successful final recognition sends the merged draft automatically; it applies to the key, the button and `/listen` alike, while interim results are never sent. Recording lasts at most 60 seconds and ends automatically at that point. Recognition itself does not call the chat model; the draft enters the existing routing only after it is sent.

`autoSend` is stored in the client-side `config/system/system-asr.json` and is off by default; a legacy config without this field still requires manual sending. Auto-send reuses the ordinary send entry point and keeps following command routing, the busy state and IME protection; if sending is not possible at that moment, the text stays in the input box and is not queued for retry. Editing the draft, cancelling or leaving the screen during recognition does not auto-send, and a window that has lost focus does not auto-send the final result either.

Key auto-repeat does not create a new task, and releasing only ends the recording that the key itself started. When voice input has not been enabled yet, the key opens the settings page without recording or starting a paid request. "Cancel", closing the screen, switching screens, losing window focus, sending another request, disconnecting or revoking the binding all cancel the current recognition session and close the microphone. Late callbacks are not written into other screens or a new connection. If the draft is edited manually during recognition, the edited content is not overwritten and voice input has to be started again. Starting recognition stops the current narration, and notifications that arrive later are still handled by the original TTS logic.

When credentials are left empty, the client process reads `ALIYUN_NLS_APP_KEY`, `ALIYUN_AK_ID` and `ALIYUN_AK_SECRET` respectively; environment variable values are not written back to the config. Credentials entered on the page are stored in plain text, and the Secret control masks them on screen. The config, audio and recognition results are not sent to the MC server as usage reports; only text sent to the main chat or the structured operation after matching a notification button enters a normal assistant request. Recording flows through memory in chunks only and is never saved as a WAV or uploaded to OSS.

The config fields are as follows; empty fields can be filled in from the environment variables above:

```json
{
  "enabled": false,
  "provider": "aliyun-nls",
  "appKey": "",
  "accessKeyId": "",
  "accessKeySecret": "",
  "region": "shanghai",
  "autoSend": false
}
```

## Automatic authentication

Following the [official HTTP / HTTPS token issuance protocol](https://help.aliyun.com/zh/isi/user-guide/use-http-or-https-to-obtain-an-access-token), the client calls `CreateToken` of `GET https://nls-meta.cn-shanghai.aliyuncs.com/` on the worker thread that performs the actual recognition, using version `2019-02-28`, UTC time, a unique nonce and a POP HMAC-SHA1 signature. The issuance region is fixed to `cn-shanghai` and is unrelated to the selected recognition gateway region. Opening the settings, saving the config field by field and local credential checks never issue a token.

`AliyunNlsToken` shares one in-memory cache across recognition sessions, reads `Token.Id` and `Token.ExpireTime` in Unix seconds, and re-issues before the next recognition when less than two minutes of validity remain. The cache stores only a credential fingerprint and the token, keeping no copies of old credentials; credentials that change are fetched again, and refresh requests are merged serially. The token is not written to the config, world saves or network packets, and the signed URL, Secret, token and upstream response body are not logged. This implementation uses only JDK networking and crypto APIs and adds no SDK dependency.

The issuance request times out after 10 seconds and accepts at most a 64 KiB response, and is cancelled together with an interrupted recording session. If the recognition WebSocket handshake returns 401 / 403, the corresponding token is cleared, re-issued and connected once again; `StartRecognition` has not been sent at that point. A recognition task that has already been submitted is not retried automatically, and a rejected token invalidates its cache so the next recording fetches a new one. Credential, permission, clock or issuance errors show a localized message without displaying sensitive information from the upstream response directly.

## Notification voice actions

Once a notification is fully expanded, hold the same voice key and say "confirm", "close", "next", "next page", "view details", "claim reward" or the current button text, then release to process the final result. "Close", "next" and "next page" can confirm and remove the current notification while the queue continues with the next one; if there really is a "next page" button at that moment, its paging action takes priority. There is no need to open the chat bar first, and recording does not steal game focus; the original mouse buttons still work inside the chat bar. Starting a recording stops the current notification narration, and the notification stays during recording and while waiting for the final recognition; it has no auto-close countdown of its own. Confirming, switching, hiding the notification, switching screens, losing window focus, logging out or revoking the binding cancels its recognition session; late results can only affect the original notification and the original connection.

It matches the current notification buttons first; a successful match reuses the trusted callback and busy check of a mouse click and does not call the chat model. A miss, insufficient similarity, several matching buttons or a complex expression opens the main chat box and immediately reuses ordinary commands and intent routing; if the assistant is busy, the recognized content is left as a draft in the main chat box. The notification fallback explicitly asks for main chat routing, so it is not affected by the `autoSend` switch, which only covers ordinary chat recordings. The fallback keeps the original notification and never guesses which reward to act on.

Buttons are declared with fixed localization keys, and their utterances and corresponding sparse TF-IDF vectors come from `assets/system/routing/notification-buttons.json`, with the current text also matching automatically. A client resource pack can add button keys and `zh` / `en` example sentences at the same path; a reload merges by resource pack layer, a higher layer overriding the same key and language of a lower layer and invalidating the in-memory index. When the current button set and language are unchanged the generated vectors are reused, and no recording or player original text is saved. A new button needs no change to the `confirm/details/open` branches, only a declared text key and trusted callback, with extra example sentences optional. See [Lightweight routing](../development/routing.md) for the exact matching boundaries.

When an FTB quest completes with claimable rewards, the notification offers "claim reward". With a single ordinary reward it uses that player's short-lived reference to go straight to the existing claim tool; with several or selectable rewards it first shows the details for an explicit choice. Rewards already auto-claimed, blocked or not claimable produce no action, and actual execution still revalidates the player, team, quest and reward version. If a notification was queued so long that the reference expired, the details have to be viewed again.

The "view quests" of the FTB startup overview and the "claim gift" and "view gift" of the starter gift likewise declare fixed button keys and bilingual example sentences, so they can be operated by voice directly. Recognition matches only the button currently shown; claiming still uses that notification's short-lived gift reference, and after it expires the gift must be viewed again to refresh it — a claim authorization is never derived from a gift name.

## Protocol and extension

The NLS WebSocket is integrated following the [one-sentence recognition API](https://help.aliyun.com/zh/isi/user-guide/api-reference-1), using the JDK `HttpClient`, with no new SDK, native library or model file. `HttpTransport.webSocket` reuses the client lifecycle, handshake timeout and cancellation of the networking tool; the token follows the X-NLS-Token handshake header of the official Alibaba Cloud Java SDK, and credentials or upstream exception bodies are never logged.

It connects to `wss://nls-gateway-cn-<region>.aliyuncs.com/ws/v1` and sends `SpeechRecognizer.StartRecognition`; the microphone is opened in the background and starts capturing immediately without waiting for the cloud handshake, and the buffer plus subsequent audio are uploaded after `RecognitionStarted` arrives, so the beginning is not swallowed. Releasing the key stops local capture immediately, while already buffered content is still submitted within this request. It sends 16 kHz / 16-bit / mono / little-endian PCM binary frames with interim results, punctuation and ITN enabled. After stopping it sends `StopRecognition` exactly once and takes `RecognitionCompleted.payload.result` as the final text, never summing up interim results.

Voice input is off by default, and **Simple Voice Chat (SVC) is an optional client dependency**; the server does not need it. The settings page shows whether SVC was detected: when it is not installed, the JDK Java Sound default input device is used; when it is installed, an isolated adapter is loaded by reflection and reuses the microphone selected by SVC, the OpenAL/Java Sound backend choice and the fallback to Java Sound when OpenAL fails. Capture is done directly at 16 kHz with 320 samples per frame, neither going through Opus nor requiring resampling from 48 kHz. The original button and key share the same capture path.

The actual dependency JAR of SVC **2.6.26+26.1.2** was checked: the public `VoicechatClientApi` has no method to start and stop the microphone separately, and `ClientSoundEvent` comes after SVC's own PTT/voice-activation filtering, so neither can serve as an independent key-press recording source. Therefore `compat/voicechat/VoicechatRecognitionCapture` wraps its internal `ALMicrophone` / `JavaxMicrophone`, opens the device separately, and neither reads nor modifies SVC's own recording thread. The public plugin events are only responsible for cancelling voice chat transmission while the assistant is capturing, and keep a 250ms tail suppression afterwards; when adapter/plugin installation fails it reports an error and does not start recording. Without SVC installed no plugin is registered and no adapter or SVC type is loaded. The internal interfaces are version sensitive and should be rechecked after upgrading SVC; if the device does not allow a second open, a microphone error is shown instead of taking over the voice chat device.

Device opening and audio reading run in one bounded daemon recording executor, networking runs in a separate recognition executor, and the main thread only operates the interface and cancellation. During a connection audio is kept only in a bounded in-memory queue and never touches disk; the recording limit is 60 seconds / 1,920,000 PCM bytes. A local notice is shown when 16 kHz mono is unsupported or access is forbidden by the system. A single response is at most 64 KiB and a result at most 2000 UTF-16 units; connecting times out after 10 seconds, the whole request is capped at 90 seconds, and after stopping it waits at most another 15 seconds. A failure never retries a paid task automatically.

Manual stop and audio enqueueing share a lock; after stopping, the already buffered PCM is drained and EOF returned without waiting for the device to read or close. A natural recording end likewise publishes EOF before the device closes, and the last frame is rechecked once the termination flag is visible. An independent daemon timer enforces the 90-second overall / 15-second wrap-up limits on a session, and the terminal state and timing generation stop late callbacks from overwriting a success, error or cancellation result. Executor saturation and background failures end the wait, and the log keeps the local error code and the complete exception stack (including Caused by) without actively recording credentials, audio or recognized text.

`AsrProvider` lives in `speech.asr`, and the protocol layer does not depend on MC. Providers are managed by the plain factory Map of `speech.AsrProviders`, with the built-in key `aliyun-nls`. An extension calls `AsrProviders.register(name, factory)` during client initialization, does not take part in the MC registry lifecycle, and `AsrProviders.create(provider)` looks up the config string exactly and creates an exclusive instance without adding a namespace automatically. A provider implements the purely local `validate`, `recognize(Request, AudioSource, Consumer<String>, Runnable requestStarted)` and `close`; `requestStarted` is called after authentication and connection complete and before the first recognition command is sent, starting the accounting for this recognition — see [Registry index](../development/registries.md) for details. The current credential structure is NLS-oriented, so adding a provider with a different authentication method requires extending the corresponding config form. A provider's own unit billing also needs separate adaptation; the NLS per-call price is not applied to it.

## Usage and cost

The same usage screen shows this account's ASR attempts, failures/cancellations, incomplete and unpriced counts and the estimated amount, stored on this machine per client account UUID in `config/system/speech-usage/<UUID>.json`, accumulated across servers and not cleared by `revoke` or `forget`. Speech usage is not reported to the server and there are no speech statistics for other players; even the administrator's server-wide view only aggregates AI. The server-side AI snapshot uses StreamCodec, the current protocol stays **1**, and client and server must be updated together.

Based on the user-specified **CNY 3.5 / 1000 calls**, a request that successfully receives `RecognitionCompleted` is estimated at **CNY 0.0035 / call**. The API does not provide token usage, and input/output tokens are not fabricated. Failed, cancelled or disconnected requests may already have been billed in the cloud and are kept as unpriced; the estimate covers only known successful requests, defers to the Alibaba Cloud bill, and excludes free quota or discounts. Local usage is not the basis for charging, rewards or server-side limits.

Prices use the `CALLS` unit of the client-side `config/system/system-speech-pricing.json`. The bundled default JSON gives one user-specified reference price for each of Shanghai, Beijing and Shenzhen; it is not a re-check of the three regions' online prices. **Existing price configuration is never overwritten and entries are never added automatically**; when the region in use is missing, an entry has to be added manually to `rates`, otherwise ASR keeps recording counts but marks them as unpriced:

```json
{
  "provider": "aliyun-nls",
  "model": "sentence-recognition",
  "region": "shanghai",
  "unit": "CALLS",
  "units": 1000,
  "input": 3.5,
  "output": 0
}
```

Changed prices are loaded with F3+T on the client or by restarting the client, and historical amounts are not recalculated. Accounting is local before the first recognition command is sent, token issuance and handshake failures do not count as ASR attempts; completion callbacks are merged only once, late results after a cancellation or server switch still belong to the original account, and attempts without a completion stay "incomplete". TTS / ASR updates for the same account are written serially without going through network reporting and server-side rate limiting. See [Personal speech data boundary](usage-statistics.md#personal-speech-data-boundary) for details.

## Verification boundary

A fix to the speech price table, corresponding to the actual stack trace on 1.21.1, was synced on 2026-10-31: `PRICE` and the logger are initialized before `Table.CODEC` and `INSTANCE` (which loads the config immediately), and amounts accept JSON numbers as well as decimal strings. The original problem blocked final text delivery at the local cost accounting stage after a successful recognition; the ledger now uniformly isolates RuntimeException / LinkageError from the statistics computation, records the full stack and keeps the previous snapshot without interrupting recognition or narration. If a class initialization failure has already occurred in the current process, the client must be restarted after updating, because a resource reload cannot restore a class that has already failed in the JVM.

This round only ran compilation, packaging and static checks; Minecraft was not started, no microphone was opened and no paid API was called. Real device compatibility, NLS authentication and transcription quality have not yet been verified at runtime.

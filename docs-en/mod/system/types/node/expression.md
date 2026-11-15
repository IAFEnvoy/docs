---
title: "Expression state machine"
sidebar_position: 11
---

`system:expression` renders a resource-pack-driven avatar inside a card. Free-chat replies use it to the left of Markdown, including chat fallbacks in extended mode.

## JSON fields

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | Yes | — | `system:expression` |
| `profile` | String | No | `system:panda` | Expression profile ID; supports placeholders |
| `state` | String | No | `{{expression}}` | Initial state name; supports placeholders |
| `size` | Integer | No | `72` | Square avatar area in pixels |

The node shares [id, style, when, unless and repeat](../../cards/node-common.md). Its default CSS class is `card_expression`. It is not a text node; Markdown and ChatOutput still supply the reply and narration.

```json
{ "type": "system:expression", "profile": "system:panda", "state": "{{expression}}", "size": 72 }
```

Override `assets/system/cards/chat.json` to move or remove the avatar, or select a different profile. An unknown profile falls back to `system:panda`; an unknown state uses the profile's `default_state`.

## Resource definition

Store a profile in `assets/<namespace>/expression/<path>.json`, with ID `<namespace>:<path>`. PNG references use vanilla texture IDs under `assets/<namespace>/textures/…`.

```json title="assets/example/expression/assistant.json"
{
  "default_state": "neutral",
  "transitions": { "celebrate": "happy", "reset": "neutral" },
  "states": {
    "neutral": {
      "texture": "example:textures/assistant/neutral.png",
      "speaking": [
        "example:textures/assistant/neutral_up_left.png",
        "example:textures/assistant/neutral_down_right.png"
      ],
      "frame_time": 180
    },
    "happy": {
      "texture": "example:textures/assistant/happy.png",
      "duration": 3000,
      "next": "neutral",
      "transitions": { "calm_down": "neutral" }
    }
  }
}
```

| Profile field | Type | Required / default | Description |
| --- | --- | --- | --- |
| `default_state` | string | `neutral` | Must exist in states; used as the fallback |
| `states` | object | Required | Custom state name → state definition |
| `transitions` | object | `{}` | Global event name → target state |

| State field | Type | Required / default | Description |
| --- | --- | --- | --- |
| `texture` | Identifier | Required | Idle texture |
| `speaking` | Identifier[] | `[]` | Speech frames; empty keeps the idle texture; more than two frames are supported |
| `frame_time` | int | `180` | Milliseconds per frame, clamped to at least 1ms at runtime |
| `duration` | int | `0` | Positive values enable a timed transition, in milliseconds |
| `next` | string | `""` | Timeout target; empty returns to default_state |
| `transitions` | object | `{}` | State-specific event mapping, preferred over the global mapping |

Events first check the current state, then the global mapping, then a state with the same name. Automatic narration emits `speech_started` and `speech_finished`; leaving them unmapped preserves the emotion and only switches speech frames. Client resource reload rereads profiles and textures. Invalid overrides fall back through lower packs and log the error. Default states, transition targets and referenced textures must exist.

## AI and narration

The server's final answer is `{"text":"…","expression":"happy"}`; a ReAct final step also includes `"type":"answer"`. Expression is optional and defaults to neutral. The bundled prompt suggests neutral, happy, sad, angry, surprised, confused, shy, smug, thinking and laughing. Add custom names through [prompt TXT files](../../data/prompt.md) without changing Java.

The default profile provides 36 panda faces, each with an idle texture and two frames shifted slightly toward the upper-left and lower-right. The 108 transparent PNGs total about 394 KiB. All frames use the same canvas so switching does not change layout. Each card keeps independent state, and history restores idle expressions. Resource packs stay client-side and do not add model requests.

Speech frames run only while that message's TTS is actually playing. Synthesis loading, notification cues, pauses, cancellation, failures and other messages do not animate this card. Playback ending restores the emotion's idle texture. Animation only repaints textures; it does not change CSS or trigger layout each frame. The card editor previews idle frames; speech and state events run in the game.

## Java extensions

The server can construct `new ChatOutput("Hello", "happy")` or update it through the existing card REPLACE protocol. On the client, [CardBuildEvent](../../cards/overview.md) can set the initial state with `builder().put("expression", "smug")`.

Control rendered cards on the client thread using the following classes from `com.iafenvoy.system.screen.expression`; cardId is the CardReference UUID:

```java
AssistantExpressions.control(cardId, machine -> machine.setState("happy"));
AssistantExpressions.control(cardId, machine -> machine.signal("celebrate"));
AssistantExpressions.control(cardId, machine -> machine.setSpeaking(true));
AssistantExpressions.control(cardId, machine -> machine.setSpeaking(null)); // Resume automatic speech tracking.
AssistantExpressions.control(cardId, ExpressionStateMachine::reset);
```

This API affects state machines still owned by a rendered interface and does not queue changes for unrendered messages. Change CardData or CardBuilder for persisted or pre-render updates. The manager uses weak references and clears on disconnect. Expression names affect presentation only and grant no tool or game permissions.

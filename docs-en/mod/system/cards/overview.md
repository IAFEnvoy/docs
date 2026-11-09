---
title: "Card layout and data flow"
sidebar_position: 1
---

The data flow is: the server produces a business snapshot → `CardUpdate` carries `CardData` → the client calls `buildCard()` → `CardBuildEvent` extends the Builder → `build()` freezes it into a `CardView` → JSON layout → explicit local or server button actions. Full mode, simple mode and the HUD share the same build, revision and interaction entry points. For the architecture, see [Card and message data flow](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/card-flow-design.md); for registration entry points, see [Registry quick reference](../development/registries.md).

You can open the [card JSON editor](editor.md) to edit layouts directly. It provides a local node tree, synchronized editing of properties and JSON, a sample Context and an approximate browser preview; for the operations and scope, see [Card JSON offline editor](editor.md).

## Data and rendering binding

The shared contract lives in `com.iafenvoy.system.data.card`: `CardData` provides `codec()` and `buildCard()` and does not load client, AUI, server runtime or optional mod classes. Business DTOs remain in their original output packages; the concrete client handling lives in `data.card.client` and `screen.card`.

`SystemCardDataTypes` registers each implementation's own MapCodec with the `system:card_data_type` shared by both sides. The root `CardData.CODEC` dispatches on `type`, and the data is flattened directly with no TypePayload wrapper. The data ID and the template ID may differ; no additional render mapping or client behavior registration is needed.

```java
@Override
public CardBuilder buildCard() {
    return CardBuilder.template(Identifier.parse("example:reward"))
            .summary(this.title)
            .put("result_items", this.items)
            .speech(this.speech)
            .serverButton("claim", "system.action.claim",
                    Identifier.parse("example:claim"), Map.of("reference", this.reference));
}
```

`buildCard()` only reads the fields of this DTO: it does not check permissions, inventory, quest state or the module table, and it does not send packets, request models or play sounds. The server prepares business references, next-page cursors, quotes and actionable state in advance. `CardBuilder.build()` yields an immutable `CardView`: template, title translation key, summary, Context, button list and SpeechContent. Components retain their translation keys and styles; actual translation, item stack creation and name resolution happen only on the client.

`ClientCards` keeps the latest data, revision and activity state per ID within a connection. `CardPresentation.of(update, messageKey, mode, actionOffset)` takes the latest snapshot, resolves Components, retains CardText that is only resolved when a node is read, appends the display mode, button labels and controlled callbacks, then reads `assets/<namespace>/cards/<path>.json`. When the template is missing it falls back to the summary and the existing buttons, and never shows the DTO's raw JSON.

Knowledge Q&A uses `KnowledgeAnswerOutput` / `system:knowledge_answer`; the body shows the answer, with local sources collapsed by default, including title, category and matched passage; only the answer or the source text prompt is spoken, and no web links or quest actions are offered. The web fallback continues to use the separate WebSearchOutput / web_search template; both cards only show results prepared by the server.

## Build event: adding parameters to existing cards

[`CardBuildEvent`](https://github.com/IAFEnvoy/System-Mod/blob/master/src/main/java/com/iafenvoy/system/event/client/CardBuildEvent.java) is published synchronously on the client `NeoForge.EVENT_BUS`, not on the mod event bus, and cannot be canceled. The single entry point is `ClientCards`: it first calls the original `CardData.buildCard()` to fill in the built-in content, then publishes the event, and finally `CardBuilder.build()` copies out an immutable snapshot. Common CardData / CardBuilder do not publish the event, and dedicated server-side services do not go through this client entry point.

| Accessor | Contents |
| --- | --- |
| `ref()` | UUID and revision of the current card; distinguishes messages from revisions |
| `data()` | Typed CardData sent by the server; filter by implementation class to pick the cards to extend |
| `builder()` | Mutable CardBuilder that already holds the built-in parameters; use put / enable / list to add display parameters |

For example, another mod listens on the client and extends the host information card:

```java
import com.iafenvoy.system.data.output.PlayerSnapshotOutput;
import com.iafenvoy.system.event.client.CardBuildEvent;
import net.minecraft.network.chat.Component;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.bus.api.SubscribeEvent;
import net.neoforged.fml.common.EventBusSubscriber;

@EventBusSubscriber(Dist.CLIENT)
public final class ExampleCardEvents {
    @SubscribeEvent
    public static void build(CardBuildEvent event) {
        if (!(event.data() instanceof PlayerSnapshotOutput player)) return;
        event.builder()
                .put("example_host", Component.translatable("example.card.host", player.name()))
                .put("example_level", player.experienceLevel())
                .enable("example_extra", true);
    }
}
```

The language key `example.card.host` is provided by the extending mod. You can also read data that mod has already synced to the client and write it into parameters under your own prefix; Components / CardText continue through client formatting (CardText is resolved lazily per node). A resource pack overrides `assets/system/cards/player.json` and adds the node where needed:

```json
{
  "type": "system:text",
  "when": "example_extra",
  "text": "{{example_host}} · Lv.{{example_level}}"
}
```

The event covers SHOW, REPLACE with new data, history restore and on-demand builds of uncached cards; reading an existing CardView, stale / duplicate updates and REMOVE do not trigger it. Full, simple and notification modes share one extended snapshot; a resource reload only re-reads the JSON and does not re-collect parameters. An on-demand build may fire more than once, so listeners should only add display content and must not treat it as a business event such as granting rewards; modify the Builder only during the callback and do not keep a reference. New parameters are not persisted or uploaded to the server automatically, and server business logic and permissions are still handled by the original requests.

## Plain message convention

A card renders as a plain `message_text` — with no card frame — only when the template body is exactly one `system:text` node, has no repeat, has no CardButton, and has no extra visible title or separate summary content. The text may wrap or carry formatting; plain text needs no separate renderer registration.

**A card with buttons is still a card**, including binding prompts that use a `system:text` template. Items, containers, dividers, multiple nodes or other layout elements also keep the card. When a single-text template carries buttons, the host adds the action area automatically, so the buttons are not lost.

```json
{
  "show_title": false,
  "body": [{"type": "system:text", "text": "{{summary}}"}]
}
```

The built-in `TextCardData` uses the `system:text` template above. The decision is centralized in `CardPresentation.plainText()`, so individual screens no longer guess the message type. The HUD's unified confirm button is controlled by the notification host and does not change the layout convention of the data itself.

## One card, one Context

| Field | Type | Purpose |
| --- | --- | --- |
| states | `Object2DoubleMap<String>` | 0 is off, non-zero is on; can also store loop counts |
| parameters | `Map<String, Object>` | Flattened text, numbers, booleans, items and other display parameters |
| callbacks | `Map<String, Runnable>` | Trusted operations bound by the client controller |

The whole card shares a single Context; there are no sub-Contexts. `CardContext.Builder.build()` copies the three maps into an immutable snapshot, and put also copies Lists and Components; other objects are the caller's responsibility to keep stable. `get(id, Class<T>)` returns a value only when the type matches, otherwise null.

`CardBuilder.put/enable/list` proxy the same-named capabilities of Context. put also sets a state of the same name: booleans become 1/0, numbers their own value, strings are judged by blankness, and collections use their size; enable can override that. list writes the count into the root key and fills flattened parameters with indices through the prefix callback. `reward/price` hold lazily resolved CardText and do not create item stacks in common code. callbacks are bound only by the client; DTOs and JSON never provide a Runnable.

## Summary, speech and updates

The summary provides the fallback when the template is missing and the main sentence for notifications, and avoids duplication when the template body already contains the same text. `SpeechContent` is split into main, requirements, rewards and descriptions, which the client combines according to per-player toggles. When speech is not set, the summary is used; an explicit `SpeechContent.EMPTY` means nothing is spoken; TTS never infers business meaning from templates, buttons or Java types.

`CardUpdate(ref, mode, data)` is separate from the content, and ref is a UUID + revision:

| mode | Behavior |
| --- | --- |
| SHOW | Adds a message; enters the chat or notification queue according to the response source |
| REPLACE | Fully replaces the given ID; adds no history, re-queues nothing and does not speak |
| REMOVE | Ends the active display and speech for that ID; history keeps the last read-only snapshot |

Older or duplicate revisions are ignored, and a closed notification does not pop up again when it receives REPLACE. Request completion does not depend on the number of cards; a zero-card reply still releases the wait. State and history travel through StateResponse and HistoryResponse respectively; history restore does not speak, send packets, or restore execution permission for old buttons.

## Layout and placeholders

Parameters, states and callback IDs all use lowercase with underscores, and text placeholders support only `{{id}}`. Collection and callback fields may use `{{id}}` or a bare ID; the previously unpublished dollar-brace format and uppercase parameter names are not compatible.

```json
{
  "style": ["result_card"],
  "show_title": false,
  "body": [
    { "type": "system:title", "level": 2, "text": "{{title}}" },
    { "type": "system:flex", "source": "{{result_items}}", "children": [
      { "type": "system:item", "item": "{{result_items.*}}" }
    ] },
    { "type": "system:button", "text": "Claim reward", "click": "return-val", "value": "{{claim_value}}", "when": "can_claim" }
  ]
}
```

JSON controls order, nesting, styles and visibility. Buttons are usually composed with flex / grid; when a single-text template carries buttons, the host adds the action area.

| Root field | Default | Meaning |
| --- | --- | --- |
| `style` | `result_card` | CSS class name; accepts a string or an array of strings, joined with spaces |
| `show_title` | true | Shows the generic title automatically when the `show_card_title` state is on |
| `hide_summary` | false | Does not show the summary line above the body; use it when the title already comes from the template or the summary duplicates the body — chat messages and speech still keep the summary |
| `body` | required | List of nodes |
| `actions` | default numbering and labels | `numbered` controls simple-mode numbering; `label` controls the action label used for speech / numeric selection. Styles and button structure are written on the body nodes |

Every node has a fully namespaced `type` (for example `system:text`) and optional `id/style/when/unless/repeat`. The table below omits the `system:` prefix of built-in nodes. `style` likewise accepts a string/array; `when` shows the node when its state is non-zero, `unless` hides it when its state is non-zero, and unknown states are 0. Node conditions may use a state ID directly or `{{id}}`. Conditions only read the state map; they never guess the value type of a parameter.

| Category | type | Function |
| --- | --- | --- |
| Text | `text` / `markdown` / `title` | FTB-formatted text, controlled Markdown, promotable heading |
| Media | `image` / `item` / `player` / `ftb_icon` | A single local image, a single item, a player model, a single FTB icon |
| Layout | `flex` / `grid` | Flexible layout, fixed grid that only creates the current page |
| Container | `container` / `groups` / `details` | Normal flow, group selection, collapsible section |
| Interaction | `button` / `link` | URL, local callback or server string; text link |
| Display | `divider` / `progress` | Divider, progress bar |
| Integration | `player_information` / `recipe` | Saturn information row, a single ordered recipe |

There are 18 node types in total; the old batch item, icon, shelf, quest grid, pin and actions nodes are all composed from these nodes, and no duplicate implementations or legacy node aliases remain. Use `text` with `style: "card_context"` for secondary text.

`text/title` share `text/translate/args/inline` through a separate TextContent: translate takes priority, placeholders in args are replaced before translation, and inline defaults to false. A container's children are required, text_separator is optional and only affects plain-text joining.

`title` additionally has `level` (1–4, default 1), mapping to the h1–h4 size levels. The first visible, non-empty level-1 heading at the **top level** of the body is promoted to the card title: the renderer places it before the summary, and it is no longer drawn in the body, and it shows even when the title key is the same as the result message key; level-1 headings inside containers or repeats, as well as level 2–4 headings, render in place. Heading nodes do not participate in the plain-text collapse decision; a template with a heading always keeps the card appearance.

The heading and the body share the same formatted Context: Components are resolved first, lazy CardText is retained, and summary, card_title, display mode and button parameters are added, before the heading is chosen. Therefore component colors, translations and mode conditions in `{{label}}`, `{{title}}` and `{{reward_label}}` all take effect, and no placeholder is left behind because of the raw object type. Hidden, blank and repeat headings do not take the card title slot.

A promoted heading also suppresses the automatic summary line in the card body, avoiding the repetition of "heading + the same sentence"; the summary stays in the card data and is still used for chat messages and speech. Business notices that must be kept should be added explicitly to the template as `{"type":"system:text","text":"{{summary}}"}`, optionally with a when condition; the built-in redeem confirmation, reward receipt, quest event / submission, candidate actions and starter gift all use this approach. Item sources keep the item names and counts from the summary so that only registry IDs are not left.

### Title convention for built-in templates

Of the 27 built-in templates, the 26 structured cards use `system:title`; the plain-text `text.json` keeps no title. 24 use a top-level level-1 heading, while the two lottery pool and lottery prize templates keep the existing layout of a level-2 heading on the same line as the count / chance.

| Card | Title source |
| --- | --- |
| shop_catalog / lottery_catalog / quest_list | System shop, system lottery, quest list; long result notices are not shown as the title |
| shop_offer / shop_order | Offer or order name; the redeem confirmation keeps its own notice, price and buttons |
| entitlement / purchase / reward | Reward name; the receipt, reason, items and claim state go in the body |
| quest / quest_submit | Quest name with its original style; details keep the completion marker, and the submission result is shown separately |
| quest_notice | `notice_title` is translated per event as "Quest complete" or "New quest unlocked"; the original notification main sentence and the pending-reward notice stay in the body |
| player / items / item_sources / sign_in_status | Host information, item query, item sources, daily sign-in; the host's two columns do not repeat the title internally |
| knowledge_answer / web_search / quest_guide | Knowledge query, web search, local guide; source entries still use level-2 headings |
| claim / delivery_state / selection / starter_gift / quest_startup | Quest claim, delivery state, optional actions, starter gift, advanceable quests; the body keeps the concrete state / notices / counts |
| lottery_pool / lottery_prize | Original lottery pool / prize name; the count / chance on the same line is kept, and no extra generic title is added |

These card titles belong to the content area; the fixed "System" title in the top-left corner of the HUD is unaffected; TTS continues to use SpeechContent and is independent of the heading layout. After a resource pack overrides a template, the corresponding template must be updated accordingly, and the offline editor's built-in snapshot should be refreshed as well.

### Markdown body

```json
{
  "type": "system:markdown",
  "text": "{{answer}}",
  "when": "answer"
}
```

`text` defaults to `{{summary}}` and supports flattened placeholders, loop indices and the common style / when / unless / repeat. The node reads content from the raw string, does not inject Minecraft formatting reset codes, and does not convert characters such as `&a` into color codes. `system:text` behaves as before and still handles FTBQ titles, descriptions, source text and § / & formatted text. A single Markdown node keeps its own layout and does not trigger the plain-message collapse rule that applies only to a single `system:text`.

It directly configures the Txtmark 0.13 extension parser that ships with AUI 1.2.9, adding no third-party dependency; it supports headings, paragraphs, bold / italic, nested ordered / unordered lists, blockquotes, inline code, fenced code blocks, dividers and links. Code keeps line breaks and allows long lines to wrap; there is no code syntax highlighting, and no GitHub-style tables or task checkbox extensions. Styles are centralized in the shared assistant.css as card_markdown / markdown_*, and full mode, simple mode and notifications use the same rendering entry point.

`AssistantMarkdown` uses Txtmark's `Configuration` (extended / safe / panic) and a separate `DefaultDecorator` subclass per conversion to output HTML, then creates elements through AUI `setInnerHTML`, no longer using the Swing HTML parser or rebuilding the DOM by hand. Source HTML tags are stashed wholesale under non-conflicting placeholders so that attribute quotes are not turned into typographic quotes by extended mode; the remaining `<` is stashed the same way and restored as escaped text only after output, so that panic mode does not escape it twice. As a result, `<`, a literal `&lt;` and `&amp;lt;` keep their respective content in inline, fenced and indented code, and § formatting codes in the code source are no longer removed.

Txtmark 0.13 may keep the opening fence of the next segment when a blank line separates consecutive fenced blocks, so before parsing only blank lines between adjacent fenced blocks are removed, while blank lines inside code are preserved. The HTML4 named entities generated by the library are first converted to numeric references in a single pass to fit AUI's entity decoding range; entity names already escaped in code still show as source text and are not decoded twice.

Raw HTML (including `<a>`, event attributes, scripts and styles) is shown as text; links inside HTML code blocks are not clickable either. Only the neutral spans generated by Markdown links get an action bound after parsing, and they accept only valid HTTP / HTTPS addresses, opened through `AssistantPageScreen.openLink` and the vanilla confirmation flow; the HUD still needs to enter its interactive state. Angle-bracket autolinks `<https://...>` are shown as text; use `[title](https://...)` instead. Images likewise emit a neutral element first, then keep only the escaped alt text, creating no img and downloading no resources. The generator's heading / list labels are all assigned the existing markdown_* styles, and IDs added by extension syntax do not enter AUI attributes. List numbering, markers and the plain-text projection share the same generated output; a parse failure is logged and falls back to the source text.

In a development environment you can send `/debug md` in the system UI input box to add `src/test-mod/resources/assets/system_test/debug/markdown.md` to the current local conversation as a Markdown card, without switching or reopening the screen. The command is registered into the system command cache through a local ClientModule, supports completion, and is not registered on the vanilla chat bar; the command and sample exist only in test-mod and do not enter the release JAR. The preview depends on no binding, model or server request and is not spoken automatically. In free mode, explicit local commands starting with `/` are likewise handed to the client for execution and completion first, while ordinary input still goes directly to the AI. The sample covers headings, nested lists, quotes, code escaping, Markdown links, raw HTML a tags, invalid protocols, image alt and untrusted heading IDs.

Local knowledge Q&A and web answers already use this node; both CardData put the raw `answer` into the Context separately so that Minecraft text formatting of the summary does not alter code / URLs. The built-in notice when there is no model answer and the collapsed sources still use text and the card_context style. Templates set hide_summary to avoid redrawing the unformatted answer; the Q&A / search prompts allow short Markdown in the text field and still require JSON output. The network codec, history data and SpeechContent are unchanged, and TTS continues to use the speech text explicitly provided by the business logic. The Markdown plain-text projection breaks lines per block and removes layout markers, and does not carry HTML into the text export.

### Host information and player model

The built-in `player.json` uses flex with row / column direction to lay out the model on the left and information on the right: the right side shows Saturn player information through a separate `system:player_information` node, no longer repeating name / health / level / dimension separately, and does not show the online player list. The model area has **no border** by default: the node `style` is written as `["player_preview", "player_preview_bare"]`, and removing `player_preview_bare` from `style` restores the border. Layout and preview width / height still live in the shared `assistant.css`; narrow containers may wrap, and the host width or height limit of the HUD does not change.

```json
{
  "type": "system:player",
  "player": "{{player_id}}",
  "follow_mouse": true,
  "yaw": 15,
  "pitch": 0,
  "scale": 1,
  "offset_x": 0,
  "offset_y": 0
}
```

| Parameter | Node default | Meaning |
| --- | --- | --- |
| `player` | `{{player_id}}` | Binding key of the UUID object in the parameter map, supporting the existing loop indices; no node is created when the binding is missing or of the wrong type |
| `follow_mouse` | false | Follows the mouse while the cursor is visible; horizontal / vertical deflection uses the same calculation as the vanilla inventory preview; the built-in player.json enables it explicitly |
| `yaw` | 15 | Fixed horizontal facing when following is off or the cursor is locked, in degrees; 0 is front, 180 is back, 90 / -90 are the sides |
| `pitch` | 0 | Fixed pitch when following is off or the cursor is locked, in degrees |
| `scale` | 1 | Scale factor after automatic width / height fitting, must be greater than 0; 0.8 shrinks, 1.2 enlarges, and the area size does not change |
| `offset_x` | 0 | Horizontal offset of the model center, in document CSS pixels; positive is right |
| `offset_y` | 0 | Vertical offset of the model center, in document CSS pixels; positive is down |

These configuration fields use lenientOptionalFieldOf, so a missing field or a type error falls back to the default, and a non-positive or non-finite scale also falls back to 1. The node has no extra text projection and does not affect the plain-text export or TTS. The area size is still controlled by the player_preview style in CSS; scaling and offset only adjust the model inside the frame, and parts beyond the area are still clipped. The node's own class names can be overridden by `Node.style`: the built-in template uses `["player_preview", "player_preview_bare"]` to keep the size and background while removing the preview border; to restore the border in a custom template, just write `player_preview`.

Following reads the live cursor while drawing on the client, first converting coordinates through AUI's document viewport and the inverse CSS transform, then comparing them with the offset model center, which adapts to GUI scale, scrolling and container transforms. When the game locks the mouse, yaw / pitch are used; the cursor is not forcibly released, and keys or clicks are not intercepted. Fixed-facing mode keeps the head and body horizontal facing aligned, while follow mode keeps the vanilla preview's head deflection.

`PlayerQueryTool` reads the current host UUID and values on the server, the Codec of `PlayerSnapshotOutput` carries playerId, and buildCard writes player_id; the common data holds no Entity, skin or client class. The client `PlayerModelElement` resolves the current world player by UUID each time, reusing the independent render state and entity submission chain of the vanilla InventoryScreen / GuiEntityRenderer, along with MC skins, equipment and model layers. The values are a snapshot from the server query, while the model uses the current client state; it does not find players by name, replace an offline card with the local player, or request skin APIs on its own.

The player information node accepts only one business configuration field:

```json
{
  "type": "system:player_information",
  "importance": 40
}
```

`importance` defaults to 0, and falls back to the default when missing or of the wrong type. Only rows whose `importance` in the Saturn row definition is **strictly greater** than this value are shown; a value equal to the threshold is hidden as well; the built-in template sets 40. The generic `style/when/unless/repeat` are still handled by the node host, with no field / group whitelist or extra row or character truncation. Saturn information rows added by a data pack participate in display automatically; adjusting a row's importance, visibility conditions or format should change the Saturn data definition.

`PlayerInformationView` collects information on the server game thread through `PlayerViews.parse(player)` + `PlayerInformation.collectAll(...)`; enabled, visible, missing, order and content format are all decided by Saturn. `PlayerInformationOutput` stores only each row's importance and the Component list produced by `InformationText.lines(row)`, avoiding bringing the registry Holder references of the native InformationDocument into JSON chat history that has no registry context; it does not reimplement Saturn's evaluation or text formatting. Component translation keys and styles are retained until the client handles them. `PlayerSnapshotOutput.buildCard()` puts the list into the fixed parameter `player_information`, and the node handles card rendering and the plain-text projection uniformly; when the filtered list is empty it shows `system.ui.player_information_empty`. A total collection failure only logs and returns an empty list, without affecting the player query itself.

The model is drawn within AUI's current output target, transform and clipping, using its item retention interval for depth so that CSS size changes do not overlap other documents; it does not call the full GuiRenderer set that would switch the projection / output target. Only the temporary render state is adjusted: name, shadow, fire and outline are removed, and the real entity's facing or pose is not modified. The node keeps no entity reference or separate GPU resources; when the player is temporarily not in the client world it shows a localized placeholder and restores when available again.

### Quest and reward type icons

`ftb_icon.icon` binds a single `FtbIconData` and does not accept an icon list. `FtbIconData.quest(id, title)` reads the icon configured by the Quest itself; `FtbIconData.type(preview)` uses the QuestIconOutput type, count and tooltip provided by the server. The single icon parameter of the quest list is `actions.<index>.action_icon`; quest / reward lists use flex.source + a single ftb_icon.

The native icon adapter is reflectively loaded only on a physical client with FTB installed; the shared DTO references no optional class. When the type does not match, the icon is hidden, and when the adapter is unavailable, the title fallback is used. Items still go through the item node and the vanilla tooltip, and icons and counts continue to use FTB's native presentation.

The requirement area of quest details and submission results uses `flex.source=tasks` to lay out objectives horizontally, with each `quest_requirement` placing the item / type icon together with the corresponding progress, wrapping by objective when space runs out; no single objective takes a whole row, and the reward area is still shown separately.

```json
{"type":"system:flex","source":"{{task_icons}}","children":[
  {"type":"system:ftb_icon","icon":"{{task_icons.*}}"}
]}
```

### Collapsible sections and hyperlinks

```json
{
  "type": "system:details",
  "summary": "{{tr:system.ui.search_sources}} ({{sources}})",
  "when": "sources",
  "children": [
    {
      "type": "system:flex",
      "direction": "column",
      "repeat": "sources",
      "children": [
        { "type": "system:link", "text": "[{{sources.*.id}}] {{sources.*.title}}", "url": "{{sources.*.url}}" },
        { "type": "system:text", "style": "card_context", "text": "{{sources.*.snippet}}", "when": "sources.*.snippet" }
      ]
    }
  ]
}
```

`details` requires summary and children, and `open` defaults to false. children uses the full node syntax and may nest other collapsible sections, loops, items and local / server buttons; the whole section is omitted when there is no visible child. The expanded state belongs only to the current render instance; after a rebuild or reopening the page it is initialized from open, and no business data is written and no model or search is requested. In full and simple mode the title is clickable; the HUD needs the chat key first; the plain-text export keeps the title and all content, and TTS still takes only the separate SpeechContent.

`link` requires url, and uses the URL as text when text is omitted. Both support flattened placeholders and loop indices; the URL is substituted with its original value and no Minecraft formatting reset codes are injected. Clicks reuse `Screen.clickUrlAction`, and the vanilla code validates the external URL, reads chatLinks/chatLinksPrompt, shows the vanilla confirmation screen when necessary, and returns to the screen that was open at the time; invalid links are not executed. Links do not act as AUI navigation or script execution and do not trigger server actions. They are clickable in full and simple mode, and the HUD needs to enter the chat bar; the plain-text format is the title and the URL.

The collapsible title and links use a flex button with separate block text children, avoiding duplicate drawing of the button's direct text and the inline fragment; the title arrow occupies its own slot. Expand / collapse only invalidates the layout of the content subtree, leaving it to AUI's next render, and does not synchronously commit the whole page layout in the click event; the callback holds the natively initialized node so that references do not become stale after the tag is replaced on insertion. The search template lays out sources vertically with search_source blocks, the summary is limited to at most three lines with line-clamp, and the full content can be viewed through the link; these display limits do not truncate the evidence the model obtained.

| Placeholder | Meaning |
| --- | --- |
| `{{title}}` | A string, number, boolean or `Component` parameter; components are formatted on the client with formatting codes in the current language |
| `{{tr:system.ui.lottery_cost}}` | Translates the full language key |
| `{{field:reward}}` | Translates `system.field.reward` |
| `{{bool:signed_in}}` | Translates "yes/no" according to the state |
| `{{state:state}}` | Lowercases the string parameter and translates `system.state.<value>` |

Unknown parameters or parameters that cannot be used as text keep the original placeholder. Substitution runs only once; braces, dollar signs and backslashes in field values are not evaluated again; dynamic text is not executed as HTML/script, and existing formatting codes are still terminated independently.

## Flattened loop parameters

The Builder's list is only a convenience method for writing keys and does not keep a sub-Context:

```java
builder.list("prizes", pool.prizes(), (prefix, prize) -> builder
        .put(prefix + "label", prize.reward().label())
        .put(prefix + "result_items", previews(prize)));
```

It writes the count into prizes and the entry parameters into flattened keys such as `prizes.0.label` and `prizes.0.result_items`. repeat reads the count from the state map, and the renderer carries only the loop indices:

```json
{
  "type": "system:flex", "source": "{{prizes}}", "direction": "column",
  "children": [{
    "type": "system:flex", "source": "{{prizes.*.result_items}}",
    "children": [{"type":"system:item","item":"{{prizes.*.result_items.*}}",
      "tooltip":[{"type":"system:text","text":"{{prizes.*.label}}"}]}]
  }]
}
```

Each `*` is replaced by the indices in order from outer to inner. For example, `rewards.*.choices.*.choice_title` in a nested loop reads `rewards.0.choices.1.choice_title`. The repeat itself first uses the outer index to get its count and then enters the current loop. There is no inheritance, local variables or parameter overriding; the dots are only part of the Map keys.

## Items

`item` accepts only one ItemPreviewOutput; `size` defaults to 32 pixels, and `tooltip` is a list of text projection nodes appended to the vanilla item tooltip. Item stacks are created only on the client, on demand; item names, prices and lottery pool tooltips are resolved lazily through CardText until the node is actually displayed or the text export is read, and pages that are never opened do not create tooltip item stacks in advance; lists, descriptions, names and labels are composed from text / flex / grid. Putting an item List also writes flattened keys such as `key.0`, and the item's `key.0.label` is the lazily resolved name and count.

`image`'s source is a local Identifier, for example `system:icons/pin.svg` maps to `assets/apricityui/apricity/system/icons/pin.svg`, read asynchronously by AUI; width / height default to 32. This node does not download web images, and the text export uses alt. The player node continues to reuse vanilla model rendering.

`recipe` binds a single ItemSource and only handles the workstation, ingredients, result and description; it keeps ordered slots, duplicate ingredients, empty slots, 3×3 padding and candidate ingredient tooltips. The item sources card uses groups' fixed category options and grids with their own filters to compose the recipe / drop / tag views.

## Buttons and actions

The button convention references [KOOK card message click/value](https://developer.kookapp.cn/doc/cardmessage) and adopts the same link / string return concept; the layout, DTOs and MC interactions are still implemented by this mod.

```json
{"type":"system:button","text":"Open document","click":"link","value":"https://example.com"}
```

```json
{"type":"system:button","text":"View quest","click":"return-val",
 "value":"system:quest_detail?quest=0123456789abcdef","behavior":"push"}
```

```json
{"type":"system:button","text":"Local action","click":"local","value":"{{example_callback}}"}
```

| click | value | Execution location |
| --- | --- | --- |
| `link` | HTTP / HTTPS URL | The client reuses Minecraft link preferences and the confirmation screen |
| `return-val` | Opaque string | CardActionRequest sends only source (ref + revision) and value, and the server parses it |
| `local` | Key name in CardContext.callbacks | Executes the Runnable provided by code; JSON provides no scripts |

A button's main body can be built from text or children; icon may reference a local image; label provides tooltip / accessibility text. selected / disabled read state bindings. The client's optional binding accepts only a CardButtonBinding provided by code, which interactions such as pin use to maintain live selected, pending and available states; the generic ButtonNode knows nothing about quests or caching.

Built-in strings are produced by `CardEventValue.encode(Identifier, Map<String,String>)`, for example `system:quest_detail?quest=...`; keys and values are UTF-8 URL-encoded and parameters are sorted by key. With no parameters there is only the action ID. The Identifier + Map overload of `CardBuilder.serverButton` only produces that string; you can also pass a string directly. The client does not parse server behavior or request a large model.

The server first checks the player connection, binding, rate limit and source revision, then publishes `CardButtonEvent` on the game main thread. Other mods read player/source/value, recognize their own format and then call `handle(AgentResult)` or `handle(CompletionStage<AgentResult>)`; a handled event does not enter the built-in parser. A single event can have only one handling result. Event listeners are responsible for their own permission and business validation and must not wait on the network or disk on the main thread.

```java
@SubscribeEvent
public static void button(CardButtonEvent event) {
    if (event.result() != null || !event.value().equals("example:help")) return;
    event.handle(AgentResult.ok("example.help"));
}
```

An unhandled string goes into CardEventValue → ModuleRouting.button → AgentEngine.submit, which continues to reuse enabled modules, ownership, costs, quest state and idempotency checks. The client can modify the string, and the server always re-checks the business data; the card source is only an association and a revision and grants no execution permission.

`CardButton` keeps BODY / FOOTER and CLOSE / WAIT / REPLACE / PUSH. The notification's confirm, back and footer buttons are managed by host code; body buttons do not replace these controls. A REPLACE reply replaces the current notification, and PUSH keeps both the source and the CardUiState so that you can go back; page turns, grouping and collapsing only update the current window and do not send packets or insert notifications. A plain-text card with buttons still keeps the card. Simple mode keeps numbered text selection.

### Shared paginated grid

`flex` supports direction (row / column), wrap and optional source/filter/page_size; `container` only wraps static children. When `grid`'s source is empty it lays out static children; with a source it repeats children by the original index; do not use repeat and source at the same time to iterate the same collection.

```json
{
  "type":"system:grid", "source":"{{offers}}", "columns":6,
  "compact_columns":3, "max_row":3, "cell":104,
  "children":[{
    "type":"system:button", "style":"offer_cell_content",
    "click":"{{actions.*.click_type}}", "value":"{{actions.*.value}}",
    "children":[{"type":"system:text","text":"{{offers.*.label}}"}]
  }]
}
```

A dynamic grid's page capacity is the current column count × max_row; full uses columns, while other modes use the smaller of columns and compact_columns. When filtering leaves a single page, the height shrinks to the number of rows actually needed; two or more pages always keep max_row rows, including a last page that is not full, to avoid jumping when paging. The previous / next page buttons are always kept and are greyed out with a single page; an empty result produces no grid. Only the current page's DOM and item previews are created, and CardPagination is the only pagination component.

`groups` only handles filter indices and knows nothing about shelves or quests. `source/filter/group/group_label` control grouping; `section/section_label` control the left-hand sections; `orientation` may be `vertical` or `horizontal`. By default only groups that actually have results are shown; an explicit `options: [{id, label}]` can fix the categories, and empty categories are greyed out. The selected group only passes the raw index set to descendant layouts with the same `source`; the whole card still shares one Context, and event parameters and loop indices are not renumbered.

CardUiState stores the page number, selected group and collapsed state per display instance, keyed by card and node path; a node id can be set to keep local state stable. Returning from a notification preserves the source state, and chat and notifications are independent. State does not mix into the CardContext business parameters and is not uploaded to the server. Pagination and group clicks only replace the local subtree and request AUI to re-layout on the next frame; they do not synchronously read scrollLimit or force computation of page-wide styles.

`progress` reads a value from 0 to 100, the track is 6px high by default, and colors are still controlled by the theme. The first draw expands from zero, and updates transition smoothly from the currently displayed value to the new value (350ms); the same target does not replay. CardUiState stores the animation state per value binding and reuses it when a persistent card replaces its body; the native fill element only scales the drawing matrix, does not modify the CSS width or query layout during the animation, and stops active redrawing when the animation ends.

The quest pin uses QuestCardBindings to inject a local callback and a CardButtonBinding in CardBuildEvent; the plain button shows a pin image; the server-side pinned record is still managed by the original dedicated display card payload and DataStorage. The queuing policies of quest completion notifications, single quest details and multiple quest lists keep their previous behavior.

## Persistent card HUD

The persistent card uses a separate `AssistantCardDisplay`, `assistant-cards.html` and the Saturn HUD item `system.cards`, and sits on the left side of the screen by default; it does not enter chat history or the notification queue, plays no prompt sound or TTS, and has no automatic close time. The body is still built by `CardData.buildCard()`, `CardBuildEvent`, `CardPresentation` and the client JSON templates, sharing `assistant.css` and the theme. `CardContext.Mode.HUD` corresponds to the `hud` state; client nodes such as collapsing, links and pins are supported, and the current quest tracking template provides no business actions such as submission or claiming.

The pinned record is saved by the core module's `DisplayCardsDataStorage`, the storage is declared as `CoreSystemModule.DISPLAY_CARDS`, and the Saturn Codec type is `system:display_cards`. The deduplicated records keep insertion order and contain only `source` and `id`, without stale quest snapshots or client objects. Updates run in an `AgentStore` player transaction, and actual changes call `markDirty()`; the moduleData under `<world save>/system/players/<player UUID>.dat` (GZIP-compressed NBT) is used, so data is isolated per server / world save and player and survives relogging and restarts. Undo / reset deletes player business data together with this; a normal logout only clears the client mirror.

The server-side `AssistantCardDisplays` owns the data sources and sessions and is driven by `ModuleManager` for login, initialization, tick and shutdown. A module registers a source through `context.get(ContextTypes.DISPLAYS).register(context.id(), sourceId, reader)`; the reader receives the current player and business ID on the server thread and returns `Optional<CardData>`. The current data is re-read every second, and `DisplayCardsS2CPayload` is sent only when the snapshot changes or a pin operation is confirmed; C2S accepts only the key and pinned state, never card bodies provided by the client. The session / revision prevents stale snapshots from overwriting newer ones, and async write-back re-checks the connection and player run generation.

The FTB source is the isolated adapter `FtbQuestDisplay`: on each pass it verifies the current team, quest visibility and detail unlock conditions, then produces a `QuestPinOutput`. `assets/system/cards/quest_pin.json` shows the title, chapter, first three objectives and progress at the bottom; `status` is a colored check / cross, and `title` contains only the quest title; the two are laid out in a non-wrapping flex row, the status does not shrink, and a long title wraps only in the right-hand text column; extra objectives only show a count. After completion it stays until the pin is canceled manually and does not auto-submit or claim. When the quest does not exist, becomes hidden or the corresponding module is disabled, the reference is kept but no card body is sent; it reappears once readable again.

The left width is controlled by the shared CSS as `min(360px, 38vw)`, the height grows with the content with no height limit or internal scroll area, and all cards are arranged downward in order. Saturn positioning uses the actual content height; content beyond the screen is clipped by the viewport. After pressing the chat key you can view tooltips and unpin; normal gameplay does not grab the mouse; by default, interaction is disabled immediately when another Screen such as the inventory is open, the HUD unloads after the exit animation finishes and restores on return. "Settings → General" can disable the persistent card animation, or enable showing it in other in-game screens: only screens such as the inventory and chests for which `Screen.isInGameUi()` is `true` are allowed, while settings and the pause menu remain hidden, and the decision does not depend on the pause state; normal gameplay and the chat bar are allowed separately. Within other screens it stays passive and does not intercept vanilla controls. F1 and leaving the world still unload it immediately, and the HUD editor always uses the preview. Position and visibility use Saturn's own editor, see [HUD position editing](../guides/ui.md#persistent-card-hud). The persistent display does not register a notification CardRef and does not run the notification confirm, back or queue logic.

Each card uses its own wrapper layer for horizontal sliding and fading: the Saturn left anchor enters and exits to the left, the right anchor to the right; a top/bottom-centered anchor picks the direction according to which half of the screen the HUD is on. The displacement is computed from the saved position and the screen edges and converted to document pixels. A newly added card waits for the native first layout to finish before entering; unpinning, switching screens or temporarily unreadable data exits first and removes only after the animation ends; the last card is also kept until the exit completes. Returning to the game or restoring the same card while it is exiting enters in reverse; quest progress and template updates only replace the inner content and do not replay the entry. Switching screens keeps only the passive drawing needed for the exit and does not accept mouse input; the editor's own preview is unaffected.

## Common parameters and module fields

The common parameters are summary/card_title/result_actions and `actions.<index>.label/number/click_type/value/behavior/visible/disabled`; the states are show_card_title/full/simple/notification/text_items. The callback is `actions.<index>.click`. In plain-text mode full/simple/notification are all 0.

| Template | Parameters |
| --- | --- |
| player | player_id (UUID), name/health/max_health/experience_level/dimension, player_information |
| items | `items.<index>.item_name/item_id/max_stack`, result_items |
| sign_in_status | date/signed_in/history_saved/external_model, `candidates.<index>.reward_label/reward_items/result_items` |
| reward/entitlement/purchase | reward_label/reward_items/result_items; the receipt also has entitlement_id/state, and a purchase also has order_id; the delivered state means it has been delivered, and the button area shows a non-clickable "Claimed" |
| shop_offer | label/id/items/price/price_text/payment_available, offer_items/price_items |
| shop_order | order_id/label/state/error |
| lottery_catalog | revision/query/truncated; `pools.<index>.label/prizeCount/prizes.<index>.label/chance/items`, cells are driven by the `pool.<index>` server button |
| lottery_pool | label/id/prize_count/preview_count/price/price_text/free/payment_available/price_items/prizes; the priced state means a per-draw cost exists; `prizes.<index>.reward_label/chance/result_items` |
| lottery_prize | reward_label/reward_items/chance/result_items, the chance value carries no percent sign |
| delivery_state | state |
| quest/quest_submit | title, `tasks.<index>.task_title/task_progress/task_required/task_items`; details also have chapter/description/progress/completed; the submission enum is built by CardData into submit or check buttons |
| quest | `rewards.<index>.reward_title/reward_state/result_items`, choices use `rewards.<index>.choices.<index>.choice_number/choice_title/result_items` |
| quest_notice | id/title/chapter/description/requirements/other_rewards/manual_submission/result_items |
| quest_startup | total/remaining, `quests.<index>.title/progress` |
| starter_gift | `gifts.<index>.result_items/error` |

The `title` of quest details appends a green ✓ (completed) or a red ✗ (not completed) before the quest name, coloring only the symbol and keeping the style of the original quest name. The summary and the title use the same component, so the automatic summary does not show the quest name twice; the template no longer shows a separate "completed" line, and speech still reads the original SpeechContent.

price is the non-item cost text, and price_text includes the item text. text uses the summary, and selection uses the declared actions. States and history have no card templates.

After a delivery (`system.action.deliver`) succeeds, no "delivered" status card is sent any more: the server rebuilds the same receipt with a silent reply and replaces the source card in place, and the `delivered` state swaps "claim to inventory" for a non-clickable "Claimed". This applies to the `reward` / `entitlement` / `purchase` cards, and the kind, order number and lottery pool needed for the rebuild are sent with the button parameters.

## Type extension and reload

Node implementations live in `screen/card/node`, each in its own file. The root interface `CardNode` defines:

- `codec()`: returns the stable MapCodec instance registered for the current node.
- `css()`: the default style, still overridable by the JSON style.
- `render(view)`: creates an AUI node, returning null hides it.


`CardTemplate.Node` only wraps the shared id/style/when/unless/repeat. Node implementations live in node.text, media, layout, container, interaction, display and integration respectively and are not inlined. Capability interfaces are implemented as needed: TextProjectingNode handles text export, PlainMessageNode marks plain-message eligibility, HeadingNode returns a promotable heading, ChildrenNode unifies children, and CollectionNode unifies the raw indices of a collection. TitleNode and TextNode share only TextContent and do not extend each other.

CardRenderer only handles conditions, loops, paths, placeholders and dispatch by interface; it no longer makes judgments about concrete TextNode / TitleNode or business nodes. Text mode exports all pages through projectable nodes, and the card-level rules for no buttons, separate title and summary are still centralized in CardPresentation.

New nodes use a separate Java file, for example:

```java
public record BadgeNode(String value) implements TextProjectingNode {
    public static final MapCodec<BadgeNode> CODEC = Codec.STRING.fieldOf("text")
            .xmap(BadgeNode::new, BadgeNode::value);

    @Override
    public MapCodec<BadgeNode> codec() {
        return CODEC;
    }

    @Override
    public String css() {
        return "card_context";
    }

    @Override
    public Element render(CardRenderer.Render view) {
        return view.element("span", CardRenderer.value(this.value, view.context(), view.indices()));
    }

    @Override
    public String text(CardRenderer.Text view) {
        return CardRenderer.value(this.value, view.context(), view.indices());
    }
}
```

Then register the Codec through DeferredRegister in the client entry point and bind it to the mod event bus:

```java
public static final DeferredRegister<MapCodec<? extends CardNode>> NODES =
        DeferredRegister.create(SystemResourceKeys.CARD_NODE_TYPE, "example");
public static final DeferredHolder<MapCodec<? extends CardNode>, MapCodec<BadgeNode>> BADGE =
        NODES.register("badge", () -> BadgeNode.CODEC);

// In a client-only mod constructor:
NODES.register(bus);
```

JSON uses `"type":"example:badge"`. Registration and freezing are handled by the NeoForge mod loading flow; nodes cannot be added in `ClientModule.register(context)` or on an F3+T reload. Duplicate IDs, reusing the same Codec instance, unknown types or unregistered encoded nodes are all rejected. A node's MapCodec should not include shared fields; recursive children/description uses `Codec.lazyInitialized(() -> CardTemplate.Node.CODEC)` to avoid a static initialization reference cycle. Extensions should not bypass the notification's code-button convention.

Resource reload tries the high-priority resource pack, the low-priority resource pack and the last valid template in order; an unknown type or a structural error makes the whole template fall back, and structural fields are not leniently swallowed. Deleting a resource removes the template. The full/simple screens refresh existing content; notifications read the current template at actual draw time and the queue stores card data; already displayed notifications are not re-queued or spoken because of a resource reload. Messages are deduplicated by card ID.

Resources exist only in the client assets and do not enter server data, world saves or model requests; there are no new dependencies and the network protocol is still 1.

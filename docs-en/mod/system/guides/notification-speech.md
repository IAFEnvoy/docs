---
title: "Notification narration rules"
sidebar_position: 11
---

## Public references

On 2026-10-24, searched and read the public chapters of the following platforms to distill the common expressions of system-flow web novels, without copying plots or long passages of the original text:

- [Feilu: *I Gained the Shadow Legion at the Start and Founded the God-Slaying Hall!*, Chapter 1](https://b.faloo.com/1294604_1.html): system detection, activation, how the host is addressed, reward notification and guidance for the next claim.
- [Huaben: *The System Takes Me to Rule the World*, Chapter 4](https://www.ihuaben.com/book/5263643/34052509.html): reporting condition changes, restrictions and quest triggers in a standalone prompt block.

Both share the same features: a short alert tone introduces the state change, the host is addressed directly, the result is reported before the next step, and information is organized with section labels. This project adopts these genre conventions and keeps a calm, concise tone.

On 2026-10-26, read the same public chapters again and checked the short-prompt phrasing of "ding / host / detection / activation" and of quest triggers. Narration uses "alert tone + event object + result that has already occurred"; property descriptions and reward details stay in the interface. No plot is copied sentence by sentence, and no lines are produced through extra reasoning.

## Expression in the project

New binding, sign-in settlement, shop redemption and follow-up advancement completion start with "Ding—"; ordinary queries use labels such as `[Host Status]`, `[Item Search]` and `[Quest Manual]`; errors state the real restriction directly. Each time only the necessary result and the next entry point are given, without adding lengthy narration.

For example:

```text
Ding—System binding succeeded, host permissions are now enabled.

[Host Status] The detection result is as follows.

Ding—Today's sign-in settlement is complete, the reward has been recorded in the inbox.

[Redemption Confirmation] Host, please verify the offer and the price; the charge is only made after you confirm.

[Insufficient Materials] The main inventory does not contain enough materials matching the price template; the item type and components must match exactly.
```

The copy does not introduce levels, rarity, combat power, penalties, forced quests or a first-binding gift pack that are not implemented. Reward crediting, inventory delivery and FTB claim handling continue to use their own real states; an unknown result is never rewritten as a success.

## Short narration

`speech/tts/SpeechText` generates the read-aloud text for the interface and the HUD uniformly, using the bilingual `system.tts.message.*` templates. For example, when the quest name is "First Mine Exploration":

- Completion: `Ding! Congratulations, host. Quest "First Mine Exploration" is complete.`
- Unlock: `Ding! New quest "First Mine Exploration" unlocked.`
- Expand details: `Host, the details of quest "First Mine Exploration" are now expanded.`

Events extract only the name and do not read chapter, quest description, ID, progress or reward fields aloud; without a name, only the event is reported. Ordinary replies read the main copy and the custom body aloud, and card contents do not enter narration. The detection steps of a binding and the full command list stay visible, but speech only says the binding result and "the command manual has been expanded". Quest completion reports only completion and does not promise that rewards are credited or claimed automatically.

## Prompt locations and boundaries

- The default model prompts are `routing.txt`, `sign_in.txt` and `quest_narration.txt` under `src/main/resources/data/system/system/prompts/`; they can be overridden by a data pack at the same path and reloaded with `/reload`, and are loaded as UTF-8 text by the server-side `PromptReloadListener`. Quest narration only tidies fragments that cannot be formatted directly, requires facts, quantities and restrictions to be preserved, and its result is verified through the Codec and cached by content, without generating tool calls.
- `data/prompt/SystemPrompts` stores an immutable template snapshot per server, and `PromptTemplate` performs a single `{{name}}` substitution. `{{player_language}}` is injected automatically; routing additionally provides the required `{{capabilities}}` JSON. For template restrictions, extension parameters and failed-reload behaviour, see [prompt templates](https://github.com/IAFEnvoy/System-Mod/blob/master/docs/datapacks.md#提示词模板).
- Routing prompts may return only one module and the input JSON, and must not output story, lines or a chain of thought. Local candidate scores are only hints and cannot replace the original text or the authorization; ambiguity returns `clarify`, and the code generates the read-only options. The registration catalog and the per-module budgets do not expand because of a tone adjustment.
- Each model call has `requestContext.playerLanguage` injected by the execution context; it comes from the client language already synced by Minecraft, with no extra client language pack.
- The sign-in prompt picks one ID from the approved candidates, and writes `reason` as a single short system-supply explanation in the player's language. The Chinese copy addresses the player as the host and the English copy uses "Host"; the reason uses only information supported by the current snapshot.
- The model cannot change item counts or reward IDs, nor announce crediting through its copy; the sign-in settlement notification is chosen by the code from the bilingual templates after the business operation succeeds.
- `web_search.txt` requires distilling the facts relevant to the question from web pages, merging duplicate content, and giving the conclusion first followed by the necessary short points; it must not restate the whole page, navigation, ads, the retrieval process or the source list. Only the body carries citation numbers; source titles, links and summaries are shown in a collapsible area on the client, and TTS reads only the answer.
- Explicit phrases and commands such as `/player` and `/shop` are dispatched directly by the `CommandRegistry` declared uniformly by the module, without consuming a routing model call; sign-in still keeps its one necessary reward-selection call.
- The GUI's mode, privacy settings and numbered choices are parsed explicitly by the client; a number maps only to code actions of the current reply, and no model text is ever treated as an executable command.

Fixed templates are in `assets/system/lang/zh_cn.json` and `en_us.json`, with identical key sets. New notifications must update both languages together. The binding notice is shown only after the administrator's `grant` has succeeded and been written to disk; the `revoke` success notice is shown only after the player file has been deleted.

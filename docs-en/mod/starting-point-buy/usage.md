---
title: Player Guide and Commands
description: Choose a preset, adjust quantities, confirm a start, and inspect or recover sessions.
sidebar_position: 2
---

Your modpack's data pack determines the professions, prices, limits and completion conditions. Load a plan using the [installation instructions](./install.md).

## Choose and confirm a start

1. Choose a preset in the narrow left sidebar, or select options on the right. Single-choice groups replace the previous selection; repeatable options have minus and plus controls.
2. Check the resource balances and failure messages at the bottom. Hover to inspect descriptions, contributions, rewards and preset contents.
3. Adjust quantities until every rule passes. Changing professions can change prices and limits; existing quantities that exceed a new limit remain for you to correct.
4. Press Confirm. Final resources and rewards only take effect after the server accepts the submission.

A preset replaces the entire selection without granting extra points or rewards. Manual changes show as Custom; an exact match highlights the preset again. Reset clears quantities while keeping the session's resource baseline and captured inputs.

The columns scroll independently, with the mouse wheel affecting the region under the pointer. Narrow windows use a preset toggle. Selected options that become hidden or disabled remain accessible in the section for selections needing attention, so they can be removed.

## Closing and damage protection

By default, confirmation is required before closing. Meeting the point rules alone does not unlock Esc, Save & Close, or replacement by another in-world screen.

With `ui.allow_close_before_complete: true`, a plan allows the draft to be saved and closed. Closing waits for the server acknowledgement; reopening resumes the saved draft.

While the screen is open, the server ignores incoming damage, including void damage. Confirmation, an allowed close, administrator unlock or disconnect releases this protection. The screen does not pause the game.

## Keyboard controls

| Key | Action |
| --- | --- |
| `1`–`9` | Apply the preset at that position |
| Left / Right | Move option focus |
| Up / Down | Move focus by card row |
| Enter / Space | Toggle the focused option |
| Ctrl + Enter | Confirm the start |
| Page Up / Page Down | Scroll the option panel |

## Commands

| Command | User | Purpose |
| --- | --- | --- |
| `/spb open [plan]` | The player | Open or resume a plan; without a session or ID, choose an automatic plan |
| `/spb status` | The player | Show the plan, state, revision, tasks and completion count |
| `/spb refresh` | The player | Refresh an uncommitted session |
| `/spb unlock <player> [plan]` | Game master | Clear the player's matching plan records, or all starting-plan records when no plan is specified |
| `/spb recover <player>` | Game master | Release a `NEEDS_REVIEW` session so remaining tasks can continue |

Each player can normally complete each plan once per world. Repeated submission does not grant rewards again.

## Refresh a draft {#refresh}

The draft may require a refresh when another system changes real resources or a data pack changes the definition. The Reset button then becomes Refresh Draft: click it to resume editing in the current screen. Refreshing reads current real resources, captures `inputs` again, and keeps recognised options. Mandatory completion and damage protection remain active throughout. `/spb refresh` can also refresh an uncommitted session.

Refreshing does not evaluate `initial` again: current real values become the new baseline. Committed or completed plans cannot be refreshed. Reset only clears quantities; it neither changes the baseline nor rerolls captured inputs.

## Administrator unlock and task recovery

`unlock` clears matching sessions, completion records and ability grants maintained by this mod. If the matching current session was committed, its `commit: replace` resources are also restored to that session's baseline. **Items and world changes from actions already executed are not undone.** Earlier plans have no current session baseline to restore their resources from.

Task failures, failed pre-action saves or interruption around action execution can produce `NEEDS_REVIEW`. Inspect the logs and rewards already received before using `recover`. Failed and uncertain tasks are not automatically replayed: this command continues tasks that have not run, rather than reissuing failed rewards.

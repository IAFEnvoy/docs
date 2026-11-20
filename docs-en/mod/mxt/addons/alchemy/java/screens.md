---
title: Furnace Screens
---

## The Four Furnace Screens {#the-furnace-s-four-screens}

The furnace core, main input, auxiliary input and output open their respective monitor or storage screens. Casing blocks do not open a screen. The shared entry point, `AlchemyFurnaceMenus.open(ServerPlayer, BlockPos)`, selects the screen from the block at the accessed position and ignores other blocks.

ApricityUI renders `monitor.html`, `main_input.html`, `auxiliary_input.html` and `output.html` using the shared `alchemy.css` stylesheet. The pages use a translucent dark theme and the game font without declaring `font-family`. Java binds state and events to fixed node IDs and does not construct an alternative layout.

| Page | Required nodes and containers |
| --- | --- |
| All pages | `panel`, `title`, `inventory_label`, `player_inventory` |
| Storage pages | An additional `machine` container, with 2 main-input, 3 auxiliary-input or 4 output slots |
| Monitor | Additional `temperature`, `limit`, `status`, `progress`, `progress_fill`, `target`, `apply`, `start`, `abort` nodes; no `machine` container |

`player_inventory` represents the player's 36 inventory slots. A missing required node disables that page's bindings and rendering and produces the WARN message `Page <name> does not match its contract: <missing piece>`. ApricityUI binds slots separately, so slot interaction remains available. Layout changes must preserve these IDs and containers.

Each `<slot>` binds to a menu slot through its ancestor `<container id>` and its group-local `slot-index`. ApricityUI updates `Slot.x/y` each frame and handles item rendering, hover highlights, dragging and tooltips. The host screen reads the current panel rectangle for hit testing and `hasClickedOutside`.

Layout and background handling have the following constraints:

- Omit the `aui-mouse-events` meta entry to prevent the page from intercepting slot clicks.
- Use `height: 100vh` when centering a page across the viewport. ApricityUI does not support percentage heights on `body`, so `height: 100%` does not provide this layout.
- In `extractBackground`, draw the vanilla translucent background with `AuiStyles.extract` before rendering the page. Do not call `super.extractBackground`, because the background blur of an ordinary `Screen` also affects the HUD.
- The wheel menu leaves its background empty, preserving world and HUD brightness.

Page resources are packaged under `assets/apricityui/apricity/mxt_alchemy/alchemy/` and read whenever a screen opens. With hot reload enabled, saving changes applies them immediately. Otherwise, press END to reload resources and reopen the screen. Files in `<gameDir>/apricity/` override resources with the same names in the Jar.

The monitor displays read-only server state without evaluating recipes or listing recipe choices. Temperature, start and abort controls send requests to the server. Storage pages bind `machine` and `player_inventory` to real menu slots; the monitor contains only the player inventory.

## Network Protocol {#network}

The client sends operation requests. The server revalidates the active menu, access distance and furnace state.

`AlchemyActionC2SPayload` contains `(containerId, action, temperature)`. The server uses `containerId` to confirm that the monitor menu, accessed position and block role remain valid. The supported actions are:

| Action | Server handling | Feedback |
| --- | --- | --- |
| `TEMPERATURE` | Accepts `temperature` only if it is finite and between `0` and the settable maximum; the server advances the current furnace temperature independently | The following state payload reports the result through the input field and Set button |
| `START` | Calls `AlchemyWorkstationService.start` | A rejection produces an action-bar message |
| `ABORT` | Calls `AlchemyWorkstationService.abort` | No separate acknowledgment |

Rejected requests leave state unchanged. Other actions ignore `temperature`, and requests do not contain the current furnace temperature.

`AlchemyStateS2CPayload` sends `(containerId, view)`, containing furnace name and quality, phase and status, formation and locking state, start availability, input slot counts, current/set/maximum temperature, target and tolerance, remaining/total duration and out-of-range ticks. The client only displays this data.

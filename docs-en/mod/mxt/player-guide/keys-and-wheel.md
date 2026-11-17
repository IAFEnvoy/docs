---
title: Keys and Wheel
---

# Keys and Wheel

<span id="keys-and-wheel" />

## Keybinds {#keybinds}

| Key | Default | Action |
|---|---|---|
| Toggle Cultivation Mode | `C` | Starts or stops cultivating |
| Open / Close Character Information | `Z` | Opens the character information panel |
| Swap Main Hand with Back Weapon Slot | unbound | Swaps the main hand stack with the first `back_weapon` Curios slot <br /> See [Curios Slots](./curios-slots.md) for the slot rules the swap follows |
| Edit HUD Layout | right `Shift` | Opens the layout editor for movable HUD elements |
| Wheel Select | `R` | Opens the wheel that picks an ability or spirit power |
| Wheel Use | `V` | Uses the selected ability or spirit power |
| Wheel Previous / Next Page | `←` / `→` | Turns pages in the wheel screen, switching between the main wheel and the pages behind it |
| Flight: Descend | `X` | The descend key while flying an artifact mount |
| Open Wheel Configuration | unbound | Opens the wheel editor (the same as `/wheel`) |
| Wheel Slots 1–12 | unbound | Uses the ability or spirit power in that cell of the current page, the same as pointing at it and pressing `V` |

## Wheel {#wheel}

Saturn supplies the wheel; MiXianTu adds aura, artifact, and contract content. The main wheel is twelve cells you arrange. Hands, extension equipment, and the Beast Taming Bell supply derived pages, splitting after every twelve entries.

Hold `R` to select by pointer direction, then use `V` or left click. Releasing `R` only closes the wheel. With it closed, `V` uses the remembered entry. Arrow keys and scrolling turn pages. Slot keys address the current page, including derived pages.

## Wheel Configuration {#wheel-configuration}

Open `/wheel` or `/wheel configure`, or bind Open Wheel Configuration. Slots 1–12 are under Saturn: Wheel Slots; the remaining wheel bindings use the main Saturn category.

- The top is **one combined candidate pool** for abilities and aura. Scroll or drag its scrollbar when entries do not fit.
- Twelve fixed main slots sit below and wrap in narrow windows. Left-click a candidate, then a slot to place it; click the selected candidate again to deselect. Right-click a slot, or click with no candidate selected, to clear it.
- Bottom color strips still distinguish kinds and states. Stale entries retain their position with a red border and explanatory tooltip until cleared.
- Closing saves automatically. Derived pages follow equipment and contracts and are not edited here. Abilities granted only by the hands remain on their own derived pages.
- A new main layout is empty. Its left-side HUD hides only the empty main page; automatically discovered entries remain visible without a blank gap. Configuring an entry restores the main page, and clearing all slots hides it again. Nothing is assigned automatically; `R` displays a notice when the entire wheel has no entries.

Saturn's client options `wheel.hold`, `wheel.scroll_switch`, and `wheel.wrap_pages` control hold-to-open, scrolling, and page wrapping. All default to enabled.

## Extensions / Customization {#extensions-customization}

Content mods can register sources, kinds, candidates, and additional tooltips. See [Wheel Entries](../java/wheel.md).

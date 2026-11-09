---
sidebar_position: 0
---

# Power Types

A power type determines what a power actually does. Specify it via the `type` field in a Power JSON.

| Category | Description | Page |
|----------|-------------|------|
| Action | Execute actions in response to events | [Action Powers](./action) |
| Modify | Modify game mechanics like attributes, damage, and speed | [Modify Powers](./modify) |
| Prevent | Prevent certain actions like using items or sleeping | [Prevent Powers](./prevent) |
| Regular | Standalone powers like flight, invisibility, phasing, etc. | [Regular Powers](./regular) |

---

## Shared Data Types

Complex types used across multiple powers, actions, and conditions. See **[Shared Data Types](../shared_data_types)** for full details:

- **HudRender** — HUD bar display settings
- **Key** — Key binding settings
- **Modifier** — Mathematical value modifier
- **AttributeEntry** — Attribute modifier entry
- **PositionedItemStack** — Item with optional slot position
- **ColorSettings** — RGBA color configuration

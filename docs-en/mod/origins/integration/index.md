---
sidebar_position: 1
---

# Origins: Integration

Origins: Integration is a **data-driven add-on** for Origins (NeoForge). It
does not add a separate Origin, items, blocks, or a menu. Instead, it registers
additional Origins **action types**, **condition types**, **power types**, and
Puffish Skills **reward types** that let data packs interact with supported
mods.

Modules are discovered at startup and enabled only when every target mod is
installed and falls within any declared inclusive `minVersion` and `maxVersion`
bounds. Omitting both bounds checks only the mod ID.

:::caution Unstable
All integrations listed below are newly implemented and currently unstable. They may
change or behave unexpectedly. Please report any issues you encounter.
:::

## Requirements

- [Origins (NeoForge)](https://www.curseforge.com/minecraft/mc-mods/origins-neoforge)

No companion integration mod is required. Installing a supported mod enables
its corresponding module automatically.

## How to Use These Pages

Each entry below is a type identifier used in Origins data. The heading states
the exact kind of data it is:

- **Entity Action** or **Bi-entity Action**: performs an effect on one entity,
  or on an actor and target pair.
- **Entity Condition** or **Item Condition**: evaluates to true or false.
- **Power**: grants an ongoing ability or behaviour to the power holder.
- **Reward Type**: is used by Puffish Skills rewards rather than directly in an
  Origins power.

Use the identifier as the `type` value in a compatible Origins JSON field. For
example, the Mermod tail power can be declared as:

```json
{
  "type": "origins_integration:tail"
}
```

Actions and conditions are not standalone files: place them in a compatible
action or condition field supplied by an Origins power or another Origins type.

## Integrations

✅ Fully Supported  
🚧 Partly Supported  
🔮 Planned Support  
❌ No Support Planned

| Mod | Integration content | Status |
| --- | --- | :---: |
| [Ars Nouveau](./ars-nouveau) | Entity actions, entity conditions, and powers for mana, spells, and glyphs | ✅ |
| [Cold Sweat](./cold-sweat) | Gameplay compatibility: fire-immune Origins cannot overheat | 🚧 |
| [Create](./create) | Gameplay compatibility: diving equipment supplies air to gilled Origins on land | 🚧 |
| [Curios API](./curios) | Entity actions, entity conditions, and an item condition | ✅ |
| [Eidolon RePraised](./eidolon-repraised) | Entity actions, a bi-entity action, and a power | ✅ |
| [Icarus](./icarus) | Power type for virtual wings | ✅ |
| [Iron's Spells 'n Spellbooks](./irons-spellbooks) | Entity actions, entity conditions, and powers for mana and casting | ✅ |
| [Mermod](./mermod) | Power type for an equipment-free mermaid tail | ✅ |
| [MineTeam](./mine-team) | Bi-entity action | ✅ |
| [More Darkness](./more-darkness) | Gameplay compatibility: Feline night vision is recognized | 🚧 |
| [Puffish Skills](./puffish-skills) | Reward type that grants an Origins power | ✅ |
| [The Twilight Forest](./twilight-forest) | Entity actions for fortification and Ice Queen shields | ✅ |
| [True Darkness Biomes](./true-darkness-biomes) | Gameplay compatibility: Feline night vision is recognized | 🚧 |
| [Wood Walkers](./wood-walkers) | Entity actions and entity conditions for shapes and shape abilities | ✅ |

Select an integration above or use the sidebar to view its registered Origins
data types and fields.

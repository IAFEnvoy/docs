---
title: Checklist Before Report
---

# Checklist Before Report

This is a checklist for you to check before you report bugs or ideas. 

:::danger Important
I'll close issues that don't follow this checklist without any explainations since I don't want to waste my time.
:::

## About Descriptions

- **Use template on GitHub**: Template can help me collect useful information and solve your problems more quickly.
- **No AIGC long-winded discourse**: You can use AI to summarize your issue, but **DO NOT** use AI to generate a long text.

## About Mods Support

**The following mods never support, remove them and test again before report**
- `Optifine`: Or `Optif**k`, is an outdated shader loader and always cause conflicts. Please use `Iris` or `Oculus` instead.
- `Epic Fight` & `Better Combat`: These two mods make massive change to combat system and their code are almost unreadable. I don't want to make any compat with them.
- `REI`: Code and APIs are in a mess.

**The following mods usually have issues on their side, ask them for support first unless you are sure issues are caused by my mods:**
- `owo-lib`: Mods depend on this library usually conflict with each other and print issues from a completely unrelated mod.
- `Moonlight`: This mod usually cause crashes.

## About Minecraft Versions Support

- ✅=Supported
- ❌=No longer supported/Never support
- 🔲=Only lightweight mods support
- 🚧=Will support in the future

| Minecraft Version | Forge | Fabric | NeoForge |
|-------------------|----------|-------|--------|
| 1.19.4- | ❌ | ❌ |  |
| 1.20(.1) | ✅ | ✅ | ✅ |
| 1.20.2~1.20.6 | ❌ | ❌ | ❌ |
| 1.21(.1) | ❌ | 🔲 | ✅ |
| 1.21.2~1.21.11 | ❌ | ❌ | ❌ |
| 26.x | ❌ | 🚧 | 🚧 |

**Extra Note**
- This is only general situation. Please check [ModList Dashboard](https://mods.iafenvoy.com) for detailed mod support information.
- Fell free to ask backport permissions such as port to 1.7.10 or 1.12.2.
- Since Mojang almost rewrite the rendering system between 1.21.1 and 26.1, I need time to learn and support them.

## About Loaders Support

I only make mods on `Forge`, `Fabric` and `NeoForge`. Please check your loader before report.

:::warning Quilt Loader
Quilt Loader isn't in my support list, please use Fabric Loader to recheck before report.
:::

:::warning Hybrid Servers
Hybrid Server usually cause unexpected issues, please use Forge, Fabric or NeoForge to recheck before report.

Known Hybrid Server list:
- `Mohist`
- `Banner/Taiyitist`
- `Silkard`
- `Arclight`
- `CatServer`
- `KCauldron/Thermos`
:::

:::warning PvP Clients
PvP Clients usually make a lot of changes to the game and cause unexpected issues, please use Forge, Fabric or NeoForge to recheck before report.

Known PvP Clients list:
- `Lunar Client`
- `Badlion Client`
- `Labymod`
- `Feather Client`
:::

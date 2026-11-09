---
title: "System"
---

System provides a configurable "system" assistant for Minecraft. Players can query quests and sign-ins and view the shop and lottery by text or voice; notifications and pinned cards are shown on the HUD. AI is used for assisted routing, knowledge Q&A and optional free chat, and local features work in offline mode.

## Applicable versions

| Item | Version covered by this document |
| --- | --- |
| System | 1.0-beta.3 development branch, not yet released |
| Minecraft / Java | 26.1.2 / 25 |
| NeoForge | Development version 26.1.2.114 |
| Required dependencies | Saturn 1.2.6, Jupiter; the client also needs ApricityUI 1.2.9 |
| Optional dependencies | FTB Quests; speech recording can use Simple Voice Chat |

| Version branch | Maintenance | Sync status |
| --- | --- | --- |
| 26.1.2 (master) | Main development branch | Baseline for the features and data formats in this document |
| 1.21.1 | Periodic sync | May lag several versions behind the main branch; features and fields follow the actual version of that branch |

1.21.1 is not updated immediately with every change on the main branch. Check the installed version before using the new features or JSON fields below; do not apply the 26.1.2 dependency versions to 1.21.1.

## Where to start

- Players: [Installation and getting started](./install.md), [Usage and configuration](./guides/usage.md), [Voice input](./guides/asr.md), [Voice narration](./guides/tts.md).
- Server administrators: [AI permissions and modes](./guides/ai-modes.md), [Config files](./config/index.md), [Usage and cost](./guides/usage-statistics.md), [External APIs](./guides/external-apis.md).
- Modpack authors: [Data definitions](./data/index.md), [Module types](./types/module/index.md), [Card templates](./cards/template.md), [Card nodes](./types/node/index.md).
- Mod authors: [Agent and module extension](./development/agent.md), [Registries](./development/registries.md), [Card build events](./cards/overview.md).

Data packs define the system name, available modules, rewards, offers, lottery pools and prompts; resource packs define card layouts, translations and images. Player and business state is handled by the server, and the client only displays snapshots and sends explicit button actions.

[Source code](https://github.com/IAFEnvoy/System-Mod) · [Saturn documentation](../../library/saturn/index.md)

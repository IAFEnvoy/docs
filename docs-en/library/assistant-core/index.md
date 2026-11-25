---
title: Assistant Core
description: Installation, routing, networking, and speech for the NeoForge agent library.
sidebar_position: 0
---

Assistant Core (`assistant_core`) gives Minecraft mods an agent network protocol, local intent matching, model tool calls, task execution, AI access controls, and speech services. The integrating mod supplies gameplay actions, permissions, model configuration, and credentials. Players use these capabilities through the host mod's interface or commands.

| Component | Supported version |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.126 or a newer 26.1.2 build |
| Assistant Core | 1.0-beta.1 |
| Java | 25 |

If a host mod lists Assistant Core as a separate dependency, place its JAR in `mods/` on both the client and server. Psychic bundles Assistant Core through NeoForge Jar-in-Jar.

To build a standalone Assistant Core JAR from source, run `./gradlew build` in the Assistant Core checkout, or `gradlew.bat build` on Windows. The JAR is in `build/libs/`.

- Connect agent networking, models, AI modes, and speech. [Integration guide](./integration.md)
- Register a client text annotation processor and try the demo. [Annotation Processor](./annotation-processor.md)
- Tune TF-IDF synonyms and weights with a data pack. [Routing lexicons](./text-routing.md)
- See how players and pack authors use Psychic. [Psychic](../../mod/psychic/index.md)

[Assistant Core source code](https://github.com/IAFEnvoy/AssistantCore-MC)

---
title: Psychic
description: Awaken tools, weapons, and machines and give them orders through Minecraft chat.
sidebar_position: 0
---

Psychic lets you awaken swords, tools, and machines as companions. A tool can ride on your back, hover nearby, or fly out to work. An awakened furnace can gather supplies, smelt materials, and return its output to a container. You can name multiple companions and address them through Minecraft chat.

| Component | Version |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.129 or a newer 26.1.2 build |
| Psychic | 1.0.0 |
| Assistant Core | 1.0-beta.1, bundled with Psychic |
| Saturn | 1.4-beta.1 |
| Jupiter | 2.4.2 or newer |
| Java | 25 |
| KubeJS | Optional. 26.1.2-8.0.8 for scripting. |

Install the Psychic, Saturn, and Jupiter JARs in `mods/` on the client and server. NeoForge loads Assistant Core from inside the Psychic JAR.

To build from source, run `git submodule update --init --recursive` and then `./gradlew build`. The bundled Psychic JAR is in `build/libs/`.

- Awaken, name, and command your first companion. [Player guide](./play.md)
- Configure material names, local routing, and model fallback. [Chat configuration](./chat.md)
- Add companions and tasks with data packs, resource packs, Java, or KubeJS. [Extension guide](./extensions.md)

[Assistant Core](../../library/assistant-core/index.md) · [Saturn](../../library/saturn/index.md) · [Jupiter](../../library/jupiter/index.md)

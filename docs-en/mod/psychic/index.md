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
| Assistant Core | 1.0-beta.1 |
| Saturn | 1.4-beta.1 |
| Java | 25 |
| KubeJS | Optional. 26.1.2-8.0.8 for scripting. |

Install Psychic, Assistant Core, and Saturn in `mods/` on the client and server. For a source checkout, fetch the dependencies with `git submodule update --init --recursive` and run `./gradlew build`. The Psychic and Assistant Core builds produce separate JARs.

- Awaken, name, and command your first companion. [Player guide](./play.md)
- Configure material names, local routing, and model fallback. [Chat configuration](./chat.md)
- Add companions and tasks with data packs, resource packs, Java, or KubeJS. [Extension guide](./extensions.md)

[Assistant Core](../../library/assistant-core/index.md) · [Saturn](../../library/saturn/index.md)

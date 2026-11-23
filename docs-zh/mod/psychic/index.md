---
title: 万物通灵
description: 在 Minecraft 唤醒工具、武器和机器，通过聊天向伙伴下达指令。
sidebar_position: 0
---

万物通灵（Psychic，暂定译名）让剑、工具和机器通灵成为伙伴。工具可以待在背上、在身旁悬停，或者飞出去工作。通灵熔炉可以从容器取料、烧炼，再把产物送回去。你可以给多个伙伴命名，在 Minecraft 聊天栏里点名下达指令。

| 项目 | 版本 |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.129 或更新的 26.1.2 构建 |
| 万物通灵 | 1.0.0 |
| Assistant Core | 1.0-beta.1 |
| Saturn | 1.4-beta.1 |
| Java | 25 |
| KubeJS | 可选，编写脚本时使用 26.1.2-8.0.8。 |

在客户端和服务端的 `mods/` 安装万物通灵、Assistant Core 和 Saturn。使用源码时，先运行 `git submodule update --init --recursive` 获取依赖，再运行 `./gradlew build`。万物通灵和 Assistant Core 各自产生独立 JAR。

- 唤醒、命名并指挥你的第一个伙伴。[玩家指南](./play.md)
- 配置物资词表、离线路由及 AI 回退。[聊天配置](./chat.md)
- 用数据包、资源包、Java 或 KubeJS 添加伙伴和 Task。[扩展指南](./extensions.md)

[Assistant Core](../../library/assistant-core/index.md) · [Saturn](../../library/saturn/index.md)

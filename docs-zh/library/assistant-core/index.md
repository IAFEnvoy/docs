---
title: Assistant Core
description: NeoForge 智能体开发库的安装、路由、网络和语音接口。
sidebar_position: 0
---

Assistant Core（`assistant_core`）为 Minecraft 模组提供智能体网络协议、本地意图匹配、模型工具调用、任务执行、AI 访问控制和语音服务。集成者提供玩法动作、权限、模型配置和凭据。玩家使用这些功能时，通过宿主模组的界面或指令操作。

| 项目 | 适用版本 |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.126 或更新的 26.1.2 构建 |
| Assistant Core | 1.0-beta.1 |
| Java | 25 |

把 Assistant Core JAR 和宿主模组一起放入客户端和服务端的 `mods/`。从源码构建时，在 Assistant Core 仓库运行 `./gradlew build`，Windows 可用 `gradlew.bat build`。构建产物在 `build/libs/`。以万物通灵为宿主时，使用 Git 子模块固定依赖版本。

- 接入智能体频道、模型、AI 模式和语音。[集成指南](./integration.md)
- 注册客户端文本标注处理器并运行演示。[标注处理器](./annotation-processor.md)
- 用数据包配置 TF-IDF 同义词与权重。[路由词表](./text-routing.md)
- 查看玩家操作和扩展方式。[万物通灵](../../mod/psychic/index.md)

[Assistant Core 源码](https://github.com/IAFEnvoy/AssistantCore-MC)

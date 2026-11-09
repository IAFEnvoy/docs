---
title: "系统"
---

系统为 Minecraft 提供可配置的“系统”助手。玩家可以用文字或语音查询任务、签到、查看商店和抽奖；通知与固定卡片在 HUD 显示。AI 用于辅助路由、知识问答和可选的自由聊天，本地功能可在离线模式使用。

## 适用版本

| 项目 | 本文档对应版本 |
| --- | --- |
| 系统 | 1.0-beta.3 开发分支，尚未发布 |
| Minecraft / Java | 26.1.2 / 25 |
| NeoForge | 开发版本 26.1.2.114 |
| 必装依赖 | Saturn 1.2.6、Jupiter；客户端另需 ApricityUI 1.2.9 |
| 可选依赖 | FTB Quests；语音录音可使用 Simple Voice Chat |

| 版本分支 | 维护方式 | 同步情况 |
| --- | --- | --- |
| 26.1.2（master） | 主开发分支 | 本文档的功能与数据格式基准 |
| 1.21.1 | 定期同步 | 可能落后主分支几个版本，功能与字段以该分支实际版本为准 |

1.21.1 并非随每次主分支修改即时更新。使用下文的新功能或 JSON 字段前，请核对所安装版本；不要直接把 26.1.2 的依赖版本用于 1.21.1。

## 选择入口

- 玩家：[安装与开始](./install.md)、[使用与配置](./guides/usage.md)、[语音输入](./guides/asr.md)、[语音播报](./guides/tts.md)。
- 服务器管理员：[AI 权限与模式](./guides/ai-modes.md)、[配置文件](./config/index.md)、[用量与费用](./guides/usage-statistics.md)、[外部 API](./guides/external-apis.md)。
- 整合包作者：[数据定义](./data/index.md)、[模块类型](./types/module/index.md)、[卡片模板](./cards/template.md)、[卡片节点](./types/node/index.md)。
- 模组作者：[Agent 与模块扩展](./development/agent.md)、[注册表](./development/registries.md)、[卡片构建事件](./cards/overview.md)。

数据包负责系统名称、可用模块、奖励、商品、奖池和提示词；资源包负责卡片布局、翻译与图片。玩家与业务状态由服务端处理，客户端只展示快照及发送明确的按钮操作。

[源代码](https://github.com/IAFEnvoy/System-Mod) · [Saturn 文档](../../library/saturn/index.md)

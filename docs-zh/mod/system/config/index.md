---
title: "配置文件"
sidebar_position: 0
---

所有配置归入 `config/system/`。首次读取时，缺失文件从 JAR 的 `resources/defaults/` 对应默认资源复制；已有文件保留。默认资源在 JAR 内的实际路径为 `/defaults/<文件名>`。

| 文件 | 作用侧 | 用途 |
| --- | --- | --- |
| [`system-agent.json`](./agent.md) | 服务端 | Agent 执行预算 |
| [`system-storage.json`](./storage.md) | 服务端 | 存储容量 |
| [`system-model.json`](./model.md) | 服务端 | 模型接口 |
| [`system-search.json`](./search.md) | 服务端 | 联网搜索接口 |
| [`system-search-pricing.json`](./search-pricing.md) | 服务端 | 联网计费估算 |
| [`system-semantic.json`](./semantic.md) | 服务端 | 本地语义路由 |
| [`system-advancements.json`](./advancements.md) | 服务端 | 成就触发工作流 |
| [`system-speech-pricing.json`](./speech-pricing.md) | 客户端 | 语音计费估算 |
| [`system-client.json`](./client.md) | 客户端 | 界面与常驻卡片 |
| [`system-speech.json`](./speech.md) | 客户端 | 语音合成与播报 |
| [`system-asr.json`](./asr.md) | 客户端 | 语音识别 |

## 修改与保存

客户端设置统一从 `/system settings` 打开，修改生效后自动保存。直接编辑文件时先关闭相关界面，服务端通过资源重载读取配置，客户端在客户端资源重载时读取；需要重建运行时的参数（例如存储预算）仍需重启。`ConfigInstance.set(...)` 自动 markDirty，保存由 tick 合并；不要在 Java 中修改快照后忘记标记。

配置字段主要使用 lenientOptionalFieldOf，单项格式错误按该字段缺省处理，嵌套对象失败也可能整体退回该字段默认值。它不表示非法值已生效，修改后应查看日志并核对设置。

## 配置、数据包与存档的区别

奖励、商品、奖池和系统 / 模块定义放[数据包](../data/index.md)，卡片布局放客户端资源包。AI 默认模式和玩家授权属于当前存档，通过 `/system ai` 管理；玩家数据、对话和数据库放 `<world>/system/`，累计模型用量仍属于世界 SavedData。TTS / ASR 密钥和语音用量保留在客户端，不做服务端汇总。

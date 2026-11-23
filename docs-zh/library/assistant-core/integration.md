---
title: 集成指南
description: 接入智能体频道、注册表、AI 权限与语音服务。
sidebar_position: 1
---

Assistant Core 的 Java API 位于 `com.iafenvoy.assistant`。宿主负责装配工作流、调用权限、提示词、持久化、凭据和界面。

## 注册与传输

使用 `DeferredRegister.create(AssistantResourceKeys.ACTION_TYPE, MOD_ID)` 创建动作 Codec 的注册器，然后把它绑定到宿主模组的事件总线。其他协议类型使用相同的注册方式。由宿主命名空间限定条目 ID。

| 注册表键 | 条目 |
| --- | --- |
| `ACTION_TYPE` | 动作的 `MapCodec` |
| `CREDENTIAL_TYPE` | 凭据的 `MapCodec` |
| `AGENT_REQUEST_TYPE` | 请求的 `StreamCodec` |
| `AGENT_RESPONSE_TYPE` | 响应的 `StreamCodec` |

创建 `AssistantChannel<A>` 时传入宿主命名空间及附件的 `StreamCodec`。在 `RegisterPayloadHandlersEvent` 提供服务端请求处理和错误处理，在客户端的 `RegisterClientPayloadHandlersEvent` 提供响应处理。发送时通过 `request(id, request, attachment)` 附带可选数据，`id` 使用 UUID 字符串。异步请求可使用 `ConnectionSessions` 关联原连接。

## 路由、执行与 AI 模式

| 需求 | API |
| --- | --- |
| 匹配本地意图 | `LexicalIndex`、`IntentRouter`、`SemanticRouter` |
| 组合本地与模型路由 | `HybridRouter` |
| 装配工作流与工具 | `ModuleRegistry`、`ToolRegistry` |
| 执行工具或 ReAct 循环 | `ToolExecutor`、`ReActLoop`、`ReActContext` |
| 接入 OpenAI 兼容端点 | `ModelSettings`、`OpenAiCompatibleClient`、`ModelGateway` |

模型客户端接收宿主提供的端点、模型和 API Key。宿主检查当前玩家可以调用哪些工作流，并校验工具参数与游戏状态。使用 `AiManagementCommands.register` 可以把 AI 管理命令挂到宿主的 Brigadier 命令树。实现其 `Host` 接口以提供权限判断、存储和在线状态更新。可用的会话模式是 `offline`、`standard`、`extended` 和 `free`。

## TTS 与 ASR

| 工厂 | 内置供应商 |
| --- | --- |
| `AssistantServices.TTS` | DeepSeek、阿里云 DashScope |
| `AssistantServices.ASR` | DeepSeek、阿里云 NLS |

用匹配的 `SpeechCredentials` 创建供应商实例，结束后调用 `close()`。宿主负责保存凭据、控制录音和播放、处理结果及记录用量。

客户端可为每次 ASR 会话创建 `RecognitionRecording`，在后台线程调用 `open()`，再把录音交给 ASR 供应商。`finish()` 停止采集并保留缓冲帧，`close()` 取消采集并清空缓冲。安装 Simple Voice Chat 时可复用它选择的输入设备进行独立的 16 kHz PCM 录音，并在录音期间抑制语音聊天发送。未安装 Simple Voice Chat 时使用 Java Sound。

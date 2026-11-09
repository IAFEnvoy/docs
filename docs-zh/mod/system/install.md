---
title: "安装与开始"
sidebar_position: 1
---

安装与 Minecraft 26.1.2 匹配的系统、Saturn、Jupiter，客户端另外安装 ApricityUI。多人游戏中服务端与客户端都需要系统；不要把客户端专用 UI 类加载到独立服务端。

1.21.1 分支定期从主分支同步，可能落后几个版本。安装时选择与 1.21.1 对应的模组及依赖，具体功能以所安装版本为准。

FTB 任务功能需要 FTB Quests、FTB Library 和 FTB Teams。Simple Voice Chat 是可选录音后端，未安装时系统仍可用文字操作。语音合成与识别均为可选功能。

## 初次绑定

管理员在原版聊天栏执行：

```mcfunction
/system grant system:default
/system grant system:default Steve
```

系统 ID 从当前世界的数据包注册表读取并补全。每位玩家目前最多绑定一个系统；绑定另一系统前应先撤销旧绑定。新绑定按“绑定消息 → 新手礼包 → 当前可执行任务”的顺序展示可用提示，重新登录只恢复已有状态。

`/system settings` 可打开统一设置界面；系统对话框内使用 `/settings`。也可以为系统界面切换功能绑定按键，默认未绑定。未绑定时管理指令错误显示在原版聊天栏。

## 文字、语音与 AI

输入框为单行，Enter 发送。先使用 `/help` 查看当前系统启用的功能与补全。发送框左侧可切换离线、标准、扩展、自由模式；服务端要求密钥但未配置时，只允许离线模式。本地命令和本地匹配不需要模型密钥。

服务端在 `config/system/system-model.json` 中配置连接与密钥环境变量名称；默认 DeepSeek，密钥从服务端环境变量读取，不发给玩家。个人 TTS / ASR 凭证和语音用量保存在客户端，不上传服务端汇总。

后续阅读：[使用与配置](./guides/usage.md)、[AI 模式与权限](./guides/ai-modes.md)、[语音设置](./guides/tts.md)。

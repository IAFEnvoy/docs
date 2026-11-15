---
title: "表情状态机"
sidebar_position: 11
---

`system:expression` 在卡片中绘制资源包驱动的表情。默认自由聊天回复在 Markdown 左侧使用此节点；扩展模式的聊天兜底也会显示。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:expression` |
| `profile` | 字符串 | 否 | `system:panda` | 表情定义 ID，支持占位符 |
| `state` | 字符串 | 否 | `{{expression}}` | 初始状态名，支持占位符 |
| `size` | 整数 | 否 | `72` | 方形头像区域的像素尺寸 |

节点共享 [id、style、when、unless、repeat](../../cards/node-common.md)，默认 CSS 类为 `card_expression`。它不是文本节点；正文与朗读内容仍由原来的 Markdown / ChatOutput 提供。

```json
{ "type": "system:expression", "profile": "system:panda", "state": "{{expression}}", "size": 72 }
```

覆盖 `assets/system/cards/chat.json` 可以移动、删除头像或切换定义。资源 ID 不存在时回退到 `system:panda`；状态不存在时使用定义中的 `default_state`。

## 资源定义

定义放入 `assets/<namespace>/expression/<path>.json`，ID 为 `<namespace>:<path>`。PNG 使用原版纹理 ID，位于 `assets/<namespace>/textures/…`。

```json title="assets/example/expression/assistant.json"
{
  "default_state": "neutral",
  "transitions": { "celebrate": "happy", "reset": "neutral" },
  "states": {
    "neutral": {
      "texture": "example:textures/assistant/neutral.png",
      "speaking": [
        "example:textures/assistant/neutral_up_left.png",
        "example:textures/assistant/neutral_down_right.png"
      ],
      "frame_time": 180
    },
    "happy": {
      "texture": "example:textures/assistant/happy.png",
      "duration": 3000,
      "next": "neutral",
      "transitions": { "calm_down": "neutral" }
    }
  }
}
```

| 定义字段 | 类型 | 必填 / 默认值 | 说明 |
| --- | --- | --- | --- |
| `default_state` | string | `neutral` | 必须存在于 states，作为回退状态 |
| `states` | object | 必填 | 自定义状态名 → 状态定义 |
| `transitions` | object | `{}` | 全局事件名 → 目标状态 |

| 状态字段 | 类型 | 必填 / 默认值 | 说明 |
| --- | --- | --- | --- |
| `texture` | Identifier | 必填 | 静止贴图 |
| `speaking` | Identifier[] | `[]` | 说话帧，空时保持静止；可多于两帧 |
| `frame_time` | int | `180` | 每帧毫秒数，运行时至少 1ms |
| `duration` | int | `0` | 大于 0 时启用定时跳转，单位 ms |
| `next` | string | `""` | 定时目标；空时回 default_state |
| `transitions` | object | `{}` | 当前状态的事件映射，优先于全局映射 |

事件优先查当前状态、再查全局、最后尝试同名状态。自动播音发送 `speech_started` / `speech_finished`；省略这两个事件时只切换说话帧，保留情绪。客户端资源重载会重新读取定义和纹理，坏的高优先级定义尝试下层资源包并记录异常。默认状态、跳转目标及引用的纹理必须存在。

## AI 与播报

服务端最终回答为 `{"text":"…","expression":"happy"}`，ReAct 最终步骤另有 `"type":"answer"`；expression 可省略，默认 neutral。内置提示词建议 neutral、happy、sad、angry、surprised、confused、shy、smug、thinking、laughing；自定义状态名可通过[提示词 TXT](../../data/prompt.md)补充，不需要修改 Java。

默认提供 36 张熊猫头，每种有静止及左上 / 右下轻微偏移的两帧，108 张透明 PNG 合计约 394 KiB。各帧保持相同画布，切换不改变布局。状态机逐卡片独立保存，历史恢复静止表情；不向服务端上传资源包，也不增加模型调用。

实际 TTS 播放时才循环当前消息的说话帧。语音合成加载、提示音、暂停、取消、失败和其他消息的播放不启动本卡片动作，结束后显示原情绪静止帧。动画仅重绘纹理，不逐帧修改 CSS 或重新布局。编辑器提供静止帧预览，游戏中的播报和事件不在浏览器执行。

## Java 扩展

服务端可构造 `new ChatOutput("你好", "happy")`，或按原有卡片 REPLACE 协议更新。客户端 [CardBuildEvent](../../cards/overview.md) 可通过 `builder().put("expression", "smug")` 修改初始状态。

已渲染的卡片可以在客户端主线程控制；以下类位于 `com.iafenvoy.system.screen.expression`，cardId 为 CardReference 的 UUID：

```java
AssistantExpressions.control(cardId, machine -> machine.setState("happy"));
AssistantExpressions.control(cardId, machine -> machine.signal("celebrate"));
AssistantExpressions.control(cardId, machine -> machine.setSpeaking(true));
AssistantExpressions.control(cardId, machine -> machine.setSpeaking(null)); // Resume automatic speech tracking.
AssistantExpressions.control(cardId, ExpressionStateMachine::reset);
```

接口只操作仍被界面持有的状态机，不为未渲染消息排队；要在渲染前或持久化后生效时修改 CardData / CardBuilder。管理器使用弱引用，断开连接时清空。状态名只控制展示，不授权工具或游戏操作。

---
title: "界面与常驻卡片"
sidebar_position: 9
---

文件：`config/system/system-client.json`。作用侧：**客户端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `simpleMode` | 布尔值 | 否 | `false` | 启用简约模式。 |
| `theme` | 字符串 | 否 | `"t09-arwes-transparent"` | AUI 主题 ID，所有系统页面共享。 |
| `cardAnimations` | 布尔值 | 否 | `true` | 常驻卡片出入动画开关。 |
| `cardsOnOtherScreens` | 布尔值 | 否 | `false` | 在其他允许的游戏内页面展示常驻卡片，暂停 / 设置页面遵从界面策略。 |

## 随附默认文件

```json title="config/system/system-client.json"
{
  "simpleMode": false,
  "theme": "t09-arwes-transparent",
  "cardAnimations": true,
  "cardsOnOtherScreens": false
}
```

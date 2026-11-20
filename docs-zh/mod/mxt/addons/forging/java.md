---
title: Java 与网络
---

## 界面

锻造台页面位于 `assets/apricityui/apricity/mxt_forging/forging/`，使用 ApricityUI，与本体共享 `assets/apricityui/apricity/mxt/common/theme.css`。槽位由菜单绑定，客户端页面只展示会话状态并发出操作意图。

## 操作请求

`ForgingActionC2SPayload` 请求开始、锻打、完成或取消。服务端解析当前工作站与会话后执行；不要把客户端显示的数值当作结算结果。扩展监听见 [KubeJS 事件](./kubejs.md)。

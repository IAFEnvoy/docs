---
title: CaptureListener
---

# CaptureListener

<span id="capturelistener" />

该接口提供捕捉与释放通知。捕捉资格由物品决定，包括可容纳的实体、契约要求与消耗；例如灵兽袋仅容纳玩家已契约的灵兽，每次一只。接口提供两个可选钩子：

| 成员 | 说明 |
| --- | --- |
| `void onCaptured(@Nullable Player captor)` | 被收走之后、实体离开世界之前。 |
| `void onReleased(@Nullable Player captor)` | 重新回到世界之后。 |

两个都有默认空实现：**不实现它也照样能被捕捉**，只是收不到这两次通知；`captor` 在不是玩家动手时为空。

捕捉本身的状态不在这个接口里：妖宠记在物品自己的组件上，接口只负责"告诉这只生物"。契约资格见 [Contractable](./contractable.md)。

---
title: KubeJS 事件
---

安装本附属与 KubeJS 后，在服务器脚本中订阅 `AlchemyWorkstationsEvents.process`。包装提供 `getPhase()`、`getEvent()`、`isCancellable()`，取消使用 `event.cancel()`。

| 事件 | 阶段 | 原生事件语义 |
| --- | --- | --- |
| `AlchemyWorkstationsEvents.process` | `Pre`、`Post` | 两端都有 `getRecipe()`（`RecipeHolder<AlchemyRecipe>`，自动解析后冻进批次的身份，不是玩家选择）、`getPos()`、`getOperator()`（UUID）。`Pre.getPlayer()` 一定有开炉的人，`Pre.getInputs()` 是不可变 `InputCopy` 列表，每项是 `role()`（`MAIN` / `AUXILIARY` / `CATALYST`）与 `stack()` 副本；改副本或改这份列表**不改账**，取消不扣料，改**真实库存**则拒绝开炉（原因是 `CANCELLED`）且**不还原库存**。`Post.getPlayer()` 在原操作者离线时为空，`Post.isSuccess()`、`Post.getReason()`（成功时为空）、`Post.getOutputs()` 是产物快照。结算先清待输出与会话，再在重入守卫内跑方块动作与原操作者的玩家动作、判完成，退出守卫后才发 `Post`，所以回调可以在仍有效的丹炉上启动下一批；`Post` 不改写出货格。 |

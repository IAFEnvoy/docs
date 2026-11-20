---
title: 炼丹扩展 API
---

## 炼丹 {#alchemy}

### `AlchemyWorkstationService` {#alchemyworkstationservice}

包 `com.iafenvoy.mxt.alchemy.runtime.alchemy`。丹炉的**唯一受理点**：预览、开炉、终止与每刻推进都在这里，方块实体只回答状态（见 [AlchemyWorkstation](./alchemy-workstation.md)）。

| 方法 | 作用 | 备注 |
| --- | --- | --- |
| `start(ServerPlayer player, AlchemyWorkstation station)` | 开一炉 | 返回 `StartResult(started, failure, qualityFailure)`。整条判定链跑完才扣料：结构、炉型、品质、投料摆放与容量、温度够不够得到、环境灵气、产物仓装不装得下；被 `alchemyCraft` 的 `Pre` 取消、或监听器改动了真实库存，都给 `CANCELLED` 且**不还原库存**。 |
| `preview(ServerPlayer player, AlchemyWorkstation station)` | 预览同一套判定，**不接收所选配方** | 返回 `AlchemyPreview(mixture, candidates, resolvedRecipe, blocker, parameters, qualityFailure, successOutputs, failureOutputs)`；开炉走的就是同一份 `parameters`，所以预览与实跑不会给出两个答案。 |
| `abort(ServerLevel level, BlockPos pos, AlchemyWorkstation station)` / `abort(..., AlchemyFailure reason)` | 终止活动批次 | 按失败结算一次，已投入的材料不返还；已经 `READY` 或已经结算过的批次不再结算第二次。 |
| `furnaceDefinition(Provider access, ItemStack stack)` | 由一件炉体解析炉型规格 | 堆是空的、没有组件、组件里的 id 为空、或那条定义不在注册表里，都给空。 |
| `tick(ServerLevel level, BlockPos pos, AlchemyWorkstation station)` | 每刻推进一次 | 由核心方块实体自己的服务端 tick 调；推炉温、进出阶段、生成待产出与结算都在这里。 |

结果类型：`StartResult`、`AlchemyPreview`、`Parameters`（开炉时求值一次、冻结进批次的配方向量），以及 `enum AlchemyFailure {FURNACE_QUALITY, QUALITY_CONDITIONS, BINDING_CONDITIONS, UNBOUND, MAX_USES, COOLDOWN, NO_FURNACE, STRUCTURE, ACTIVE, CAPACITY, SLOTS, ZERO_POWER, NOT_HERB, INSUFFICIENT, CONFLICT, IMBALANCE, AMBIGUOUS, TEMPERATURE, ENVIRONMENT, INVALID_FORMULA, OUTPUT_CAPACITY, CANCELLED, DISABLED}`（23 个）。

要点：

- **温度与产物不是外部写进去的**：`Parameters` 在开炉那一刻求值一次并冻结，活动批次读的是这份冻结值，`/reload` 之后新批次才读新配方。
- **`start` 与 `preview` 共用同一条判定**：温度与产物容量只在"接受还是拒绝已经选出的那一条"这一步参与，不会让判定改选一条更弱的配方。
- **供热方块回答两个数**，见 [AlchemyHeatSource](../../../java/interfaces/alchemy/alchemy-heat-source.md)。

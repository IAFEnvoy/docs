---
title: 锻造组件
---

### 锻造 {#锻造}

| 组件 id | 载荷 | 作用 |
| --- | --- | --- |
| `mxt_forging:forging_result` | `ForgingResultComponent`（`blueprint`、`final_value`、`actual_steps`、`optimal_steps`、`extra_steps`） | 一次**成功的**锻造会话留下的记录：按哪份蓝图、最终值、实走步数与最短步数。构造器要求 `actual_steps - optimal_steps == extra_steps`。**不含档位**——会话定下的档写进 `mxt:quality`，所以 `/quality clear` 会把它一起清掉。 |
| `mxt_forging:forging_methods` | `List<Holder<ForgingMethod>>` | 这一堆**当工具用时**能执行的锻造手法。逐条容错（坏条目打日志后丢弃），与定义里的手法取并集。 |
| `mxt_forging:forging_blueprints` | `List<Holder<ForgingBlueprint>>` | 这一堆携带的锻造蓝图，与定义取并集；同样是逐条容错的列表。 |

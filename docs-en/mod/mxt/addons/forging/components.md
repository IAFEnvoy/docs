---
title: Forging Components
---

### Forging {#forging}

| Component id | Payload | What it does |
| --- | --- | --- |
| `mxt_forging:forging_result` | `ForgingResultComponent` (`blueprint`, `final_value`, `actual_steps`, `optimal_steps`, `extra_steps`) | What a **successful** forging session did: which blueprint, the final value, the steps actually taken and the shortest solution. The constructor requires `actual_steps - optimal_steps == extra_steps`. It holds **no tier** - the tier the session settled on goes to `mxt:quality`, so `/quality clear` takes that with it. |
| `mxt_forging:forging_methods` | `List<Holder<ForgingMethod>>` | Methods this stack can run **when used as a tool**. Decoded tolerantly (a bad entry is logged and dropped), unioned with the definition's. |
| `mxt_forging:forging_blueprints` | `List<Holder<ForgingBlueprint>>` | Blueprints this stack carries, unioned with the definition's; a tolerantly decoded list as well. |

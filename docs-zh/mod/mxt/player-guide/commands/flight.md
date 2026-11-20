---
title: /flight
---

# `/flight`

<span id="flight" />

<div className="cmd-tree">

- `/flight fill`

  向当前玩家所骑飞行器的全部空座位放置僵尸，需要 gamemaster 权限。

</div>

测试僵尸禁用 AI、不会自然消失，并装备不可损坏的铁头盔以避免日照燃烧。其位置由载具的 `seat_offsets` 决定，可用于校准座位；修改定义并执行 `/reload` 后会更新位置。飞行结束、玩家离线或碰撞终止飞行时，测试实体一并移除。未处于飞行状态或座位已满时，命令返回原因提示。

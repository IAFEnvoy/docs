---
title: 雷云实体
description: 使用 mxt:storm_cloud 预览可独立调色的雷云与电弧。
---

用 `/summon mxt:storm_cloud` 可以在指定位置生成一朵旋转雷云。召唤坐标是云体中心，外观和寿命写在 `cloud` 对象里。电弧只提供视觉效果。

客户端通过原版实体追踪接收雷云。基础追踪范围为水平 24 个区块，实际可见距离受服务端视距、客户端视距和实体追踪设置限制。雷云使用世界时间计算剩余寿命，后来进入范围的玩家会从当前动画进度开始观看。

```mcfunction
/summon mxt:storm_cloud ~ ~9 ~12
/summon mxt:storm_cloud ~ ~10 ~15 {cloud:{cloud_color:"#FF41345C",lightning_color:"#FFFFBB55",radius:16.0f,lifetime:300}}
```

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `cloud_color` | `"#FF584D82"` | 云层颜色，格式为 `#AARRGGBB`。 |
| `lightning_color` | `"#FFC2CDFF"` | 电弧颜色，格式为 `#AARRGGBB`。 |
| `radius` | `16.0` | 水平半径，范围为 0.5 至 256 格。 |
| `thickness` | `6.0` | 垂直包围盒的总高度，范围为 0.25 至 32 格。 |
| `lifetime` | `160` | 寿命，范围为 1 至 1200 刻，含成形和消散。 |

将某个颜色的 Alpha 设为 `00` 可以隐藏对应部分。例如 `lightning_color:"#00FFFFFF"` 会保留云层并隐藏闪电。

## 跟随实体

将实体 UUID 写入雷云顶层的 `owner` 字段，即可让雷云缓慢跟随该实体的 XZ 坐标，并保持原来的高度。绑定会随雷云保存。owner 离开维度、卸载或死亡时，雷云停在当前位置。同一 UUID 的实体回到该维度后，仍在存续的雷云会继续跟随。

在聊天栏依次执行以下命令，可召唤一朵雷云并将附近最近的一朵绑定到自己。

```mcfunction
/summon mxt:storm_cloud ~ ~10 ~ {cloud:{lifetime:600}}
/data modify entity @e[type=mxt:storm_cloud,sort=nearest,limit=1] owner set from entity @s UUID
```

已知 UUID 时，也可以用 `{owner:"实体的 UUID"}` 随 `/summon` 传入。用 `/data remove entity @e[type=mxt:storm_cloud,sort=nearest,limit=1] owner` 可解除绑定。

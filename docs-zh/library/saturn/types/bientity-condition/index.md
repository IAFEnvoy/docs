---
title: "双实体条件"
sidebar_position: 0
---

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

| 类型 | 用途 |
| --- | --- |
| [`saturn:always`](./always.md) | 条件始终为真。 |
| [`saturn:never`](./never.md) | 条件始终为假。 |
| [`saturn:and`](./and.md) | 所有子条件都成立时才匹配。 |
| [`saturn:or`](./or.md) | 任一子条件成立即匹配。 |
| [`saturn:not`](./not.md) | 反转子条件的匹配结果。 |
| [`saturn:chance`](./chance.md) | 按指定概率决定是否命中。 |
| [`saturn:actor_condition`](./actor_condition.md) | 让 actor 接受实体条件检查。 |
| [`saturn:target_condition`](./target_condition.md) | 让 target 接受实体条件检查。 |
| [`saturn:both`](./both.md) | 对 actor 与 target 检查同一实体条件，二者都成立才匹配。 |
| [`saturn:either`](./either.md) | 对 actor 与 target 检查同一实体条件，至少一方成立即匹配。 |
| [`saturn:mutual`](./mutual.md) | 原顺序和交换 actor、target 后的双实体条件都须成立。 |
| [`saturn:undirected`](./undirected.md) | 原顺序或交换 actor、target 后有一次匹配即可。 |
| [`saturn:js`](./js.md) | 调用由 KubeJS 注册的回调，并传入 params 参数。 |
| [`saturn:distance`](./distance.md) | 检查 actor 与 target 的距离是否在上限内。 |
| [`saturn:team`](./team.md) | 读取或检查实体的计分板队伍。 |
| [`saturn:relation`](./relation.md) | 检查 actor 与 target 是否互为同盟。 |
| [`saturn:can_see`](./can_see.md) | 通过方块和流体射线检查双方之间的视线。 |
| [`saturn:riding_recursive`](./riding_recursive.md) | 检查多层骑乘关系。 |
| [`saturn:same_team`](./same_team.md) | 检查 actor 与 target 是否位于同一队伍。 |
| [`saturn:relative_rotation`](./relative_rotation.md) | 比较 actor 与 target 在指定轴上的旋转差。 |

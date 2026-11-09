---
title: "数据定义"
sidebar_position: 0
---

系统的玩法数据由服务端数据包定义，客户端卡片布局由资源包定义。客户端不能决定价格、奖品、权重和可操作状态。

| 定义 | 文件路径 | 生效时机 |
| --- | --- | --- |
| [系统](./system.md) | `data/<namespace>/system/system/<path>.json` | 重开世界或重启服务端 |
| [模块](./module.md) | `data/<namespace>/system/system_module/<path>.json` | 重开世界或重启服务端 |
| [签到奖励](./signin-reward.md) | `data/<namespace>/system/signin_rewards/<path>.json` | 重开世界或重启服务端 |
| [商城商品](./shop-offer.md) | `data/<namespace>/system/shop_offers/<path>.json` | 重开世界或重启服务端 |
| [抽奖奖池](./lottery-pool.md) | `data/<namespace>/system/lottery_pools/<path>.json` | 重开世界或重启服务端 |
| [提示词](./prompt.md) | `data/<namespace>/system/prompts/<path>.txt` | 新请求使用 `/reload` 后的版本 |
| [卡片模板](../cards/template.md) | `assets/<namespace>/cards/<path>.json` | 客户端资源重载 |

例如 `data/example/system/system/daily.json` 定义系统 `example:daily`。路径中的第一个 `system` 是注册表命名空间，第二个 `system` 是注册表路径；不要省略其中一级。

系统与模块使用同步数据包注册表，三张奖励目录只在服务端加载。原版 tag 可经资源重载更新，定义对象本身不做热替换。可选 FTB 模块不会自动写入所有服务器都必须解析的默认定义。

---
title: "数据定义"
sidebar_position: 0
---

系统的玩法数据由服务端数据包定义，客户端卡片布局由资源包定义。客户端不能决定价格、奖品、权重和可操作状态。

| 定义 | 文件路径 | 生效时机 |
| --- | --- | --- |
| [系统](./system.md) | `data/<namespace>/system/system/<path>.json` | 重开世界或重启服务端 |
| [模块](./module.md) | `data/<namespace>/system/system_module/<path>.json` | 重开世界或重启服务端 |
| [签到奖励](./signin-reward.md) | `data/<namespace>/system/signin_reward/<path>.json` | 重开世界或重启服务端 |
| [商城商品](./shop-offer.md) | `data/<namespace>/system/shop_offer/<path>.json` | 重开世界或重启服务端 |
| [抽奖奖池](./lottery-pool.md) | `data/<namespace>/system/lottery_pool/<path>.json` | 重开世界或重启服务端 |
| [币种](./currency.md) | `data/<namespace>/system/currency/<path>.json` | 重开世界或重启服务端 |
| [在线作业](./online-job.md) | `data/<namespace>/system/online_job/<path>.json` | 重开世界或重启服务端 |
| [提示词](./prompt.md) | `data/<namespace>/system/prompt/<path>.txt` | 新请求使用 `/reload` 后的版本 |
| [卡片模板](../cards/template.md) | `assets/<namespace>/cards/<path>.json` | 客户端资源重载 |

例如 `data/example/system/system/daily.json` 定义系统 `example:daily`。路径中的第一个 `system` 是注册表命名空间，第二个 `system` 是注册表路径；不要省略其中一级。

系统、模块与币种元数据使用同步数据包注册表；签到奖励、商品、奖池和在线作业只在服务端加载。玩家钱包余额不随币种注册表广播。原版 tag 可经资源重载更新，定义对象本身不做热替换。可选 FTB 模块不会自动写入所有服务器都必须解析的默认定义。

## 文本与翻译 {#translated-text}

币种的 `name` / `description`、在线作业的 `label` / `description`、签到奖励、商品、奖池与奖品快照的 `label` 均支持直接填写翻译键字符串。无需再包装 `translate` 对象；翻译键未定义时显示原字符串。系统定义的 `name` / `description` 也直接填写翻译键。

```json
{
  "label": "example.reward.mining"
}
```

客户端资源包需提供对应语言文件，例如：

```json title="assets/example/lang/zh_cn.json"
{
  "example.reward.mining": "采矿补给",
  "example.offer.torches": "火把补给",
  "example.pool.supplies": "日常补给",
  "example.reward.food": "口粮",
  "example.reward.diamond": "钻石",
  "example.job.wood": "林地采集",
  "example.job.wood.description": "在线等待以获得木材。"
}
```

`en_us.json` 使用相同的键提供英文翻译。服务端数据包只同步翻译键，不会把语言文件发给客户端。确需字面文字或富文本时可填写原版文本组件对象，如 `{"text":"火把补给"}`；上述字符串约定不改变卡片节点的 `text` / `translate` 字段语义。

## 命名约定

注册表名、定义目录和对应 tag 目录使用单数：`currency`、`online_job`、`signin_reward`、`shop_offer`、`lottery_pool`。旧复数目录不再作为入口。提示词目录同样为 `system/prompt`，但它是 TXT 重载入口，不是数据包注册表。模块类型 `system:online_jobs` 以及模块的 `rewards`、`offers`、`pools`、`jobs` 等集合字段保持原名。

---
title: "安装与基础约定"
sidebar_position: 1
---

安装与 Minecraft 26.1.2 匹配的 NeoForge 和 Saturn JAR。依赖 Saturn 的玩法模组通常需要客户端与服务端同时安装。Saturn 的 exp4j 公式库已经包含在 JAR 内，不必另装；KubeJS 可选。

## 定义文件与类型对象

Saturn 有两种注册表：

| 种类 | 如何扩展 | 示例 |
| --- | --- | --- |
| 数据包注册表 | 放入 JSON 文件，文件路径决定条目 ID | `data/example/saturn/resource/mana.json` 定义 `example:mana` |
| Java 类型注册表 | 模组注册 MapCodec，JSON 用 `type` 选择 | `{"type":"saturn:heal","amount":4}` 是一个动作值 |

不能创建 `data/example/saturn/entity_action_type/heal.json` 来新增动作实现。动作、条件、费用、取值器等嵌在各自宿主字段中；独立定义的目录见[数据定义](./data/index.md)。

`example:mana` 的命名空间是 `example`、路径是 `mana`；嵌套路径可写 `example:magic/mana`。资源 ID 使用小写字母、数字和原版允许的路径字符。

## 数据包与资源包

数据定义放入世界数据包，图标、GUI 贴图和翻译放入客户端资源包。语言文件示例路径为 `assets/example/lang/zh_cn.json`。原生动态注册表条目在加载世界时构建，修改资源、技能、规则、信息行或分组后需要重开世界或重启服务端；不要把 `/reload` 当作任意动态注册表的热更新。

类型页中的 JSON 是字段值示例。若引用 `example:mana`、`example:heal` 等 ID，需要先创建对应定义。实体条件与原版 advancement 谓词的 JSON 格式不同，应按字段表填写。

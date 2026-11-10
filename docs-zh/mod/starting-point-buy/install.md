---
title: 安装
description: 安装开局加点界面、Saturn 和开局方案数据包。
sidebar_position: 1
---

本文适用于 Minecraft 26.1.2、NeoForge 26.1.2.126、Java 25 上的开局加点界面 1.0.0 当前实现，依赖 Saturn 1.3。

## 安装模组与方案

1. 在客户端和服务端安装对应 Minecraft 版本的 NeoForge。
2. 将开局加点界面和 Saturn 的 JAR 放入两端的 `mods/`。单人游戏只需在本地实例安装。
3. 在创建世界前启用整合包的方案数据包；已有世界可在退出世界或关闭服务器后，将数据包放入 `<世界目录>/datapacks/`。
4. 重新进入世界或启动服务器，运行 `/spb open <方案ID>`，例如 `/spb open example:first_start`。

正式模组不附带可直接选择的方案。没有数据包时，不会自动出现职业选择，也不会自动产生点数。可以先安装[完整示例](./datapack/example.md)，或按[入门教程](./datapack/index.md)创建自己的方案。

`activation.on_first_join` 为 `true` 的方案会自动向尚未完成该方案的玩家提供界面；默认为 `false`。没有当前会话时，`/spb open` 省略 ID 会尝试选择符合自动开启条件的方案。只配置手动方案时应填写完整 ID。

## 数据包和资源包

| 内容 | 位置 | 安装方 |
| --- | --- | --- |
| Plan、Group、Option、Saturn resource/ability | 世界数据包的 `data/` | 服务端；单人游戏为本地世界 |
| 翻译、物品以外的界面图标纹理 | 资源包的 `assets/` | 客户端 |

数据包 ZIP 的顶层应直接包含 `pack.mcmeta` 和 `data/`。模组定义的 `example:profession` 对应 `data/example/spb/group/profession.json`；它不是语言文件中的翻译键。

## 修改何时生效

方案使用数据包注册表。修改定义后需要重进世界或重启服务器；不要用 `/reload` 代替重新加载注册表。

加载时会检查 JSON 字段、资源和能力引用、组和选项引用、tag、变量作用域及自动别名冲突。任意定义错误都会使数据包注册表加载失败，阻止打开存档。按日志中报告的定义 ID 和字段路径修复后再启动。

定义变化可能使未提交草稿需要刷新。[刷新](./usage.md#refresh)会重新读取当前真实资源并捕获输入，不会重新发放 `initial`。

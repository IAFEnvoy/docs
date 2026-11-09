---
title: 创建配置
sidebar_position: 3
---

# 创建配置

## 创建配置类

```java reference
https://github.com/IAFEnvoy/Jupiter/blob/main/src/main/java/com/iafenvoy/jupiter/test/TestConfig.java
```

:::tip

Jupiter 支持所有基础条目类型，例如 `int`、`List<String>` 等。你可以在 `com.iafenvoy.jupiter.config.entry` 包中找到它们。

如果你想为自己的自定义对象添加新的条目，请参阅[创建新的条目类型](create_entry_type)。

:::

## 注册配置
- `ConfigManager.registerConfigHandler`：注册一个通用配置。
- `ConfigManager.registerServerConfig`：注册一个带 `PermissionChecker` 的服务端配置。
- `ConfigManager.registerServerConfigHandler`：上述两个方法的组合。

:::warning

你无法从 `ConfigManager` 中获取已注册的配置。因此建议在配置类中创建一个 `INSTANCE` 字段。

:::

## 示例

### `FileConfigContainer`

```java reference
https://github.com/IAFEnvoy/IceAndFire-CE/blob/master/common/src/main/java/com/iafenvoy/iceandfire/config/IafClientConfig.java
```

### `AutoInitConfigContainer`

```java reference
https://github.com/CodeOfArdonia/TooltipsReforged/blob/master/common/src/main/java/com/iafenvoy/tooltipsreforged/config/TooltipReforgedConfig.java
```

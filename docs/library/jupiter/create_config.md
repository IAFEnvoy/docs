---
title: Creating a Config
sidebar_position: 3
---

# Create a Config

## Create Config Class

```java reference
https://github.com/IAFEnvoy/Jupiter/blob/main/src/main/java/com/iafenvoy/jupiter/test/TestConfig.java
```

:::tip

Jupiter support all basic entry types such as `int`, `List<String>` and so on. You can find in `com.iafenvoy.jupiter.config.entry` package.

If you want to add a new entry for your custom object, see [Creating a New Entry Type](create_entry_type).

:::

## Register Config
- `ConfigManager.registerConfigHandler`: Register a common config.
- `ConfigManager.registerServerConfig`: Register a server config with `PermissionChecker`.
- `ConfigManager.registerServerConfigHandler`: A combination of 2 methods above.

:::warning

You cannot get your registered config from `ConfigManager`. So it is recommended to create an `INSTANCE` field in config class.

:::

## Examples

### `FileConfigContainer`

```java reference
https://github.com/IAFEnvoy/IceAndFire-CE/blob/master/common/src/main/java/com/iafenvoy/iceandfire/config/IafClientConfig.java
```

### `AutoInitConfigContainer`

```java reference
https://github.com/CodeOfArdonia/TooltipsReforged/blob/master/common/src/main/java/com/iafenvoy/tooltipsreforged/config/TooltipReforgedConfig.java
```
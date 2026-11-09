---
sidebar_position: 1
---

# 搭建 NeoForge 扩展开发环境

本指南说明如何创建一个依赖 Origins 的 NeoForge 模组。

## 前置条件 {#prerequisites}

- Java 21 JDK
- 一个 IDE（推荐 IntelliJ IDEA）
- 基本熟悉 NeoForge 模组开发

如果你从未开发过 NeoForge 模组，请先通读 [NeoForge 文档](https://docs.neoforged.net/)。

## 第 1 步 — 生成项目 {#step-1-generate-the-project}

使用官方 [NeoForge Mod Generator](https://neoforged.net/mod-generator/) 为项目生成脚手架：

1. 在浏览器中打开 **https://neoforged.net/mod-generator/**。
2. 选择你要针对的 Minecraft 版本。
3. 填写模组的元数据（mod ID、group、版本）。
4. 点击 **Generate** 下载 ZIP。
5. 解压 ZIP，并在 IntelliJ IDEA 中打开该文件夹。

生成器会产出一个可正常工作的 NeoForge 模组项目，Gradle 配置正确——无需手动编辑 `build.gradle`。在继续之前，先运行一次 `gradlew runClient` 验证一切正常。

## 第 2 步 — 添加 Origins 依赖 {#step-2-add-origins-as-a-dependency}

Origins (NeoForge) 可在 [CurseForge](https://www.curseforge.com/minecraft/mc-mods/origins-neoforge) 获取。若要通过 CurseMaven 依赖它，请在 `build.gradle` 中添加仓库和依赖：

```gradle
repositories {
    maven { url = "https://cursemaven.com" }
}

dependencies {
    implementation "curse.maven:origins-neoforge-PROJECT_ID:FILE_ID"
}
```

将 `PROJECT_ID` 和 `FILE_ID` 替换为 CurseForge 文件页面上显示的数字。

## 第 3 步 — 验证 {#step-3-verify}

刷新 Gradle（`gradlew --refresh-dependencies`）并运行 `gradlew runClient`。进入一个世界——如果出现起源选择界面，说明 Origins 已加载，你的开发环境已就绪。

## 第 4 步 — 使用 Origins API {#step-4-using-origins-apis}

主包是 `com.iafenvoy.origins`。扩展开发的关键类：

| 类 | 用途 |
|-------|---------|
| `OriginDataHolder` | 读写实体上的起源/能力数据 |
| `OriginsRegistries` | 访问内置和动态注册表 |
| `PowerRegistries` | 注册自定义能力类型 |
| `ConditionRegistries` | 注册自定义条件类型 |
| `ActionRegistries` | 注册自定义动作类型 |

自定义能力类型继承 `com.iafenvoy.origins.data.power.Power`，并提供 `MapCodec` 用于 JSON 反序列化。通过相应的 `DeferredRegister`、使用各注册表类中的注册表键来注册它们。

示例请浏览 `com.iafenvoy.origins.data.power.builtin` 下的内置能力实现。

下一步：查看[架构概览](architecture)了解项目结构和设计模式。

---
sidebar_position: 1
---

# Setting Up a NeoForge Add-on Workspace

This guide explains how to create a NeoForge mod that depends on Origins.

## Prerequisites

- Java 21 JDK
- An IDE (IntelliJ IDEA recommended)
- Basic familiarity with NeoForge mod development

If you've never made a NeoForge mod before, work through the [NeoForge documentation](https://docs.neoforged.net/) first.

## Step 1 — Generate the Project

Use the official [NeoForge Mod Generator](https://neoforged.net/mod-generator/) to scaffold your project:

1. Open **https://neoforged.net/mod-generator/** in your browser.
2. Select the Minecraft version you're targeting.
3. Fill in your mod's metadata (mod ID, group, version).
4. Click **Generate** and download the ZIP.
5. Extract the ZIP and open the folder in IntelliJ IDEA.

The generator produces a fully working NeoForge mod project with the correct Gradle setup — no manual `build.gradle` editing needed. Run `gradlew runClient` once to verify everything works before proceeding.

## Step 2 — Add Origins as a Dependency

Origins (NeoForge) is available via **CourseForge** and **Modrinth**. Add the repository and dependency to your `build.gradle`:

```gradle
repositories {
    maven { url = "https://api.modrinth.com/maven" }
}

dependencies {
    implementation "maven.modrinth:origins-neoforge:VERSION"
}
```

Replace `VERSION` with the version you're targeting. Check [Modrinth](https://modrinth.com/mod/origins-neoforge/versions) for the latest.

## Step 3 — Verify

Refresh Gradle (`gradlew --refresh-dependencies`) and run `gradlew runClient`. Join a world — if the origin selection screen appears, Origins is loaded and your workspace is ready.

## Step 4 — Using Origins APIs

The main package is `com.iafenvoy.origins`. Key classes for add-on development:

| Class | Purpose |
|-------|---------|
| `OriginDataHolder` | Read/write origin/power data on entities |
| `OriginsRegistries` | Access built-in and dynamic registries |
| `PowerRegistries` | Register custom power types |
| `ConditionRegistries` | Register custom condition types |
| `ActionRegistries` | Register custom action types |

Custom power types extend `com.iafenvoy.origins.data.power.Power` and provide a `MapCodec` for JSON deserialization. Register them through the appropriate `DeferredRegister` using the registry keys in the registries classes.

For examples, browse the built-in power implementations under `com.iafenvoy.origins.data.power.builtin`.

Next: see [Architecture Overview](architecture) for the project structure and design patterns.

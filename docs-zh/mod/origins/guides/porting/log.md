# 错误日志分析

## 通过错误日志定位问题 {#find-out-where-is-wrong-through-the-error-log}

在 NeoForge 中加载数据包时，检查错误日志中是否有问题。常见错误如下所示：

```log
[13:41:50] [Render thread/ERROR] [co.ia.or.ut.co.DefaultedCodec/]: Failed to decode origins:power_type: Failed to parse either. First: Not a json array: {"id":"minecraft:string"}; Second: No key tag in MapLike[{"id":"minecraft:string"}]; No key item in MapLike[{"id":"minecraft:string"}]; Failed to parse either. First: Not a json array: {"id":"minecraft:string"}; Second: No key tag in MapLike[{"id":"minecraft:string"}]; No key item in MapLike[{"id":"minecraft:string"}]; No ingredients for shapeless recipe
[13:41:50] [Render thread/ERROR] [co.ia.or.ut.co.DefaultedCodec/]: Failed to decode origins:power_type: Unknown element name:addition
[13:41:50] [Render thread/ERROR] [co.ia.or.ut.co.DefaultedCodec/]: Failed to decode origins:power_type: Unknown element name:multiply_base
[13:41:51] [Worker-Main-19/ERROR] [minecraft/TagLoader]: Couldn't load tag mypack:myorigin as it is missing following references: 
	mypack:arachnid/arthropod (from mypack.zip)
	mypack:merling/impaling (from mypack.zip)
```

你只需在日志中搜索 `co.ia.or.ut.co.DefaultedCodec`，就能找到所有与 Origins JSON 解析相关的错误。错误信息通常会指出是哪个字段导致了问题，因此你可以直接打开该文件，并按移植指南进行修正。

## 术语表 {#glossary}

### Codec {#codec}

**Codec** 定义了一个对象的结构，用于序列化和反序列化 JSON 数据。

**DefaultedCodec** 是 `Origins (NeoForge)` 提供的一种 `Codec`，它在反序列化失败时使用默认值，这样游戏就不会因字段缺失而崩溃。这有助于你在 JSON 文件中定位并修正问题，同时仍能让游戏继续运行。

### Either {#either}

**Either** 是一种可以持有两种可能值类型之一的类型。每个 `Either` 有两个 `Codec`，只有当两个 `Codec` 都解析输入 JSON 失败时，它才会抛出错误。这常用于可接受多种格式的字段（例如单个对象或对象数组）。

### MapLike {#maplike}

**MapLike** 是表示带有键值对的 JSON 对象的一种类型。

## 常见错误说明 {#common-errors-explanations}

- `No key xxx in MapLike`：表示 JSON 对象缺少名为 `xxx` 的必填字段。
- `Unknown element name: xxx`：表示 JSON 对象包含名为 `xxx` 的字段，但 codec 无法识别它。这通常与枚举或特定字符串值有关。
- `Failed to parse either`：表示 JSON 值与 `Either` codec 定义的任何预期格式都不匹配。错误信息通常会指出期望的格式以及实际收到的内容。
- `Unknown registry key in ResourceKey`：表示某个应作为注册表条目引用（例如 `minecraft:string`）的 JSON 值在注册表中不存在。如果 ID 拼写有误，或你引用了当前 Minecraft 版本中不存在的物品/方块/实体，就会出现此错误。

# Troubleshooting: Error Log Analysis

## Find out where is wrong through the error log

When you load your data pack in NeoForge, check the error log for any issues. Common errors looks like this:

```log
[13:41:50] [Render thread/ERROR] [co.ia.or.ut.co.DefaultedCodec/]: Failed to decode origins:power_type: Failed to parse either. First: Not a json array: {"id":"minecraft:string"}; Second: No key tag in MapLike[{"id":"minecraft:string"}]; No key item in MapLike[{"id":"minecraft:string"}]; Failed to parse either. First: Not a json array: {"id":"minecraft:string"}; Second: No key tag in MapLike[{"id":"minecraft:string"}]; No key item in MapLike[{"id":"minecraft:string"}]; No ingredients for shapeless recipe
[13:41:50] [Render thread/ERROR] [co.ia.or.ut.co.DefaultedCodec/]: Failed to decode origins:power_type: Unknown element name:addition
[13:41:50] [Render thread/ERROR] [co.ia.or.ut.co.DefaultedCodec/]: Failed to decode origins:power_type: Unknown element name:multiply_base
[13:41:51] [Worker-Main-19/ERROR] [minecraft/TagLoader]: Couldn't load tag mypack:myorigin as it is missing following references: 
	mypack:arachnid/arthropod (from mypack.zip)
	mypack:merling/impaling (from mypack.zip)
```

You can just simply search `co.ia.or.ut.co.DefaultedCodec` in the log to find all the errors related to Origins JSON parsing. The error message will usually indicate which field is causing the issue, so you can go directly to that file and fix it according to the porting guide.

## Glossary

### Codec

A **Codec** defines a structure of an object, which used for serializing and deserializing JSON data.

**DefaultedCodec** is a type of `Codec` provided by `Origins (NeoForge)` that uses default values when deserializing failed so that your game will not crash due to missing fields. This helps you identify and fix issues in your JSON files while still allowing the game to run.

### Either

An **Either** is a type that can hold one of two possible value types. Each `Either` has two `Codec`, only when both of the `Codec` failed to parse the input JSON, it will throw an error. This is commonly used for fields that can accept multiple formats (e.g. a single object or an array of objects).

### MapLike

A **MapLike** is a type that represents a JSON object with key-value pairs.

## Common errors explanations

- `No key xxx in MapLike`: This means the JSON object is missing a required field named `xxx`.
- `Unknown element name: xxx`: This means the JSON object contains a field named `xxx` that is not recognized by the codec. This usually related to enums or specific string values.
- `Failed to parse either`: This means the JSON value does not match any of the expected formats defined by the `Either` codec. The error message will usually indicate what formats were expected and what was actually received.
- `Unknown registry key in ResourceKey`: This means a JSON value that is expected to be a reference to a registry entry (e.g. `minecraft:string`) does not exist in the registry. This can happen if you have a typo in the ID or if you are referencing an item/block/entity that does not exist in the current version of Minecraft.
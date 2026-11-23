---
title: Annotation Processor
description: Register a client text annotation processor and try a demo with material aliases and quantities.
sidebar_position: 2
---

A `TextAnnotationProcessor` identifies references and quantities in a player's text before the client sends it. For example, it can attach `minecraft:raw_iron` to “ember ore” and the number `8` to “trial bundle”. The host sends the original text alongside the annotations so the server can resolve command arguments and check permissions.

## Inputs and outputs {#inputs-and-outputs}

| API | Values |
| --- | --- |
| `TextAnnotationProcessor.Input` | Host scope ID, original text, and client locale such as `en_us`. |
| `TextAnnotations.Reference` | One span and its candidate list. Each candidate has a registry ID, an entry ID, and an optional translation key. |
| `TextAnnotations.Quantity` | One span and a positive integer. |

A span is a zero-based UTF-16 range with an exclusive end. Use `Span.text(input.text())` to read the exact part of the input it covers. `TextAnnotator` normalizes case, full-width characters, and whitespace, takes the longest name at each matching position, and maps spans back to the original text. For an index based on in-game display names, `RegistryTextNames.collect` reads the current language from a registry selected by the host.

## Register a processor {#register}

Register an entry in `assistant_core:annotation_processor` through your mod's event bus. The example recognizes “ember ore”, “trial bundle”, and their Chinese equivalents. It also demonstrates how an ambiguous name can return both raw iron and raw copper as candidates.

```java title="ExampleAnnotations.java"
import com.iafenvoy.assistant.registry.AssistantResourceKeys;
import com.iafenvoy.assistant.text.TextAnnotationProcessor;
import com.iafenvoy.assistant.text.TextAnnotations;
import com.iafenvoy.assistant.text.TextAnnotations.Candidate;
import com.iafenvoy.assistant.text.TextAnnotations.Quantity;
import com.iafenvoy.assistant.text.TextAnnotations.Span;
import com.iafenvoy.assistant.text.TextAnnotator;
import net.minecraft.resources.Identifier;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.neoforge.registries.DeferredRegister;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

public final class ExampleAnnotations implements TextAnnotationProcessor {
  private static final Identifier SCOPE = Identifier.parse("psychic:spirit_call");
  private static final Identifier ITEM = Identifier.parse("minecraft:item");
  private static final Candidate IRON =
      new Candidate(ITEM, Identifier.parse("minecraft:raw_iron"), Optional.empty());
  private static final Candidate COPPER =
      new Candidate(ITEM, Identifier.parse("minecraft:raw_copper"), Optional.empty());
  private static final Pattern BUNDLE =
      Pattern.compile("(?<![a-z0-9_:])(?:trial bundle|试验份)(?![a-z0-9_:])");

  private final TextAnnotator annotator = new TextAnnotator(List.of(
      new TextAnnotator.Name("ember ore", IRON),
      new TextAnnotator.Name("余烬矿", IRON),
      new TextAnnotator.Name("ore sample", IRON),
      new TextAnnotator.Name("ore sample", COPPER),
      new TextAnnotator.Name("原矿样本", IRON),
      new TextAnnotator.Name("原矿样本", COPPER)));

  public static void register(IEventBus modBus) {
    DeferredRegister<TextAnnotationProcessor> processors =
        DeferredRegister.create(AssistantResourceKeys.ANNOTATION_PROCESSOR, "example");
    processors.register("demo_materials", ExampleAnnotations::new);
    processors.register(modBus);
  }

  @Override
  public boolean supports(Identifier scope) {
    return SCOPE.equals(scope);
  }

  @Override
  public TextAnnotations annotate(Input input) {
    return this.annotator.annotate(input.text(), normalized -> BUNDLE.matcher(normalized).results()
        .map(match -> new Quantity(new Span(match.start(), match.end()), 8))
        .toList());
  }
}
```

Call `ExampleAnnotations.register(modBus)` in your mod constructor. Read client-only state inside the callback so the registered object can also be constructed on a dedicated server. `supports` limits the example to `psychic:spirit_call`. For your own host, choose a scope ID and pass it to `TextAnnotationProcessors.annotate` at the client send entry point.

```java
TextAnnotations annotations = TextAnnotationProcessors.annotate(
    new TextAnnotationProcessor.Input(
        Identifier.parse("psychic:spirit_call"), originalText, clientLocale));
```

The registry runs matching processors in ID order. It deduplicates registry candidates on identical spans and omits a quantity when processors return different values for the same span. A processor that returns invalid spans is skipped. The host can use `TextAnnotations.STREAM_CODEC` to send the annotations and slice them with `slice(start, end)` when it extracts a subcommand. Validate IDs, quantities, and permissions on the server before using them.

## Try the demo {#demo}

For the first example, name an awakened tool `Blade` and place at least eight raw iron in a nearby container. Use the Java processor above or install the demo data pack in the world's `datapacks/` folder and reopen the world. The pack uses Psychic's built-in material processor and is compatible with Minecraft 26.1.2.

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href={useBaseUrl('/resources/assistant-core/annotation-demo-26.1.2-datapack.zip')} download data-no-link-preview>Download the demo data pack</a>

```json title="data/example/psychic/material_language/demo.json"
{
  "items": {
    "minecraft:raw_iron": ["ember ore", "余烬矿", "ore sample", "原矿样本"],
    "minecraft:raw_copper": ["ore sample", "原矿样本"]
  },
  "quantities": {
    "trial bundle": 8,
    "试验份": 8
  }
}
```

Send `!Blade fetch trial bundle ember ore`. The demo supplies `[13, 25)` for `trial bundle` and `[26, 35)` for `ember ore`. Psychic resolves the task as a request for eight raw iron. This JSON shows the demo annotations in a readable form.

```json
{
  "text": "!Blade fetch trial bundle ember ore",
  "references": [
    {
      "span": [26, 35],
      "candidates": [
        {"registry": "minecraft:item", "id": "minecraft:raw_iron"}
      ]
    }
  ],
  "quantities": [
    {"span": [13, 25], "value": 8}
  ]
}
```

| Input | Expected demo annotations |
| --- | --- |
| `!Blade fetch ＴＲＩＡＬ　ＢＵＮＤＬＥ ＥＭＢＥＲ　ＯＲＥ` | Same IDs and number. The spans point to the full-width input. |
| `!Blade fetch ore sample` | The span for `ore sample` carries `minecraft:raw_iron` and `minecraft:raw_copper`. Use an explicit ID to disambiguate. |
| `!Blade fetch ember ore and ember ore` | Each occurrence of `ember ore` gets its own span. This illustrates annotation of repeated text. |

The demo pack's `material_language` entries supply material and quantity terms. Intent synonyms and TF-IDF concept weights use their own data pack entries. [Routing lexicons](./text-routing.md#routing-lexicon)

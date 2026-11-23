---
title: 标注处理器
description: 注册客户端 Annotation Processor，并用演示数据体验物资别名和数量标注。
sidebar_position: 2
---

客户端发包前可以用 `TextAnnotationProcessor` 为玩家的文字标注引用和数量。例如，把「余烬矿」关联到 `minecraft:raw_iron`，把「试验份」标为 `8`。宿主把原文和标注一起发送，服务端据此解析参数并检查权限。

## 输入与输出 {#inputs-and-outputs}

| API | 内容 |
| --- | --- |
| `TextAnnotationProcessor.Input` | 宿主的作用域 ID、原文和客户端语言代码，例如 `zh_cn`。 |
| `TextAnnotations.Reference` | 一个区间及其候选列表。候选包含注册表 ID、条目 ID 和可选翻译键。 |
| `TextAnnotations.Quantity` | 一个区间与一个正整数。 |

区间按原文的 UTF-16 下标计数，从 0 开始，包含起点，截止于终点前一位。用 `Span.text(input.text())` 可以取出原文中的片段。`TextAnnotator` 会统一大小写、全角字符和空格，优先取同一位置的最长名称，再把区间映射回原文。需要用游戏显示名建索引时，可通过 `RegistryTextNames.collect` 从指定注册表读取当前语言的名称。

## 注册处理器 {#register}

在模组事件总线中向 `assistant_core:annotation_processor` 注册条目。下例同时识别「余烬矿」「试验份」和对应的英文词组，也会给「原矿样本」保留粗铁和粗铜两个候选。

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

在模组构造函数调用 `ExampleAnnotations.register(modBus)`。把客户端状态查询放进回调，以便注册对象也能在独立服务端构建。示例通过 `supports` 限定 `psychic:spirit_call` 作用域。自己的宿主可以选择一个作用域 ID，在客户端发送入口传给 `TextAnnotationProcessors.annotate`。

```java
TextAnnotations annotations = TextAnnotationProcessors.annotate(
    new TextAnnotationProcessor.Input(
        Identifier.parse("psychic:spirit_call"), originalText, clientLocale));
```

注册表按条目 ID 调用符合条件的处理器。同一区间的注册表候选会去重，同一区间出现不同数量时会跳过该数量。返回无效区间的处理器会被跳过。宿主可用 `TextAnnotations.STREAM_CODEC` 传输标注，截取子命令时用 `slice(start, end)` 重新计算位置。服务端在使用标注前校验 ID、数量和权限。

## 运行演示 {#demo}

先把一件已通灵的工具命名为「青锋」，在附近容器放入至少 8 个粗铁。可以使用上面的 Java 处理器，也可以把演示数据包放进世界的 `datapacks/` 后重新进入世界。数据包使用万物通灵内置的材料处理器，适用于 Minecraft 26.1.2。

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href={useBaseUrl('/resources/assistant-core/annotation-demo-26.1.2-datapack.zip')} download data-no-link-preview>下载演示数据包</a>

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

发送 `!青锋 取试验份余烬矿`。「试验份」位于 `[5, 8)`，「余烬矿」位于 `[8, 11)`。万物通灵将其解析为取 8 个粗铁的任务。以下用 JSON 展示演示处理器添加的标注。

```json
{
  "text": "!青锋 取试验份余烬矿",
  "references": [
    {
      "span": [8, 11],
      "candidates": [
        {"registry": "minecraft:item", "id": "minecraft:raw_iron"}
      ]
    }
  ],
  "quantities": [
    {"span": [5, 8], "value": 8}
  ]
}
```

| 输入 | 预期的演示标注 |
| --- | --- |
| `！青锋 取试验份余烬矿` | 数量和物品 ID 相同，区间指向含全角前缀的原文。 |
| `!青锋 取原矿样本` | 「原矿样本」同时带有 `minecraft:raw_iron` 和 `minecraft:raw_copper`。可以输入明确的物品 ID 来消歧。 |
| `!青锋 取余烬矿和余烬矿` | 两处「余烬矿」各有一个标注区间，用于演示重复词的标注。 |

演示包的 `material_language` 提供物资和数量词。意图同义词及 TF-IDF 概念权重使用单独的数据包条目。[路由词表](./text-routing.md#routing-lexicon)

---
title: 人物信息面板
description: 从 Saturn 快照读取人物信息，并用数据包扩展修炼分组。
---

# 人物信息面板

<span id="人物信息面板" />

人物信息面板默认用 `Z` 打开。修炼区选取 `mxt:cultivation` 分组，基本信息区选取 `saturn:basic`。一份只读快照供各分区使用，展示时不重新查询活玩家。

## 收集信息 {#收集信息}

```java
import com.iafenvoy.saturn.data.information.PlayerInformation;
import com.iafenvoy.saturn.data.information.PlayerViews;
import net.minecraft.resources.Identifier;

var view = PlayerViews.parse(player);
var all = PlayerInformation.collectAll(view);
var cultivation = PlayerInformation.groups(view).stream()
        .filter(group -> group.unwrapKey().orElseThrow().identifier().equals(Identifier.parse("mxt:cultivation")))
        .findFirst().orElseThrow();
var rows = PlayerInformation.collect(view, cultivation);
var compact = rows.withMinimumImportance(60);
```

服务端实体的采集必须在服务端主线程。列表、tooltip 和文字组件来自捕获或宿主传入的存档数据；存档视图不会借用当前玩家的突破条件、子境界或诅咒显示条件。

`InformationRow` 是数据包定义，`InformationEntry` 是求值结果。分组直接使用注册表的 `Holder<InformationGroup>`。结果中的 `groups()` 是组集合，`value()/label()/tooltip()` 直接读取展示数据，`importance()` 从行定义读取；`InformationText.lines(...)` 提供通用文字投影。界面也可直接按 `InformationValue` 渲染列表、表格、数字和物品。

## 扩展修炼分组 {#扩展修炼分组}

用[信息行定义](../../../library/saturn/data/information-row.md)声明内容、显示条件、tooltip、顺序和重要程度，再通过[信息分组与标签](../../../library/saturn/data/information-group.md)选取它。向 `#mxt:cultivation` 追加行，就会进入人物面板的修炼区以及同分组的指令输出。

内置境界、寿元、修为进度、灵根、体质、功法和诅咒共 7 条行读取 `mxt:information` getter。快照保存 getter 的事实，数据定义决定如何展示；新增取值行为应注册 `EntityValueGetter` 的参数 Codec，自定义展示计算应注册 `InformationExpression` 类型。

## 检查输出 {#检查输出}

```mcfunction
/information query @s mxt:cultivation
/information gui @s mxt:cultivation
```

两个分支均要求管理员权限（3 级），query 只向执行者显示分组文字，gui 为玩家执行者打开信息页。修改数据定义后重新打开世界或重启服务端。

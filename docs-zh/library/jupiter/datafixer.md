---
title: 使用数据修复器
sidebar_position: 5
---

# 使用数据修复器

每个容器中都有一个数据修复器对象，用于在你更改键时修复键。

当你修改某个配置键的键名时，可以使用它。

```java title="Example"
@Override
public void init() {
    super.init();
    this.dataFixer.registerKeyRule("config.iceandfire.[a-zA-Z0-9.]+", s -> s.replace("config.iceandfire.", ""));
}
```

此示例会在加载配置时把所有 `config.iceandfire.xxx` 映射为 `xxx`。

---
title: Using Data Fixer
sidebar_position: 5
---

# Using Data Fixer

In each container there's a data fixer object for fixing key when you change them.

You may use this when you change the key of a config key.

```java title="Example"
@Override
public void init() {
    super.init();
    this.dataFixer.registerKeyRule("config.iceandfire.[a-zA-Z0-9.]+", s -> s.replace("config.iceandfire.", ""));
}
```

This example will map all `config.iceandfire.xxx` to `xxx` when loading config.

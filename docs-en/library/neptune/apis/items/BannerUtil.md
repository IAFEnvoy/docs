---
title: BannerUtil
---

import { Utility } from '@site/src/components/JavaIcons';

# BannerUtil <Utility/>

Fast way to create banner item stack.

Example(s):
```java
public static final ItemStack FROST = BannerUtil.create("translationKey", Items.CYAN_BANNER,
            new Pair<>(BannerPatterns.CROSS, DyeColor.WHITE),
            new Pair<>(BannerPatterns.STRAIGHT_CROSS, DyeColor.WHITE),
            new Pair<>(BannerPatterns.CURLY_BORDER, DyeColor.WHITE),
            new Pair<>(BannerPatterns.FLOWER, DyeColor.LIGHT_BLUE));
```
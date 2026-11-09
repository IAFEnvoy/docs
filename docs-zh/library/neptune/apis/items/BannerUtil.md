---
title: BannerUtil
---

import { Utility } from '@site/src/components/JavaIcons';

# BannerUtil <Utility/>

快速创建旗帜物品堆叠的方式。

示例：
```java
public static final ItemStack FROST = BannerUtil.create("translationKey", Items.CYAN_BANNER,
            new Pair<>(BannerPatterns.CROSS, DyeColor.WHITE),
            new Pair<>(BannerPatterns.STRAIGHT_CROSS, DyeColor.WHITE),
            new Pair<>(BannerPatterns.CURLY_BORDER, DyeColor.WHITE),
            new Pair<>(BannerPatterns.FLOWER, DyeColor.LIGHT_BLUE));
```

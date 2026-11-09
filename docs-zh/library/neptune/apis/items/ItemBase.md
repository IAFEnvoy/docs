---
title: ItemBase
---

import { Class } from '@site/src/components/JavaIcons';

# ItemBase <Class/>

提供带有设置函数的物品构造器。

示例：
```java
public A() { super(p -> p.maxDamage(800)); }
public B() { super(p -> p); }
public C() { super(p -> p.fireproof().rarity(Rarity.EPIC)); }
//Or new it directly
Item item = new ItemBase(p -> p);
```

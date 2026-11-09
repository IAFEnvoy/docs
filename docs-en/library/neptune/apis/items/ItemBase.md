---
title: ItemBase
---

import { Class } from '@site/src/components/JavaIcons';

# ItemBase <Class/>

Provide item constructor with a setting function.

Example(s):
```java
public A() { super(p -> p.maxDamage(800)); }
public B() { super(p -> p); }
public C() { super(p -> p.fireproof().rarity(Rarity.EPIC)); }
//Or new it directly
Item item = new ItemBase(p -> p);
```
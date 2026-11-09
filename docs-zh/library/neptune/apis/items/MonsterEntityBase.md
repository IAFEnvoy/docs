---
title: MonsterEntityBase
---

import { Class } from '@site/src/components/JavaIcons';

# MonsterEntityBase <Class/>

1.实现 `getGroup()` 并将值传入构造器

2.自动启用 AI

示例：
```java
public MyEntity(EntityType<MyEntity> type, World world) {
    super(type, world, EntityGroup.DEFAULT);
    this.experiencePoints = 0;
}
```

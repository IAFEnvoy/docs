---
title: MonsterEntityBase
---

import { Class } from '@site/src/components/JavaIcons';

# MonsterEntityBase <Class/>

1.Implement `getGroup()` and put value into constructor

2.Auto enable AI

Example(s):
```java
public MyEntity(EntityType<MyEntity> type, World world) {
    super(type, world, EntityGroup.DEFAULT);
    this.experiencePoints = 0;
}
```
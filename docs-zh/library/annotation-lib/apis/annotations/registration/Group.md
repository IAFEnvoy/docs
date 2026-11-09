---
title: Group
---

import { Annotation } from '@site/src/components/JavaIcons';

# Group <Annotation/>

将物品添加到指定的物品组。

需要使用 `@TargetId` 指定目标组。
如果**未**指定，则使用 `@ModId` 中设置的 ID 作为命名空间。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface Group {
    /**
     * The target item group.
     *
     * @return {@link String }
     * @see Identifier
     */
    TargetId value();
}
```

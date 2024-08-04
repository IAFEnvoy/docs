---
title: Group
---

import { Annotation } from '@site/src/components/JavaIcons';

# Group <Annotation/>

Add item into given item group.

Require a `@TargetId` to specific the target group.
ID set in the `@ModId` will be used as namespace if **not** specific.

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
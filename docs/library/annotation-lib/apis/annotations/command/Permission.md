---
title: Permission
---

import { Annotation } from '@site/src/components/JavaIcons';

# Permission <Annotation/>

Indicate the permission to execute this command.

If you use it on method, the `@CommandProcessor` value field shouldn't be blank.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface Permission {
    /**
     * The permission value.
     *
     * @return int
     */
    int value();
}
```
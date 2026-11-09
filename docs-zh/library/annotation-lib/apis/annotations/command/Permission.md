---
title: Permission
---

import { Annotation } from '@site/src/components/JavaIcons';

# Permission <Annotation/>

指示执行该命令所需的权限。

如果将该注解用于方法，则 `@CommandProcessor` 的 value 字段不应为空。

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

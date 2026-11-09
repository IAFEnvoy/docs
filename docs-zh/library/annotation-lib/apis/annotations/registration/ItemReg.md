---
title: ItemReg
---

import { Annotation } from '@site/src/components/JavaIcons';

# ItemReg <Annotation/>

使用给定的 ID 注册此物品。

未提供 ID 时将使用字段名。
如果提供了物品组，处理器会将其添加到该物品组。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface ItemReg {
    /**
     * The register ID.
     *
     * @return {@link String }
     */
    String value() default "";

    /**
     * The target item group.
     *
     * @return {@link String }
     * @see Identifier
     */
    TargetId group() default @TargetId("");
}
```

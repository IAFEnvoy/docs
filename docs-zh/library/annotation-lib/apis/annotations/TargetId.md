---
title: TargetId
---

import { Annotation } from '@site/src/components/JavaIcons';

# TargetId <Annotation/>

注解中 `Identifier` 的替代品。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({})
public @interface TargetId {
    /**
     * The Namespace
     *
     * @return {@link String }
     */
    String namespace() default "";

    /**
     * The Path
     *
     * @return {@link String }
     */
    String value();
}
```

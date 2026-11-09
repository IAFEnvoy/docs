---
title: AnnotationProcessor
---

import { Annotation } from '@site/src/components/JavaIcons';

# AnnotationProcessor <Annotation/>

表示这是一个处理器，并指定过滤器。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface AnnotationProcessor {
    /**
     * The class filter. Recommended to be an interface.
     * @return {@link Class }<? extends {@link IAnnotationLibEntryPoint }>
     */
    Class<? extends IAnnotationLibEntryPoint> value();
}
```

---
title: AnnotationProcessor
---

import { Annotation } from '@site/src/components/JavaIcons';

# AnnotationProcessor <Annotation/>

Indicate this is a processor and provide filter.

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
---
title: ParticleReg
---

import { Annotation } from '@site/src/components/JavaIcons';

# ParticleReg <Annotation/>

Register this particle with given provider class.

This annotation should be used with [@ParticleProvider](./ParticleProvider)

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface ParticleReg {
    /**
     * The particle provider.
     *
     * @return {@link Class}>>
     */
    Class<?> value();

    /**
     * The register id. Can be blank.
     *
     * @return {@link String }
     */
    String name() default "";
}
```
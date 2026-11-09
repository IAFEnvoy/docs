---
title: ParticleReg
---

import { Annotation } from '@site/src/components/JavaIcons';

# ParticleReg <Annotation/>

使用给定的提供者类注册此粒子。

此注解应与 [@ParticleProvider](./ParticleProvider) 一起使用

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

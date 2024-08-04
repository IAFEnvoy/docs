---
title: ParticleProvider
---

import { Annotation } from '@site/src/components/JavaIcons';

# ParticleProvider <Annotation/>

This attribute is used to mark the particle factory build method.

This annotation should be used with [@ParticleReg](./ParticleReg)

This method should be placed in the particle class and be static.
This method must have a `SpriteProvider` parameter and return a `ParticleFactory`.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface ParticleProvider {
}
```
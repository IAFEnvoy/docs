---
title: ParticleProvider
---

import { Annotation } from '@site/src/components/JavaIcons';

# ParticleProvider <Annotation/>

此属性用于标记粒子工厂的构建方法。

此注解应与 [@ParticleReg](./ParticleReg) 一起使用

此方法应放在粒子类中，并且是静态的。
此方法必须有一个 `SpriteProvider` 参数，并返回一个 `ParticleFactory`。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface ParticleProvider {
}
```

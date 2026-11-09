---
title: AttributeBuilder
---

import { Annotation } from '@site/src/components/JavaIcons';

# AttributeBuilder <Annotation/>

用于标记默认属性构建方法。

此注解应与 [@ObjectReg](./ObjectReg) 一起使用。

该方法应放在实体类中，并且必须是静态的。
该方法必须没有参数，并返回 `DefaultAttributeContainer.Builder`。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface AttributeBuilder {
}
```

例如，你正在注册一个 `EntityType<MyEntity>`。
注册系统会在 `MyEntity` 类中查找第一个签名正确且带有此注解的方法。
然后使用它构建一个 `Attribute` 并注册。

如果没有找到匹配的方法，注册系统**不会**注册默认属性。
你需要自行注册。

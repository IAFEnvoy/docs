---
title: ConfigFile
---

import { Annotation } from '@site/src/components/JavaIcons';

# ConfigFile <Annotation/>

告知配置系统加载配置。**仅加载，不保存**

**这里只提供基础用法。高级功能请使用 [Jupiter](../../../../jupiter/index.md)。**

将使用 Gson，因此你可以使用 Gson 的特性。
使用 `AnnotationApi.getConfig` 获取你的配置。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface ConfigFile {
    /**
     * The config folder.
     * @return {@link String }
     */
    String path();

    /**
     * The config file without folder path.
     * @return {@link String }
     */
    String file();

    /**
     * Automatically create with default values when config file not found.
     * @return boolean
     */
    boolean autoCreate() default true;
}
```

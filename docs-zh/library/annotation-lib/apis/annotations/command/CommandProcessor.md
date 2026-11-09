---
title: CommandProcessor
---

import { Annotation } from '@site/src/components/JavaIcons';

# CommandProcessor <Annotation/>

注册命令处理器。

如果标注在方法上，该方法必须与 `Command<ServerCommandSource>` 具有相同的签名。
如果要注册根命令，请将 value 字段留空。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface CommandProcessor {
    /**
     * The name of literal or argument name, blank for root command.
     *
     * @return {@link String }
     */
    String value() default "";

    /**
     * The argument type, default for literal.
     *
     * @return {@link CommandArgumentType }
     */
    CommandArgumentType type() default CommandArgumentType.LITERAL;
}
```

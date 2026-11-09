# 模组开发技巧

## 如何区分社区版与原版

可以检查对应的主类是否存在：

```java
public static boolean isIAFOriginalLoaded() {
    try {
        Class.forName("com.github.alexthe666.iceandfire.IceAndFire");
        return true;
    } catch (ClassNotFoundException e) {
        return false;
    }
}

public static boolean isIAFCELoaded() {
    try {
        Class.forName("com.iafenvoy.iceandfire.IceAndFire");
        return true;
    } catch (ClassNotFoundException e) {
        return false;
    }
}
```

# Modder Tricks

## How to tell CE from original one

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
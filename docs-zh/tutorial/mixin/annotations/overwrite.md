---
order: 5
group: 
  title: Mixin注解
  order: 1
---
# 方法重写器 @Overwrite
方法重写器允许你整个的重写方法，类似于`@Override`，示例如下：
```java
@Overwrite(method = "要重写的方法")
private T overwrite(方法参数) {
  //你的代码
}
```
**注意：此接口会在当其他Mixin注入同一方法时发生冲突而导致报错，所以尽量不要使用**

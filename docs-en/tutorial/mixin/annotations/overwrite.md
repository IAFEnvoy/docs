---
order: 5
group: 
  title: Mixin Annotations
  order: 1
---
# Method Overwriting: @Overwrite
The method overwriter lets you replace an entire method, similar to `@Override`. Example:
```java
@Overwrite(method = "methodToOverwrite")
private T overwrite(methodParameters) {
  //your code
}
```
**Note: this annotation conflicts with other Mixins that inject into the same method and causes an error, so avoid using it when possible.**

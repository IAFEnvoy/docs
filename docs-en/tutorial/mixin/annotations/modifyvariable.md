---
order: 7
group: 
  title: Mixin Annotations
  order: 1
---
# Variable Modification: @ModifyVariable
The variable modifier lets you modify an argument when the method is called, as shown below:
```java
@ModifyVariable(method = "methodToInject", at = @At("HEAD"), ordinal = index)
private T injected(T original) {
  //your code
}
```
`ordinal` selects which argument to modify.
**Note: `ordinal` is counted among arguments matching your method's return type.**
For example, given `public void foo(boolean b, int x, int y, int z)` and a returning method of type `int` with `ordinal=1`, the target is `y` rather than `x`: `b` is not an `int`, and the index of `y` is `1`.

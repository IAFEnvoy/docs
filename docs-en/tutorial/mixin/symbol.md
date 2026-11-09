---
order: 1
group: 
  title: Introduction
  order: 0
---
# Common Mixin Symbols
This page introduces the basic symbols used by Mixin (some of them come from the JVM itself).

## Field Descriptors
Oracle defines the following [field descriptors](https://docs.oracle.com/javase/specs/jvms/se14/html/jvms-4.html#jvms-4.3.2):

|Descriptor|Original type|Description|
|:----|:----|:----|
|B|`byte`|Signed byte|
|C|`char`|Unicode code point in the Basic Multilingual Plane, encoded with UTF-16|
|D|`double`|Double-precision floating-point value|
|F|`float`|Single-precision floating-point value|
|I|`int`|Integer|
|J|`long`|Long integer|
|L*class name*;|reference|An instance of *class name* (note the semicolon)|
|S|`short`|Signed short|
|Z|`boolean`|true or false|
|[|reference|One array dimension|

A method descriptor consists of the method name, followed by a pair of parentheses containing the argument types, then the return type. For example, the Java method `Object m(int i, double[] d, Thread t)` has the method descriptor `m(I[DLjava/lang/Thread;)Ljava/lang/Object;`.

## Method Targeting
Every annotation uses a `method` parameter, which normally takes a method descriptor.

If only one method has the given name, you can use the method name directly without the full descriptor.

## Injection Point Reference
The [Injection Point Reference](https://github.com/SpongePowered/Mixin/wiki/Injection-Point-Reference) defines which part of the target method's body is used. The table below describes several options:

|Name|Description|
|:----|:----|
|`HEAD`|Top of the method|
|`RETURN`|Before a return statement|
|`TAIL`|Before the final return statement|
|`INVOKE`|At an instance method call|
|`INVOKE_ASSIGN`|At a static method call|
|`INVOKE_STRING`|At a method call with a single argument|
|`FIELD`|At a field access|

When the injection point refers to a statement or member, the target is set in `@At`. The target value uses JVM bytecode descriptors (that is, field descriptors).

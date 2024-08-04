---
order: 9
group: 
  title: Mixin注解
  order: 1
---
# @Pseudo
注明这个Mixin所要注入的类可能在测试或者运行时不存在，通常来说如果目标类不存在会导致Mixin报错然后程序退出，而加上这个就不会了。

注入Minecraft的代码并不需要这个，只有在注入其他mod的代码（比如做兼容）的时候才需要。

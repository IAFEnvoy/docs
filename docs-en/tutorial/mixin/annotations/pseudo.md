---
order: 9
group: 
  title: Mixin Annotations
  order: 1
---
# @Pseudo
Marks that the class targeted by this Mixin may not exist during testing or at runtime. Normally a missing target class makes Mixin report an error and terminate the game; adding this annotation prevents that.

This is not needed when injecting into Minecraft code, only when injecting into other mods' code (for compatibility, for example).

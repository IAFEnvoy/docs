---
sidebar_position: 2
---

# 你的第一个脚本

## Hello World

在聊天中试试这个：

```
/pendulum execute mc.say('Hello from Pendulum!')
```

你会在聊天中看到 `Hello from Pendulum!`。

## 向前移动

```
/pendulum execute mc.player.forward(20)
```

向前行走 20 个游戏刻（约 1 秒），然后停止。

## 挖掘一个方块

看向一个方块并运行：

```
/pendulum execute mc.player.breakBlock()
```

脚本会一直等待，直到该方块被破坏。

## 脚本文件

创建 `.minecraft/pendulum/hello.js`：

```js
mc.log('Starting task...');
mc.player.forward(40);
mc.log('Done walking!');
mc.player.jump();
```

运行它：

```
/pendulum file hello.js
```

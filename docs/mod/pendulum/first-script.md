---
sidebar_position: 2
---

# Your First Script

## Hello World

Try this in chat:

```
/pendulum execute mc.say('Hello from Pendulum!')
```

You'll see `Hello from Pendulum!` in the chat.

## Move Forward

```
/pendulum execute mc.forward(20)
```

Walks forward for 20 game ticks (~1 second), then stops.

## Mine a Block

Look at a block and run:

```
/pendulum execute mc.breakBlock()
```

The script will wait until the block is destroyed.

## Script Files

Create `.minecraft/pendulum/hello.js`:

```js
mc.log('Starting task...');
mc.forward(40);
mc.log('Done walking!');
mc.jump();
```

Run it:

```
/pendulum file hello.js
```

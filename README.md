# EasyEmitter

## Introduction
Emitter is like a third party eyes that can help you execute code at perfect timming than using waterfall technics.

## Specification
* You need NodeJS 8+ or more
* It's a ES6 module, no babelJS

## Usage

### => Register an event
```js
let emitter = require('easy-emitter');
emitter.register('name-event', function () {
  console.log('I do this when name-event is called');
});
```

### => Unregister an event
```js
let emitter = require('easy-emitter');
emitter.unregister('name-event');
```

### => Unregister an event with callback
```js
let emitter = require('easy-emitter');
emitter.unregister('name-event', function () {
  console.log('Done after name-event has been removed')
});
```

### => Active our event
```js
let emitter = require('easy-emitter');
emitter.emit('name-event');
```

### => Examples of basic usage

```js
let emitter = require('easy-emitter');
let gulp = require('gulp');

gulp.task('build', (done) => {
  emitter.emit('before-build'); // we activate an event before build in asynchronous
  // TODO do your things
  // Take big amount of time
  emitter.emit('after-build'); // We create a function after build
  done();
});

gulp.task('default', () => {
  
  emitter.register('after-build', function () => {
    console.log('After-build event is working works');
  });

});

```

### => Examples of unregister case
<blockquote>
<p>Notice : You can register as many callback for an event name.</p>
</blockquote>
<blockquote>
<p>Warning : unregister will remove all registered events. If you have many callbacl registered for a particular event name, then you will have lost all of them when you will unregister the event-name.</p>
</blockquote>

```js
let gulp = require('gulp');
let emitter = require('easy-emitter');

gulp.task('default', (done) => {
  
  emitter.register('after-register', function () => {
    console.log('event 1');
  });

  emitter.register('after-register', function () => {
    console.log('event 2');
  });

  emitter.emit('after-build');
  // => ouput: event 1
  // =>        event 2

  emitter.unregister('after-build');
  // => unregister the two events
  
  emitter.emit('after-build');
  // => nothing

  done();
});

```


## Reasons
I got some timming issue with webpack. Since webpack destroy and replace file asynchronously  and slowly. I reload most of the time to soon. So to make a clean development with using EventEmitter or if/switch staement on 'end event'. I decide to create a postal pattern like we can find in Mobile GUI to pass information between pages.
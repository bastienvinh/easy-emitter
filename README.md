# Gulp + Events

## Introduction
This module is an extension to gulp. Some problem come with gulp is synchronus task. for long task we can't really define if the task can be synchrone or not and excute the nex one. So gulp-posts-events implements the default EventEmitter from NodeJS.

## Specification
* You need NodeJS 8+ or more
* It's a ES6 module, no babelJS

## Usage

### => Register an event
```js
gulp.register('name-event', function () {
  console.log('I do this when name-event is called');
});
```

### => Unregister an event
```js
gulp.unregister('name-event');
```

### => Unregister an event with callback
```js
gulp.unregister('name-event', function () {
  console.log('Done after name-event has been removed')
});
```

### => Active our event
```js
gulp.emit('name-event');
```

### => Examples of basic usage

```js
let gulp = require('gulp-posts-events');

gulp.task('build', (done) => {
  gulp.emit('before-build'); // we activate an event before build in asynchronous
  // TODO do your things
  // Take big amount of time
  gulp.emit('after-build'); // We create a function after build
  done();
});

gulp.task('default', () => {
  
  gulp.register('after-build', function () => {
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
let gulp = require('gulp-posts-events');

gulp.task('default', () => {
  
  gulp.register('after-register', function () => {
    console.log('event 1');
  });

  gulp.register('after-register', function () => {
    console.log('event 2');
  });

  gulp.emit('after-build');
  // => ouput: event 1
  // =>        event 2

  gulp.unregister('after-build');
  // => unregister the two events
  
  gulp.emit('after-build');
  // => nothing
});

```


## Reasons
I got some timming issue with webpack. Since webpack destroy and replace file asynchronously  and slowly. I reload most of the time to soon. So to make a clean development with using EventEmitter or if/switch staement on 'end event'. I decide to create a postal pattern like we can find in Mobile GUI to pass information between pages.
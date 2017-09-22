let gulp = require('gulp');
let emitter = require('./lib/EventEmitter');

gulp.Gulp.prototype.register = emitter.instance.register;
gulp.Gulp.prototype.unregister = emitter.instance.unregister;
gulp.Gulp.prototype.emit = emitter.instance.emit;

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}

gulp.register('test-machine', () => {
  console.log('Its working');
})
  .emit('test-machine')
  .unregister('test-machine')
  .emit('test-machine');

module.exports = gulp;
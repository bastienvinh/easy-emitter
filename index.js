let gulp = require('gulp');
let emitter = require('./lib/EventEmitter');

gulp.Gulp.prototype.register = emitter.instance.register;
gulp.Gulp.prototype.unregister = emitter.instance.unregister;
gulp.Gulp.prototype.emit = emitter.instance.emit;

module.exports = gulp;
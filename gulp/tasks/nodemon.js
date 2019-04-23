'use strict';

module.exports = function () {

  $.gulp.task('nodemon', function (cb) {
    var called = false;
    return $.nodemon({
      script: 'app.js',
      watch: ['*'],
      ext: 'js css html pug json',
      ignore: ['./gulp', './node_modules', $.config.root]
    }).on('start', function onStart() {
      if (!called) {cb()}
      called = true;
    })
      .on('restart', function onRestart() {
        setTimeout(function reload() {$.browserSync.reload({stream: false})}, $.config.BROWSER_SYNC_RELOAD_DELAY);
      });
  });
};

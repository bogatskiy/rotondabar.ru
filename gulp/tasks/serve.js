'use strict';

module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: true,
      notify: false,
      browser: ['google chrome'],
      proxy: 'http://localhost:3000',
      port: 4000
    });
  });
};

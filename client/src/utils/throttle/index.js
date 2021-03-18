'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function throttle(func, limit) {
  var inThrottle;
  return function () {
    var args = arguments;
    if (!inThrottle) {
      inThrottle = true;
      func.apply(this, args);
      setTimeout(function () {
        return (inThrottle = false);
      }, limit);
    }
  };
}
exports.throttle = throttle;

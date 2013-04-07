module.exports = function (fn) {

  return function () {

    var args = Array.prototype.slice.call(arguments);
    var first = args[0];
    var last = args[args.length - 1];
    var callback = typeof last === 'function' ? last : first;

    try {
      fn.apply(this, args);
    } catch (err) {
      process.nextTick(function () {
        callback(err, null);
      });
    }
  };
};

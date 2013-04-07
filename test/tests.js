var async = require('async');
var test = require('tap').test;
var helmet = require('../');

test('waterfall', function (t) {

  async.waterfall([

    helmet(function (callback) {

      process.nextTick(function () {
        callback(null, 1);
      });
    }),
    helmet(function (result, callback) {

      t.ok(result);
      result += undefinedVar;
      process.nextTick(function () {
        callback(null);
      });
    })
  ], function (err) {

    t.notEqual(err, null);
    t.end();
  });
});

test('auto', function (t) {

  async.auto({

    ok: helmet(function (callback) {
      process.nextTick(function () {
        callback(null, 1);
      });
    }),

    notOk: ['ok',
      helmet(function (callback, results) {

        t.ok(results.ok);
        results.ok += undefinedVar;
        process.nextTick(function () {
          callback(null);
        });
      })
    ]

  }, function (err) {

    t.notEqual(err, null);
    t.end();
  });
});

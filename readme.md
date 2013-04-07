async-helmet
---

Simple exception wrapper for async tasks

[![build status](https://secure.travis-ci.org/jessejlt/async-helmet.png)](http://travis-ci.org/jessejlt/async-helmet)

Instead of this

```javascript
function (callback) {

  async.waterfall([

    function (callback) {
      try {

        fs.readdir('../', callback);
      } catch (err) {
        callback(err);
      }
    },

    function (files, callback) {
      try {

        async.map(files, fs.stat, callback);
      } catch (err) {
        callback(err);
      }
    }
  ], callback);
}
```

do this

```javascript
function (callback) {

  async.waterfall([

    helmet(function (callback) {
      fs.readdir('../', callback);
    }),
    helmet(function (files, callback) {
      async.map(files, fs.stat, callback);
    })
  ], callback);
}
```
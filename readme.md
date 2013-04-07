async-helmet
---

Simple exception wrapper for async tasks

Instead of this

```
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

```
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
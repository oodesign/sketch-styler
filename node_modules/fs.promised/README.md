# Promise-implementation-agnostic wrapper for fs #

Promises are great. Node's default implementation of the fs module, using
callbacks, are not. What's also not great is a fs wrapper that is dependant
upon a specific promise implementation, especially since native promises have
landed in ES2015. This library intends to be a drop-in replacement for the
built-in fs module, where all the async functions now use Promises instead of
callbacks. Any other functions on the fs module are passed through untouched.

## Notes ##
* All the examples in this README will be using ES2015/ES2016. The library is
  written in ES3 for maximum compatibility, but Promises are just so much easier
  to work with in ES2015+.

* By default, this library will use `global.Promise` as its promise
  implementation. If you are using an older version of node, or want to use a
  different Promise implementation for any reason, you need to do something
  like this:

  ```javascript
  var fs = require("fs.promised/promisify")(require("bluebird"));
  ```

  The `promisify` include takes a second optional parameter, `shouldCache`,
  which will cache the generated promise wrappers so that when `promisify` is
  called in another module with the same Promise implementation the same wrapper
  is returned. Set this to false if you wish to disable.

## Usage ##

```javascript
const fs = require("fs.promised");

const doSomething_ES2015 = function () {
    return fs.mkdir("/tmp/fs")
    .then(() => fs.writeFile("/tmp/fs/test", "blah blah blah"))
    .then(() => fs.unlink("/tmp/fs/test"))
    ;
}

const doSomething_ES2016 = async function () {
    await fs.mkdir("/tmp/fs");
    await fs.writeFile("/tmp/fs/test", "blah blah blah");
    await fs.unlink("/tmp/fs/test");
}
```

### Caveats ###

* Exceptions:
    If the wrapped function throws an error, the promise will be rejected with
    the the erro. This shouldn't matter as async fs functions shouldn't throw
    errors synchonously but the promise will still capture it if it does.

* Callbacks with multiple success values:
    This should only affect `fs.write` and `fs.read`. Functions that give a
    callback more than one success value (as in, values after the first "error"
    value) will be resolved with an array. Example:

    ```javascript
    const multiArgs_ES2015 = function () {
        return fs.read(fd, data)
        .then(([ written, string ]) => {
            //...
        })
        ;
    };

    /* ES2016 */
    const multiArgs_ES2016 = async function () {
        let [written, string] = await fs.read(fd, data);
        //...
    };
    ```

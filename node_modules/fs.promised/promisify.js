/**
 * Copyright (c) 2015-2016 Shawn Dellysse
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
var fs = require("fs");

var functionNamesToPromisfy = {
    "rename": true,
    "chown": true,
    "truncate": true,
    "ftruncate": true,
    "fchown": true,
    "lchown": true,
    "chmod": true,
    "fchmod": true,
    "lchmod": true,
    "stat": true,
    "lstat": true,
    "fstat": true,
    "link": true,
    "symlink": true,
    "readlink": true,
    "realpath": true,
    "unlink": true,
    "rmdir": true,
    "mkdir": true,
    "readdir": true,
    "close": true,
    "open": true,
    "utimes": true,
    "futimes": true,
    "fsync": true,
    "write": true,
    "read": true,
    "readFile": true,
    "writeFile": true,
    "appendFile": true,
    "access": true
};

// Cache the wrappers per-PromiseImpl so we only create one set of wrappers
// per PromiseImpl. Format is like
// [global.Promise, wrapperForGlobalPromise, bluebird, wrappersForBluebird, ...]
var cache = [];

var createPromiseWrapper = function (PromiseImpl) {
    var promisify = function (func) {
        return function promisedWrapper () {
            var self = this;
            var wrapperArgs = [];
            for (var i = 0, len = arguments.length; i < len; i++) {
                wrapperArgs[i] = arguments[i];
            }

            return new PromiseImpl(function (resolve, reject) {
                // In case the wrapped function throws an error synchronously, wrap
                // in try/catch.
                try {
                    func.apply(self, wrapperArgs.concat([ function () {
                        var error = arguments[0];
                        if (error != null) {
                            return reject(error);
                        }
                        var argsLength = arguments.length;


                        // Everything is offset by one because the first arg is an error
                        // indicator. So an argsLength of 1 or less means no value
                        // was returned.
                        if (argsLength <= 1) {
                            return resolve();

                        // argsLength of 2 means one value was returned, fulfill the
                        // promise with this value.
                        } else if (argsLength === 2) {
                            return resolve(arguments[1]);

                        // if argsLength is greater than two that means we have more
                        // than one value that was returned. Fulfill this promise with
                        // an array instead of a single value.
                        } else if (argsLength > 2) {
                            var argumentsReceived = [];
                            for (var i = 1; i < argsLength; i++) {
                                argumentsReceived[i - 1] = arguments[i];
                            }
                            return resolve(argumentsReceived);
                        }
                    } ]));
                } catch (error) {
                    return reject(error);
                }
            });
        };
    };

    var wrapper = {};
    for (var name in fs) {
        if (functionNamesToPromisfy[name]) {
            wrapper[name] = promisify(fs[name]);

        // exists is a depcreated oddball but it's still there
        } else if (name === "exists") {
            wrapper[name] = function (pathname) {
                return new PromiseImpl(function (resolve, reject) {
                    fs.exists(pathname, resolve);
                });
            };
        } else {
            wrapper[name] = fs[name];
        }
    }

    return wrapper;
};

module.exports = function (PromiseImpl, shouldCache) {
    if (PromiseImpl == null) {
        throw new Error("Missing Promise implementation");
    }
    if (shouldCache == null) {
        shouldCache = true;
    }

    if (shouldCache) {
        if (cache.indexOf(PromiseImpl) === -1) {
            cache.push(PromiseImpl, createPromiseWrapper(PromiseImpl));
        }
        return cache[cache.indexOf(PromiseImpl) + 1];
    } else {
        return createPromiseWrapper(PromiseImpl);
    }
};

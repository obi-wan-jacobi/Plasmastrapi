define(function () {

    // Used to pre-load modules into the requirejs context since requirejs doesn't support dynamic/synchronous module loading :(
    // Reference: https://stackoverflow.com/questions/17446844/dynamic-require-in-requirejs-getting-module-name-has-not-been-loaded-yet-for-c
    function ModuleLoader(paths) {
        this.__paths = paths;
        this.__callbacks = [];
        this.__isDownloadStarted = false;
        this.__isDownloadComplete = false;
    };
    ModuleLoader.prototype.download = function () {
        if (this.__isDownloadStarted) {
            return;
        }
        this.__isDownloadStarted = true;
        var modulePaths = [];
        for (var property in this.__paths) {
            if (this.__paths.hasOwnProperty(property)) {
                modulePaths.push(property);
            }
        }
        var self = this;
        require(modulePaths, function () {
            self.__isDownloadComplete = true;
            while (self.__callbacks.length > 0) {
                self.__callbacks.pop()();
            }
        });
        return this;
    };
    ModuleLoader.prototype.done = function (callback) {
        if (this.___isDownloadComplete) {
            return callback();
        } else {
            this.__callbacks.push(callback);
        }
    };

    return ModuleLoader
});
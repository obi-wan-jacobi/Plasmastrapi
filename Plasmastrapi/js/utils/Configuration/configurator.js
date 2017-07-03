define(function () {

    // Used to pre-load modules into the requirejs context since requirejs doesn't support dynamic/synchronous module loading :(
    // Reference: https://stackoverflow.com/questions/17446844/dynamic-require-in-requirejs-getting-module-name-has-not-been-loaded-yet-for-c
    var configurator = {};

    configurator.config = function (paths, callback) {
        // Configure named modules
        require.config({
            paths: paths
        });
        // Pre-load named modules
        var modulePaths = [];
        for (var property in paths) {
            if (paths.hasOwnProperty(property)) {
                modulePaths.push(property);
            }
        }
        require(modulePaths, function () {
            callback();
        });
    };

    return configurator;
});
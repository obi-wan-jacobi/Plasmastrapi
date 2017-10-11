define(function () {

    var logging = {
        constructor: {
            name: 'logging'
        }
    };

    logging.warn = function (ref, method, errorString) {
        `${ref.constructor.name}::${methodName} -- ${errorString}`;
    };

    logging.console = function (text) {
        console.log(text);
    };

    logging.alert = function (text) {
        windows.alert(text);
    };

    // singleton
    return logging;
});
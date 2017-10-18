define(function () {

    var logging = new (function logging() { });

    logging.console = function (text) {
        console.log(text);
    };

    logging.info = function (ref, methodName, errorString) {
        this.console(`[INFO] >> ${ref.constructor.name}::${methodName} -- ${errorString}.`);
    };

    logging.warn = function (ref, methodName, errorString) {
        this.console(`[WARNING] >> ${ref.constructor.name}::${methodName} -- ${errorString}!`);
    };

    logging.alert = function (text) {
        windows.alert(text);
    };

    // singleton
    return logging;
});
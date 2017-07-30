define(function () {

    var logging = {};

    logging.console = function (text) {
        console.log(text);
    };

    logging.alert = function (text) {
        windows.alert(text);
    };

    // singleton
    return logging;
});
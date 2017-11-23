define(function () {

    var logging = new (function logging() { });

    logging.__console = function (level, referer, methodName, messageString, punc) {
        var refererString = typeof referer === 'string' ? referer : referer.constructor.name;
        messageString = `[${level}] >> ${refererString}::${methodName} >> ${messageString}${punc || ''}`;
        console.log(messageString);
        return messageString;
    };

    logging.write = function (referer, methodName, messageString) {
        return this.__console('WRITE', referer, methodName, messageString, null);
    };

    logging.debug = function (referer, methodName, messageString) {
        return this.__console('*** DEBUG ***', referer, methodName, messageString, '.*****');
    };

    logging.info = function (referer, methodName, messageString) {
        return this.__console('INFO', referer, methodName, messageString, '.');
    };

    logging.warn = function (referer, methodName, messageString) {
        return this.__console('WARNING', referer, methodName, messageString, '!');
    };

    logging.error = function (referer, methodName, messageString) {
        return this.__console('ERROR', referer, methodName, messageString, '!');
    };

    logging.alert = function (text) {
        window.alert(text);
    };

    // singleton
    return logging;
});
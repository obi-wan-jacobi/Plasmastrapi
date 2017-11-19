define(['controller', 'dictionary', 'utils'],
function (Controller, Dictionary, utils) {

    DiagnosticsController.prototype = Object.create(Controller.prototype);
    DiagnosticsController.prototype.constructor = DiagnosticsController;
    function DiagnosticsController(engine) {
        Controller.call(this, engine);
        this.__callbacks = {};
    };
    // public methods
    DiagnosticsController.prototype.registerCallback = function (diagnosticsSystemString, callback) {
        utils.validator.validateClassType(this, diagnosticsSystemString, 'diagnostics-system');
        utils.validator.validateFunction(this, callback);
        if (!this.__callbacks[diagnosticsSystemString]) {
            this.__callbacks[diagnosticsSystemString] = new Dictionary('object');
        }
        this.__callbacks[diagnosticsSystemString].add(callback);
    };
    DiagnosticsController.prototype.reportDiagnostics = function (diagnosticsSystemString, report) {
        utils.validator.validateClassType(this, diagnosticsSystemString, 'diagnostics-system');
        if (!this.__callbacks[diagnosticsSystemString]) {
            return;
        }
        this.__callbacks[diagnosticsSystemString].forEach(function (callback) {
            callback(report);
        });
    };

    return DiagnosticsController;
});
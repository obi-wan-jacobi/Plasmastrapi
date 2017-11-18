define(['system', 'validator'],
function (System, validator) {

    DiagnosticsSystem.prototype = Object.create(System.prototype);
    DiagnosticsSystem.prototype.constructor = DiagnosticsSystem;
    function DiagnosticsSystem(engine) {
        System.call(this, engine);
        this.__diagnosticsController = null;
    };
    // private methods
    DiagnosticsSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        this.__diagnosticsController = this.__engine.getController('diagnostics-controller');
    };
    DiagnosticsSystem.prototype.__onload = function () { };
    DiagnosticsSystem.prototype.__onunload = function () { };
    // public methods
    DiagnosticsSystem.prototype.loopOnce = function (deltaMs) {
        validator.throwMethodMustBeOverridden(this, 'loopOnce');
    };

    return DiagnosticsSystem;
});
define(['system', 'validator'],
function (System, validator) {

    DiagnosticsSystem.prototype = Object.create(System.prototype);
    DiagnosticsSystem.prototype.constructor = DiagnosticsSystem;
    function DiagnosticsSystem(engine, reportingFrequencyDamperMax) {
        System.call(this, engine);
        this.__diagnosticsController = null;
        this.__reportingFrequencyDamperMax = reportingFrequencyDamperMax;
        this.__reportingFrequencyDamperCount = 0;
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
        this.__reportingFrequencyDamperCount++;
        if (this.__reportingFrequencyDamperCount < this.__reportingFrequencyDamperMax) {
            return false;
        } else {
            this.__reportingFrequencyDamperCount = 0;
            return true;
        }
    };

    return DiagnosticsSystem;
});
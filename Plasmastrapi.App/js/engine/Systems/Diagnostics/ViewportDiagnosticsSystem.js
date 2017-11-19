define(['diagnostics-system', 'utils'],
function (DiagnosticsSystem) {

    ViewportDiagnosticsSystem.prototype = Object.create(DiagnosticsSystem.prototype);
    ViewportDiagnosticsSystem.prototype.constructor = ViewportDiagnosticsSystem;
    function ViewportDiagnosticsSystem(engine) {
        DiagnosticsSystem.call(this, engine);
        this.__reportingFrequencyDamperMax = 600;
        this.__reportingFrequencyDamperCount = 0;
    };
    // private methods
    ViewportDiagnosticsSystem.prototype.__oninit = function () {
        DiagnosticsSystem.prototype.__oninit.call(this);
    };
    // public methods
    ViewportDiagnosticsSystem.prototype.loopOnce = function (deltaMs) {
        this.__reportingFrequencyDamperCount++;
        if (this.__reportingFrequencyDamperCount < this.__reportingFrequencyDamperMax) {
            return true;
        } else {
            this.__reportingFrequencyDamperCount = 0;
        }
        this.__diagnosticsController.reportDiagnostics('viewport-diagnostics-system', deltaMs);
        return true;
    };

    return ViewportDiagnosticsSystem;
});
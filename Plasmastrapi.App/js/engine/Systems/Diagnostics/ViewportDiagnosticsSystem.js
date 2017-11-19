define(['diagnostics-system', 'utils'],
function (DiagnosticsSystem) {

    ViewportDiagnosticsSystem.prototype = Object.create(DiagnosticsSystem.prototype);
    ViewportDiagnosticsSystem.prototype.constructor = ViewportDiagnosticsSystem;
    function ViewportDiagnosticsSystem(engine) {
        DiagnosticsSystem.call(this, engine, 600);
    };
    // private methods
    ViewportDiagnosticsSystem.prototype.__oninit = function () {
        DiagnosticsSystem.prototype.__oninit.call(this);
    };
    // public methods
    ViewportDiagnosticsSystem.prototype.loopOnce = function (deltaMs) {
        var loopOnce = DiagnosticsSystem.prototype.loopOnce.call(this, deltaMs);
        if (!loopOnce) {
            return true;
        }
        this.__diagnosticsController.reportDiagnostics('viewport-diagnostics-system', deltaMs);
        return true;
    };

    return ViewportDiagnosticsSystem;
});
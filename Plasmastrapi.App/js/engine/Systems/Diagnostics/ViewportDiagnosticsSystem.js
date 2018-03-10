define(['diagnostics-system', 'viewport-diagnostics-report'],
function (DiagnosticsSystem, ViewportDiagnosticsReport) {

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
        var diagnosticsReport = new ViewportDiagnosticsReport(1000 / deltaMs);
        this.__diagnosticsController.reportDiagnostics('viewport-diagnostics-system', diagnosticsReport);
        return true;
    };

    return ViewportDiagnosticsSystem;
});
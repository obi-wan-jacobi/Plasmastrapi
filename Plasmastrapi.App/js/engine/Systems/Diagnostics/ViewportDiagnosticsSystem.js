define(['diagnostics-system', 'utils'],
function (DiagnosticsSystem) {

    ViewportDiagnosticsSystem.prototype = Object.create(DiagnosticsSystem.prototype);
    ViewportDiagnosticsSystem.prototype.constructor = ViewportDiagnosticsSystem;
    function ViewportDiagnosticsSystem(engine) {
        DiagnosticsSystem.call(this, engine);
    };
    // private methods
    ViewportDiagnosticsSystem.prototype.__oninit = function () {
        DiagnosticsSystem.prototype.__oninit.call(this);
    };
    // public methods
    ViewportDiagnosticsSystem.prototype.loopOnce = function () {
        this.__diagnosticsController.reportViewportDiagnostics();
        return true;
    };

    return ViewportDiagnosticsSystem;
});
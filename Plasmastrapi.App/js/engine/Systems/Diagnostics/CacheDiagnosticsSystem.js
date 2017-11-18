define(['diagnostics-system', 'utils'],
function (DiagnosticsSystem) {

    CacheDiagnosticsSystem.prototype = Object.create(DiagnosticsSystem.prototype);
    CacheDiagnosticsSystem.prototype.constructor = CacheDiagnosticsSystem;
    function CacheDiagnosticsSystem(engine) {
        DiagnosticsSystem.call(this, engine);
        this.__emitterContainer = null;
    };
    // private methods
    CacheDiagnosticsSystem.prototype.__oninit = function () {
        DiagnosticsSystem.prototype.__oninit.call(this);
        this.__emitterContainer = this.__engine.getFactory('emitter-factory').getContainer();
    };
    // public methods
    CacheDiagnosticsSystem.prototype.loopOnce = function () {
        return true;
    };

    return CacheDiagnosticsSystem;
});
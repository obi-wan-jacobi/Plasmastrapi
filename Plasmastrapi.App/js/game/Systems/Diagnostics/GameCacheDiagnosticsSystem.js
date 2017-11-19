define(['diagnostics-system', 'dictionary', 'utils'],
function (DiagnosticsSystem, Dictionary, utils) {

    GameCacheDiagnosticsSystem.prototype = Object.create(DiagnosticsSystem.prototype);
    GameCacheDiagnosticsSystem.prototype.constructor = GameCacheDiagnosticsSystem;
    function GameCacheDiagnosticsSystem(engine) {
        DiagnosticsSystem.call(this, engine, 60);
        this.__containers = new Dictionary('container');
    };
    // private methods
    GameCacheDiagnosticsSystem.prototype.__oninit = function () {
        DiagnosticsSystem.prototype.__oninit.call(this);
        this.__containers.add('logic-elements', this.__engine.getFactory('logic-element-factory').getContainer());
        this.__containers.add('input-terminals', this.__engine.getFactory('terminal-factory').getInputTerminalContainer());
        this.__containers.add('output-terminals', this.__engine.getFactory('terminal-factory').getOutputTerminalContainer());
        this.__containers.add('wires', this.__engine.getFactory('wire-factory').getContainer());
    };
    // public methods
    GameCacheDiagnosticsSystem.prototype.loopOnce = function (deltaMs) {
        var loopOnce = DiagnosticsSystem.prototype.loopOnce.call(this, deltaMs);
        if (!loopOnce) {
            return true;
        }
        this.__diagnosticsController.reportDiagnostics('game-cache-diagnostics-system', this.__containers);
        return true;
    };

    return GameCacheDiagnosticsSystem;
});
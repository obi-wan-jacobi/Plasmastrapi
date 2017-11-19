define(['diagnostics-system', 'dictionary', 'utils'],
function (DiagnosticsSystem, Dictionary, utils) {

    CacheDiagnosticsSystem.prototype = Object.create(DiagnosticsSystem.prototype);
    CacheDiagnosticsSystem.prototype.constructor = CacheDiagnosticsSystem;
    function CacheDiagnosticsSystem(engine) {
        DiagnosticsSystem.call(this, engine, 60);
        this.__containers = new Dictionary('object');
    };
    // private methods
    CacheDiagnosticsSystem.prototype.__oninit = function () {
        DiagnosticsSystem.prototype.__oninit.call(this);
        this.__containers.add('emitter-container', this.__engine.getFactory('emitter-factory').getContainer());
        this.__containers.add('entity-container', this.__engine.getFactory('entity-factory').getContainer());
        var componentFactory = this.__engine.getFactory('component-factory');
        var componentNames = [
            'pose-component',
            'polygon-component',
            'pick-component',
            'image-component',
            'label-component',
            'line-component',
            'curve-component',
            'keyboard-component',
            'mouse-component',
        ];
        for (var i = 0, L = componentNames.length; i < L; i++) {
            this.__containers.add(componentNames[i], componentFactory.getContainer(componentNames[i]))
        }
        this.__containers.add('destruction-buffer', this.__engine.getFactory('emitter-factory').getContainer().getDestroyedItemsBuffer());
    };
    // public methods
    CacheDiagnosticsSystem.prototype.loopOnce = function (deltaMs) {
        var loopOnce = DiagnosticsSystem.prototype.loopOnce.call(this, deltaMs);
        if (!loopOnce) {
            return true;
        }
        this.__diagnosticsController.reportDiagnostics('cache-diagnostics-system', this.__containers);
        return true;
    };

    return CacheDiagnosticsSystem;
});
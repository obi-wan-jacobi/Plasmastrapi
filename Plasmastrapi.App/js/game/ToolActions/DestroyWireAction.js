define(['tool-action', 'utils'],
function (ToolAction, utils) {

    DestroyWireAction.prototype = Object.create(ToolAction.prototype);
    DestroyWireAction.prototype.constructor = DestroyWireAction;
    function DestroyWireAction(engine) {
        ToolAction.call(this, engine, 'wire');
        this.__wireFactory = this.__engine.getFactory('augmented-wire-factory');
        this.__inputTerminal = null;
        this.__outputTerminal = null;
    };
    DestroyWireAction.prototype.setTarget = function (target) {
        ToolAction.prototype.setTarget.call(this, target);
        this.__inputTerminal = this.__target.inputTerminal;
        this.__outputTerminal = this.__target.outputTerminal;
    };
    DestroyWireAction.prototype.updateTarget = function (oldTarget, newTarget) {
        ToolAction.prototype.updateTarget.call(this, oldTarget, newTarget);
        if (this.__inputTerminal.isChildOf(oldTarget)) {
            this.__inputTerminal = newTarget.inputTerminal;
        }
        if (this.__outputTerminal.isChildOf(oldTarget)) {
            this.__outputTerminal = newTarget.outputTerminal;
        }
    };
    DestroyWireAction.prototype.execute = function () {
        this.__target.destroy();
    };
    DestroyWireAction.prototype.undo = function () {
        var wire = this.__wireFactory.create('wire', [this.__outputTerminal, this.__inputTerminal]);
        var target = this.getTarget();
        this.__toolActionContainer.forEach(function (action) {
            action.updateTarget(target, wire);
        }, this);
    };
    DestroyWireAction.prototype.redo = function () {
        this.__target.destroy();
    };

    return DestroyWireAction;
});
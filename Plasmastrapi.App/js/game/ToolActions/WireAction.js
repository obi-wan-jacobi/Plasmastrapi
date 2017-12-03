define(['tool-action', 'utils'],
function (ToolAction, utils) {

    WireAction.prototype = Object.create(ToolAction.prototype);
    WireAction.prototype.constructor = WireAction;
    function WireAction(engine) {
        ToolAction.call(this, engine, 'wire');
        this.__wireFactory = this.__engine.getFactory('augmented-wire-factory');
        this.__inputTerminal = null;
        this.__outputTerminal = null;
    };
    WireAction.prototype.setTarget = function (target) {
        ToolAction.prototype.setTarget.call(this, target);
        this.__inputTerminal = this.__target.inputTerminal;
        this.__outputTerminal = this.__target.outputTerminal;
    };
    WireAction.prototype.undo = function () {
        this.__target.destroy();
    };
    WireAction.prototype.redo = function () {
        var wire = this.__wireFactory.create('wire', [this.__outputTerminal, this.__inputTerminal]);
        var target = this.getTarget();
        this.__toolActionContainer.forEach(function (action) {
            action.updateTarget(target, wire);
        }, this);
    };

    return WireAction;
});
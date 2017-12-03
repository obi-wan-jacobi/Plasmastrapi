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
        this.__target = null;
    };
    WireAction.prototype.undo = function () {
        var wire = this.__wireFactory.getContainer().forEach(function (wire) {
            if (wire.inputTerminal === this.__inputTerminal && wire.outputTerminal === this.__outputTerminal) {
                return wire;
            }
        }, this);
        ToolAction.prototype.setTarget.call(this, wire);
        this.__target.destroy();
        this.__target = null;
        
    };
    WireAction.prototype.redo = function () {
        var wire = this.__wireFactory.create('wire', [this.__outputTerminal, this.__inputTerminal]);
        this.setTarget(wire);
    };

    return WireAction;
});
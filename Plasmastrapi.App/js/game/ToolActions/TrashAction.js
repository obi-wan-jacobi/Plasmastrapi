define(['tool-action', 'utils'],
function (ToolAction, utils) {

    TrashAction.prototype = Object.create(ToolAction.prototype);
    TrashAction.prototype.constructor = TrashAction;
    function TrashAction(engine) {
        ToolAction.call(this, engine, 'logic-element');
        this.__toolActionFactory = this.__engine.getFactory('tool-action-factory');
        this.__logicElementFactory = this.__engine.getFactory('augmented-logic-element-factory');
        this.__wireContainer = this.__engine.getFactory('augmented-wire-factory').getContainer();
        this.__wireCutterActions = null;
    };
    TrashAction.prototype.setTarget = function (target) {
        ToolAction.prototype.setTarget.call(this, target);
        if (!this.__wireCutterActions) {
            this.__wireCutterActions = this.__toolActionFactory.create('batch-tool-action');
            this.__wireContainer.forEach(function (wire) {
                if (wire.inputTerminal.isChildOf(this.__target) || wire.outputTerminal.isChildOf(this.__target)) {
                    var action = this.__toolActionFactory.create('wire-cutter-action');
                    action.setTarget(wire);
                    this.__wireCutterActions.addAction(action);
                }
            }, this);
        }
    };
    TrashAction.prototype.updateTarget = function (oldTarget, newTarget) {
        ToolAction.prototype.updateTarget.call(this, oldTarget, newTarget);
        this.__wireCutterActions.updateTarget(oldTarget, newTarget);
    };
    TrashAction.prototype.undo = function () {
        var targetModuleName = utils.modules.getModuleName(this.__target);
        var targetPosition = this.__target.getComponent('pose-component').getHandle().getPosition();
        var logicElement = this.__logicElementFactory.create(targetModuleName);
        var target = this.getTarget();
        this.__toolActionContainer.forEach(function (action) {
            action.updateTarget(target, logicElement);
        }, this);
        this.__target.getComponent('pose-component').setData(targetPosition);
        this.__wireCutterActions.undo();
    };
    TrashAction.prototype.redo = function () {
        this.__wireCutterActions.redo();
        this.__target.destroy();
    };

    return TrashAction;
});
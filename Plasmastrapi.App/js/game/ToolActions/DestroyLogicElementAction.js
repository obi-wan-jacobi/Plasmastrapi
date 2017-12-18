define(['tool-action', 'utils'],
function (ToolAction, utils) {

    DestroyLogicElementAction.prototype = Object.create(ToolAction.prototype);
    DestroyLogicElementAction.prototype.constructor = DestroyLogicElementAction;
    function DestroyLogicElementAction(engine) {
        ToolAction.call(this, engine, 'logic-element');
        this.__logicElementFactory = this.__engine.getFactory('augmented-logic-element-factory');
    };
    DestroyLogicElementAction.prototype.execute = function () {
        this.__target.destroy();
    };
    DestroyLogicElementAction.prototype.undo = function () {
        var targetModuleName = utils.modules.getModuleName(this.__target);
        var targetPosition = this.__target.getComponent('pose-component').getHandle().getPosition();
        var logicElement = this.__logicElementFactory.create(targetModuleName);
        var target = this.getTarget();
        this.__toolActionContainer.forEach(function (action) {
            action.updateTarget(target, logicElement);
        }, this);
        this.__target.getComponent('pose-component').setData(targetPosition);
    };
    DestroyLogicElementAction.prototype.redo = function () {
        this.__target.destroy();
    };

    return DestroyLogicElementAction;
});
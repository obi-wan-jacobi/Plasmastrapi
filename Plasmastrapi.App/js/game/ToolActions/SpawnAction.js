define(['tool-action', 'utils'],
function (ToolAction, utils) {

    SpawnAction.prototype = Object.create(ToolAction.prototype);
    SpawnAction.prototype.constructor = SpawnAction;
    function SpawnAction(engine) {
        ToolAction.call(this, engine, 'logic-element');
        this.__logicElementFactory = this.__engine.getFactory('logic-element-factory');
    };
    SpawnAction.prototype.undo = function () {
        this.__target.destroy();
    };
    SpawnAction.prototype.redo = function () {
        var targetModuleName = utils.modules.getModuleName(this.__target);
        var targetPosition = this.__target.getComponent('pose-component').getHandle().getPosition();
        this.__target = this.__logicElementFactory.create(targetModuleName);
        this.__target.getComponent('pose-component').setData(targetPosition);
    };

    return SpawnAction;
});
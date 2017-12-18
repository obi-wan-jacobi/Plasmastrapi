define(['tool-action', 'container', 'utils'],
function (ToolAction, Container, utils) {

    BatchDestroyLogicElementsAction.prototype = Object.create(ToolAction.prototype);
    BatchDestroyLogicElementsAction.prototype.constructor = BatchDestroyLogicElementsAction;
    function BatchDestroyLogicElementsAction(engine) {
        ToolAction.call(this, engine, '');
        this.__destroyLogicElementActions = new Container('destroy-logic-element-action');
        this.__destroyWireActions = new Container('destroy-wire-action');
    };
    BatchDestroyLogicElementsAction.prototype.setTarget = function (target) {
        utils.validator.throw(this, 'setTarget', `${this.constructor.name} does not accommodate setting a target`);
    };
    BatchDestroyLogicElementsAction.prototype.updateTarget = function (oldTarget, newTarget) {
        this.__destroyLogicElementActions.forEach(function (action) {
            action.updateTarget(oldTarget, newTarget);
        });
        this.__destroyWireActions.forEach(function (action) {
            action.updateTarget(oldTarget, newTarget);
        });
    };
    BatchDestroyLogicElementsAction.prototype.addAction = function (action) {
        if (utils.validator.isInstanceOfType(action, 'destroy-logic-element-action')) {
            this.__destroyLogicElementActions.add(action);
        } else if (utils.validator.isInstanceOfType(action, 'destroy-wire-action')) {
            this.__destroyWireActions.add(action);
        } else {
            utils.validator.throw(this, 'addAction', `${action.constructor.name} cannot be added to ${this.constructor.name}`);
        }
    };
    BatchDestroyLogicElementsAction.prototype.execute = function () {
        this.__destroyWireActions.forEach(function (action) {
            action.execute();
        });
        this.__destroyLogicElementActions.forEach(function (action) {
            action.execute();
        });
    };
    BatchDestroyLogicElementsAction.prototype.undo = function () {
        this.__destroyLogicElementActions.forEach(function (action) {
            action.undo();
        });
        this.__destroyWireActions.forEach(function (action) {
            action.undo();
        });
    };
    BatchDestroyLogicElementsAction.prototype.redo = function () {
        this.__destroyWireActions.forEach(function (action) {
            action.redo();
        });
        this.__destroyLogicElementActions.forEach(function (action) {
            action.redo();
        });
    };

    return BatchDestroyLogicElementsAction;
});
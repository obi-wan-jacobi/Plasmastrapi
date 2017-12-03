define(['tool-action', 'container', 'utils'],
function (ToolAction, Container, utils) {

    BatchToolAction.prototype = Object.create(ToolAction.prototype);
    BatchToolAction.prototype.constructor = BatchToolAction;
    function BatchToolAction(engine) {
        ToolAction.call(this, engine, '');
        this.__contents = new Container('tool-action');
    };
    BatchToolAction.prototype.setTarget = function (target) {
        utils.validator.throw(this, 'setTarget', `${this.constructor.name} does not accommodate setting a target`);
    };
    BatchToolAction.prototype.updateTarget = function (oldTarget, newTarget) {
        this.__contents.forEach(function (action) {
            action.updateTarget(oldTarget, newTarget);
        });
    };
    BatchToolAction.prototype.addAction = function (action) {
        this.__contents.add(action);
    };
    BatchToolAction.prototype.forEach = function (fn, caller) {
        return this.__contents.forEach(fn, caller);
    };
    BatchToolAction.prototype.undo = function () {
        this.__contents.forEach(function (action) {
            action.undo();
        });
    };
    BatchToolAction.prototype.redo = function () {
        this.__contents.forEach(function (action) {
            action.redo();
        });
    };

    return BatchToolAction;
});
define(['tool-action', 'utils'],
function (ToolAction, utils) {

    PlaceAction.prototype = Object.create(ToolAction.prototype);
    PlaceAction.prototype.constructor = PlaceAction;
    function PlaceAction(engine) {
        ToolAction.call(this, engine, 'logic-element');
        this.__initialPosition = null;
        this.__finalPosition = null;
    };
    PlaceAction.prototype.setTarget = function (target) {
        ToolAction.prototype.setTarget.call(this, target);
        if (!this.__finalPosition) {
            this.__finalPosition = this.__target.getComponent('pose-component').getData();
        }
    };
    PlaceAction.prototype.setInitialPosition = function (position) {
        utils.validator.validateInstanceType(this, position, 'position');
        this.__initialPosition = position;
    };
    PlaceAction.prototype.undo = function () {
        this.__target.getComponent('pose-component').setData(this.__initialPosition);
    };
    PlaceAction.prototype.redo = function () {
        this.__target.getComponent('pose-component').setData(this.__finalPosition);
    };

    return PlaceAction;
});
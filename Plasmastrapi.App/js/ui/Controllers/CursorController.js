define(['controller', 'validator'],
function (Controller, validator) {

    CursorController.prototype = Object.create(Controller.prototype);
    CursorController.prototype.constructor = CursorController;
    function CursorController(engine) {
        Controller.call(this);
    };
    CursorController.prototype.getViewport = function () {
        return this.__viewport;
    };

    return CursorController;
});
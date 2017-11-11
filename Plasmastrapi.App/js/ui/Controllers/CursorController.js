define(['controller', 'validator'],
function (Controller, validator) {

    CursorController.prototype = Object.create(Controller.prototype);
    CursorController.prototype.constructor = CursorController;
    function CursorController(engine) {
        Controller.call(this, engine);
    };
    // private methods
    CursorController.prototype.__set = function (cursorStyle) {
        this.__engine.getController('viewport-controller').getViewport().style.cursor = cursorStyle;
    };
    // public methods
    CursorController.prototype.setDefault = function () {
        this.__set('default');
    };
    CursorController.prototype.setPointer = function () {
        this.__set('pointer');
    };

    return CursorController;
});
define(['base', 'pick-controller', 'validator'],
function (Base, PickController, validator) {

    InputHandler.prototype = Object.create(Base.prototype);
    InputHandler.prototype.constructor = InputHandler;
    function InputHandler(engine) {
        Base.call(this);
        this.__pickController = engine.getController(PickController);
    };
    // private methods
    InputHandler.prototype.__oninit = function () {
    };
    InputHandler.prototype.__onload = function () {
    };
    InputHandler.prototype.__onunload = function () {
    };
    // public methods
    InputHandler.prototype.onkeydown = function () {
    };
    InputHandler.prototype.onkeyup = function () {
    };
    InputHandler.prototype.onkeypress = function () {
    };
    InputHandler.prototype.onenter = function () {
    };
    InputHandler.prototype.onescape = function () {
    };
    InputHandler.prototype.onmousemove = function () {
    };
    InputHandler.prototype.onmousedown = function () {
    };
    InputHandler.prototype.onmouseup = function () {
    };
    InputHandler.prototype.onclick = function () {
    };

    return InputHandler;
});
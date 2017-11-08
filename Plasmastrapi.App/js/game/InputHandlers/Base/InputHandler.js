define(['base', 'utils'],
function (Base, utils) {

    InputHandler.prototype = Object.create(Base.prototype);
    InputHandler.prototype.constructor = InputHandler;
    function InputHandler(engine) {
        Base.call(this);
        this.__inputController = engine.getController(utils.modules.require('input-controller'));
        this.__pickController = engine.getController(utils.modules.require('pick-controller'));
        this.__labController = engine.getController(utils.modules.require('lab-controller'));
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
    InputHandler.prototype.dispose = function () {
    };

    return InputHandler;
});
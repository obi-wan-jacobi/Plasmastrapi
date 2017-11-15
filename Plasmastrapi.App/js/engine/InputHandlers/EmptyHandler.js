define(['input-handler'],
function (InputHandler) {

    EmptyHandler.prototype = Object.create(InputHandler.prototype);
    EmptyHandler.prototype.constructor = EmptyHandler;
    function EmptyHandler(engine) {
        InputHandler.call(this, engine);
    };
    // private methods
    EmptyHandler.prototype.__oninit = function () {
    };
    EmptyHandler.prototype.__onload = function () {
    };
    EmptyHandler.prototype.__onunload = function () {
    };
    // public methods
    EmptyHandler.prototype.keydown = function () {
    };
    EmptyHandler.prototype.keyup = function () {
    };
    EmptyHandler.prototype.enter = function () {
    };
    EmptyHandler.prototype.escape = function () {
    };
    EmptyHandler.prototype.mousemove = function () {
    };
    EmptyHandler.prototype.mousedown = function () {
    };
    EmptyHandler.prototype.mouseup = function () {
    };
    EmptyHandler.prototype.click = function () {
    };
    EmptyHandler.prototype.dispose = function () {
    };

    return EmptyHandler;
});
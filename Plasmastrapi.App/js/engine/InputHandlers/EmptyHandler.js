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
    EmptyHandler.prototype.onkeydown = function () {
    };
    EmptyHandler.prototype.onkeyup = function () {
    };
    EmptyHandler.prototype.onenter = function () {
    };
    EmptyHandler.prototype.onescape = function () {
    };
    EmptyHandler.prototype.onmousemove = function () {
    };
    EmptyHandler.prototype.onmousedown = function () {
    };
    EmptyHandler.prototype.onmouseup = function () {
    };
    EmptyHandler.prototype.onclick = function () {
    };
    EmptyHandler.prototype.dispose = function () {
    };

    return EmptyHandler;
});
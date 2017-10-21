define(['input-handler'], function (InputHandler) {

    MenuTool.prototype = Object.create(InputHandler.prototype);
    MenuTool.prototype.constructor = MenuTool;
    function MenuTool() {
        InputHandler.call(this);
    };
    MenuTool.prototype.__oninit = function () {
        this.__pickController.setFilterByCompatibility();
    };
    MenuTool.prototype.onmouseup = function () {
        this.__pickController.pick();
    };

    return MenuTool;
});
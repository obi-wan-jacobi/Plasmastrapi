define(['input-handler'], function (InputHandler) {

    MenuTool.prototype = Object.create(InputHandler.prototype);
    MenuTool.prototype.constructor = MenuTool;
    function MenuTool(engine) {
        InputHandler.call(this, engine);
    };
    MenuTool.prototype.__onload = function () {
    };

    return MenuTool;
});
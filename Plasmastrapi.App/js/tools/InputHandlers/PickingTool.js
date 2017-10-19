define(['input-handler'],
function (InputHandler) {

    PickingTool.prototype = Object.create(InputHandler.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool(engine) {
        InputHandler.call(this, engine);
    };
    PickingTool.prototype.__actionOnDrag = function () {

    };
    PickingTool.prototype.__actionOnMouseUp = function () {

    };

    return PickingTool;
});
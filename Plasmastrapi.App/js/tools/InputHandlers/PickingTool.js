define(['input-handler'],
function (InputHandler) {

    PickingTool.prototype = Object.create(InputHandler.prototype);
    PickingTool.prototype.constructor = PickingTool;
    function PickingTool() {
        InputHandler.call(this);
    };
    PickingTool.prototype.__actionOnDrag = function () {

    };
    PickingTool.prototype.__actionOnMouseUp = function () {

    };

    return PickingTool;
});
define([
    "../Base/ToolbarButton",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Graphics",
    "gameConfig"
],
function (ToolbarButton, $, Graphics, config) {

    // CLASS ToolButton
    ToolButton.prototype = Object.create(ToolbarButton.prototype);
    ToolButton.prototype.constructor = ToolButton;
    function ToolButton(x, y, labelText, image, toolController, fnOnPick) {
        var imageHandle = new Graphics.ImageHandle(
            config.ToolButton.displayLayer,
            0,
            0,
            image.width,
            image.height,
            image.width,
            image.height,
            image
        );
        ToolbarButton.call(this, x, y, labelText, imageHandle, toolController, fnOnPick);
    };

    return ToolButton;
});
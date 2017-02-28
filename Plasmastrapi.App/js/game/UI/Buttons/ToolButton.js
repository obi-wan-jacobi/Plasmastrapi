define(["../Base/ToolbarButton", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics"], function (ToolbarButton, $, Graphics) {

    // CLASS ToolButton
    ToolButton.prototype = Object.create(ToolbarButton.prototype);
    ToolButton.prototype.constructor = ToolButton;
    function ToolButton(x, y, labelText, image, toolController, fnOnPick) {
        // predefined parameters
        var displayLayer = 'ondrawuientities';
        var imageHandle = new Graphics.ImageHandle(displayLayer, 0, 0, image.width, image.height, image.width, image.height, image);
        ToolbarButton.call(this, x, y, labelText, imageHandle, toolController, fnOnPick);
    };

    return ToolButton;
});
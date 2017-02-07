define(["../Base/Button", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics"], function (Button, $, Graphics) {

    // CLASS ToolButton
    ToolButton.prototype = Object.create(Button.prototype);
    ToolButton.prototype.constructor = ToolButton;
    function ToolButton(x, y, image, toolController, fnOnPick) {
        // predefined parameters
        var displayLayer = 'ondrawuientities';
        var imageHandle = new Graphics.ImageHandle(displayLayer, 0, 0, image.width, image.height, image.width, image.height, image);
        Button.call(this, x, y, imageHandle, toolController, fnOnPick);
    };

    return ToolButton;
});
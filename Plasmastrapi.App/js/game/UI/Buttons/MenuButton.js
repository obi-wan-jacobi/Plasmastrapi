define(["../Base/Button", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics"], function (Button, $, Graphics) {

    // CLASS MenuButton
    MenuButton.prototype = Object.create(Button.prototype);
    MenuButton.prototype.constructor = MenuButton;
    function MenuButton(x, y, labelText, image, toolController, fnOnPick) {
        // predefined parameters
        var displayLayer = 'ondrawuientities';
        var imageHandle = new Graphics.ImageHandle(displayLayer, 0, 0, image.width, image.height, image.width, image.height, image);
        Button.call(this, x, y, labelText, imageHandle, toolController, fnOnPick);
    };

    return MenuButton;
});
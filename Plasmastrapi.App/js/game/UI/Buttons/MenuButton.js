define([
    "../Base/Button",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Graphics",
    "gameConfig"
],
function (Button, $, Graphics, config) {

    // CLASS MenuButton
    MenuButton.prototype = Object.create(Button.prototype);
    MenuButton.prototype.constructor = MenuButton;
    function MenuButton(x, y, labelText, image, toolController, fnOnPick) {
        var imageHandle = new Graphics.ImageHandle(
            config.MenuButton.displayLayer,
            0,
            0,
            image.width,
            image.height,
            image.width,
            image.height,
            image
        );
        Button.call(this, x, y, labelText, imageHandle, toolController, fnOnPick);
    };

    return MenuButton;
});
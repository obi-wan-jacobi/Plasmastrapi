define([
    // Base
    'button',
    // Components
    'image-component',
    // Data
    'graphics',
    // Configs
    'game-config'
],
function (Button, ImageComponent, Graphics, config) {

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
        
        var imageComponent = new ImageComponent(imageHandle);

        Button.call(this, x, y, imageHandle.mesh, null, toolController, fnOnPick);
    };

    return MenuButton;
});
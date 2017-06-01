define([
    // Base
    'button',
    // Decorators
    'labelled-decorator',
    // Components
    'image-component',
    // Data
    'mesh',
    'position',
    'rectangle',
    'image-handle',
    'text-display-settings',
    // Configs
    'draggable',
    'game-config'
],
function (Button, LabelledDecorator, ImageComponent, Mesh, Position, Rectangle, ImageHandle, TextDisplaySettings, Draggable, config) {

    // CLASS ToolButton
    ToolButton.prototype = Object.create(Button.prototype);
    ToolButton.prototype.constructor = ToolButton;
    function ToolButton(x, y, labelText, image, callee, fnOnPick) {
        // private variables
        var imageHandle = new ImageHandle(
            config.ToolButton.imageHandleDisplayLayer,
            0,
            0,
            image.width,
            image.height,
            image.width,
            image.height,
            image
        );

        // inherits from
        Button.call(this, x, y, new Mesh(new Rectangle(image.width, image.height)), null, callee, fnOnPick);

        // configure image
        var imageComponent = new ImageComponent(imageHandle);
        this.addComponent(imageComponent);

        // configure label
        var TextDisplaySettings = new TextDisplaySettings(
            config.ToolButton.textLabelDisplayLayer,
            new Position(0, imageHandle.image.height + config.ToolButton.textLabelOffsetBufferY),
            labelText
        );

        LabelledDecorator.call(this, TextDisplaySettings);

        // tool compatibility
        Draggable.call(this);
    };

    return ToolButton;
});
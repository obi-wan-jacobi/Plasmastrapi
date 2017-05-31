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
    'text-label-display-options',
    // Configs
    'draggable',
    'game-config'
],
function (Button, LabelledDecorator, ImageComponent, Mesh, Position, Rectangle, ImageHandle, TextLabelDisplayOptions, Draggable, config) {

    // CLASS ToolButton
    ToolButton.prototype = Object.create(Button.prototype);
    ToolButton.prototype.constructor = ToolButton;
    function ToolButton(x, y, labelText, image, callee, fnOnPick) {
        // private variables
        var imageHandle = new Graphics.ImageHandle(
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
        Button.call(this, x, y, new Geometry.Mesh(new Geometry.Rectangle(image.width, image.height)), null, callee, fnOnPick);

        // configure image
        var imageComponent = new ImageComponent(imageHandle);
        this.addComponent(imageComponent);

        // configure label
        var textLabelDisplayOptions = new Graphics.TextLabelDisplayOptions(
            config.ToolButton.textLabelDisplayLayer,
            new Position(0, imageHandle.image.height + config.ToolButton.textLabelOffsetBufferY),
            labelText
        );

        LabelledDecorator.call(this, textLabelDisplayOptions);

        // tool compatibility
        Draggable.call(this);
    };

    return ToolButton;
});
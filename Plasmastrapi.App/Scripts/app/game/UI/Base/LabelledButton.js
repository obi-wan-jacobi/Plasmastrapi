define([
    // Base
    'button',
    // UI
    'text-label',
    // Data
    'geometry',
    'graphics',
    // Configs
    'game-config'
],
    function (Button, TextLabel, Geometry, Graphics, config) {

    // CLASS LabelledButton
    LabelledButton.prototype = Object.create(Button.prototype);
    LabelledButton.prototype.constructor = LabelledButton;
    function LabelledButton(x, y, labelText, image, callee, fnOnPick) {
        var imageHandle = new Graphics.ImageHandle(
            config.LabelledButton.displayLayer,
            0,
            0,
            image.width,
            image.height,
            image.width,
            image.height,
            image
        );
        // inherits from
        Button.call(this, x, y, new Geometry.Mesh(new Geometry.Rectangle(image.width, image.height)), meshDisplayOptions, callee, fnOnPick);

        // configure label
        var textLabelDisplayOptions = new Graphics.TextLabelDisplayOptions(
            config.LabelledButton.textLabelDisplayLayer,
            new Geometry.Position(0, imageHandle.image.height + config.LabelledButton.textLabelOffsetBufferY),
            labelText
        );
        var label = new TextLabel(this, textLabelDisplayOptions);
    };

    return LabelledButton;
});
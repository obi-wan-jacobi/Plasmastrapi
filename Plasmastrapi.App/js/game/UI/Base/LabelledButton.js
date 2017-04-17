define([
    "./Button",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Namespaces/$Data",
    "../../Namespaces/$Compatibility",
    "./TextLabel",
    "gameConfig"
],
function (Button, $, $Data, $Compatibility, TextLabel, config) {

    // CLASS LabelledButton
    LabelledButton.prototype = Object.create(Button.prototype);
    LabelledButton.prototype.constructor = LabelledButton;
    function LabelledButton(x, y, labelText, image, callee, fnOnPick) {
        var imageHandle = new $Data.Graphics.ImageHandle(
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
        Button.call(this, x, y, new $Data.Geometry.Mesh(new $Data.Geometry.Rectangle(image.width, image.height)), meshDisplayOptions, callee, fnOnPick);

        // configure label
        var textLabelDisplayOptions = new $Data.Graphics.TextLabelDisplayOptions(
            config.LabelledButton.textLabelDisplayLayer,
            new $Data.Geometry.Position(0, imageHandle.image.height + config.LabelledButton.textLabelOffsetBufferY),
            labelText
        );
        var label = new TextLabel(this, textLabelDisplayOptions);
    };

    return LabelledButton;
});
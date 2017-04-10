define([
    "./Button",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Namespaces/$Data",
    "../../Namespaces/$Compatibility",
    "./TextLabel",
    "gameConfig"
],
function (Button, $, $Data, $Compatibility, TextLabel, config) {

    // CLASS ToolbarButton
    ToolbarButton.prototype = Object.create(Button.prototype);
    ToolbarButton.prototype.constructor = ToolbarButton;
    function ToolbarButton(x, y, labelText, image, callee, fnOnPick) {
        var imageHandle = new $Data.Graphics.ImageHandle(
            config.ToolbarButton.displayLayer,
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
        var textLabelDisplayOptions = new $Data.Graphics.TextLabelDisplayOptions(
            config.ToolbarButton.textLabelDisplayLayer,
            new $Data.Geometry.Position(0, imageHandle.image.height + config.ToolbarButton.textLabelOffsetBufferY),
            labelText
        );
        var label = new TextLabel(this, textLabelDisplayOptions);
    };

    return ToolbarButton;
});
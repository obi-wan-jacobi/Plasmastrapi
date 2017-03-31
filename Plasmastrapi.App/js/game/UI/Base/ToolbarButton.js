define([
    "./Button",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Namespaces/$Data",
    "../../Namespaces/$PickableTraits",
    "./TextLabel",
    "gameConfig"
],
function (Button, $, $Data, $PickableTraits, TextLabel, config) {

    // CLASS ToolbarButton
    ToolbarButton.prototype = Object.create(Button.prototype);
    ToolbarButton.prototype.constructor = ToolbarButton;
    function ToolbarButton(x, y, labelText, imageHandle, callee, fnOnPick) {
        // inherits from
        Button.call(this, x, y, imageHandle, callee, fnOnPick);

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
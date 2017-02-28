define([
    "./Button",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Namespaces/$Data",
    "../../Namespaces/$PickableTraits",
    "./TextLabel"
],
function (Button, $, $Data, $PickableTraits, TextLabel) {

    // CLASS ToolbarButton
    ToolbarButton.prototype = Object.create(Button.prototype);
    ToolbarButton.prototype.constructor = ToolbarButton;
    function ToolbarButton(x, y, labelText, imageHandle, callee, fnOnPick) {
        // inherits from
        Button.call(this, x, y, imageHandle, callee, fnOnPick);

        // configure label
        var textLabelDisplayOptions = new $Data.Graphics.TextLabelDisplayOptions('ondrawuientities', new $Data.Geometry.Position(0, imageHandle.image.height + 3), labelText);
        var label = new TextLabel(this, textLabelDisplayOptions);
    };

    return ToolbarButton;
});
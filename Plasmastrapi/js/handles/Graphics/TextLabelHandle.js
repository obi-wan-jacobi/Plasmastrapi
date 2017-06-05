define([], function () {

    function TextLabelHandle(text, textDisplaySettings) {
        this.text = text;
        this.textDisplaySettings = textDisplaySettings;
    };
    TextLabelHandle.prototype.draw = function (ctx, position, orientation) {
        var textDisplaySettings = this.textDisplaySettings;
        ctx.save();
        ctx.font = textDisplaySettings.fontSize + "px " + textDisplaySettings.font;
        ctx.fillStyle = textDisplaySettings.fillStyle;
        ctx.textAlign = textDisplaySettings.textAlign;
        ctx.fillText(this.text, position.x, position.y);
        ctx.restore();
    };

    return ImageHandle;
});
define(['handle', 'text', 'text-display-settings'], function (Handle, Text, TextDisplaySettings) {
    
    TextHandle.prototype = Object.create(Handle.prototype);
    TextHandle.prototype.constructor = TextHandle;
    function TextHandle(text, textDisplaySettings) {
        Handle.call(this, text, textDisplaySettings, Text, TextDisplaySettings);
    };
    TextHandle.prototype.draw = function (ctx, position, orientation) {
        var textDisplaySettings = this.textDisplaySettings;
        ctx.save();
        ctx.font = textDisplaySettings.fontSize + 'px ' + textDisplaySettings.font;
        ctx.fillStyle = textDisplaySettings.fillStyle;
        ctx.textAlign = textDisplaySettings.textAlign;
        ctx.fillText(this.text, position.x, position.y);
        ctx.restore();
    };

    return ImageHandle;
});
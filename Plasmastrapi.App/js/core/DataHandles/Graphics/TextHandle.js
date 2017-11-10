define(['data-handle', 'text', 'text-display-settings'], function (DataHandle, Text, TextDisplaySettings) {
    
    TextHandle.prototype = Object.create(DataHandle.prototype);
    TextHandle.prototype.constructor = TextHandle;
    function TextHandle(text, textDisplaySettings) {
        DataHandle.call(this, text, textDisplaySettings, Text, TextDisplaySettings);
    };
    TextHandle.prototype.draw = function (ctx, position, orientation) {
        var textDisplaySettings = this.__displaySettings;
        var offset = textDisplaySettings.offset;
        ctx.save();
        ctx.font = `${textDisplaySettings.fontSize}px ${textDisplaySettings.font}`;
        ctx.fillStyle = textDisplaySettings.fillStyle;
        ctx.textAlign = textDisplaySettings.textAlign;
        ctx.fillText(this.__data.string, position.x + offset.x, position.y + offset.y);
        ctx.restore();
    };

    return TextHandle;
});
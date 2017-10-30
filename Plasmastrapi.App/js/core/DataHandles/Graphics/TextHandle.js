define(['data-handle', 'text', 'text-display-settings'], function (DataHandle, Text, TextDisplaySettings) {
    
    TextHandle.prototype = Object.create(DataHandle.prototype);
    TextHandle.prototype.constructor = TextHandle;
    function TextHandle(text, textDisplaySettings) {
        DataHandle.call(this, text, textDisplaySettings, Text, TextDisplaySettings);
    };
    TextHandle.prototype.draw = function (ctx, position, orientation) {
        var textDisplaySettings = this.__displaySettings;
        ctx.save();
        ctx.font = `${textDisplaySettings.fontSize}px ${textDisplaySettings.font}`;
        ctx.fillStyle = textDisplaySettings.fillStyle;
        ctx.textAlign = textDisplaySettings.textAlign;
        ctx.fillText(this.__data.string, position.x, position.y+7);
        ctx.restore();
    };

    return TextHandle;
});
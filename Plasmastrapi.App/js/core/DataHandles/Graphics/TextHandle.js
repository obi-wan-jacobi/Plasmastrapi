define(['data-handle', 'validator'],
function (DataHandle, validator) {
    
    TextHandle.prototype = Object.create(DataHandle.prototype);
    TextHandle.prototype.constructor = TextHandle;
    function TextHandle(text, textDisplaySettings) {
        DataHandle.call(this, text, textDisplaySettings);
    };
    TextHandle.prototype.draw = function (ctx, position, orientation) {
        validator.validateInstanceType(this, position, 'position');
        validator.validateInstanceType(this, orientation, 'number');
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
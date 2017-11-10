define(['display-settings'], function (DisplaySettings) {

    TextDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    TextDisplaySettings.prototype.constructor = TextDisplaySettings;
    function TextDisplaySettings(displayLayer, offset, fontSize, font, colour, alignment) {
        DisplaySettings.call(this, displayLayer || 'none');
        this.offset = offset || { x: 0, y: 0 };
        this.fontSize = fontSize || 22;
        this.font = font || "Times New Roman";
        this.fillStyle = colour || 'grey';
        this.textAlign = alignment || 'center';
    };

    return TextDisplaySettings;
});
define(['display-settings'], function (DisplaySettings) {

    TextDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    TextDisplaySettings.prototype.constructor = TextDisplaySettings;
    function TextDisplaySettings(displayLayer, offset, text, fontSize, font, colour, alignment) {
        DisplaySettings.call(this, displayLayer);
        this.offset = offset || { x: 0, y: 0 };
        this.text = text || "";
        this.fontSize = fontSize || 15;
        this.font = font || "Times New Roman";
        this.fillStyle = colour || '#FFFFFF';
    };

    return TextDisplaySettings;
});
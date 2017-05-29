define([], function () {

    function TextDisplaySettings(displayLayer, offset, text, fontSize, font, colour, alignment) {
        this.displayLayer = displayLayer;
        this.offset = offset || { x: 0, y: 0 };
        this.text = text || "";
        this.fontSize = fontSize || 15;
        this.font = font || "Times New Roman";
        this.fillStyle = colour || '#FFFFFF';
    };

    return TextDisplaySettings;
});
define(['display-settings'], function (DisplaySettings) {

    MeshDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    MeshDisplaySettings.prototype.constructor = MeshDisplaySettings;
    function MeshDisplaySettings(displayLayer, strokeStyle, fillStyle, lineWidth) {
        DisplaySettings.call(this, displayLayer);
        this.strokeStyle = strokeStyle || 'white';
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth || 1;
    };

    return MeshDisplaySettings;
});
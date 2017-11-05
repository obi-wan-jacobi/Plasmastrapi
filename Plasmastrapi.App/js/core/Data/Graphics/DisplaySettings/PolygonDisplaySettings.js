define(['display-settings'], function (DisplaySettings) {

    PolygonDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    PolygonDisplaySettings.prototype.constructor = PolygonDisplaySettings;
    function PolygonDisplaySettings(displayLayer, strokeStyle, fillStyle, lineWidth) {
        DisplaySettings.call(this, displayLayer || 'none');
        this.strokeStyle = strokeStyle || 'white';
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth || 1;
    };

    return PolygonDisplaySettings;
});
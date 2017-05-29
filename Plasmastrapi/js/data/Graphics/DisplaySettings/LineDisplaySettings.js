define([], function () {

    function LineDisplaySettings(displayLayer, strokeStyle, lineWidth) {
        this.displayLayer = displayLayer;
        this.strokeStyle = strokeStyle || 'white';
        this.lineWidth = lineWidth || 1;
    };

    return LineDisplaySettings;
});
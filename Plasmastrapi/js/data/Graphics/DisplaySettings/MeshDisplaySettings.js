define([], function () {

    function MeshDisplaySettings(displayLayer, strokeStyle, fillStyle, lineWidth) {
        this.displayLayer = displayLayer;
        this.strokeStyle = strokeStyle || 'white';
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth || 1;
    };

    return MeshDisplaySettings;
});
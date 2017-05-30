define([], function () {

    function LineCollisionSettings(lineWidth, lengthModifier) {
        this.lineWidth = lineWidth || 20;
        this.lengthModifier = lengthModifier || 1;
    };

    return LineCollisionSettings;
});
define([], function () {

    function ImageDisplaySettings(displayLayer, sourceX, sourceY, sourceWidth, sourceHeight, destWidth, destHeight) {
        this.displayLayer = displayLayer;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
        this.destWidth = destWidth;
        this.destHeight = destHeight;
    };

    return ImageDisplaySettings;
});
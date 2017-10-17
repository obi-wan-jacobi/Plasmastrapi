define(['display-settings'], function (DisplaySettings) {

    ImageDisplaySettings.prototype = Object.create(DisplaySettings.prototype);
    ImageDisplaySettings.prototype.constructor = ImageDisplaySettings;
    function ImageDisplaySettings(displayLayer, sourceX, sourceY, sourceWidth, sourceHeight, destWidth, destHeight) {
        DisplaySettings.call(this, displayLayer);
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
        this.destWidth = destWidth;
        this.destHeight = destHeight;
    };

    return ImageDisplaySettings;
});
define([], function () {

    function ImageHandle(displayLayer, sourceX, sourceY, sourceWidth, sourceHeight, destWidth, destHeight, image) {
        this.displayLayer = displayLayer;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
        this.destWidth = destWidth;
        this.destHeight = destHeight;
        this.image = image;
    };

    return ImageHandle;
});
define([], function () {

    function SpriteFrameHandle(image, imageDisplaySettings) {
        this.image = image;
        this.imageDisplaySettings = imageDisplaySettings;
    };
    SpriteFrameHandle.prototype.draw = function (ctx, position, orientation) {
        var imageDisplaySettings = this.imageDisplaySettings;
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(orientation);
        // image is translated about its centre rather than its top left corner
        // https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage
        ctx.drawImage(
            this.image,
            imageDisplaySettings.sourceX,
            imageDisplaySettings.sourceY,
            imageDisplaySettings.sourceWidth,
            imageDisplaySettings.sourceHeight,
            -imageDisplaySettings.destWidth / 2,
            -imageDisplaySettings.destHeight / 2,
            imageDisplaySettings.destWidth,
            imageDisplaySettings.destHeight
        );
        ctx.restore();
    };

    return SpriteFrameHandle;
});
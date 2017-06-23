define(['handle', 'image-display-settings'],
function (DataHandle, ImageDisplaySettings) {

    SpriteFrameHandle.prototype = Object.create(DataHandle.prototype);
    SpriteFrameHandle.prototype.constructor = SpriteFrameHandle;
    function SpriteFrameHandle(image, imageDisplaySettings) {
        DataHandle.call(this, image, imageDisplaySettings, Image, ImageDisplaySettings);
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
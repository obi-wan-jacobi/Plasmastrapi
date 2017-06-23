define(['handle', 'image-display-settings'],
function (DataHandle, ImageDisplaySettings) {

    ImageHandle.prototype = Object.create(DataHandle.prototype);
    ImageHandle.prototype.constructor = ImageHandle;
    function ImageHandle(image, imageDisplaySettings) {
        DataHandle.call(this, image, imageDisplaySettings, Image, ImageDisplaySettings);
    };
    ImageHandle.prototype.draw = function (ctx, position, orientation) {
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

    return ImageHandle;
});
define(['data-handle', 'image-display-settings', 'validator'],
function (DataHandle, ImageDisplaySettings, validator) {

    ImageHandle.prototype = Object.create(DataHandle.prototype);
    ImageHandle.prototype.constructor = ImageHandle;
    function ImageHandle(image, imageDisplaySettings) {
        DataHandle.call(this, image, imageDisplaySettings, Image, ImageDisplaySettings);
    };
    // public methods
    ImageHandle.prototype.setData = function (data) {
        // validate data for this handle
        validator.validateType(this, data, Image);
        this.__data = data;
    };
    ImageHandle.prototype.draw = function (ctx, position, orientation) {
        var settings = this.__displaySettings;
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(orientation);
        // image is translated about its centre rather than its top left corner
        // https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage
        ctx.drawImage(
            this.__data,
            settings.sourceX,
            settings.sourceY,
            settings.sourceWidth,
            settings.sourceHeight,
            -settings.destWidth / 2,
            -settings.destHeight / 2,
            settings.destWidth,
            settings.destHeight
        );
        ctx.restore();
    };

    return ImageHandle;
});
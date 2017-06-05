define(['component', 'image-handle'],
function (Component, ImageHandle) {
    
	// CLASS ImageComponent
	ImageComponent.prototype = Object.create(Component.prototype);
	ImageComponent.prototype.constructor = ImageComponent;
    function ImageComponent(imageHandle) {
        // inherits from
        Component.call(this, imageHandle, ImageHandle);
    };

	return ImageComponent;
});
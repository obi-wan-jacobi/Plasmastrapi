define(['component', 'mesh', 'position', 'rectangle', 'pose-component'],
function (Component, Mesh, Position, Rectangle, PoseComponent) {
    
	// CLASS ImageComponent
	ImageComponent.prototype = Object.create(Component.prototype);
	ImageComponent.prototype.constructor = ImageComponent;
    function ImageComponent(imageHandle) {
        // inherits from
        Component.call(this, imageHandle);
    };

	return ImageComponent;
});
define(['component', 'geometry', 'pose-component'],
function (Component, Geometry, PoseComponent) {
    
	// CLASS ImageComponent
	ImageComponent.prototype = Object.create(Component.prototype);
	ImageComponent.prototype.constructor = ImageComponent;
    function ImageComponent(imageHandle) {
		// inherits from
		Component.call(this);
		// private variables
		this.__imageHandle = imageHandle;
        // apply mixins
		Component.Mixins.Drawable.call(this, this.__imageHandle.displayLayer);
    };
	// public prototypal variables
	Object.defineProperties(ImageComponent.prototype, {
		'width': {
			get: function() {
				return this.__imageHandle.image.width;
			}
		},
		'height': {
			get: function() {
				return this.__imageHandle.image.height;
			}
		},
		'mesh': {
			get: function() {
				var rectangle = new Geometry.Rectangle(this.width, this.height);
				return new Geometry.Mesh(rectangle);
			}
		}
	});
	// public methods
	ImageComponent.prototype.draw = function(ctx) {
		var imageHandle = this.__imageHandle;
		var pose = this.__entity.getComponent(PoseComponent);
		var position = pose.position;
		var orientation = pose.orientation;
		ctx.save();
		ctx.translate(position.x, position.y);
		ctx.rotate(orientation);
	    // image is translated about its centre rather than its top left corner
	    // https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage
		ctx.drawImage(
            imageHandle.image,
            imageHandle.sourceX,
            imageHandle.sourceY,
            imageHandle.sourceWidth,
            imageHandle.sourceHeight,
            -imageHandle.destWidth / 2,
            -imageHandle.destHeight / 2,
            imageHandle.destWidth,
            imageHandle.destHeight
        );
		ctx.restore();
	};

	return ImageComponent;
});
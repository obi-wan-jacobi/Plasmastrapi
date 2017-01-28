define(["../Objects/Component", "../Data/Geometry", "./PoseComponent"],
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
				return this.__imageHandle.width;
			}
		},
		'height': {
			get: function() {
				return this.__imageHandle.height;
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
	    // source coords are translated against dest of image's centre such source coords will
	    // translate the image about its centre rather than the top left corner
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
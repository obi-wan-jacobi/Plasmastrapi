define(["../Objects/Component", "../Data/Geometry", "./PoseComponent", "./DrawableComponent"],
    function (Component, Geometry, PoseComponent, DrawableComponent) {
    
	// CLASS ImageComponent
	ImageComponent.prototype = Object.create(Component.prototype);
	ImageComponent.prototype.constructor = ImageComponent;
    function ImageComponent(image, imageDisplayOptions) {
		// inherits from
		Component.call(this);
		// private variables
		this.__image = image;
		this.__options = imageDisplayOptions;
        // configure events
		this.addEventListener('onload', this, this.__onload);
		this.addEventListener('onunload', this, this.__onunload);
    };
    // private methods
    ImageComponent.prototype.__onload = function () {
        if (!this.__entity.hasComponent(DrawableComponent))
            throw new Error(this.constructor.name + ":onload - Entity does not contain a DrawableComponent.")
        this.__entity.getComponent(DrawableComponent).addEventListener(this.__displayLayer, this, this.draw);
    };
    ImageComponent.prototype.__onunload = function () {
        this.__entity.getComponent(DrawableComponent).removeEventListener(this.__displayLayer, this, this.draw);
    };
	// public prototypal variables
	Object.defineProperties(ImageComponent.prototype, {
		'width': {
			get: function() {
				return this.__options.width;
			}
		},
		'height': {
			get: function() {
				return this.__options.height;
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
		var image = this.__image;
		var options = this.__options;
		var pose = this.__entity.getComponent(PoseComponent);
		var position = pose.position;
		var orientation = pose.orientation;
		ctx.save();
		ctx.translate(position.x, position.y);
		ctx.rotate(orientation);
		ctx.drawImage(image, options.sourceX, options.sourceY, options.sourceWidth, options.sourceHeight, -options.destWidth/2, -options.destHeight/2, options.destWidth, options.destHeight);
		ctx.restore();
	};

	return ImageComponent;

});
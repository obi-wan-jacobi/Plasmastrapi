define(["../Objects/Component", "../Data/Geometry", "./PoseComponent"],
    function (Component, Geometry, PoseComponent) {
    
	// CLASS SpriteComponent
	SpriteComponent.prototype = Object.create(Component.prototype);
	SpriteComponent.prototype.constructor = SpriteComponent;
    function SpriteComponent(spriteHandle) {
		// inherits from
		Component.call(this);
		// private variables
		this.__sprite = spriteHandle.sprite;
		this.__options = spriteHandle.displayOptions;
		this.__currentFrameIndex = 0;
        // events
		this.registerEvents(
            'onframechange'
        );
		Component.Mixins.Drawable.call(this, spriteHandle.displayLayer);
    };
	// public prototypal variables
	Object.defineProperties(SpriteComponent.prototype, {
		'width': {
			get: function() {
				return this.__sprite.frames[this.__currentFrameIndex].width;
			}
		},
		'height': {
			get: function() {
				return this.__sprite.frames[this.__currentFrameIndex].height;
			}
		},
		'mesh': {
			get: function() {
				var rectangle = new Geometry.Rectangle(this.width, this.height);
				return new Geometry.Mesh(rectangle);
			}
		},
		'frameIndex': {
		    get: function () {
		        return this.__currentFrameIndex;
		    }
		},
	});
	// public methods
	SpriteComponent.prototype.setFrame = function(frameNumber) {
		if (frameNumber < 0) {
			this.__currentFrameIndex = sprite.frames.length - 1;
		} else if (frameNumber < this.__sprite.frames.length) {
			this.__currentFrameIndex = frameNumber;
		} else if (frameNumber >= this.__sprite.frames.length) {
		    this.__currentFrameIndex = 0;
		}
		this.__fire('onframechange');
	};
	SpriteComponent.prototype.nextFrame = function() {
	    this.setFrame(this.__currentFrameIndex + 1);
	};
	SpriteComponent.prototype.previousFrame = function() {
	    this.setFrame(this.__currentFrameIndex - 1);
	};
	SpriteComponent.prototype.draw = function(ctx) {
		var currentFrame = this.__sprite.frames[this.__currentFrameIndex];
		var pose = this.__entity.getComponent(PoseComponent);
		var position = pose.position;
		var orientation = pose.orientation;
		var width = this.width;
		var height = this.height;
		ctx.save();
		ctx.translate(position.x, position.y);
		ctx.rotate(orientation);
		ctx.drawImage(currentFrame, -width/2, -height/2);
		ctx.restore();
	};

	return SpriteComponent;
});
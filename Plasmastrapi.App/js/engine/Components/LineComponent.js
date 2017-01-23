define(["../Objects/Component", "../Data/Geometry"], function (Component, Geometry) {

	function pow2(arg) {
        return Math.pow(arg, 2);
    };

    function euclideanDistance(p1, p2) {
        return Math.sqrt(pow2(p2.x - p1.x) + pow2(p2.y - p1.y));
    };

	// CLASS LineComponent
	LineComponent.prototype = Object.create(Component.prototype);
	LineComponent.prototype.constructor = LineComponent;
	function LineComponent(tailPoseComponent, headPoseComponent, lineDisplayOptions, /* optional */ lineCollisionOptions) {
		// inherits from
		Component.call(this);
		// private variables
		this.__tailPose = tailPoseComponent,
		this.__headPose = headPoseComponent,
        this.__options = lineDisplayOptions,
        this.__collisionOptions = lineCollisionOptions;
	    // events
		this.__registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
	    // apply decorators
		Component.Decorators.Drawable.call(this, this.__options.displayLayer);
	};
	// private methods
	LineComponent.prototype.__onload = function () {
		this.__tailPose.addEventListener('onpositionchange', this, this.__$onpositionchange);
		this.__tailPose.addEventListener('onorientationchange', this, this.__$onorientationchange);
		this.__headPose.addEventListener('onpositionchange', this, this.__$onpositionchange);
		this.__headPose.addEventListener('onorientationchange', this, this.__$onorientationchange);
	};
	LineComponent.prototype.__onunload = function() {
	    this.__tailPose.removeEventListener('onpositionchange', this, this.__$onpositionchange);
	    this.__tailPose.removeEventListener('onorientationchange', this, this.__$onorientationchange);
	    this.__headPose.removeEventListener('onpositionchange', this, this.__$onpositionchange);
	    this.__headPose.removeEventListener('onorientationchange', this, this.__$onorientationchange);
	};
	// public prototypal variables
	Object.defineProperties(LineComponent.prototype, {
		'position': { // location of line's center
			get: function() {
				var head = this.__headPose.position;
				var tail = this.__tailPose.position;
				var x = Math.abs(head.x - tail.x)/2;
				var y = Math.abs(head.y - tail.y)/2;
				return new Geometry.Position(x, y);
			}
		},
		'orientation': { // heading from tail to head
			get: function() {
				var head = this.__headPose.position;
				var tail = this.__tailPose.position;
				var x = Math.abs(head.x - tail.x)/2;
				var y = Math.abs(head.y - tail.y)/2;
				return Math.atan(y/x);
			}
		},
		'length': { // euclidean distance from tail to head
			get: function() {
				return euclideanDistance(this.__tailPose.position, this.__headPose.position);
			}
		},
		'mesh': { // line converted into static rectangular mesh
			get: function() {
				if (!this.__collisionOptions) {
					throw new Error(this.constructor.name + ':get mesh - No LineCollisionOptions have been specified.');
				}
				var rectangle = new Geometry.Rectangle(
					this.length * this.__collisionOptions.lengthModifier,
					this.__collisionOptions.lineWidth
				);
				return new Geometry.Mesh(rectangle);
			}
		}
	});
	// public methods
	LineComponent.prototype.draw = function(ctx) {
		// draw line and apply optionss
		var head = this.__headPose.position;
		var tail = this.__tailPose.position;
		var options = this.__options;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(tail.x, tail.y);
		ctx.lineTo(head.x, head.y);
		ctx.strokeStyle = options.strokeStyle;
		ctx.lineWidth = options.lineWidth;
		ctx.stroke()
		ctx.restore();
	};

	return LineComponent;
});
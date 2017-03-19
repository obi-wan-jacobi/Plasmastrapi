define(["../Objects/Component", "../Data/Geometry", "../Data/Physics"], function (Component, Geometry, Physics) {

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
		this.registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
	    // apply mixins
		Component.Mixins.Drawable.call(this, this.__options.displayLayer);
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
				var x = Math.abs(head.x + tail.x)/2;
				var y = Math.abs(head.y + tail.y)/2;
				return new Geometry.Position(x, y);
			}
		},
		'orientation': { // heading from tail to head
			get: function() {
				var head = this.__headPose.position;
				var tail = this.__tailPose.position;
				var x = (head.x - tail.x);
				var y = (head.y - tail.y);
				if (x < 0) {
				    return Math.PI + Math.atan(y / x);
				}
				return Math.atan(y / x);
			}
		},
		'length': { // euclidean distance from tail to head
			get: function() {
				return Geometry.euclideanDistance(this.__tailPose.position, this.__headPose.position);
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
		},
		'collisionOptions': { // line converted into static rectangular mesh
		    set: function (collisionOptions) {
		        if (!(collisionOptions instanceof Physics.LineCollisionOptions)) {
		            throw new Error(this.constructor.name + ":set collisionOptions - " + collisionOptions.constructor.name + " must be of type " + Physics.LineCollisionOptions.name);
		        }
		        this.__collisionOptions = collisionOptions;
		    }
		},
		'displayOptions': {
		    get: function () {
		        return this.__options;
		    },
		    set: function (displayOptions) {
		        if (!this.__options) {
		            throw new Error(this.constructor.name + ':displayOptions set - Display options can only be replaced, not injected.');
		        }
		        if (!displayOptions.displayLayer === this.__options.displayLayer) {
		            throw new Error(this.constructor.name + ':displayOptions set - The display layer cannot be modified at this level.')
		        }
		        this.__options = displayOptions
		    }
		}
	});
	// public methods
	LineComponent.prototype.draw = function(ctx) {
		// draw line and apply options
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
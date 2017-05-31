define(['component', 'position'],
function (Component, Position) {

	// CLASS PoseComponent
	PoseComponent.prototype = Object.create(Component.prototype);
	PoseComponent.prototype.constructor = PoseComponent;
	function PoseComponent(position, orientation) {
		// inherits from
		Component.call(this);
		// private variables
		this.__position = position;
		this.__orientation = orientation;
	    // events
		this.registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
	};
	// public prototypal variables
	Object.defineProperties(PoseComponent.prototype, {
		'position': {
			get: function() {
				return this.__position;
			},
			set: function(newPosition) {
				if (!(newPosition instanceof Position)) {
					throw new Error(this.constructor.name + ':position set - ' + newPosition + ' is not an instance of Position.');
				}
				var oldPosition = this.__position;
				this.__position = newPosition;
				this.__fire('onpositionchange', newPosition, oldPosition);
			}
		},
		'orientation': {
			get: function() {
				return this.__orientation;
			},
			set: function(newOrientation) {
				var oldOrientation = this.__orientation;
				this.__orientation = newOrientation;
				this.__fire('onorientationchange', newOrientation, oldOrientation);
			}
		}
	});

    return PoseComponent;
});
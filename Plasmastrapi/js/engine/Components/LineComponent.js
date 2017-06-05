define(['component', 'line-handle'],
function (Component, LineHandle) {

	// CLASS LineComponent
	LineComponent.prototype = Object.create(Component.prototype);
	LineComponent.prototype.constructor = LineComponent;
	function LineComponent(tailPoseComponent, headPoseComponent) {
        // private variables
        this.__tailPose = tailPoseComponent;
        this.__headPose = headPoseComponent;
        // inherits from
        Component.call(this, new LineHandle(this.__tailPose.Position, this.__headPose.Position));
	    // events
		this.registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
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

	return LineComponent;
});
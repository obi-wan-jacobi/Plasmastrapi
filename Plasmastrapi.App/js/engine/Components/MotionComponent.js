define(["../Objects/Component"], function (Component) {

	// CLASS MotionComponent
	MotionComponent.prototype = Object.create(Component.prototype);
	MotionComponent.prototype.constructor = MotionComponent;
	function MotionComponent() {
	    // inherits from
	    Component.call(this);
	    // private variables

	    // private methods

	    // configure component

	};

    return MotionComponent;
	
});
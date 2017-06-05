define(['component', 'position'],
function (Component, Position) {

	// CLASS PoseComponent
	PoseComponent.prototype = Object.create(Component.prototype);
	PoseComponent.prototype.constructor = PoseComponent;
	function PoseComponent(poseHandle) {
        // inherits from
        Component.call(this, poseHandle);
	    // events
		this.registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
        // inject event callbacks into handle
        this.__injectHandleMethodEventCallback('setPosition', 'onpositionchange');
        this.__injectHandleMethodEventCallback('setOrientation', 'onorientationchange');
	};

    return PoseComponent;
});
define(['component', 'position'],
function (Component, Position) {

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
        this.__attachEventTriggerToHandleMethod('setPosition', 'onpositionchange');
        this.__attachEventTriggerToHandleMethod('setOrientation', 'onorientationchange');
	};
	PoseComponent.prototype.follow = function (poseComponentToFollow, positionOffset) {
        // *** closures ***
	    poseComponentToFollow.addEventListener('onpositionchange', this, function () {
	        var position = poseComponentToFollow.getHandle().getPosition();
	        var orientation = poseComponentToFollow.getHandle().getOrientation();
	        var templateX = positionOffset.x;
	        var templateY = positionOffset.y;
	        var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
	        var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
	        this.getHandle().setPosition(new Position(x, y));
	    });
	    poseComponentToFollow.addEventListener('onorientationchange', this.getHandle(), function (newOrientation) {
	        this.setOrientation(newOrientation);
	    });
	};

    return PoseComponent;
});
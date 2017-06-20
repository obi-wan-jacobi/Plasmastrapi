define(['component', 'mesh', 'position', 'rectangle', 'pose-component'],
function (Component, Mesh, Position, Rectangle, PoseComponent) {
    
	// CLASS SpriteComponent
	SpriteComponent.prototype = Object.create(Component.prototype);
	SpriteComponent.prototype.constructor = SpriteComponent;
    function SpriteComponent(spriteHandle) {
		// inherits from
		Component.call(this, spriteHandle);
        // events
		this.__registerEvents(
            'onframechange'
        );
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod('setFrame', 'onframechange');
        this.__attachEventTriggerToHandleMethod('nextFrame', 'onframechange');
        this.__attachEventTriggerToHandleMethod('previousFrame', 'onframechange');
    };

	return SpriteComponent;
});
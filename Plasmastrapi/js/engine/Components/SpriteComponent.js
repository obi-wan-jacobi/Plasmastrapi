define(['component', 'mesh', 'position', 'rectangle', 'pose-component'],
function (Component, Mesh, Position, Rectangle, PoseComponent) {
    
	// CLASS SpriteComponent
	SpriteComponent.prototype = Object.create(Component.prototype);
	SpriteComponent.prototype.constructor = SpriteComponent;
    function SpriteComponent(spriteHandle) {
		// inherits from
		Component.call(this, spriteHandle);
        // events
		this.registerEvents(
            'onframechange'
        );
        // inject event callbacks into handle
        this.__injectHandleMethodEventCallback('setFrame', 'onframechange');
        this.__injectHandleMethodEventCallback('nextFrame', 'onframechange');
        this.__injectHandleMethodEventCallback('previousFrame', 'onframechange');
    };

	return SpriteComponent;
});
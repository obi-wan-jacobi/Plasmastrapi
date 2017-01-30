define(["../Objects/Component"], function(Component) {
    
	// CLASS CollidableComponent
	CollidableComponent.prototype = Object.create(Component.prototype);
	CollidableComponent.prototype.constructor = CollidableComponent;
    function CollidableComponent() {
        Component.call(this);
        // events
        this.registerEvents(
            'oncollision'
        );
	};
	CollidableComponent.prototype.collide = function(withEntity) {
		this.__fire('oncollision', withEntity);
	};

	return CollidableComponent;
});
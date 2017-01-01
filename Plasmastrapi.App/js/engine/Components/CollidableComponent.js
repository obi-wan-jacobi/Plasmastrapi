define(["./Component"], function(Component) {
    
	// CLASS CollidableComponent
	CollidableComponent.prototype = Object.create(Component.prototype);
	CollidableComponent.prototype.constructor = CollidableComponent;
    function CollidableComponent() {
		Component.call(this);
	};
	CollidableComponent.prototype.collide = function(withEntity) {
		this.__fire('oncollision', withEntity);
	};
	
	// events
    CollidableComponent.prototype.__registerEvents(
	    'oncollision'
    );

	return CollidableComponent;

});
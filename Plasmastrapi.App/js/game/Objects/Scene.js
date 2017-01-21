define(["../../engine/Objects/EventEmitter", "../../engine/Objects/Entity", "../../engine/Objects/AtomicArray"],
    function (EventEmitter, Entity, AtomicArray) {

    // CLASS Scene
    Scene.prototype = Object.create(EventEmitter.prototype);
    Scene.prototype.constructor = Scene;
	function Scene() {
        EventEmitter.call(this);
		// private variables
		this.__contents = new AtomicArray(Entity);
	};
	// private methods
	Scene.prototype.__onload = function() {
		this.__contents.forEach(function(entity) {
			entity.load();
		});
	};
	Scene.prototype.__onunload = function() {
		this.__contents.forEach(function(entity) {
			entity.unload();
		});
	};
    // public methods
	Scene.prototype.injectEngine = function (engine) {
	    EventEmitter.prototype.injectEngine.call(this, engine);
	    this.__engine.addEventListener('onload', this, this.load);
	    this.__engine.addEventListener('onunload', this, this.unload);
	};
	Scene.prototype.add = function(entity) {
		this.__contents.push(entity);
		entity.addEventListener('ondestroy', this, this.remove);
		if (this.isLoaded) {
		    if (!entity.__engine) {
		        entity.injectEngine(this.__engine);
		    }
			entity.load();
		}
	};
	Scene.prototype.remove = function(entity) {
		var removedElement = this.__contents.splice(entity);
		if (removedElement) {
			removedElement.removeEventListener('ondestroy', this, this.remove);
		}
	};

	// apply event mixins
    EventEmitter.Mixins.Loadable.call(Scene.prototype);

	return Scene;
});
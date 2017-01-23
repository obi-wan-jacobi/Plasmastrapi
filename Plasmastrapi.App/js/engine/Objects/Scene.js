define(["../../engine/Objects/EventEmitter", "../../engine/Objects/Entity", "../../engine/Objects/AtomicArray"],
    function (EventEmitter, Entity, AtomicArray) {

    // CLASS Scene
    Scene.prototype = Object.create(EventEmitter.prototype);
    Scene.prototype.constructor = Scene;
	function Scene() {
        EventEmitter.call(this);
		// private variables
        this.__contents = new AtomicArray(Entity);
	    // apply event mixins
        EventEmitter.Mixins.Loadable.call(this, true);
	};
    // private methods
	Scene.prototype.__onload = function () {
	    this.__engine.entityContainer.addEventListener('onadd', this, this.__addEntity);
	    this.__engine.entityContainer.addEventListener('onremove', this, this.__removeEntity);
		this.__contents.forEach(function(entity) {
			entity.load();
		});
	};
	Scene.prototype.__onunload = function() {
		this.__contents.forEach(function(entity) {
			entity.unload();
		});
		this.__engine.entityContainer.removeEventListener('onadd', this, this.__addEntity);
		this.__engine.entityContainer.removeEventListener('onremove', this, this.__removeEntity);
	};
	Scene.prototype.__addEntity = function (entity) {
	    this.__contents.push(entity);
	    if (this.isLoaded) {
	        entity.load();
	    }
	};
	Scene.prototype.__removeEntity = function (entity) {
	    var removedElement = this.__contents.splice(entity);
	    if (removedElement.isLoaded) {
	        removedElement.unload();
	    }
	};
    // public methods
	Scene.prototype.injectEngine = function (engine) {
	    EventEmitter.prototype.injectEngine.call(this, engine);
	    this.__contents.forEach(function (entity) {
	        if (!entity.isEngineInjected) {
	            entity.injectEngine(this.__engine);
	        }
	    });
	};
	Scene.prototype.add = function (entity) {
	    if (this.isEngineInjected && !entity.isEngineInjected) {
	        // this will trigger entityContainer-->onadd-->entity
	        entity.injectEngine(this.__engine);
	    }
	    // if scene is loaded we're already listening on the entity being added to it's container
        // so only explicitly add the entity if we aren't loaded
	    if (!this.isLoaded) {
	        this.__addEntity(entity);
	    }
	};
	Scene.prototype.remove = function (entity) {
	    this.__removeEntity(entity);
	};

	return Scene;
});
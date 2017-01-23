define(["../../engine/Objects/EventEmitter", "../../engine/Objects/Entity", "../../engine/Objects/AtomicArray"],
    function (EventEmitter, Entity, AtomicArray) {

    // CLASS Scene
    Scene.prototype = Object.create(EventEmitter.prototype);
    Scene.prototype.constructor = Scene;
	function Scene() {
        EventEmitter.call(this);
		// private variables
        this.__contents = new AtomicArray(Entity);
	    // apply decorators
        EventEmitter.Decorators.Loadable.call(this);
	};
    // private methods
	Scene.prototype.__onload = function () {
		this.__contents.forEach(function(entity) {
			entity.load();
		});
	};
	Scene.prototype.__onunload = function() {
		this.__contents.forEach(function(entity) {
			entity.unload();
		});
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
	        entity.injectEngine(this.__engine);
	    }
	    this.__addEntity(entity);
	};
	Scene.prototype.remove = function (entity) {
	    this.__removeEntity(entity);
	};

	return Scene;
});
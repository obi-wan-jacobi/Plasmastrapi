define(['event-emitter', 'entity', 'atomic-array'],
function (EventEmitter, Entity, AtomicArray) {

    // CLASS Scene
    Scene.prototype = Object.create(EventEmitter.prototype);
    Scene.prototype.constructor = Scene;
	function Scene() {
        EventEmitter.call(this);
		// private variables
        this.__contents = new AtomicArray(Entity);
	    // apply mixins
        EventEmitter.Mixins.Loadable.call(this);
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
    // public methods
	Scene.prototype.injectEngine = function (engine) {
	    EventEmitter.prototype.injectEngine.call(this, engine);
	    this.__contents.forEach(function (entity) {
	        if (!entity.isEngineInjected) {
	            entity.injectEngine(this.__engine);
	        }
	    }, this);
	};
	Scene.prototype.add = function (entity) {
	    if (this.isEngineInjected && !entity.isEngineInjected) {
	        entity.injectEngine(this.__engine);
	    }
	    this.__contents.push(entity);
	    if (this.isLoaded) {
	        entity.load();
	    }
	    entity.addEventListener('ondestroy', this, this.remove);
	};
	Scene.prototype.remove = function (entity) {
	    var removedElement = this.__contents.splice(entity);
	    if (removedElement.isLoaded) {
	        removedElement.unload();
	    }
	};

	return Scene;
});
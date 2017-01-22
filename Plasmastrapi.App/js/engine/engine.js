define(["./Objects/System",
    "./Loaders/ImageLoader", "./Loaders/SpriteLoader",
    "./Containers/EntityContainer", "./Containers/EventEmitterContainer",
    "./Systems/InputSystem", "./Systems/DrawSystem", "./Systems/PickSystem"],
    function(System, ImageLoader, SpriteLoader, EntityContainer, EventEmitterContainer, InputSystem, DrawSystem, PickSystem) {

	// CLASS Engine
	Engine.prototype = Object.create(System.prototype);
    Engine.prototype.constructor = Engine;
	function Engine(canvas) {
	    System.call(this);
	    // engine is implicitly instantiated
	    delete this.instantiate;
	    delete this.__engine;
        // public variables
		this.canvas = canvas;
	    // pre-init configuration
		this.__registerLoaders();
		this.__registerContainers();
		this.__registerSystems();
	};
    // private methods
	Engine.prototype.__registerLoaders = function() {
	    this['imageLoader'] = new ImageLoader();
	    this['spriteLoader'] = new SpriteLoader();
	};
	Engine.prototype.__registerContainers = function () {
	    this.register('eventEmitterContainer', new EventEmitterContainer());
	    this.register('entityContainer', new EntityContainer());
	};
	Engine.prototype.__registerSystems = function () {
	    this.register('inputSystem', new InputSystem());
	    this.register('drawSystem', new DrawSystem());
	    this.register('pickSystem', new PickSystem());
	};
    // public prototypal variables
	Object.defineProperties(Engine.prototype, {
	    'isInstantiated': {
	        get: function () {
	            // engine is implicitly instantiated
	            return true;
	        }
	    }
	});
	// public methods
	Engine.prototype.register = function (objectName, objectHandle) {
	    if (!objectHandle.instantiate) {
	        throw new Error(this.constructor.name + ":register - The supplied object must implement an 'instantiate' post-bind method.");
	    }
	    this[objectName] = objectHandle;
	    objectHandle.instantiate(this);
	};

	return Engine;
});
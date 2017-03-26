define([
    "./Namespaces/$Containers",
    "./Namespaces/$Loaders",
    "./Namespaces/$Objects",
    "./Namespaces/$Systems",
    "./config"
],
function ($Containers, $Loaders, $Objects, $Systems, config) {

	// CLASS Engine
    Engine.prototype = Object.create($Objects.System.prototype);
    Engine.prototype.constructor = Engine;
	function Engine(canvas) {
	    $Objects.System.call(this);
	    // engine instance is it's own reference
	    delete this.injectEngine;
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
	    this['imageLoader'] = new $Loaders.ImageLoader();
	    this['spriteLoader'] = new $Loaders.SpriteLoader();
	};
	Engine.prototype.__registerContainers = function () {
	    this.register('eventEmitterContainer', new $Containers.EventEmitterContainer());
	    this.register('entityContainer', new $Containers.EntityContainer());
	    this.register('pickablesContainer', new $Containers.PickableComponentContainer());
	};
	Engine.prototype.__registerSystems = function () {
	    this.register('inputSystem', new $Systems.InputSystem());
	    this.register('drawSystem', new $Systems.DrawSystem());
	    this.register('pickSystem', new $Systems.PickSystem());
	};
    // public prototypal variables
	Object.defineProperties(Engine.prototype, {
	    'isEngineInjected': {
	        get: function () {
	            // engine is implicitly it's own reference
	            return true;
	        }
	    }
	});
	// public methods
	Engine.prototype.register = function (objectName, objectHandle) {
	    if (!objectHandle.injectEngine) {
	        throw new Error(this.constructor.name + ":register - The supplied object must implement an 'injectEngine' post-bind method.");
	    }
	    this[objectName] = objectHandle;
	    objectHandle.injectEngine(this);
	};
    // configuration
	Engine.prototype.config = config;

	return Engine;
});

define([
    // Base
    'system',
    // Containers
    'entity-container',
    'emitter-container',
    'pick-component-container',
    // Systems
    'collision-system',
    'draw-system',
    'input-system',
    'motion-system',
    'pick-system'
],
function (System, EntityContainer, EmitterContainer, PickComponentContainer, CollissionSystem, DrawSystem, InputSystem, MotionSystem, PickSystem) {

	// CLASS Engine
    Engine.prototype = Object.create(System.prototype);
    Engine.prototype.constructor = Engine;
    function Engine(canvas) {
	    System.call(this);
	    // engine instance is its own reference
	    delete this.injectEngine;
	    delete this.__engine;
        // public variables
	    this.canvas = canvas;
	    // pre-init configuration
		this.__registerContainers();
		this.__registerSystems();
	};
    // private methods
	Engine.prototype.__registerContainers = function () {
	    this.register('EmitterContainer', new EmitterContainer());
	    this.register('entityContainer', new EntityContainer());
	    this.register('pickablesContainer', new PickComponentContainer());
	};
	Engine.prototype.__registerSystems = function () {
	    this.register('inputSystem', new InputSystem());
	    this.register('drawSystem', new DrawSystem());
	    this.register('pickSystem', new PickSystem());
	};
    // public prototypal variables
	Object.defineProperties(Engine.prototype, {
	    'isEngineInjected': {
	        get: function () {
	            // engine is implicitly its own reference
	            return true;
	        }
	    }
	});
	// public methods
	Engine.prototype.register = function (objectName, objectHandle) {
	    if (!objectHandle.injectEngine) {
	        validator.throw(this, 'register', 'The supplied object must implement an \'injectEngine\' post-bind method');
	    }
	    this[objectName] = objectHandle;
	    objectHandle.injectEngine(this);
	};

	return Engine;
});
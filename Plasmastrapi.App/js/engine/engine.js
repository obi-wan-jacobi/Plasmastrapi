define(["./Objects/System",
    "./Loaders/ImageLoader", "./Loaders/SpriteLoader",
    "./Repositories/EntityRepository", "./Repositories/EventEmitterRepository",
    "./Systems/InputSystem", "./Systems/DrawSystem"],
    function(System, ImageLoader, SpriteLoader, EntityRepository, EventEmitterRepository, InputSystem, DrawSystem) {

	// CLASS Engine
	Engine.prototype = Object.create(System.prototype);
    Engine.prototype.constructor = Engine;
	function Engine(canvas) {
		System.call(this);
		this.canvas = canvas;
		this.addEventListener('oninit', this, this.__oninit);
	};
    // private methods
	Engine.prototype.__oninit = function () {
	    // configure engine
	    this.__registerLoaders();
	    this.__registerRepositories();
	    this.__registerSystems();
	};
	Engine.prototype.__registerLoaders = function() {
	    this.register('imageLoader', new ImageLoader());
	    this.register('spriteLoader', new SpriteLoader());
	};
	Engine.prototype.__registerRepositories = function () {
	    this.register('eventEmitterRepository', new EventEmitterRepository());
	    this.register('entityRepository', new EntityRepository());
	};
	Engine.prototype.__registerSystems = function() {
		this.register('inputSystem', new InputSystem());
		this.register('drawSystem', new DrawSystem());
	};
	Engine.prototype.__beginMainLoop = function() {
		var self = this;
		var running = true, lastFrame = +new Date;
		var	raf = requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function (callback) {
				return window.setTimeout(callback, 1000 / 60);
			};
		function loop(now) {
			// stop the loop if loopOnce returned false
			if (running) {
				raf(loop);
				var deltaMs = now - lastFrame;
				if (deltaMs < 2000) {
					running = self.loopOnce(deltaMs);
				}
				lastFrame = now;
			}
		};
		loop(lastFrame);
	};
	// public methods
	Engine.prototype.register = function (objectName, objectHandle) {
	    if (!objectHandle.injectEngine) {
	        throw new Error(this.constructor.name + ":register - The supplied object must implement an 'injectEngine' post-bind method.");
	    }
	    objectHandle.injectEngine(this);
	    this[objectName] = objectHandle;
	};
	Engine.prototype.start = function() {
		if (!this.isLoaded) {
			this.load();
		}
		this.__beginMainLoop();
	};

	return Engine;

});
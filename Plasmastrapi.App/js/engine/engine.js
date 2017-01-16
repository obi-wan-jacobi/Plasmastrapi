define(["./Objects/System",
    "./Loaders/AssetLoader",
    "./Repositories/EntityRepository", "./Repositories/EventEmitterRepository",
    "./Systems/InputSystem", "./Systems/DrawSystem",
    "./Controllers/SceneController", "./Controllers/ToolController"],
    function(System, AssetLoader, EntityRepository, EventEmitterRepository, InputSystem, DrawSystem, SceneController, ToolController) {

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
	    this.__registerControllers();
	};
	Engine.prototype.__registerLoaders = function() {
		this.assetLoader = new AssetLoader();
	};
	Engine.prototype.__registerRepositories = function () {
	    this.eventEmitterRepository = new EventEmitterRepository();
	    this.eventEmitterRepository.injectEngine(this);
	    this.entityRepository = new EntityRepository();
	    this.entityRepository.injectEngine(this);
	};
	Engine.prototype.__registerSystems = function() {
		this.inputSystem = new InputSystem();
		this.__systems.push(this.inputSystem);
		this.drawSystem = new DrawSystem();
		this.__systems.push(this.drawSystem);
	};
	Engine.prototype.__registerControllers = function() {
		this.sceneController = new SceneController();
		this.__controllers.push(this.sceneController);
		this.toolController = new ToolController();
		this.__controllers.push(this.toolController);
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
	Engine.prototype.start = function() {
		if (!this.isLoaded) {
			this.load();
		}
		this.__beginMainLoop();
	};

	return Engine;

});
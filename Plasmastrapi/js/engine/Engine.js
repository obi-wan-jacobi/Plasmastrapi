
define(['system', 'container', 'dictionary', 'keyboard-system', 'mouse-system', 'draw-system'],
function (System, Dictionary, KeyboardSystem, MouseSystem, DrawSystem) {

	// CLASS Engine
    Engine.prototype = Object.create(System.prototype);
    Engine.prototype.constructor = Engine;
    function Engine(viewport) {
	    System.call(this);
        // private variables
        this.__viewport = viewport;
        this.__systems = new Dictionary(System);
        this.__containers = new Dictionary(Container);
	    // pre-init configuration
        this.__registerSystems();
        this.__registerFactories();
	};
    // private methods
	Engine.prototype.__registerSystems = function () {
        // order matters:
        this.__addSystem(KeyboardSystem);
        this.__addSystem(MouseSystem);
	    this.__addSystem(DrawSystem);
    };
    Engine.prototype.__registerFactories = function () {

    };
    Engine.prototype.__addSystem = function (SystemType) {
        this.__systems.add(SystemType.name, new SystemType(this));
    };
    Engine.prototype.__beginMainLoop = function () {
        var self = this;
        var isRunning = true;
        var tPrevious = +new Date;
        var raf = requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
        function loop(tNow) {
            // stop the loop if loopOnce returned false
            if (isRunning) {
                try {
                    var deltaMs = tNow - tPrevious;
                    if (deltaMs < 2000) {
                        isRunning = self.loopOnce(deltaMs);
                    }
                    tPrevious = tNow;
                    raf(loop);
                } catch (e) {
                    throw e;
                }
            }
        };
        loop(tPrevious);
    };
    // public methods
    Engine.prototype.getViewport = function () {
        return this.__viewport;
    };
    Engine.prototype.getSystem = function (SystemType) {
        return this.__systems.get(SystemType.name);
    };
    Engine.prototype.getContainer = function (ContainerType) {
        return this.__containers.get(ContainerType.name);
    };
    Engine.prototype.loopOnce = function (deltaMs) {
        this.__systems.forEach(function (key, system) {
            system.loopOnce(deltaMs);
        }, this);
    };
    Engine.prototype.start = function () {
        this.load();
        this.__beginMainLoop();
    };

	return Engine;
});
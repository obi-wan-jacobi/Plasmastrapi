define(['system', 'dictionary', 'factory', 'emitter-factory', 'entity-factory', 'component-factory', 'keyboard-system', 'mouse-system', 'draw-system', 'pick-system'],
function (System, Dictionary, Factory, EmitterFactory, EntityFactory, ComponentFactory, KeyboardSystem, MouseSystem, DrawSystem, PickSystem) {

	// CLASS Engine
    Engine.prototype = Object.create(System.prototype);
    Engine.prototype.constructor = Engine;
    function Engine(viewport) {
        System.call(this);
        // private variables
        this.__viewport = viewport;
        this.__factories = new Dictionary(Factory);
        this.__systems = new Dictionary(System);
        // pre-init configuration
        // order matters:
        this.__registerFactories();
        this.__registerSystems();
	};
    // private methods
    Engine.prototype.__onload = function () {
        this.__systems.forEach(function (key, system) {
            system.load();
        }, this);
    };
    Engine.prototype.__onunload = function () {
        this.__systems.forEach(function (key, system) {
            system.unload();
        }, this);
    };
    Engine.prototype.__registerFactories = function () {
        this.__addFactory(EmitterFactory);
        this.__addFactory(ComponentFactory);
        this.__addFactory(EntityFactory);
    };
    Engine.prototype.__addFactory = function (FactoryType) {
        this.__factories.add(FactoryType.name, new FactoryType(this));
    };
    Engine.prototype.__registerSystems = function () {
        // order matters:
        this.__addSystem(KeyboardSystem);
        this.__addSystem(MouseSystem);
        this.__addSystem(PickSystem);
        this.__addSystem(DrawSystem);
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
                } catch (ex) {
                    throw ex;
                }
            }
        };
        loop(tPrevious);
    };
    // public methods
    Engine.prototype.getViewport = function () {
        return this.__viewport;
    };
    Engine.prototype.getFactory = function (FactoryType) {
        return this.__factories.get(FactoryType.name);
    };
    Engine.prototype.getSystem = function (SystemType) {
        return this.__systems.get(SystemType.name);
    };
    Engine.prototype.loopOnce = function (deltaMs) {
        var isLoopStable = true;
        this.__systems.forEach(function (key, system) {
            isLoopStable = system.loopOnce(deltaMs);
            return isLoopStable;
        }, this);
        return isLoopStable === undefined || isLoopStable ? true : false;
    };
    Engine.prototype.start = function () {
        this.load();
        this.__beginMainLoop();
    };

	return Engine;
});
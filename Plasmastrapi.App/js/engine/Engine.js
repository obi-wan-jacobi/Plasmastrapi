define(['system', 'dictionary', 'utils'],
function (System, Dictionary, utils) {

    Engine.prototype = Object.create(System.prototype);
    Engine.prototype.constructor = Engine;
    function Engine(viewport) {
        System.call(this);
        // private variables
        this.__viewport = viewport;
        this.__factories = new Dictionary('factory');
        this.__controllers = new Dictionary('controller');
        this.__systems = new Dictionary('system');
	};
    // private methods
    Engine.prototype.__oninit = function () {
        this.__registerFactories();
        this.__registerControllers();
        this.__registerSystems();
    }
    Engine.prototype.__onload = function () {
        this.__factories.forEach(function (key, factory) {
            factory.load();
        }, this);
        this.__controllers.forEach(function (key, controller) {
            controller.load();
        }, this);
        this.__systems.forEach(function (key, system) {
            system.load();
        }, this);
    };
    Engine.prototype.__onunload = function () {
        this.__factories.forEach(function (key, factory) {
            factory.unload();
        }, this);
        this.__controllers.forEach(function (key, controller) {
            controller.unload();
        }, this);
        this.__systems.forEach(function (key, system) {
            system.unload();
        }, this);
    };
    Engine.prototype.__registerFactories = function () {
        this.__addFactory('primitive-factory');
        this.__addFactory('display-settings-factory');
        this.__addFactory('data-handle-factory');
        this.__addFactory('emitter-factory');
        this.__addFactory('component-factory');
        this.__addFactory('entity-factory');
    };
    Engine.prototype.__addFactory = function (factoryString) {
        var FactoryType = utils.modules.require(factoryString);
        this.__factories.add(factoryString, new FactoryType(this));
    };
    Engine.prototype.__registerControllers = function () {
        this.__addController('input-controller');
        this.__addController('scene-controller');
        this.__addController('viewport-controller');
    };
    Engine.prototype.__addController = function (controllerString) {
        var ControllerType = utils.modules.require(controllerString);
        this.__controllers.add(controllerString, new ControllerType(this));
    };
    Engine.prototype.__registerSystems = function () {
        this.__addSystem('keyboard-system');
        this.__addSystem('mouse-system');
        this.__addSystem('pick-system');
        this.__addSystem('draw-system');
    };
    Engine.prototype.__addSystem = function (systemString) {
        var SystemType = utils.modules.require(systemString);
        this.__systems.add(systemString, new SystemType(this));
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
            // Stop the loop if loopOnce returns false
            if (isRunning) {
                var deltaMs = tNow - tPrevious;
                if (deltaMs < 2000) {
                    isRunning = self.loopOnce(deltaMs);
                }
                tPrevious = tNow;
                raf(loop);
            }
        };
        loop(tPrevious);
    };
    // public methods
    Engine.prototype.getViewport = function () {
        return this.__viewport;
    };
    Engine.prototype.getFactory = function (factoryString) {
        return this.__factories.get(factoryString);
    };
    Engine.prototype.getSystem = function (systemString) {
        return this.__systems.get(systemString);
    };
    Engine.prototype.getController = function (controllerString) {
        return this.__controllers.get(controllerString);
    };
    Engine.prototype.loopOnce = function (deltaMs) {
        var isLoopStable = true;
        this.__systems.forEach(function (key, system) {
            isLoopStable = system.loopOnce(deltaMs);
            if (!isLoopStable) {
                return 'break';
            }
        }, this);
        return isLoopStable;
    };
    Engine.prototype.start = function () {
        this.load();
        this.__beginMainLoop();
    };

	return Engine;
});
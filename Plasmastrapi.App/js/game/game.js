define(["../engine/Engine", "./Namespaces/$Controllers", "./Namespaces/$Containers"],
function (Engine, $Controllers, $Containers) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        Engine.call(this, canvas);
        // pre-init configuration
        this.__registerAll();
    };
    // private methods
    Game.prototype.__registerAll = function () {
        this.register('circuitElementContainer', new $Containers.CircuitElementContainer());
        this.register('wireContainer', new $Containers.WireContainer());
        this.register('toolController', new $Controllers.ToolController());
        this.register('sceneController', new $Controllers.SceneController());
    };
    Game.prototype.__beginMainLoop = function () {
        var self = this;
        var running = true, lastFrame = +new Date;
        var raf = requestAnimationFrame ||
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
                try {
                    var deltaMs = now - lastFrame;
                    if (deltaMs < 2000) {
                        running = self.loopOnce(deltaMs);
                    }
                    lastFrame = now;
                    raf(loop);
                } catch (e) {
                    throw e;
                }
            }
        };
        loop(lastFrame);
    };
    // public methods
    Game.prototype.start = function () {
        if (!this.isLoaded) {
            this.load();
        }
        this.__beginMainLoop();
    };

	return Game;
});
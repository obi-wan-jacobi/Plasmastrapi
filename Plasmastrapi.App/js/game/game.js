define(["../engine/Engine", "./Controllers/ToolController", "./Controllers/SceneController"], function (Engine, ToolController, SceneController) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        Engine.call(this, canvas);
        // pre-init configuration
        this.__registerControllers();
    };
    // private methods
    Game.prototype.__registerControllers = function () {
        this.register('toolController', new ToolController());
        this.register('sceneController', new SceneController());
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
    Game.prototype.start = function () {
        if (!this.isLoaded) {
            this.load();
        }
        this.__beginMainLoop();
    };

	return Game;
});
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
    // public methods
    Game.prototype.register = function (objectName, objectHandle) {
        Engine.prototype.register.call(this, objectName, objectHandle);
    };

	return Game;
});
define(["../engine/Engine", "./Controllers/ToolController", "./Controllers/SceneController"], function (Engine, ToolController, SceneController) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        Engine.call(this, canvas);
        this.addEventListener('oninit', this, this.__oninit);
    };
    // private methods
    Game.prototype.__oninit = function () {
        Engine.prototype.__oninit.call(this);
        this.__registerControllers();
    };
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
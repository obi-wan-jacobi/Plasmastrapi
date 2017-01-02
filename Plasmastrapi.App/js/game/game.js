define(["../engine/Engine"], function(Engine) { 

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        Engine.call(this, canvas);
    };

	return Game;
});
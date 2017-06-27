define(['engine', 'asset-urls', 'asset-loader'],
function (Engine, assetUrls, AssetLoader) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        Engine.call(this, canvas);
    };
    // private methods
    Game.prototype.__registerFactories = function () {
        Engine.prototype.__registerFactories.call(this);
    };
    Game.prototype.__registerSystems = function () {
        Engine.prototype.__registerSystems.call(this);
    };
    // public methods
    Game.prototype.start = function () {
        var self = this;
        var assetLoader = new AssetLoader();
        // load assets
        assetLoader.download(assetUrls).done(function () {
            Engine.prototype.start.call(self);
            console.log("Asset loading completed");
        });
    };

	return Game;
});
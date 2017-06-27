define(['engine', 'asset-urls', 'asset-loader'],
function (Engine, assetUrls, Loader) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        Engine.call(this, canvas);
        // pre-init configuration
        this.__registerSystems();
        this.__registerFactories();
    };
    // private methods
    Game.prototype.__registerSystems = function () {
        Engine.prototype.__registerSystems.call(this);
    };
    Game.prototype.__registerFactories = function () {
        Engine.prototype.__registerFactories.call(this);
    };
    // public methods
    Game.prototype.start = function () {
        var assetLoader = new AssetLoader();

        // load assets
        assetLoader.download(assetUrls).done(function () {
            //Engine.prototype.start.call(this);
            console.log("Asset loading completed");
        });
    };

	return Game;
});
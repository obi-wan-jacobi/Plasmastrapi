define(['engine', 'asset-urls', 'asset-loader', 'circuit-element-factory', 'logic-element-factory', 'and-gate'],
function (Engine, assetUrls, AssetLoader, CircuitElementFactory, LogicElementFactory, AndGate) {

    Game.prototype = Object.create(Engine.prototype);
    Game.prototype.constructor = Game;
    function Game(canvas) {
        // initialize asset loader first!
        this.__assetLoader = new AssetLoader();
        Engine.call(this, canvas);
    };
    // private methods
    Game.prototype.__registerFactories = function () {
        Engine.prototype.__registerFactories.call(this);
        this.__addFactory(CircuitElementFactory)
        this.__addFactory(LogicElementFactory)
    };
    Game.prototype.__registerSystems = function () {
        Engine.prototype.__registerSystems.call(this);
    };
    // public methods
    Game.prototype.getAssetMap = function () {
        return this.__assetLoader.get();
    };
    Game.prototype.start = function () {
        var self = this;
        // load assets
        this.__assetLoader.download(assetUrls).done(function () {
            console.log("Asset loading completed");
            // *** testing ***

            var logicElementFactory = self.getFactory(LogicElementFactory);

            logicElementFactory.create(AndGate);

            // *** /testing ***
            Engine.prototype.start.call(self);
        });
    };

	return Game;
});
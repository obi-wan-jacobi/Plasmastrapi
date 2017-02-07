require.config({
    baseUrl: 'js'
});

define(["./game/Game", "./game/Namespaces/$Assets"], function (Game, $Assets) {

    var game = new Game(document.getElementById("game-canvas"));

    // load assets
    game.imageLoader.download($Assets.images).done(function () {
        game.spriteLoader.download($Assets.sprites).done(function () {
            // load game/engine
            game.start();

            game.sceneController.setCircuitDesignScene();
            game.toolController.equipPickingTool();
        });
    });
});

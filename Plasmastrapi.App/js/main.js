require.config({
    baseUrl: 'js'
});

define(["./game/Game", "./game/Assets/images", "./game/Assets/sprites"], function (Game, images, sprites) {

    var game = new Game(document.getElementById("game-canvas"));

    // load assets
    game.imageLoader.download(images).done(function () {
        game.spriteLoader.download(sprites).done(function () {
            // load game/engine
            game.start();

            game.sceneController.setCircuitDesignScene();
            game.toolController.equipPickingTool();
        });
    });
});

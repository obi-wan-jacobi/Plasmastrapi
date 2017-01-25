require.config({
    baseUrl: 'js'
});

define(["./game/Game", "./game/Assets/images", "./game/Assets/sprites"], function (Game, images, sprites) {

    var game = new Game(document.getElementById("game-canvas"));

    // load assets
    game.imageLoader.download(images).done(function () {
        game.spriteLoader.download(sprites).done(function () {
            game.sceneController.setCircuitDesignScene();
            //    game.toolcontroller.equip(game.tools.mastertool);

            // load game/engine
            game.start();
        });
    });
});

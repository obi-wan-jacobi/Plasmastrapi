require.config({
    baseUrl: 'js'
});

define(["./game/Game", "./game/Assets/images"], function (Game, images) {

    var game = new Game(document.getElementById("game-canvas"));

    // load game/engine
    game.start();

    // load assets
    game.imageLoader.download(images).done(function () {
        game.sceneController.setCircuitDesignScene();
    //    game.toolcontroller.equip(game.tools.mastertool);
    });
});

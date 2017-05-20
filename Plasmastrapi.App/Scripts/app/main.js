define(['game', 'images', 'sprites'], function (Game, images, sprites) {

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

require.config({
    baseUrl: 'js'
});

define(["./game/Game", "./game/Assets/images"], function (Game, images) {

    var game = new Game(document.getElementById("game-canvas"));

     // load assets
    game.imageLoader.download(images).done(function () {
        game.sceneController.setLabScene();
    //    game.toolcontroller.equip(game.tools.mastertool);
    });

    game.start();
});

require.config({
    baseUrl: 'js'
});

define(["./game/Game"], function (Game) {

    var game = new Game(document.getElementById("game-canvas"));

     // load assets
    //game.assetloader.load(assetmaps.imagemap, assetmaps.spritemap).done(function () {
    //    game.scenecontroller.setcurrentscene(game.scenes.labscene);
    //    game.toolcontroller.equip(game.tools.mastertool);
    //});

    game.start();

});

define([
    'game',
    'images',
    'sprites',
    'image-loader',
    'sprite-loader'
],
function (Game, images, sprites, ImageLoader, SpriteLoader) {

    var game = new Game(document.getElementById("game-canvas"));

    var imageLoader = new ImageLoader();

    var spriteLoader = new SpriteLoader();

    // load assets
    imageLoader.download(images).done(function () {
        spriteLoader.download(sprites).done(function () {
            // load game/engine
            //game.start();
            //game.sceneController.setMainMenuScene();
            //game.toolController.equipPickingTool();

            console.log("Asset loading completed");
        });
    });
});
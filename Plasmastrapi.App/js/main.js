require.config({
    baseUrl: 'js',
    paths: {
        engineConfig: 'engine/config',
        gameConfig: 'game/config',
        // engine namespaces
        $Components: 'engine/Namespaces/$Components',
        $Containers: 'engine/Namespaces/$Containers',
        $Data: 'engine/Namespaces/$Data',
        $Loaders: 'engine/Namespaces/$Loaders',
        $Objects: 'engine/Namespaces/$Objects',
        $Systems: 'engine/Namespaces/$Systems'
        // game namespaces
    }
});

define(["./game/Game", "./game/Namespaces/$Assets"], function (Game, $Assets) {

    var game = new Game(document.getElementById("game-canvas"));

    // load assets
    game.imageLoader.download($Assets.images).done(function () {
        game.spriteLoader.download($Assets.sprites).done(function () {
            // load game/engine
            game.start();
            game.sceneController.setMainMenuScene();
            game.toolController.equipPickingTool();
        });
    });
});

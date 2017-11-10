define(['game'],
function (Game) {
    var canvas = document.getElementById("game-canvas");
    var game = new Game(canvas);
    game.start();
});

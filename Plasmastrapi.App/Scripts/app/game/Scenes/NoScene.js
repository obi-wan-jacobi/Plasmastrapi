define([
    // Base
    'scene'
],
function (Scene) {

    NoScene.prototype = Object.create(Scene.prototype);
    NoScene.prototype.constructor = NoScene;
    function NoScene() {
        Scene.call(this);
    };

    return NoScene;
});
define(["../../engine/Objects/Scene"], function (Scene) {

    NoScene.prototype = Object.create(Scene.prototype);
    NoScene.prototype.constructor = NoScene;
    function NoScene() {
        Scene.call(this);
    };

    return NoScene;
});
define(["../../engine/Objects/Scene"], function (Scene) {

    MainMenuScene.prototype = Object.create(Scene.prototype);
    MainMenuScene.prototype.constructor = MainMenuScene;
    function MainMenuScene() {
        Scene.call(this);
    };

    return MainMenuScene;
});
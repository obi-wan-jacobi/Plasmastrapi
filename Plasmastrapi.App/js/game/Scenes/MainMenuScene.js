define([
    "../../engine/Objects/Scene",
    "../Namespaces/$UI",
    "../Namespaces/$Circuits",
    "../Namespaces/$Cursors"
],
function (Scene, $UI, $Circuits, $Cursors) {

    MainMenuScene.prototype = Object.create(Scene.prototype);
    MainMenuScene.prototype.constructor = MainMenuScene;
    function MainMenuScene(canvas) {
        Scene.call(this);
    };
    MainMenuScene.prototype.__oninit = function () {
        // background
        this.add(new $UI.MainMenuBackgroundPanel());

        // menu panel
        this.add(new $UI.MainMenuNavigationPanel());
    };

    return MainMenuScene;
});
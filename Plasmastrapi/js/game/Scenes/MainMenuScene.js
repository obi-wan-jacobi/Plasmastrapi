define([
    // Base
    'scene',
    // UI
    'main-menu-background-panel',
    'main-menu-navigation-panel'
],
function (Scene, MainMenuBackgroundPanel, MainMenuNavigationPanel) {

    MainMenuScene.prototype = Object.create(Scene.prototype);
    MainMenuScene.prototype.constructor = MainMenuScene;
    function MainMenuScene(canvas) {
        Scene.call(this);
    };
    MainMenuScene.prototype.__oninit = function () {
        // background
        this.add(new MainMenuBackgroundPanel());

        // menu panel
        this.add(new MainMenuNavigationPanel());
    };

    return MainMenuScene;
});
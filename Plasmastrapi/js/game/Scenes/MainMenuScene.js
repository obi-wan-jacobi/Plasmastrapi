define([
    // Base
    'scene',
    // UI
    'main-menu-background-panel',
    'main-menu-navigation-panel'
],
function (Scene, MainMenuBackgroundPanel, MainMenuNavigationPanel) {

    var mainMenuScene = new Scene();

    mainMenuScene.add(new MainMenuBackgroundPanel());

    mainMenuScene.add(new MainMenuNavigationPanel());

    // singleton
    return mainMenuScene;
});
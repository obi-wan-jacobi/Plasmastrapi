define(function () {
    var paths = {
        'scene': './scenes/Base/Scene',
        // Main Menu
        'lab-navigation-button': './scenes/MainMenu/Buttons/LabNavigationButton',
        'main-menu': './scenes/MainMenu/MainMenu',
        // Lab
        'back-navigation-button': './scenes/Lab/Buttons/BackNavigationButton',
        'lab': './scenes/Lab/Lab',
        // Configuration
        'scenes-debug': './scenes/Configuration/debug',
        'scenes-config': './scenes/Configuration/config'
    };
    require.config({ paths: paths });
    return paths;
});
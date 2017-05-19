define([
    // Base
    'rectangle',
    // Data
    'graphics',
    // Configs
    '',
    'game-config'
],
function (Rectangle, Graphics, Compatibility, config) {

    // CLASS MainMenuBackgroundPanel
    MainMenuNavigationPanel.prototype = Object.create(Rectangle.prototype);
    MainMenuNavigationPanel.prototype.constructor = MainMenuNavigationPanel;
    function MainMenuNavigationPanel() {

        var x = config.MainMenuNavigationPanel.x;

        var y = config.MainMenuNavigationPanel.y;

        var width = config.MainMenuNavigationPanel.width;

        var height = config.MainMenuNavigationPanel.height;

        var meshDisplayOptions = new Graphics.MeshDisplayOptions(
            config.MainMenuNavigationPanel.displayLayer,
            config.MainMenuNavigationPanel.strokeStyle,
            config.MainMenuNavigationPanel.fillStyle,
            config.MainMenuNavigationPanel.lineWidth
        );

        // inherits from
        Rectangle.call(this, x, y, width, height, meshDisplayOptions);
    };

    return MainMenuNavigationPanel;
});
define([
    // Base
    'rectangle',
    // UI
    'menu-button',
    // Data
    'graphics',
    // Configs
    '',
    'game-config'
],
function (Rectangle, MenuButton, Graphics, Compatibility, config) {

    // CLASS MainMenuBackgroundPanel
    MainMenuNavigationPanel.prototype = Object.create(Rectangle.prototype);
    MainMenuNavigationPanel.prototype.constructor = MainMenuNavigationPanel;
    function MainMenuNavigationPanel() {
        // inherits from
        Rectangle.call(
            this,
            config.MainMenuNavigationPanel.x,
            config.MainMenuNavigationPanel.y,
            config.MainMenuNavigationPanel.width,
            config.MainMenuNavigationPanel.height,
            new Graphics.MeshDisplayOptions(
                config.MainMenuNavigationPanel.displayLayer,
                config.MainMenuNavigationPanel.strokeStyle,
                config.MainMenuNavigationPanel.fillStyle,
                config.MainMenuNavigationPanel.lineWidth
            )
        );
    };
    MainMenuNavigationPanel.prototype.__oninit = function () {
        // populate buttons
        var btnNavigateToCircuitDesigner = new MenuButton(
            config.MainMenuNavigationPanel.btnCircuitDesigner.x,
            config.MainMenuNavigationPanel.btnCircuitDesigner.y,
            config.MainMenuNavigationPanel.btnCircuitDesigner.width,
            config.MainMenuNavigationPanel.btnCircuitDesigner.height,
            config.MainMenuNavigationPanel.btnCircuitDesigner.labelText,
            this.__engine.sceneController,
            this.__engine.sceneController.setCircuitDesignScene
        );

        btnNavigateToCircuitDesigner.addParent(this);
    };

    return MainMenuNavigationPanel;
});
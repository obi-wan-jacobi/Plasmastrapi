define([
    // Base
    'image-panel',
    // Data
    'graphics',
    // Configs
    'game-config'
],
function (ImagePanel, Graphics, config) {

    // CLASS MainMenuBackgroundPanel
    MainMenuBackgroundPanel.prototype = Object.create(ImagePanel.prototype);
    MainMenuBackgroundPanel.prototype.constructor = MainMenuBackgroundPanel;
    function MainMenuBackgroundPanel() {
        var x = this.image.width / 2, y = this.image.height / 2;
        var imageHandle = new Graphics.ImageHandle(
            config.MainMenuBackgroundPanel.displayLayer,
            x,
            y,
            this.image.width,
            this.image.height,
            this.image.width,
            this.image.height,
            this.image
        );
        // inherits from
        ImagePanel.call(this, x, y, imageHandle);
    };

    return MainMenuBackgroundPanel;
});
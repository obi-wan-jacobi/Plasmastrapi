define([
    "../Base/Panel",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Graphics",
    "../../Namespaces/$Compatibility",
    "gameConfig"
],
function (Panel, $, Graphics, $Compatibility, config) {

    // CLASS MainMenuBackgroundPanel
    MainMenuBackgroundPanel.prototype = Object.create(Panel.prototype);
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
        Panel.call(this, x, y, imageHandle);
    };

    return MainMenuBackgroundPanel;
});
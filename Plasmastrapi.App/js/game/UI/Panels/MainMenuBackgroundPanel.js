define([
    "../Base/Panel",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Graphics",
    "../../Namespaces/$PickableTraits",
    "gameConfig"
],
function (Panel, $, Graphics, $PickableTraits, config) {

    // CLASS MainMenuBackgroundPanel
    MainMenuBackgroundPanel.prototype = Object.create(Panel.prototype);
    MainMenuBackgroundPanel.prototype.constructor = MainMenuBackgroundPanel;
    function MainMenuBackgroundPanel(x, y, width, height) {
        var imageHandle = new Graphics.ImageHandle(
            config.MainMenuBackgroundPanel.displayLayer,
            x,
            y,
            this.image.width,
            this.image.height,
            width,
            height,
            this.image
        );
        // inherits from
        Panel.call(this, x, y, imageHandle);
        // apply traits
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.DesignZone.call(pickableComponent);
    };

    return MainMenuBackgroundPanel;
});
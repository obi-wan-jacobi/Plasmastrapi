define([
    "./Panel",
    "../../../engine/Namespaces/$Data"
],
function (Panel, $Data) {

    ImagePanel.prototype = Object.create(Panel.prototype);
    ImagePanel.prototype.constructor = ImagePanel;
    function ImagePanel(x, y, imageHandle, /* optional */ meshDisplayOptions) {
        // image
        var imageComponent = new $.ImageComponent(imageHandle);

        // inherits from
        Panel.call(this, x, y, imageComponent.mesh, meshDisplayOptions);

        // compose entity
        this.addComponent(imageComponent);
    };

    return ImagePanel;
});
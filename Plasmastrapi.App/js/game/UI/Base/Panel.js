define([
    "./UIElement",
    "../../../engine/Namespaces/$Data"
],
function (UIElement, $Data) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel(x, y, imageHandle, /* optional */ meshDisplayOptions) {
        // inherits from
        UIElement.call(this, x, y);

        // image
        var imageComponent = new $.ImageComponent(imageHandle);

        // configure image as collision mesh
        var meshComponent = new $.MeshComponent(imageComponent.mesh, meshDisplayOptions);

        // entity is pickable
        var pickableComponent = new $.PickableComponent();

        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(imageComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };

    return Panel;
});
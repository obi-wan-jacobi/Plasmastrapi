define(["../../engine/Objects/Entity", "../../../engine/Components/$Components", "../../../engine/Data/Geometry"], function (Entity, $, Geometry) {

    // CLASS WireElement
    WireElement.prototype = Object.create(Entity.prototype);
    WireElement.prototype.constructor = WireElement;
    function WireElement() {

        Entity.call(this);

        var meshComponent = new Components.MeshComponent();
        var pickableComponent = new Components.PickableComponent();

        // compose entity
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
    };

    return Gate;
});
﻿define(function () {

    Panel.prototype = Object.create(Entity.prototype);
    Panel.prototype.constructor = Panel;
    function Panel() {
        Entity.call(this);
        // Configure entity
        var poseComponent = new poseComponent();
        var meshComponent = new MeshComponent();
        var pickableComponent = new PickableComponent();
        var imageComponent = new ImageComponent();
        var drawableComponent = new DrawableComponent();
        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);
        this.addComponent(imageComponent);
    };

    return Panel;
});
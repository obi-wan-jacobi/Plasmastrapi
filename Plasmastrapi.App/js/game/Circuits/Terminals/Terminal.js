﻿define(["../Base/ParentElement", "../../../engine/Components/$Components", "../../../engine/Data/Geometry"],

function (ParentElement, $, Geometry) {

    // CLASS Terminal
    Terminal.prototype = Object.create(ParentElement.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal(offsetPosition, parentElement) {

        ParentElement.call(this, 0, 0);

        this.__defaultFrameIndex = null;
        this.offset = offsetPosition;
        this.parentElement = parentElement;

        // pose
        var parentElementPose = this.parentElement.getComponent($.PoseComponent);
        var poseComponent = new $.PoseComponent(new Geometry.Position(0, 0), 0);

        // configure parentElement position following
        parentElementPose.addEventListener('onpositionchange', this, this.__setPoseRelativeToParentElement);
        parentElementPose.addEventListener('onorientationchange', this, this.__setPoseRelativeToParentElement);

        // set custom pickable bounds
        var collisionBounds = new Geometry.Rectangle(20, 20);
        var mesh = new Geometry.Mesh(collisionBounds);
        var meshComponent = this.getComponent($.MeshComponent);
        meshComponent.mesh = mesh

        // configure pick and hover actions
        var pickableComponent = this.getComponent($.PickableComponent);
        pickableComponent.addEventListener('onselect', this, this.__onselect);
        pickableComponent.addEventListener('ondeselect', this, this.__ondeselect);
        pickableComponent.addEventListener('onmouseenter', this, this.__onmouseenter);
        pickableComponent.addEventListener('onmouseleave', this, this.__onmouseleave);

        // initialize the terminal's location (must come after the PoseComponent has been added to the entity)
        this.addEventListener('oninit', this, this.__setPoseRelativeToParentElement);
    };
    Terminal.prototype.__setPoseRelativeToParentElement = function () {
        var parentElementPose = this.parentElement.getComponent($.PoseComponent)
        var position = parentElementPose.position;
        var orientation = parentElementPose.orientation;
        var templateX = this.offset.x;
        var templateY = this.offset.y;
        var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
        var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
        var poseComponent = this.getComponent($.PoseComponent);
        poseComponent.position = new Geometry.Position(x, y);
        poseComponent.orientation = orientation;
    };
    Terminal.prototype.__onselect = function () {
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(2);
        this.__engine.toolController.equipWireTool(this);
    };
    Terminal.prototype.__ondeselect = function () {
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(this.__defaultFrameIndex);
    };
    Terminal.prototype.__onmouseenter = function () {
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(2);
    };
    Terminal.prototype.__onmouseleave = function () {
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(this.__defaultFrameIndex);
    };
    
    return Terminal;
});
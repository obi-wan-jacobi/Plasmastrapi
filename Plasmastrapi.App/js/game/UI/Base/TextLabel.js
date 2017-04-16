define([
    "../../../engine/Objects/Entity",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Geometry"
],
function (Entity, $, Geometry) {

    TextLabel.prototype = Object.create(Entity.prototype);
    TextLabel.prototype.constructor = TextLabel;
    function TextLabel(parentElement, textLabelDisplayOptions) {
        // inherits from
        Entity.call(this);

        // pose
        var poseComponent = new $.PoseComponent(new Geometry.Position(0, 0), 0);

        var textLabelComponent = new $.TextLabelComponent(textLabelDisplayOptions);
        
        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(textLabelComponent);

        // configure label position update
        this.addParent(parentElement);
        var parentPoseComponent = this.__parent.getComponent($.PoseComponent);
        parentPoseComponent.addEventListener('onpositionchange', this, this.__setPoseRelativeToParentElement);
    };
    TextLabel.prototype.__oninit = function () {
        // initialize position
        var position = this.__parent.getComponent($.PoseComponent).position;
        this.__setPoseRelativeToParentElement(position);
    };
    TextLabel.prototype.__setPoseRelativeToParentElement = function (newPosition) {
        var textLabelComponent = this.getComponent($.TextLabelComponent);
        var textLabelDisplayOptions = textLabelComponent.displayOptions;
        var offsetX = textLabelDisplayOptions.offset.x;
        var offsetY = textLabelDisplayOptions.offset.y;
        var x = offsetX + newPosition.x;
        var y = offsetY + newPosition.y;
        var poseComponent = this.getComponent($.PoseComponent);
        poseComponent.position = new Geometry.Position(x, y);
    };

    return TextLabel;
});
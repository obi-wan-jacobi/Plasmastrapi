define([
    // Base
    'entity',
    // Components
    'pose-component',
    'text-label-component',
    // Data
    'position'
],
function (Entity, PoseComponent, TextLabelComponent, Position) {

    TextLabel.prototype = Object.create(Entity.prototype);
    TextLabel.prototype.constructor = TextLabel;
    function TextLabel(parentElement, textDisplaySettings) {
        // inherits from
        Entity.call(this);

        // pose
        var poseComponent = new PoseComponent(new Position(0, 0), 0);

        var textLabelComponent = new TextLabelComponent(textDisplaySettings);
        
        // compose entity
        this.addComponent(poseComponent);
        this.addComponent(textLabelComponent);

        // configure label position update
        this.addParent(parentElement);
        var parentPoseComponent = this.__parent.getComponent(PoseComponent);
        parentPoseComponent.addEventListener('onpositionchange', this, this.__setPoseRelativeToParentElement);
    };
    TextLabel.prototype.__oninit = function () {
        // initialize position
        var position = this.__parent.getComponent(PoseComponent).position;
        this.__setPoseRelativeToParentElement(position);
    };
    TextLabel.prototype.__setPoseRelativeToParentElement = function (newPosition) {
        var textLabelComponent = this.getComponent(TextLabelComponent);
        var textDisplaySettings = textLabelComponent.displayOptions;
        var offsetX = textDisplaySettings.offset.x;
        var offsetY = textDisplaySettings.offset.y;
        var x = offsetX + newPosition.x;
        var y = offsetY + newPosition.y;
        var poseComponent = this.getComponent(PoseComponent);
        poseComponent.position = new Position(x, y);
    };

    return TextLabel;
});
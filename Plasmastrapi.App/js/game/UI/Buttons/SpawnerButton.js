define(["../Base/Button", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../../Namespaces/$PickableTraits"], function (Button, $, Graphics, $PickableTraits) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(Button.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, circuitElementConstructor) {
        // predefined parameters
        var displayLayer = 'ondrawuientities';
        var spriteFrame = circuitElementConstructor.prototype.sprite.frames[0];
        var imageHandle = new Graphics.ImageHandle(displayLayer, 0, 0, spriteFrame.width, spriteFrame.height, spriteFrame.width, spriteFrame.height, spriteFrame);
        Button.call(this, x, y, imageHandle, this, this.__onpick);
        this.__circuitElementConstructor = circuitElementConstructor;
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.Draggable.call(pickableComponent);
    };
    SpawnerButton.prototype.__onpick = function () {
        this.__fnShiftKeyMouseUp.apply(this);
    };
    SpawnerButton.prototype.__fnShiftKeyMouseUp = function () {
        var poseComponent = this.getComponent($.PoseComponent);
        var circuitElement = new this.__circuitElementConstructor(poseComponent.position.x, poseComponent.position.y);
        this.__engine.sceneController.addToCurrentScene(circuitElement);
        this.__engine.toolController.equipPlacingTool(circuitElement, this.__fnShiftKeyMouseUp.bind(this));
    };

    return SpawnerButton;
});
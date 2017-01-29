define(["./Button", "../../../engine/Components/$Components", "../../../engine/Data/Graphics"], function (Button, $, Graphics) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(Button.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, circuitElementConstructor) {
        // predefined parameters
        var displayLayer = 'ondrawuientities';
        var spriteFrame = circuitElementConstructor.prototype.sprite.frames[0];
        var imageHandle = new Graphics.ImageHandle(displayLayer, 0, 0, spriteFrame.width, spriteFrame.height, spriteFrame.width, spriteFrame.height, spriteFrame);
        Button.call(this, x, y, imageHandle, this.__onselect);
        this.__circuitElementConstructor = circuitElementConstructor;
    };
    SpawnerButton.prototype.__onselect = function () {
        var poseComponent = this.getComponent($.PoseComponent);
        var circuitElement = new this.__circuitElementConstructor(poseComponent.position.x, poseComponent.position.y);
        this.__engine.sceneController.addToCurrentScene(circuitElement);
        this.__engine.toolController.equipPlacingTool(circuitElement);
    };

    return SpawnerButton;
});
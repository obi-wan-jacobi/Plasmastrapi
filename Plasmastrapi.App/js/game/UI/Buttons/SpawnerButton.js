define(["./Button", "../../../engine/Components/$Components"], function (Button, $) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(Button.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, circuitElementClass) {
        Button.call(this, x, y, this.__onselect, circuitElementClass.sprite);
        this.__circuitElementClass = circuitElementClass;
    };
    SpawnerButton.prototype.__onselect = function () {
        var poseComponent = this.getComponent($.PowerComponent);
        var circuitElement = new this.__circuitElementClass(poseComponent.position.x, poseComponent.position.y);
        this.__engine.sceneController.addToCurrentScene(circuitElement);
        this.__engine.toolController.equipPlacingTool(circuitElement);
    };

    return Button;
});
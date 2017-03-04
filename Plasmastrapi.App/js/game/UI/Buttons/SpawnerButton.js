define(["../Base/ToolbarButton", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../../Namespaces/$PickableTraits"], function (ToolbarButton, $, Graphics, $PickableTraits) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(ToolbarButton.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, circuitElementConstructor, labelText) {
        // predefined parameters
        var displayLayer = 'ondrawuientities';
        var spriteFrame = circuitElementConstructor.prototype.sprite.frames[0];
        var imageHandle = new Graphics.ImageHandle(displayLayer, 0, 0, spriteFrame.width, spriteFrame.height, spriteFrame.width, spriteFrame.height, spriteFrame);
        ToolbarButton.call(this, x, y, labelText, imageHandle, this, this.__onpick);
        this.__circuitElementConstructor = circuitElementConstructor;
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.Draggable.call(pickableComponent);
    };
    SpawnerButton.prototype.__onpick = function () {
        this.__spawnCircuitElement(this.__engine.toolController.__x, this.__engine.toolController.__y);
    };
    SpawnerButton.prototype.__spawnCircuitElement = function (x, y) {
        var circuitElement = new this.__circuitElementConstructor(x, y);
        this.__engine.sceneController.addToCurrentScene(circuitElement);
        this.__engine.toolController.equipPlacingTool(circuitElement, this.__spawnCircuitElement.bind(this));
    };

    return SpawnerButton;
});
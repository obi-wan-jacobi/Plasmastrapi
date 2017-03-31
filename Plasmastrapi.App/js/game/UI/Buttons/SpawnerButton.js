define([
    "../Base/ToolbarButton",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Graphics",
    "../../Namespaces/$PickableTraits",
    "gameConfig"
],
function (ToolbarButton, $, Graphics, $PickableTraits, config) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(ToolbarButton.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, circuitElementConstructor, labelText) {
        // private variables
        this.__circuitElementConstructor = circuitElementConstructor;
        // predefined parameters
        var spriteFrame = circuitElementConstructor.prototype.sprite.frames[0];
        var imageHandle = new Graphics.ImageHandle(
            config.SpawnerButton.imageHandleDisplayLayer,
            0,
            0,
            spriteFrame.width,
            spriteFrame.height,
            spriteFrame.width,
            spriteFrame.height,
            spriteFrame
        );
        // inherits from
        ToolbarButton.call(this, x, y, labelText, imageHandle, this, this.__onpick);
        // configure components
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
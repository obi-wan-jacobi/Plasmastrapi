define([
    "../Base/ToolbarButton",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Graphics",
    "../../Namespaces/$Compatibility",
    "gameConfig"
],
function (ToolbarButton, $, Graphics, $Compatibility, config) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(ToolbarButton.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, SpawnConstructor, labelText) {
        // private variables
        this.__SpawnConstructor = SpawnConstructor;
        // inherits from
        ToolbarButton.call(this, x, y, labelText, SpawnConstructor.prototype.sprite.frames[0], this, this.__onpick);
        // tool compatibility
        $Compatibility.Draggable.call(this);
    };
    SpawnerButton.prototype.__onpick = function () {
        this.__spawnCircuitElement(this.__engine.toolController.__x, this.__engine.toolController.__y);
    };
    SpawnerButton.prototype.__spawnCircuitElement = function (x, y) {
        var circuitElement = new this.__SpawnConstructor(x, y);
        this.__engine.sceneController.addToCurrentScene(circuitElement);
        this.__engine.toolController.equipPlacingTool(circuitElement, this.__spawnCircuitElement.bind(this));
    };

    return SpawnerButton;
});
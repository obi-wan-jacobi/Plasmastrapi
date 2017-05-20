define([
    // Base
    'labelled-button',
    // Configs
    'draggable'
],
function (LabelledButton, Draggable) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(LabelledButton.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, SpawnConstructor, labelText) {
        // private variables
        this.__SpawnConstructor = SpawnConstructor;
        // inherits from
        var imageHandle = new Graphics.ImageHandle(
            config.LabelledButton.displayLayer,
            0,
            0,
            image.width,
            image.height,
            image.width,
            image.height,
            image
        );
        LabelledButton.call(this, x, y, labelText, SpawnConstructor.prototype.sprite.frames[0], this, this.__onpick);
        Button.call(this, x, y, new Geometry.Mesh(new Geometry.Rectangle(image.width, image.height)), meshDisplayOptions, callee, fnOnPick);

        // configure label
        var textLabelDisplayOptions = new Graphics.TextLabelDisplayOptions(
            config.LabelledButton.textLabelDisplayLayer,
            new Geometry.Position(0, imageHandle.image.height + config.LabelledButton.textLabelOffsetBufferY),
            labelText
        );
        LabelledDecorator.call(this, textLabelDisplayOptions);
        // tool compatibility
        Draggable.call(this);
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
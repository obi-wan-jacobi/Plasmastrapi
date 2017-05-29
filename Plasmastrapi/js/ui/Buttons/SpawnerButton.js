define([
    // Base
    'button',
    // Decorators
    'labelled-decorator',
    // Components
    'image-component',
    // Data
    'geometry',
    'graphics',
    // Configs
    'draggable',
    'game-config'
],
function (Button, LabelledDecorator, ImageComponent, Geometry, Graphics, Draggable, config) {

    // CLASS SpawnerButton
    SpawnerButton.prototype = Object.create(Button.prototype);
    SpawnerButton.prototype.constructor = SpawnerButton;
    function SpawnerButton(x, y, SpawnConstructor, labelText) {
        // private variables
        this.__SpawnConstructor = SpawnConstructor;

        var image = SpawnConstructor.prototype.sprite.frames[0];

        var imageHandle = new Graphics.ImageHandle(
            config.SpawnerButton.imageHandleDisplayLayer,
            0,
            0,
            image.width,
            image.height,
            image.width,
            image.height,
            image
        );

        // inherits from
        Button.call(this, x, y, new Geometry.Mesh(new Geometry.Rectangle(image.width, image.height)), null, this, this.__onpick);

        // configure image
        var imageComponent = new ImageComponent(imageHandle);
        this.addComponent(imageComponent);

        // configure label
        var textLabelDisplayOptions = new Graphics.TextLabelDisplayOptions(
            config.SpawnerButton.textLabelDisplayLayer,
            new Geometry.Position(0, imageHandle.image.height + config.SpawnerButton.textLabelOffsetBufferY),
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
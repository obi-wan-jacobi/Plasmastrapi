define([
    // Base
    'button',
    // Decorators
    'labelled-decorator',
    // Data
    'mesh',
    'position',
    'rectangle',
    'mesh-display-options',
    'text-label-display-options',
    // Configs
    'game-config'
],
    function (Button, LabelledDecorator, Mesh, Position, Rectangle, MeshDisplayOptions, TextLabelDisplayOptions, config) {

        // CLASS MenuButton
        MenuButton.prototype = Object.create(Button.prototype);
        MenuButton.prototype.constructor = MenuButton;
        function MenuButton(x, y, width, height, labelText, callee, fnOnPick) {
            // private variables
            var meshDisplayOptions = new MeshDisplayOptions(config.MenuButton.displayLayer);

            // inherits from
            Button.call(this, x, y, new Mesh(new Rectangle(width, height)), meshDisplayOptions, callee, fnOnPick);

            // configure label
            var textLabelDisplayOptions = new TextLabelDisplayOptions(
                config.MenuButton.displayLayer,
                new Position(0, 0),
                labelText
            );

            LabelledDecorator.call(this, textLabelDisplayOptions);
        };

        return MenuButton;
    });
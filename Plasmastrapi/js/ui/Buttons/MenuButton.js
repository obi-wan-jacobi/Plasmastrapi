define([
    // Base
    'button',
    // Decorators
    'labelled-decorator',
    // Data
    'geometry',
    'graphics',
    // Configs
    'game-config'
],
    function (Button, LabelledDecorator, Geometry, Graphics, config) {

        // CLASS MenuButton
        MenuButton.prototype = Object.create(Button.prototype);
        MenuButton.prototype.constructor = MenuButton;
        function MenuButton(x, y, width, height, labelText, callee, fnOnPick) {
            // private variables
            var meshDisplayOptions = new Graphics.MeshDisplayOptions(config.MenuButton.displayLayer);

            // inherits from
            Button.call(this, x, y, new Geometry.Mesh(new Geometry.Rectangle(width, height)), meshDisplayOptions, callee, fnOnPick);

            // configure label
            var textLabelDisplayOptions = new Graphics.TextLabelDisplayOptions(
                config.MenuButton.displayLayer,
                new Geometry.Position(0, 0),
                labelText
            );

            LabelledDecorator.call(this, textLabelDisplayOptions);
        };

        return MenuButton;
    });
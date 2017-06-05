define([
    // Base
    'button',
    // Decorators
    'labelled-decorator',
    // Data
    'mesh',
    'position',
    'rectangle',
    'mesh-display-settings',
    'text-display-settings',
    // Configs
    'game-config'
],
    function (Button, LabelDecorator, Mesh, Position, Rectangle, MeshDisplaySettings, TextDisplaySettings, config) {

        // CLASS MenuButton
        MenuButton.prototype = Object.create(Button.prototype);
        MenuButton.prototype.constructor = MenuButton;
        function MenuButton(x, y, width, height, labelText, callee, fnOnPick) {
            // private variables
            var MeshDisplaySettings = new MeshDisplaySettings(config.MenuButton.displayLayer);

            // inherits from
            Button.call(this, x, y, new Mesh(new Rectangle(width, height)), MeshDisplaySettings, callee, fnOnPick);

            // configure label
            var TextDisplaySettings = new TextDisplaySettings(
                config.MenuButton.displayLayer,
                new Position(0, 0),
                labelText
            );

            LabelDecorator.call(this, TextDisplaySettings);
        };

        return MenuButton;
    });
define(['scene', 'button', 'position', 'rectangle', 'text', 'text-display-settings', 'modules'],
function (Scene, Button, Position, Rectangle, Text, TextDisplaySettings, modules) {

    MainMenuScene.prototype = Object.create(Scene.prototype);
    MainMenuScene.prototype.constructor = MainMenuScene;
    function MainMenuScene(engine) {
        Scene.call(this, engine);
    };
    MainMenuScene.prototype.__oninit = function () {
        var engine = this.__engine;
        var labNavigationButton = engine.getFactory('ui-element-factory').create(Button);
        labNavigationButton.set(new Position(750, 200));
        labNavigationButton.set(new Rectangle(100, 30));
        labNavigationButton.set(new Text('Play'));
        labNavigationButton.getComponent('text-component').getDisplaySettings().offset.y = 7;
        labNavigationButton.set(function () {
            engine.getController('scene-controller').setScene('lab-scene');
        });
    };

    return MainMenuScene;
});
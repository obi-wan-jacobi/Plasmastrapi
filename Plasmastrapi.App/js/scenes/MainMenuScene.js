define(['scene', 'button', 'position', 'rectangle', 'text', 'modules'],
function (Scene, Button, Position, Rectangle, Text, modules) {

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
        labNavigationButton.set(function () {
            var LabScene = modules.require('lab-scene');
            engine.getController('scene-controller').setScene(LabScene);
        });
    };

    return MainMenuScene;
});
define(['scene', 'ui-element-factory', 'ui-element', 'scene-controller', 'position', 'rectangle', 'modules'],
function (Scene, UIElementFactory, UIElement, SceneController, Position, Rectangle, modules) {

    MainMenuScene.prototype = Object.create(Scene.prototype);
    MainMenuScene.prototype.constructor = MainMenuScene;
    function MainMenuScene(engine) {
        Scene.call(this, engine);
    };
    MainMenuScene.prototype.__oninit = function () {
        var engine = this.__engine;
        var labNavigationButton = engine.getFactory(UIElementFactory).create(UIElement);
        labNavigationButton.set(new Position(400, 100));
        labNavigationButton.set(new Rectangle(200, 50));
        labNavigationButton.set(function () {
            var Lab = modules.require('lab-scene');
            engine.getController(SceneController).setScene(Lab);
        });
    };

    return MainMenuScene;
});
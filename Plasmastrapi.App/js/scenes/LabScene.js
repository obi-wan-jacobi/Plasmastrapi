define(['scene', 'ui-element-factory', 'ui-element', 'scene-controller', 'position', 'rectangle', 'modules'],
    function (Scene, UIElementFactory, UIElement, SceneController, Position, Rectangle, modules) {

    LabScene.prototype = Object.create(Scene.prototype);
    LabScene.prototype.constructor = LabScene;
    function LabScene(engine) {
        Scene.call(this, engine);
    };
    LabScene.prototype.__oninit = function () {
        var engine = this.__engine;
        var backNavigationButton = engine.getFactory(UIElementFactory).create(UIElement);
        backNavigationButton.set(new Position(400, 200));
        backNavigationButton.set(new Rectangle(200, 50));
        backNavigationButton.set(function () {
            var MainMenu = modules.require('main-menu-scene');
            engine.getController(SceneController).setScene(MainMenu);
        });
    };

    return LabScene;
});
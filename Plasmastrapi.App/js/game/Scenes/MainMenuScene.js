define(['scene'],
function (Scene) {

    MainMenuScene.prototype = Object.create(Scene.prototype);
    MainMenuScene.prototype.constructor = MainMenuScene;
    function MainMenuScene(engine) {
        Scene.call(this, engine);
    };
    MainMenuScene.prototype.__oninit = function () {
        var engine = this.__engine;
        var labNavigationButton = engine.getFactory('ui-element-factory').create('button');
        labNavigationButton.set('position', [750, 200]);
        labNavigationButton.set('rectangle', [100, 30]);
        labNavigationButton.set('text', ['Play'], { offset: { x: 0, y: 7 } });
        labNavigationButton.set('pick-action', [function () {
            engine.getController('scene-controller').setScene('lab-scene');
        }]);
    };

    return MainMenuScene;
});
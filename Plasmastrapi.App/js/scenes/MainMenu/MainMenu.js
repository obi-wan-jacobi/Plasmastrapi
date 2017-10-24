define(['scene', 'ui-element', 'pose-component', 'position', 'mesh-component', 'rectangle', 'pick-component'],
function (Scene, UIElement, PoseComponent, Position, MeshComponent, Rectangle, PickComponent) {

    MainMenu.prototype = Object.create(Scene.prototype);
    MainMenu.prototype.constructor = MainMenu;
    function MainMenu(engine) {
        Scene.call(this, engine);
    };
    MainMenu.prototype.__oninit = function () {
        var something = this.__uiElementFactory.create(UIElement);

        var poseComponenet = something.getComponent(PoseComponent);
        var meshComponent = something.getComponent(MeshComponent);
        var pickComponent = something.getComponent(PickComponent);

        poseComponenet.getHandle().setPosition(new Position(400, 100));
        meshComponent.getHandle().setData(new Rectangle(200, 50));
        pickComponent.getHandle().setPickAction(function () {
            window.alert('Hi!');
        });
    };

    return MainMenu;
});
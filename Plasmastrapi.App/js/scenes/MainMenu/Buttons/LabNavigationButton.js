define(['ui-element', 'ui-element-factory', 'pose-component', 'position', 'mesh-component', 'rectangle', 'pick-component', 'scene-controller', 'lab'],
function (UIElement, UIElementFactory, PoseComponent, Position, MeshComponent, Rectangle, PickComponent, SceneController, Lab) {

    function LabNavigationButton(engine) {
        var self = engine.getFactory(UIElementFactory).create(UIElement);

        var poseComponenet = self.getComponent(PoseComponent);
        var meshComponent = self.getComponent(MeshComponent);
        var pickComponent = self.getComponent(PickComponent);

        poseComponenet.getHandle().setPosition(new Position(400, 100));
        meshComponent.getHandle().setData(new Rectangle(200, 50));
        pickComponent.getHandle().setPickAction(function () {
            console.log('Hi!');
            engine.getController(SceneController).setScene(Lab);
        });
    };

    return LabNavigationButton;
});
define(['ui-element', 'ui-element-factory', 'pose-component', 'position', 'mesh-component', 'rectangle', 'pick-component', 'scene-controller'],
    function (UIElement, UIElementFactory, PoseComponent, Position, MeshComponent, Rectangle, PickComponent, SceneController) {

    function BackNavigationButton(engine) {
        var self = engine.getFactory(UIElementFactory).create(UIElement);

        var poseComponenet = self.getComponent(PoseComponent);
        var meshComponent = self.getComponent(MeshComponent);
        var pickComponent = self.getComponent(PickComponent);

        poseComponenet.getHandle().setPosition(new Position(400, 200));
        meshComponent.getHandle().setData(new Rectangle(200, 50));
        pickComponent.getHandle().setPickAction(function () {
            var MainMenu = require('main-menu');
            engine.getController(SceneController).setScene(MainMenu);
        });
    };

    return BackNavigationButton;
});
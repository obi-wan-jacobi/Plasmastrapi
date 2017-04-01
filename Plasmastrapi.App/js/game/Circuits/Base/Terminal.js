define(["../Base/BaseElement", "../../../engine/Namespaces/$Components", "../../../engine/Data/Geometry", "gameConfig"],
function (BaseElement, $, Geometry, config) {

    // CLASS Terminal
    Terminal.prototype = Object.create(BaseElement.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal(offsetPosition, parentElement, defaultFrameIndex) {

        BaseElement.call(this, 0, 0);

        this.__defaultFrameIndex = defaultFrameIndex;
        this.__offset = offsetPosition;

        // configure this.__parent
        this.addParent(parentElement)

        // pose
        var parentElementPose = this.__parent.getComponent($.PoseComponent);
        var poseComponent = new $.PoseComponent(new Geometry.Position(0, 0), 0);

        // configure parentElement position following
        parentElementPose.addEventListener('onpositionchange', this, this.__setPoseRelativeToParentElement);
        parentElementPose.addEventListener('onorientationchange', this, this.__setPoseRelativeToParentElement);

        // configure pick and hover actions
        var pickableComponent = this.getComponent($.PickableComponent);
        pickableComponent.addEventListener('onmouseenter', this, this.__onmouseenter);
        pickableComponent.addEventListener('onmouseleave', this, this.__onmouseleave);
    };
    Terminal.prototype.__oninit = function () {
        // set custom pickable bounds
        var collisionBounds = new Geometry.Rectangle(
            config.Terminal.collisionBounds.width,
            config.Terminal.collisionBounds.height
        );
        var mesh = new Geometry.Mesh(collisionBounds);
        var meshComponent = this.getComponent($.MeshComponent);
        meshComponent.mesh = mesh
        // initialize position
        this.__setPoseRelativeToParentElement();
    };
    Terminal.prototype.__setPoseRelativeToParentElement = function () {
        var parentElementPose = this.__parent.getComponent($.PoseComponent)
        var position = parentElementPose.position;
        var orientation = parentElementPose.orientation;
        var templateX = this.__offset.x;
        var templateY = this.__offset.y;
        var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
        var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
        var poseComponent = this.getComponent($.PoseComponent);
        poseComponent.position = new Geometry.Position(x, y);
        poseComponent.orientation = orientation;
    };
    Terminal.prototype.__onpick = function () {
        this.__engine.toolController.equipWireTool(this);
    };
    Terminal.prototype.__onmouseenter = function () {
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(config.Terminal.frameOnMouseEnter);
    };
    Terminal.prototype.__onmouseleave = function () {
        var spriteComponent = this.getComponent($.SpriteComponent);
        spriteComponent.setFrame(this.__defaultFrameIndex);
    };
    
    return Terminal;
});
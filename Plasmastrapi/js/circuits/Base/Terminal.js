define([
    // Base
    'base-element',
    // Components
    'mesh-component',
    'pickable-component',
    'pose-component',
    'sprite-component',
    // Data
    'mesh',
    'position',
    'rectangle',
    // Configs
    'circuits-config'
],
function (BaseElement, MeshComponent, PickableComponent, PoseComponent, SpriteComponent, Mesh, Position, Rectangle, config) {

    // CLASS Terminal
    Terminal.prototype = Object.create(BaseElement.prototype);
    Terminal.prototype.constructor = Terminal;
    function Terminal(parentElement, terminalWire) {
        BaseElement.call(this);
        this.addParent(parentElement)
        // configure pick and hover actions
        var pickableComponent = this.getComponent(PickableComponent);
        pickableComponent.addEventListener('onmouseenter', this, this.__onmouseenter);
        pickableComponent.addEventListener('onmouseleave', this, this.__onmouseleave);
    };
    Terminal.prototype.__oninit = function () {
        // initialize position
        this.__setPoseRelativeToParentElement();
    };
    Terminal.prototype.__onpick = function () {
        this.__engine.toolController.equipWireTool(this);
    };
    Terminal.prototype.__onmouseenter = function () {
        var spriteComponent = this.getComponent(SpriteComponent);
        spriteComponent.setFrame(config.Terminal.frameOnMouseEnter);
    };
    Terminal.prototype.__onmouseleave = function () {
        var spriteComponent = this.getComponent(SpriteComponent);
        spriteComponent.setFrame(this.__defaultFrameIndex);
    };
    
    return Terminal;
});
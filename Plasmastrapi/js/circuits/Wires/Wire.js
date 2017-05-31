define([
    // Base
    'wire-element',
    // Circuits
    'input-terminal',
    'output-terminal',
    // Components
    'line-component',
    'mesh-component',
    'pickable-component',
    'pose-component',
    // Data
    'line-display-options',
    'mesh-display-options',
    'physics',
    // Configs
    'cuttable',
    'circuits-config'
],
    function (WireElement, InputTerminal, OutputTerminal, LineComponent, MeshComponent, PickableComponent, PoseComponent, LineDisplayOptions, MeshDisplayOptions, Physics, Cuttable, config) {

    // CLASS Wire
    Wire.prototype = Object.create(WireElement.prototype);
    Wire.prototype.constructor = Wire;
    function Wire(outputTerminal, inputTerminal) {
        // validate terminal arguments
        if (!(outputTerminal instanceof OutputTerminal) || !(inputTerminal instanceof InputTerminal)) {
            throw new Error(this.constructor.name + ":constructor - output and input terminal arguments must be of their corresponding types!");
        }

        WireElement.call(this, outputTerminal, inputTerminal);

        // configure components
        var lineComponent = this.getComponent(LineComponent);
        lineComponent.collisionOptions = new Physics.LineCollisionOptions(
            config.Wire.collisionWidth,
            config.Wire.collisionLengthModifier
        );
        lineComponent.addEventListener('onpositionchange', this, this.__updateMeshComponent);
        lineComponent.addEventListener('onorientationchange', this, this.__updateMeshComponent);

        var poseComponent = new PoseComponent(lineComponent.position, lineComponent.orientation);

        var meshDisplayOptions = new MeshDisplayOptions(config.Wire.displayLayer);
        var meshComponent = new MeshComponent(lineComponent.mesh, meshDisplayOptions);

        var pickableComponent = new PickableComponent();
        pickableComponent.addEventListener('onmouseenter', this, this.__onmouseenter);
        pickableComponent.addEventListener('onmouseleave', this, this.__onmouseleave);

        this.addComponent(poseComponent);
        this.addComponent(meshComponent);
        this.addComponent(pickableComponent);

        // initialize terminal listeners and state
        this.outputTerminal = outputTerminal;
        this.inputTerminal = inputTerminal;

        this.inputTerminal.addEventListener('ondestroy', this, this.destroy);
        this.outputTerminal.addEventListener('ondestroy', this, this.destroy);
        this.outputTerminal.addEventListener('onstatechange', this, this.__updateState);

        this.inputTerminal.addConnection(this.outputTerminal);
        this.__updateState();

        // tool compatibility
        Cuttable.call(this);
    };
    // private methods
    Wire.prototype.__updateState = function () {
        var lineComponent = this.getComponent(LineComponent);
        var displayLayer = config.Wire.displayLayer;
        var lineWidth = config.Wire.poweredLineWidth;
        if (!this.outputTerminal.isPowered) {
            lineComponent.displayOptions = new LineDisplayOptions(displayLayer, config.Wire.noPowerLineColour, lineWidth);
        } else if (this.outputTerminal.isHigh) {
            lineComponent.displayOptions = new LineDisplayOptions(displayLayer, config.Wire.highLineColour, lineWidth);
        } else if (this.outputTerminal.isLow) {
            lineComponent.displayOptions = new LineDisplayOptions(displayLayer, config.Wire.lowLineColour, lineWidth);
        }
    };
    Wire.prototype.__updateMeshComponent = function () {
        var lineComponent = this.getComponent(LineComponent);
        var poseComponent = this.getComponent(PoseComponent);
        poseComponent.position = lineComponent.position;
        poseComponent.orientation = lineComponent.orientation;
        var meshComponent = this.getComponent(MeshComponent);
        meshComponent.mesh = lineComponent.mesh;
    };
    Wire.prototype.__ondestroy = function () {
        this.inputTerminal.removeConnection(this.outputTerminal);
        this.__engine.wireContainer.remove(this);
    };
    Wire.prototype.__onmouseenter = function () {
        var meshDisplayOptions = new MeshDisplayOptions(config.Wire.displayLayer, config.Wire.cuttingHoverColour);
        var meshComponent = this.getComponent(MeshComponent);
        meshComponent.displayOptions = meshDisplayOptions;
    };
    Wire.prototype.__onmouseleave = function () {
        var meshDisplayOptions = new MeshDisplayOptions(config.Wire.displayLayer);
        var meshComponent = this.getComponent(MeshComponent);
        meshComponent.displayOptions = meshDisplayOptions;
    };
    // public methods
    Wire.prototype.injectEngine = function (engine) {
        WireElement.prototype.injectEngine.call(this, engine);
        this.__engine.wireContainer.add(this);
    };

    return Wire;
});
Wire.prototype.__updateState = function () {
    var lineComponent = this.getComponent(LineComponent);
    var displayLayer = config.Wire.displayLayer;
    var lineWidth = config.Wire.poweredLineWidth;
    if (!this.outputTerminal.isPowered) {
        lineComponent.displayOptions = new LineDisplaySettings(displayLayer, config.Wire.noPowerLineColour, lineWidth);
    } else if (this.outputTerminal.isHigh) {
        lineComponent.displayOptions = new LineDisplaySettings(displayLayer, config.Wire.highLineColour, lineWidth);
    } else if (this.outputTerminal.isLow) {
        lineComponent.displayOptions = new LineDisplaySettings(displayLayer, config.Wire.lowLineColour, lineWidth);
    }
};


TerminalWireAnchor.prototype.__setPoseRelativeToLogicElement = function () {
    var parentElementPose = this.__parent.getComponent(PoseComponent)
    var position = parentElementPose.position;
    var orientation = parentElementPose.orientation;
    var templateX = this.__offset.x;
    var templateY = this.__offset.y;
    var x = templateX * Math.cos(orientation) - templateY * Math.sin(orientation) + position.x;
    var y = templateX * Math.sin(orientation) + templateY * Math.cos(orientation) + position.y;
    var poseComponent = this.getComponent(PoseComponent);
    poseComponent.position = new Position(x, y);
    poseComponent.orientation = orientation;
};
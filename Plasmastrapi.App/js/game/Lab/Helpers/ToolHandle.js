define(function () {

    // CLASS ToolHandle
    ToolHandle.prototype = Object.create(LabElement.prototype);
    ToolHandle.prototype.constructor = ToolHandle;
    function ToolHandle(x, y) {

        LabElement.call(this);

        var poseComponent = new Components.PoseComponent(new Geometry.Position(x, y), 0);

        this.addComponent(poseComponent);
    };
    
    return ToolHandle;
});
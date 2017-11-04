define(['component', 'mesh-component', 'pose-component', 'line-handle'],
function (Component, MeshComponent, PoseComponent, LineHandle) {

	// CLASS LineComponent
	LineComponent.prototype = Object.create(Component.prototype);
	LineComponent.prototype.constructor = LineComponent;
	function LineComponent(tailPoseComponent, headPoseComponent) {
        validator.validateInstanceType(this, tailPoseComponent, PoseComponent);
        validator.validateInstanceType(this, headPoseComponent, PoseComponent);
        // private variables
        this.__tailPose = tailPoseComponent;
        this.__headPose = headPoseComponent;
        // inherits from
        Component.call(this, new LineHandle(this.__tailPose.getHandle().getPosition(), this.__headPose.getHandle().getPosition()));
        // events
		this.registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
        // dependencies
		this.__registerDependencyOnLoad(this.__tailPose, 'onpositionchange', this, this.__$onpositionchange);
		this.__registerDependencyOnLoad(this.__tailPose, 'onorientationchange', this, this.__$onorientationchange);
		this.__registerDependencyOnLoad(this.__headPose, 'onpositionchange', this, this.__$onpositionchange);
		this.__registerDependencyOnLoad(this.__headPose, 'onorientationchange', this, this.__$onorientationchange);
	};
    // private methods
    LineComponent.prototype.__onpositionchange = function () {
        this.__updatePoseComponent();
        this.__updateMeshComponent();
    };
    LineComponent.prototype.__onorientationchange = function () {
        this.__updatePoseComponent();
        this.__updateMeshComponent();
    };
    LineComponent.prototype.__updatePoseComponent = function () {
        var poseComponent = this.__entity.getComponent(PoseComponent);
        if (poseComponent) {
            var position = this.__handle.getPosition();
            var orientation = this.__handle.getOrientation();
            poseComponent.getHandle().setData(new Pose(position.x, position.y, orientation));
        }
    };
    LineComponent.prototype.__updateMeshComponent = function () {
        var meshComponent = this.__entity.getComponent(MeshComponent);
        if (meshComponent) {
            var mesh = this.__handle.getMesh();
            meshComponent.getHandle().setData(mesh);
        }
    };

	return LineComponent;
});
define(['component', 'mesh-component', 'pose-component', 'line-handle'],
function (Component, MeshComponent, PoseComponent, LineHandle) {

	// CLASS LineComponent
	LineComponent.prototype = Object.create(Component.prototype);
	LineComponent.prototype.constructor = LineComponent;
	function LineComponent(tailPoseComponent, headPoseComponent) {
	    this.__validatePoseComponent(tailPoseComponent);
	    this.__validatePoseComponent(headPoseComponent);
        // private variables
        this.__tailPose = tailPoseComponent;
        this.__headPose = headPoseComponent;
        // inherits from
        Component.call(this, new LineHandle(this.__tailPose.Position, this.__headPose.Position), LineHandle);
	    // events
		this.__registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
	};
    // private methods
	LineComponent.prototype.__validatePoseComponent = function (poseComponent) {
	    if (!(poseComponent instanceof PoseComponent)) {
	        throw new Error(this.constructor.name + ':validatePoseComponent - ' + poseComponent.constructor.name + ' must be of type ' + PoseComponent.name);
	    }
	};
	LineComponent.prototype.__onload = function () {
		this.__tailPose.addEventListener('onpositionchange', this, this.__$onpositionchange);
		this.__tailPose.addEventListener('onorientationchange', this, this.__$onorientationchange);
		this.__headPose.addEventListener('onpositionchange', this, this.__$onpositionchange);
		this.__headPose.addEventListener('onorientationchange', this, this.__$onorientationchange);
	};
	LineComponent.prototype.__onunload = function() {
	    this.__tailPose.removeEventListener('onpositionchange', this, this.__$onpositionchange);
	    this.__tailPose.removeEventListener('onorientationchange', this, this.__$onorientationchange);
	    this.__headPose.removeEventListener('onpositionchange', this, this.__$onpositionchange);
	    this.__headPose.removeEventListener('onorientationchange', this, this.__$onorientationchange);
    };
    LineComponent.prototype.__onpositionchange = function () {
        this.__updateMeshComponent();
    };
    LineComponent.prototype.__onorientationchange = function () {
        this.__updateMeshComponent();
    };
    LineComponent.prototype.__updateMeshComponent = function () {
        var meshComponent = this.__entity.getComponent(MeshComponent);
        if (meshComponent) {
            var mesh = this.__handle.getMesh();
            meshComponent.getHandle().setTarget(mesh);
        }
    };

	return LineComponent;
});
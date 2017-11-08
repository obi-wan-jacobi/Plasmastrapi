define(['component', 'pose-component', 'pose', 'line-handle', 'line', 'validator'],
function (Component, PoseComponent, Pose, LineHandle, Line, validator) {

	// CLASS LineComponent
	LineComponent.prototype = Object.create(Component.prototype);
	LineComponent.prototype.constructor = LineComponent;
	function LineComponent(tailPoseComponent, headPoseComponent, lineDisplaySettings) {
        validator.validateInstanceType(this, tailPoseComponent, PoseComponent);
        validator.validateInstanceType(this, headPoseComponent, PoseComponent);
        // private variables
        this.__tailPose = tailPoseComponent;
        this.__headPose = headPoseComponent;
        // inherits from
        Component.call(this, new LineHandle(new Line(this.__tailPose.getHandle().getPositionAsVertex(), this.__headPose.getHandle().getPositionAsVertex()), lineDisplaySettings));
        // events
		this.registerEvents(
            'onpositionchange',
            'onorientationchange'
        );
        // dependencies
        this.__registerDependencyOnLoad(this.__tailPose, 'onpositionchange', this, this.__updateTailPosition);
        this.__registerDependencyOnLoad(this.__tailPose, 'onorientationchange', this, this.__$onorientationchange);
        this.__registerDependencyOnLoad(this.__headPose, 'onpositionchange', this, this.__updateHeadPosition);
        this.__registerDependencyOnLoad(this.__headPose, 'onorientationchange', this, this.__$onorientationchange);
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod('setTailPosition', 'onpositionchange');
        this.__attachEventTriggerToHandleMethod('setTailPosition', 'onorientationchange');
        this.__attachEventTriggerToHandleMethod('setHeadPosition', 'onpositionchange');
        this.__attachEventTriggerToHandleMethod('setHeadPosition', 'onorientationchange');
	};
    // private methods
    LineComponent.prototype.__updateTailPosition = function (poseHandle) {
        this.__handle.setTailPosition(poseHandle.getPosition());
    };
    LineComponent.prototype.__updateHeadPosition = function (poseHandle) {
        this.__handle.setHeadPosition(poseHandle.getPosition());
    };
    LineComponent.prototype.__onpositionchange = function () {
        this.__updatePoseComponent();
        this.__updatePolygonComponent();
    };
    LineComponent.prototype.__onorientationchange = function () {
        this.__updatePoseComponent();
        this.__updatePolygonComponent();
    };
    LineComponent.prototype.__updatePoseComponent = function () {
        var poseComponent = this.__entity.getComponent('pose-component');
        if (poseComponent) {
            var position = this.__handle.getPosition();
            var orientation = this.__handle.getOrientation();
            poseComponent.getHandle().setData(new Pose(position.x, position.y, orientation));
        }
    };
    LineComponent.prototype.__updatePolygonComponent = function () {
        var polygonComponent = this.__entity.getComponent('polygon-component');
        if (polygonComponent) {
            var polygon = this.__handle.getPolygon();
            polygonComponent.getHandle().setData(polygon);
        }
    };

	return LineComponent;
});
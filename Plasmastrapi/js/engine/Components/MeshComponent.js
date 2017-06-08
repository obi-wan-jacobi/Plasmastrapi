define(['component', 'pose-component', 'engine-config'],
function (Component, PoseComponent, config) {

	// CLASS MeshComponent
	MeshComponent.prototype = Object.create(Component.prototype);
	MeshComponent.prototype.constructor = MeshComponent;
    function MeshComponent(meshHandle) {
		// inherits from
		Component.call(this, meshHandle);
	};
	// private methods
	MeshComponent.prototype.__oninit = function() {
		// trigger mesh translation to current pose location
		this.mesh = this.__mesh;
	};
	MeshComponent.prototype.__onload = function() {
		var poseComponent = this.__entity.getComponent(PoseComponent);
		if (!poseComponent) {
			throw new Error(this.constructor.name + ':__onload - ' + this.__entity.constructor.name + ' does not contain a PoseComponent.');
		}
        poseComponent.addEventListener('onpositionchange', this.__handle, this.__handle.translate);
        poseComponent.addEventListener('onorientationchange', this.__handle, this.__handle.rotate);
	};
	MeshComponent.prototype.__onunload = function() {
		var poseComponent = this.__entity.getComponent(PoseComponent);
        poseComponent.removeEventListener('onpositionchange', this.__handle, this.__handle.translate);
        poseComponent.removeEventListener('onorientationchange', this.__handle, this.__handle.rotate);
	};

	return MeshComponent;
});
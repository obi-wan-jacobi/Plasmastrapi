define(['component', 'pose-component', 'engine-config'],
function (Component, PoseComponent, config) {

	// CLASS MeshComponent
	MeshComponent.prototype = Object.create(Component.prototype);
	MeshComponent.prototype.constructor = MeshComponent;
    function MeshComponent(meshHandle) {
		// inherits from
        Component.call(this, meshHandle);
        // dependencies
        this.__registerComponentDependency(PoseComponent, 'onpositionchange', this.__handle, this.__handle.translate);
        this.__registerComponentDependency(PoseComponent, 'onorientationchange', this.__handle, this.__handle.rotate);
	};

	return MeshComponent;
});
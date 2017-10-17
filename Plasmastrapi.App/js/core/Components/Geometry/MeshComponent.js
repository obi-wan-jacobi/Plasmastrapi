define(['component', 'pose-component'],
function (Component, PoseComponent) {

	// CLASS MeshComponent
	MeshComponent.prototype = Object.create(Component.prototype);
	MeshComponent.prototype.constructor = MeshComponent;
    function MeshComponent(meshHandle) {
		// inherits from
        Component.call(this, meshHandle);
        // dependencies
        this.__registerComponentDependencyOnLoad(PoseComponent, 'onpositionchange', this.__handle, this.__handle.translate);
        this.__registerComponentDependencyOnLoad(PoseComponent, 'onorientationchange', this.__handle, this.__handle.rotate);
	};

	return MeshComponent;
});
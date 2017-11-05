define(['component', 'pose-component'],
function (Component, PoseComponent) {

	// CLASS PolygonComponent
	PolygonComponent.prototype = Object.create(Component.prototype);
	PolygonComponent.prototype.constructor = PolygonComponent;
    function PolygonComponent(polygonHandle) {
		// inherits from
        Component.call(this, polygonHandle);
        // dependencies
        this.__registerComponentDependencyOnLoad(PoseComponent, 'onpositionchange', this.__handle, this.__handle.translate);
        this.__registerComponentDependencyOnLoad(PoseComponent, 'onorientationchange', this.__handle, this.__handle.rotate);
	};

	return PolygonComponent;
});
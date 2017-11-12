define(['component'],
function (Component) {

	// CLASS PolygonComponent
	PolygonComponent.prototype = Object.create(Component.prototype);
	PolygonComponent.prototype.constructor = PolygonComponent;
    function PolygonComponent(polygonHandle) {
		// inherits from
        Component.call(this, polygonHandle);
        // dependencies
        this.__registerComponentDependencyOnLoad('pose-component', 'onpositionchange', this.__handle, this.__handle.translate);
        this.__registerComponentDependencyOnLoad('pose-component', 'onorientationchange', this.__handle, this.__handle.rotate);
    };
    PolygonComponent.prototype.__oninit = function () {
        var startingPosition = this.getEntity().getComponent('pose-component').getHandle().getPosition();
        this.__handle.translate(startingPosition);
    };

	return PolygonComponent;
});
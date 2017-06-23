define(['component'],
function (Component) {

    // CLASS CurveComponent
    CurveComponent.prototype = Object.create(Component.prototype);
    CurveComponent.prototype.constructor = CurveComponent;
    function CurveComponent(curveHandle) {
        // inherits from
        Component.call(this, curveHandle);
    };

    return CurveComponent;
});
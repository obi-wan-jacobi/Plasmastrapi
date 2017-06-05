define(['component', 'curve-handle'],
function (Component, CurveHandle) {

    // CLASS CurveComponent
    CurveComponent.prototype = Object.create(Component.prototype);
    CurveComponent.prototype.constructor = CurveComponent;
    function CurveComponent(curveHandle) {
        // inherits from
        Component.call(this, curveHandle, CurveHandle);
    };

    return CurveComponent;
});
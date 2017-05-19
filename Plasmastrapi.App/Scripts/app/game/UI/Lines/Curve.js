define([
    // Base
    'entity',
    // Components
    'curve-component'
],
function (Entity, CurveComponent) {

    Curve.prototype = Object.create(Entity.prototype);
    Curve.prototype.constructor = Curve;
    function Curve(position, lineDisplayOptions) {
        // inherits from
        Entity.call(this);

        // curve
        var curveComponent = new CurveComponent(position, lineDisplayOptions);

        // compose entity
        this.addComponent(curveComponent);
    };
    Curve.prototype.lineTo = function (position) {
        var curveComponent = this.getComponent(CurveComponent);
        curveComponent.lineTo(position);
    };

    return Curve;
});
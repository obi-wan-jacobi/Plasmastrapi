define(["../../../engine/Objects/Entity", "../../../engine/Namespaces/$Components", "../../../engine/Namespaces/$Data"],

function (Entity, $, $Data) {

    Curve.prototype = Object.create(Entity.prototype);
    Curve.prototype.constructor = Curve;
    function Curve(position, lineDisplayOptions) {
        // inherits from
        Entity.call(this);

        // curve
        var curveComponent = new $.CurveComponent(position, lineDisplayOptions);

        // compose entity
        this.addComponent(curveComponent);
    };
    Curve.prototype.lineTo = function (position) {
        var curveComponent = this.getComponent($.CurveComponent);
        curveComponent.lineTo(position);
    };

    return Curve;
});
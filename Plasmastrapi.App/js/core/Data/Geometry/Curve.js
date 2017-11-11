define(['primitive', 'validator'],
function (Primitive, validator) {

    Curve.prototype = Object.create(Primitive.prototype);
    Curve.prototype.constructor = Curve;
    function Curve(vertices) {
        Primitive.call(this);
        validator.validateInstanceType(this, vertices, 'vertex');
        this.vertices = vertices
    };

    return Curve;
});
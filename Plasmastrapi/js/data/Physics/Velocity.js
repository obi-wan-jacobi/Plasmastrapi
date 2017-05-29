define([], function () {

    function Velocity(linearTerm, angularTerm) {
        this.r = linearTerm;
        this.a = angularTerm;
    };

    return Velocity;
});
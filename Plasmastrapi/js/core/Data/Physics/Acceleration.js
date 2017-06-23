define([], function () {

    function Acceleration(linearTerm, angularTerm) {
        this.r = linearTerm;
        this.a = angularTerm;
    };

    return Acceleration;
});
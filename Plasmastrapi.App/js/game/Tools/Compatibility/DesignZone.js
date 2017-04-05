define(["../Base/Compatible"], function (Compatible) {

    function DesignZone() {
        Compatible.call(this, DesignZone);
    };
    DesignZone.resolve = Compatible.prototype.resolve;

    return DesignZone;
});
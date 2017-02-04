define(["../Base/PickableTrait"], function (PickableTrait) {

    function DesignZone() {
        PickableTrait.call(this, DesignZone);
    };
    DesignZone.resolve = PickableTrait.prototype.resolve;

    return DesignZone;
});
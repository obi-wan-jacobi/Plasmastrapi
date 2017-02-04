define(["./Trait"], function (Trait) {

    function DesignZone() {
        Trait.call(this, DesignZone);
    };
    DesignZone.resolve = Trait.prototype.resolve;

    return DesignZone;
});
define(['compatibility-attribute'],
function (CompatibilityAttribute) {

    DesignZone.prototype = Object.create(CompatibilityAttribute.prototype);
    DesignZone.prototype.constructor = DesignZone;
    function DesignZone() {
        CompatibilityAttribute.call(this);
    };

    return DesignZone;
});
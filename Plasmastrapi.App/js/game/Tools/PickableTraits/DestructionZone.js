define(["../Base/PickableTrait"], function (PickableTrait) {

    function DestructionZone() {
        PickableTrait.call(this, DestructionZone);
    };
    DestructionZone.resolve = PickableTrait.prototype.resolve;

    return DestructionZone;
});
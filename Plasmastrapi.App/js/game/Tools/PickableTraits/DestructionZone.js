define(["./Trait"], function (Trait) {

    function DestructionZone() {
        Trait.call(this, DestructionZone);
    };
    DestructionZone.resolve = Trait.prototype.resolve;

    return DestructionZone;
});
define(["../Base/PickableTrait"], function (PickableTrait) {

    function Placeable() {
        PickableTrait.call(this, Placeable);
    };
    Placeable.resolve = PickableTrait.prototype.resolve;

    return Placeable;
});
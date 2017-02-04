define(["../Base/PickableTrait"], function (PickableTrait) {

    function Trashable() {
        PickableTrait.call(this, Trashable);
    };
    Trashable.resolve = PickableTrait.prototype.resolve;

    return Trashable;
});
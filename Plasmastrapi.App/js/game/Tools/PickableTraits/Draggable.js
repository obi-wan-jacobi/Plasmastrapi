define(["../Base/PickableTrait"], function (PickableTrait) {

    function Draggable() {
        PickableTrait.call(this, Draggable);
    };
    Draggable.resolve = PickableTrait.prototype.resolve;

    return Draggable;
});
define(["../Base/PickableTrait"], function (PickableTrait) {

    function Cuttable() {
        PickableTrait.call(this, Cuttable);
    };
    Cuttable.resolve = PickableTrait.prototype.resolve;

    return Cuttable;
});
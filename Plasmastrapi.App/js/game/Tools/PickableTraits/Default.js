define(["../Base/PickableTrait"], function (PickableTrait) {

    function Default() {
        PickableTrait.call(this, Default);
    };
    Default.resolve = PickableTrait.prototype.resolve;

    return Default;
});
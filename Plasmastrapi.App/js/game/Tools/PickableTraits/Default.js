define(["./Compatible"], function (Compatible) {

    function Default() {
        Compatible.call(this, Default);
    };
    Default.resolve = Compatible.prototype.resolve;

    return Default;
});
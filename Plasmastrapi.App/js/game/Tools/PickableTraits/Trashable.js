define(["./Compatible"], function (Compatible) {

    function Trashable() {
        Compatible.call(this, Trashable);
    };
    Trashable.resolve = Compatible.prototype.resolve;

    return Trashable;
});
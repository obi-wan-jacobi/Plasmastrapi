define([
    'compatible'
],
function (Compatible) {

    function Pickable() {
        Compatible.call(this, Pickable);
    };
    Pickable.resolve = Compatible.prototype.resolve;

    return Pickable;
});
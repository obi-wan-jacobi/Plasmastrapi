define([
    'compatible'
],
function (Compatible) {

    function Draggable() {
        Compatible.call(this, Draggable);
    };
    Draggable.resolve = Compatible.prototype.resolve;

    return Draggable;
});
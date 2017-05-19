define([
    'compatible'
],
function (Compatible) {

    function DestructionZone() {
        Compatible.call(this, DestructionZone);
    };
    DestructionZone.resolve = Compatible.prototype.resolve;

    return DestructionZone;
});
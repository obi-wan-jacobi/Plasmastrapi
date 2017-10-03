define([
    'compatible'
],
function (Compatible) {

    function Cuttable() {
        Compatible.call(this, Cuttable);
    };
    Cuttable.resolve = Compatible.prototype.resolve;

    return Cuttable;
});
define(["./Compatible"], function (Compatible) {

    function Wireable() {
        Compatible.call(this, Wireable);
    };

    return Wireable;
});
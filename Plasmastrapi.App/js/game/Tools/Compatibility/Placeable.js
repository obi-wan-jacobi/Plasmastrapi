﻿define(["../Base/Compatible"], function (Compatible) {

    function Placeable() {
        Compatible.call(this, Placeable);
    };
    Placeable.resolve = Compatible.prototype.resolve;

    return Placeable;
});
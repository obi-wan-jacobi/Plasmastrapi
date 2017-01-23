define(["./Panel"], function (Panel) {

    CircuitDesignToolbar.prototype = Object.create(Panel.prototype);
    CircuitDesignToolbar.prototype.constructor = CircuitDesignToolbar;
    function CircuitDesignToolbar() {
        Panel.call(this);
    };

    return CircuitDesignToolbar;
});
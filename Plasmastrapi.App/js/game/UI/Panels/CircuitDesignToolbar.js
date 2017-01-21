define(["../Base/UILabElement"], function (UILabElement) {

    CircuitDesignToolbar.prototype = Object.create(UIElement.prototype);
    CircuitDesignToolbar.prototype.constructor = CircuitDesignToolbar;
    function CircuitDesignToolbar() {
        UIElement.call(this);
    };

    return CircuitDesignToolbar;
});
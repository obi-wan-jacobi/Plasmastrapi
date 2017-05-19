define([
    // Base
    'image-panel'
],
function (ImagePanel) {

    CircuitDesignToolbar.prototype = Object.create(ImagePanel.prototype);
    CircuitDesignToolbar.prototype.constructor = CircuitDesignToolbar;
    function CircuitDesignToolbar() {
        ImagePanel.call(this);
    };

    return CircuitDesignToolbar;
});
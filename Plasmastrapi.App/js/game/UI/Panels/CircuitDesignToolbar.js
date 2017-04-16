define(["../Base/ImagePanel", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../../Namespaces/$Compatibility"], function (ImagePanel, $, $Compatibility) {

    CircuitDesignToolbar.prototype = Object.create(ImagePanel.prototype);
    CircuitDesignToolbar.prototype.constructor = CircuitDesignToolbar;
    function CircuitDesignToolbar() {
        ImagePanel.call(this);
    };

    return CircuitDesignToolbar;
});
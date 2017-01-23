define(["./Area",
        "../../../engine/Components/$Components",
        "../../../engine/Data/Geometry",
        "../../../engine/Data/Graphics"
    ],
    function (Area, $, Geometry, Graphics) {

    // CLASS CircuitDesignArea
    CircuitDesignArea.prototype = Object.create(Area.prototype);
    CircuitDesignArea.prototype.constructor = CircuitDesignArea;
    function CircuitDesignArea(x, y, imageHandle) {
        Area.call(this, x, y, imageHandle);
    };
    
    return CircuitDesignArea;
});
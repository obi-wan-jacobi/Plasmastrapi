define(["../Base/Panel", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../../Namespaces/$Compatibility"], function (Panel, $, $Compatibility) {

    CircuitDesignToolbar.prototype = Object.create(Panel.prototype);
    CircuitDesignToolbar.prototype.constructor = CircuitDesignToolbar;
    function CircuitDesignToolbar() {
        Panel.call(this);
        // apply tool compatibilities
        $Compatibility.DestructionZone.call(this);
    };

    return CircuitDesignToolbar;
});
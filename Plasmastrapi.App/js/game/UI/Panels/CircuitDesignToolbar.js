define(["../Base/Panel", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../../Namespaces/$PickableTraits"], function (Panel, $, $PickableTraits) {

    CircuitDesignToolbar.prototype = Object.create(Panel.prototype);
    CircuitDesignToolbar.prototype.constructor = CircuitDesignToolbar;
    function CircuitDesignToolbar() {
        Panel.call(this);
        // apply traits
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.DestructionZone.call(pickableComponent);
    };

    return CircuitDesignToolbar;
});
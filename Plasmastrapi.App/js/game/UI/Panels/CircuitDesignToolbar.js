define(["./Area", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../Traits/$Traits"], function (Area, $, $Traits) {

    CircuitDesignToolbar.prototype = Object.create(Panel.prototype);
    CircuitDesignToolbar.prototype.constructor = CircuitDesignToolbar;
    function CircuitDesignToolbar() {
        Panel.call(this);
        // apply traits
        var pickableComponent = this.getComponent($.PickableComponent);
        $Traits.DestructionZone.call(pickableComponent);
    };

    return CircuitDesignToolbar;
});
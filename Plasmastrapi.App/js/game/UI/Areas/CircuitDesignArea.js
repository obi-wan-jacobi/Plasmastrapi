define([
    "../Base/Area",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Data/Graphics",
    "../../Namespaces/$PickableTraits",
    "gameConfig"
],
function (Area, $, Graphics, $PickableTraits, config) {

    // CLASS CircuitDesignArea
    CircuitDesignArea.prototype = Object.create(Area.prototype);
    CircuitDesignArea.prototype.constructor = CircuitDesignArea;
    function CircuitDesignArea(x, y, width, height) {
        var imageHandle = new Graphics.ImageHandle(
            config.CircuitDesignArea.displayLayer,
            x,
            y,
            this.image.width,
            this.image.height,
            width,
            height,
            this.image
        );
        // inherits from
        Area.call(this, x, y, imageHandle);
        // apply traits
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.DesignZone.call(pickableComponent);
    };
    
    return CircuitDesignArea;
});
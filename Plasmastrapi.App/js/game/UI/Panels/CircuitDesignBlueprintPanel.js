define([
    "../Base/Panel",
    "../../../engine/Namespaces/$Components",
    "../../Namespaces/$Data",
    "../../Namespaces/$PickableTraits",
    "gameConfig"
],
function (Panel, $, Graphics, $PickableTraits, config) {

    // CLASS CircuitDesignBlueprintPanel
    CircuitDesignBlueprintPanel.prototype = Object.create(Panel.prototype);
    CircuitDesignBlueprintPanel.prototype.constructor = CircuitDesignBlueprintPanel;
    function CircuitDesignBlueprintPanel(x, y, width, height) {
        var imageHandle = new $Data.Graphics.ImageHandle(
            config.CircuitDesignBlueprintPanel.displayLayer,
            x,
            y,
            this.image.width,
            this.image.height,
            width,
            height,
            this.image
        );
        // inherits from
        Panel.call(this, x, y, imageHandle);
        // apply traits
        var pickableComponent = this.getComponent($.PickableComponent);
        $PickableTraits.DesignZone.call(pickableComponent);
    };
    
    return CircuitDesignBlueprintPanel;
});
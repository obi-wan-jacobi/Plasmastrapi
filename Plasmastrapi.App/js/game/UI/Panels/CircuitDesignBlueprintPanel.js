define([
    "../Base/ImagePanel",
    "../../../engine/Namespaces/$Components",
    "../../../engine/Namespaces/$Data",
    "../../Namespaces/$Compatibility",
    "gameConfig"
],
function (ImagePanel, $, $Data, $Compatibility, config) {

    // CLASS CircuitDesignBlueprintPanel
    CircuitDesignBlueprintPanel.prototype = Object.create(ImagePanel.prototype);
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
        ImagePanel.call(this, x, y, imageHandle);
        // apply tool compatibilities
        $Compatibility.DesignZone.call(this);
    };
    
    return CircuitDesignBlueprintPanel;
});
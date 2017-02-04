define(["./Area", "../../../engine/Namespaces/$Components", "../../../engine/Data/Graphics", "../Traits/$Traits"], function (Area, $, Graphics, $Traits) {

    // CLASS CircuitDesignArea
    CircuitDesignArea.prototype = Object.create(Area.prototype);
    CircuitDesignArea.prototype.constructor = CircuitDesignArea;
    function CircuitDesignArea(x, y, width, height) {
        // predefined area parameters
        var displayLayer = 'ondrawgamebackground';
        var imageHandle = new Graphics.ImageHandle(displayLayer, x, y, this.image.width, this.image.height, width, height, this.image);
        // inherits from
        Area.call(this, x, y, imageHandle);
        // apply traits
        var pickableComponent = this.getComponent($.PickableComponent);
        $Traits.DesignZone.call(pickableComponent);
    };
    
    return CircuitDesignArea;
});
define(["./Area", "../../../engine/Data/Graphics"], function (Area, Graphics) {

    // CLASS CircuitDesignArea
    CircuitDesignArea.prototype = Object.create(Area.prototype);
    CircuitDesignArea.prototype.constructor = CircuitDesignArea;
    function CircuitDesignArea(x, y, width, height) {
        // predefined area parameters
        var displayLayer = 'ondrawgamebackground';
        var imageHandle = new Graphics.ImageHandle(displayLayer, x, y, this.image.width, this.image.height, width, height, this.image);
        // inherits from
        Area.call(this, x, y, imageHandle);
    };
    
    return CircuitDesignArea;
});
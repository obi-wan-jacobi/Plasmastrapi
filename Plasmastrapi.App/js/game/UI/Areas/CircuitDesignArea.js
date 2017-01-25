define(["./Area", "../../../engine/Data/Graphics"], function (Area, Graphics) {

    // CLASS CircuitDesignArea
    CircuitDesignArea.prototype = Object.create(Area.prototype);
    CircuitDesignArea.prototype.constructor = CircuitDesignArea;
    function CircuitDesignArea() {
        // predefined area parameters
        var x = 1024 / 2;
        var y = 768 / 2;
        var width = 1024;
        var height = 768;
        var displayLayer = 'ondrawgamebackground';
        var imageHandle = new Graphics.ImageHandle(displayLayer, 115, 63, x, y, width, height, this.image);
        // inherits from
        Area.call(this, x, y, imageHandle);
    };
    
    return CircuitDesignArea;
});
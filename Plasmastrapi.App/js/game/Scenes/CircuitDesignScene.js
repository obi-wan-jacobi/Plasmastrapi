define(["../../engine/Objects/Scene", "../../engine/Data/Graphics", "../UI/Areas/CircuitDesignArea"], function (Scene, Graphics, CircuitDesignArea) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene() {
        Scene.call(this);
    };
    CircuitDesignScene.prototype.__oninit = function () {
        // build scene objects
        var x = this.__engine.canvas.clientWidth / 2;
        var y = this.__engine.canvas.clientHeight / 2;
        var width = this.__engine.canvas.clientWidth;
        var height = this.__engine.canvas.clientHeight;
        var displayLayer = this.__engine.drawSystem.DISPLAYLAYERS.GAMEBACKGROUND;
        var imageHandle = new Graphics.ImageHandle(displayLayer, 115, 63, x, y, width, height, CircuitDesignArea.image);
        // add scene objects
        this.add(new CircuitDesignArea(x, y, imageHandle));
        //var andGateButton = new Lab.SpawnerButton(50, 40, Lab.AndGate);
    };

    return CircuitDesignScene;
});
define(["../../engine/Objects/Scene", "../UI/Areas/CircuitDesignArea"], function (Scene, CircuitDesignArea) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene() {
        Scene.call(this);
    };
    CircuitDesignScene.prototype.__oninit = function () {
        // add scene objects
        this.add(new CircuitDesignArea());
        //var andGateButton = new Lab.SpawnerButton(50, 40, Lab.AndGate);
    };

    return CircuitDesignScene;
});
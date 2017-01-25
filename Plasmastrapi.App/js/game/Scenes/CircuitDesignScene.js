define(["../../engine/Objects/Scene", "../UI/Areas/CircuitDesignArea", "../Circuits/Gates/AndGate"], function (Scene, CircuitDesignArea, AndGate) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene() {
        Scene.call(this);
    };
    CircuitDesignScene.prototype.__oninit = function () {
        // add scene objects
        this.add(new CircuitDesignArea());
        this.add(new AndGate(50, 40));
    };

    return CircuitDesignScene;
});
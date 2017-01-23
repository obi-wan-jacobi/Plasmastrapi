define(["../../engine/Objects/Scene", "../UI/Areas/CircuitDesignArea"], function (Scene, CircuitDesignArea) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene() {
        Scene.call(this);
    };
    CircuitDesignScene.prototype.__oninit = function () {
        this.add(new CircuitDesignArea(
            this.__engine.canvas.clientWidth / 2,
            this.__engine.canvas.clientHeight / 2,
            this.__engine.canvas.clientWidth,
            this.__engine.canvas.clientHeight
        ));
        //var andGateButton = new Lab.SpawnerButton(50, 40, Lab.AndGate);
    };

    return CircuitDesignScene;
});
define(["../../engine/Objects/Scene", "../UI/Areas/CircuitDesignArea", "../UI/Buttons/SpawnerButton", "../Circuits/Gates/AndGate"],
function (Scene, CircuitDesignArea, SpawnerButton, AndGate) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene(canvas) {
        Scene.call(this);
        this.add(new CircuitDesignArea(500, 500, CircuitDesignArea.prototype.image.width, CircuitDesignArea.prototype.image.height));
        this.add(new SpawnerButton(50, 40, AndGate));
        this.add(new AndGate(100, 40));
    };

    return CircuitDesignScene;
});
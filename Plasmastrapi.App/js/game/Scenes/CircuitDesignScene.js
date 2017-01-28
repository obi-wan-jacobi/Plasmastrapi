define(["../../engine/Objects/Scene", "../UI/$UI", "../Circuits/$Circuits"],
function (Scene, $UI, $Circuits) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene(canvas) {
        Scene.call(this);
        this.add(new $UI.CircuitDesignArea($UI.CircuitDesignArea.prototype.image.width / 2, $UI.CircuitDesignArea.prototype.image.height / 2,
            $UI.CircuitDesignArea.prototype.image.width, $UI.CircuitDesignArea.prototype.image.height));
        this.add(new $UI.SpawnerButton(50, 40, $Circuits.AndGate));
        this.add(new $UI.SpawnerButton(100, 40, $Circuits.NandGate));
        this.add(new $UI.SpawnerButton(150, 40, $Circuits.OrGate));
        this.add(new $UI.SpawnerButton(200, 40, $Circuits.XorGate));
        this.add(new $Circuits.AndGate(50, 140));
        this.add(new $Circuits.NandGate(100, 140));
        this.add(new $Circuits.OrGate(150, 140));
        this.add(new $Circuits.XorGate(200, 140));
    };

    return CircuitDesignScene;
});
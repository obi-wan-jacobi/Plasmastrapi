define(["../../engine/Objects/Scene", "../Namespaces/$UI", "../Namespaces/$Circuits", "../Namespaces/$Cursors"],
function (Scene, $UI, $Circuits, $Cursors) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene(canvas) {
        Scene.call(this);
        // design area
        this.add(new $UI.CircuitDesignBlueprintPanel($UI.CircuitDesignBlueprintPanel.prototype.image.width / 2, $UI.CircuitDesignBlueprintPanel.prototype.image.height / 2,
            $UI.CircuitDesignBlueprintPanel.prototype.image.width, $UI.CircuitDesignBlueprintPanel.prototype.image.height));
        // toolbar

        //toolbar element spawner buttons
        this.andGateButton = new $UI.SpawnerButton(50, 40, $Circuits.AndGate, "[1]");
        this.nandGateButton = new $UI.SpawnerButton(100, 40, $Circuits.NandGate, "[2]");
        this.orGateButton = new $UI.SpawnerButton(150, 40, $Circuits.OrGate, "[3]");
        this.xorGateButton = new $UI.SpawnerButton(200, 40, $Circuits.XorGate, "[4]");
        this.powerSourceButton = new $UI.SpawnerButton(250, 40, $Circuits.PowerSource, "[5]");
        this.add(this.andGateButton);
        this.add(this.nandGateButton);
        this.add(this.orGateButton);
        this.add(this.xorGateButton);
        this.add(this.powerSourceButton);
    };
    CircuitDesignScene.prototype.__oninit = function() {
        // toolbar utility buttons
        this.add(new $UI.LabelledButton(1200, 40, "[w]", $Cursors.CuttingToolCursor.prototype.sprite.frames[0], this.__engine.toolController, this.__engine.toolController.equipCuttingTool));
        this.add(new $UI.LabelledButton(1250, 40, "[q]", $Cursors.TrashToolCursor.prototype.sprite.frames[0], this.__engine.toolController, this.__engine.toolController.equipTrashTool));
    };

    return CircuitDesignScene;
});
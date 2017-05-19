define([
    // Base
    'scene',
    // UI
    'circuit-design-blueprint-panel',
    'spawner-button',
    // Circuits
    'and-gate',
    'nand-gate',
    'or-gate',
    'xor-gate',
    'power-source',
    // Cursors
    'cutting-tool-cursor',
    'trash-tool-cursor',
],
    function (Scene, CircuitDesignBlueprintPanel, SpawnerButton, AndGate, NandGate, OrGate, XorGate, PowerSource, CuttingToolCursor, TrashToolCursor) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene(canvas) {
        Scene.call(this);
        // design area
        this.add(new CircuitDesignBlueprintPanel(CircuitDesignBlueprintPanel.prototype.image.width / 2, CircuitDesignBlueprintPanel.prototype.image.height / 2,
            CircuitDesignBlueprintPanel.prototype.image.width, CircuitDesignBlueprintPanel.prototype.image.height));
        // toolbar

        //toolbar element spawner buttons
        this.andGateButton = new SpawnerButton(50, 40, AndGate, "[1]");
        this.nandGateButton = new SpawnerButton(100, 40, NandGate, "[2]");
        this.orGateButton = new SpawnerButton(150, 40, OrGate, "[3]");
        this.xorGateButton = new SpawnerButton(200, 40, XorGate, "[4]");
        this.powerSourceButton = new SpawnerButton(250, 40, PowerSource, "[5]");
        this.add(this.andGateButton);
        this.add(this.nandGateButton);
        this.add(this.orGateButton);
        this.add(this.xorGateButton);
        this.add(this.powerSourceButton);
    };
    CircuitDesignScene.prototype.__oninit = function() {
        // toolbar utility buttons
        this.add(new LabelledButton(1200, 40, "[w]", CuttingToolCursor.prototype.sprite.frames[0], this.__engine.toolController, this.__engine.toolController.equipCuttingTool));
        this.add(new LabelledButton(1250, 40, "[q]", TrashToolCursor.prototype.sprite.frames[0], this.__engine.toolController, this.__engine.toolController.equipTrashTool));
    };

    return CircuitDesignScene;
});
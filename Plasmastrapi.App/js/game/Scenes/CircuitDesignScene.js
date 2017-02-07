define(["../../engine/Objects/Scene", "../Namespaces/$UI", "../Namespaces/$Circuits", "../Namespaces/$Cursors"],
function (Scene, $UI, $Circuits, $Cursors) {

    CircuitDesignScene.prototype = Object.create(Scene.prototype);
    CircuitDesignScene.prototype.constructor = CircuitDesignScene;
    function CircuitDesignScene(canvas) {
        Scene.call(this);
        // design area
        this.add(new $UI.CircuitDesignArea($UI.CircuitDesignArea.prototype.image.width / 2, $UI.CircuitDesignArea.prototype.image.height / 2,
            $UI.CircuitDesignArea.prototype.image.width, $UI.CircuitDesignArea.prototype.image.height));
        // toolbar

        //toolbar element spawner buttons
        this.add(new $UI.SpawnerButton(50, 40, $Circuits.AndGate));
        this.add(new $UI.SpawnerButton(100, 40, $Circuits.NandGate));
        this.add(new $UI.SpawnerButton(150, 40, $Circuits.OrGate));
        this.add(new $UI.SpawnerButton(200, 40, $Circuits.XorGate));
        this.add(new $UI.SpawnerButton(250, 40, $Circuits.PowerSource));
    };
    CircuitDesignScene.prototype.__oninit = function() {
        // toolbar utility buttons
        this.add(new $UI.ToolButton(1250, 40, $Cursors.TrashToolCursor.prototype.sprite.frames[0], this.__engine.toolController, this.__engine.toolController.equipTrashTool));
    };

    return CircuitDesignScene;
});
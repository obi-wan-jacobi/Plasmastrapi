define(['scene'],
function (Scene) {

    LabScene.prototype = Object.create(Scene.prototype);
    LabScene.prototype.constructor = LabScene;
    function LabScene(engine) {
        Scene.call(this, engine);
    };
    LabScene.prototype.__oninit = function () {
        Scene.prototype.__oninit.call(this);
        var engine = this.__engine;
        var uiElementFactory = this.__engine.getFactory('ui-element-factory');
        var labController = this.__engine.getController('lab-controller');
        var revisionController = this.__engine.getController('revision-controller');

        var stage = uiElementFactory.create('panel');
        stage.set('position', [1200, 350]);
        stage.set('rectangle', [600, 700]);

        var stageHeader = uiElementFactory.create('panel');
        stageHeader.set('position', [1200, 30]);
        stageHeader.set('rectangle', [600, 60]);

        var stageArea = uiElementFactory.create('panel');
        stageArea.set('position', [1200, 355]);
        stageArea.set('rectangle', [592, 582]);

        var stageFooter = uiElementFactory.create('panel');
        stageFooter.set('position', [1200, 675]);
        stageFooter.set('rectangle', [600, 50]);

        var stepback = uiElementFactory.create('button');
        stepback.set('position', [925, 675]);
        stepback.set('rectangle', [30, 30]);

        var playpause = uiElementFactory.create('button');
        playpause.set('position', [965, 675]);
        playpause.set('rectangle', [30, 30]);

        var stepforward = uiElementFactory.create('button');
        stepforward.set('position', [1005, 675]);
        stepforward.set('rectangle', [30, 30]);

        var toolbar = uiElementFactory.create('panel');
        toolbar.set('position', [450, 30]);
        toolbar.set('rectangle', [900, 60]);

        var andGateButton = uiElementFactory.create('button');
        andGateButton.set('image', ['and-gate']);
        andGateButton.set('position', [30, 25]);
        andGateButton.set('rectangle', [30, 30]);
        andGateButton.set('label', ['[1]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(andGateButton, 'and-gate', '1');

        var nandGateButton = uiElementFactory.create('button');
        nandGateButton.set('image', ['nand-gate']);
        nandGateButton.set('position', [75, 25]);
        nandGateButton.set('rectangle', [30, 30]);
        nandGateButton.set('label', ['[2]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(nandGateButton, 'nand-gate', '2');

        var orGateButton = uiElementFactory.create('button')
        orGateButton.set('image', ['or-gate']);
        orGateButton.set('position', [120, 25]);
        orGateButton.set('rectangle', [30, 30]);
        orGateButton.set('label', ['[3]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(orGateButton, 'or-gate', '3');

        var xorGateButton = uiElementFactory.create('button');
        xorGateButton.set('image', ['xor-gate']);
        xorGateButton.set('position', [165, 25]);
        xorGateButton.set('rectangle', [30, 30]);
        xorGateButton.set('label', ['[4]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(xorGateButton, 'xor-gate', '4');

        var powerSourceButton = uiElementFactory.create('button');
        powerSourceButton.set('image', ['power-source']);
        powerSourceButton.set('position', [210, 25]);
        powerSourceButton.set('rectangle', [30, 30]);
        powerSourceButton.set('label', ['[5]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(powerSourceButton, 'power-source', '5');

        var undoButton = uiElementFactory.create('button');
        undoButton.set('image', ['undo']);
        undoButton.set('position', [631, 25]);
        undoButton.set('rectangle', [30, 30]);
        undoButton.set('label', ['[ctrl+z]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        undoButton.set('pick-component:onpick', [revisionController.undo.bind(revisionController)]);

        var redoButton = uiElementFactory.create('button');
        redoButton.set('image', ['redo']);
        redoButton.set('position', [676, 25]);
        redoButton.set('rectangle', [30, 30]);
        redoButton.set('label', ['[ctrl+y]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        redoButton.set('pick-component:onpick', [revisionController.redo.bind(revisionController)]);

        var trashButton = uiElementFactory.create('button');
        trashButton.set('image', ['trashcan']);
        trashButton.set('position', [721, 25]);
        trashButton.set('rectangle', [30, 30]);
        trashButton.set('label', ['[q]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setTrashButton(trashButton, 'q');

        var wireCutterButton = uiElementFactory.create('button');
        wireCutterButton.set('image', ['wire-cutter-closed']);
        wireCutterButton.set('position', [766, 25]);
        wireCutterButton.set('rectangle', [30, 30]);
        wireCutterButton.set('label', ['[w]'], { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setWireCutterButton(wireCutterButton, 'w');

        var buttonHighlighter = uiElementFactory.create('panel');
        buttonHighlighter.set('position', [0, 0]);
        buttonHighlighter.set('rectangle', [0, 0], { strokeStyle: '#33BBFF', lineWidth: 2 })

        function initButtonOnSelectHighlighting(button) {
            var pickComponent = button.getComponent('pick-component');
            pickComponent.addEventListener('onselect', buttonHighlighter, function () {
                var buttonPosition = button.getComponent('pose-component').getHandle().getPosition();
                buttonHighlighter.set('position', [buttonPosition.x, buttonPosition.y + 5]);
                buttonHighlighter.set('rectangle', [40, 56]);
            });
            pickComponent.addEventListener('ondeselect', buttonHighlighter, function () {
                buttonHighlighter.set('rectangle', [0, 0]);
            });
        };

        initButtonOnSelectHighlighting(andGateButton);
        initButtonOnSelectHighlighting(nandGateButton);
        initButtonOnSelectHighlighting(orGateButton);
        initButtonOnSelectHighlighting(xorGateButton);
        initButtonOnSelectHighlighting(trashButton);
        initButtonOnSelectHighlighting(wireCutterButton);
        initButtonOnSelectHighlighting(powerSourceButton);

        var backNavigationButton = uiElementFactory.create('button');
        backNavigationButton.set('position', [846, 30]);
        backNavigationButton.set('rectangle', [100, 52]);
        backNavigationButton.set('label', ['Menu'], { offset: { x: 0, y: 7 } });
        backNavigationButton.set('pick-component:onpick', [function() {
            engine.getController('scene-controller').setScene('main-menu-scene');
        }]);

        var designArea = uiElementFactory.create('panel');
        designArea.set('position', [450, 380]);
        designArea.set('rectangle', [900, 640]);
        labController.setDesignArea(designArea);
    };
    LabScene.prototype.__onunload = function () {
        Scene.prototype.__onunload.call(this);
        this.__engine.getController('input-controller').setHandler();
    };

    return LabScene;
});
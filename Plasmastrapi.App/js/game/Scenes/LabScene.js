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
        andGateButton.set('image', 'and-gate');
        andGateButton.set('position', [30, 25]);
        andGateButton.set('rectangle', [30, 30]);
        andGateButton.set('text', ['[1]']);
        andGateButton.set('text-display-settings', { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(andGateButton, 'and-gate', '1');

        var nandGateButton = uiElementFactory.create('button');
        nandGateButton.set('image', 'nand-gate');
        nandGateButton.set('position', [75, 25]);
        nandGateButton.set('rectangle', [30, 30]);
        nandGateButton.set('text', ['[2]']);
        nandGateButton.set('text-display-settings', { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(nandGateButton, 'nand-gate', '2');

        var orGateButton = uiElementFactory.create('button')
        orGateButton.set('image', 'or-gate');
        orGateButton.set('position', [120, 25]);
        orGateButton.set('rectangle', [30, 30]);
        orGateButton.set('text', ['[3]']);
        orGateButton.set('text-display-settings', { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(orGateButton, 'or-gate', '3');

        var xorGateButton = uiElementFactory.create('button');
        xorGateButton.set('image', 'xor-gate');
        xorGateButton.set('position', [165, 25]);
        xorGateButton.set('rectangle', [30, 30]);
        xorGateButton.set('text', ['[4]']);
        xorGateButton.set('text-display-settings', { offset: { x: 0, y: 28 }, fontSize: 12 });
        labController.setSpawnerButton(xorGateButton, 'xor-gate', '4');

        var backNavigationButton = uiElementFactory.create('button');
        backNavigationButton.set('position', [846, 30]);
        backNavigationButton.set('rectangle', [100, 52]);
        backNavigationButton.set('text', ['Menu']);
        backNavigationButton.set('text-display-settings', { offset: { x: 0, y: 7 } });
        backNavigationButton.set('pick-action', function() {
            engine.getController('scene-controller').setScene('main-menu-scene');
        });

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
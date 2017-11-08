﻿define(['scene', 'panel', 'button', 'position', 'rectangle', 'text', 'modules'],
function (Scene, Panel, Button, Position, Rectangle, Text, modules) {

    LabScene.prototype = Object.create(Scene.prototype);
    LabScene.prototype.constructor = LabScene;
    function LabScene(engine) {
        Scene.call(this, engine);
    };
    LabScene.prototype.__oninit = function () {
        var engine = this.__engine;
        var uiElementFactory = engine.getFactory('ui-element-factory');
        var logicElementFactory = engine.getFactory('logic-element-factory');
        var labController = engine.getController('lab-controller');

        var stage = uiElementFactory.create(Panel);
        stage.set(new Position(1200, 350));
        stage.set(new Rectangle(600, 700));

        var stageHeader = uiElementFactory.create(Panel);
        stageHeader.set(new Position(1200, 25));
        stageHeader.set(new Rectangle(600, 50));

        var stageArea = uiElementFactory.create(Panel);
        stageArea.set(new Position(1200, 350));
        stageArea.set(new Rectangle(592, 592));

        var stageFooter = uiElementFactory.create(Panel);
        stageFooter.set(new Position(1200, 675));
        stageFooter.set(new Rectangle(600, 50));

        var stepback = uiElementFactory.create(Button);
        stepback.set(new Position(925, 675));
        stepback.set(new Rectangle(30, 30));

        var playpause = uiElementFactory.create(Button);
        playpause.set(new Position(965, 675));
        playpause.set(new Rectangle(30, 30));

        var stepforward = uiElementFactory.create(Button);
        stepforward.set(new Position(1005, 675));
        stepforward.set(new Rectangle(30, 30));

        var toolbar = uiElementFactory.create(Panel);
        toolbar.set(new Position(450, 25));
        toolbar.set(new Rectangle(900, 50));

        var andGateButton = uiElementFactory.create(Button, 'and-gate');
        andGateButton.set(new Position(25, 25));
        andGateButton.set(new Rectangle(30, 30));
        andGateButton.set(function () {
            labController.spawn(modules.require('and-gate'));
        });

        var nandGateButton = uiElementFactory.create(Button, 'nand-gate');
        nandGateButton.set(new Position(65, 25));
        nandGateButton.set(new Rectangle(30, 30));
        nandGateButton.set(function () {
            labController.spawn(modules.require('nand-gate'));
        });

        var orGateButton = uiElementFactory.create(Button, 'or-gate');
        orGateButton.set(new Position(105, 25));
        orGateButton.set(new Rectangle(30, 30));
        orGateButton.set(function () {
            labController.spawn(modules.require('or-gate'));
        });

        var xorGateButton = uiElementFactory.create(Button, 'xor-gate');
        xorGateButton.set(new Position(145, 25));
        xorGateButton.set(new Rectangle(30, 30));
        xorGateButton.set(function () {
            labController.spawn(modules.require('xor-gate'));
        });

        var backNavigationButton = uiElementFactory.create(Button);
        backNavigationButton.set(new Position(840, 25));
        backNavigationButton.set(new Rectangle(100, 30));
        backNavigationButton.set(new Text('Menu'));
        backNavigationButton.set(function () {
            var MainMenuScene = modules.require('main-menu-scene');
            engine.getController('scene-controller').setScene(MainMenuScene);
        });

        var designArea = uiElementFactory.create(Panel);
        designArea.set(new Position(450, 375));
        designArea.set(new Rectangle(900, 650));

        labController.setDesignArea(designArea);
    };

    return LabScene;
});
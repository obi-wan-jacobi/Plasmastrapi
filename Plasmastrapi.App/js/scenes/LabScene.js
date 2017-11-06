define(['scene', 'ui-element-factory', 'logic-element-factory', 'panel', 'button', 'scene-controller', 'lab-controller', 'position', 'rectangle', 'text', 'modules'],
function (Scene, UIElementFactory, LogicElementFactory, Panel, Button, SceneController, LabController, Position, Rectangle, Text, modules) {

    LabScene.prototype = Object.create(Scene.prototype);
    LabScene.prototype.constructor = LabScene;
    function LabScene(engine) {
        Scene.call(this, engine);
    };
    LabScene.prototype.__oninit = function () {
        var engine = this.__engine;
        var uiElementFactory = engine.getFactory(UIElementFactory);
        var logicElementFactory = engine.getFactory(LogicElementFactory);
        var labController = engine.getController(LabController);

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

        var andgate = uiElementFactory.create(Button, 'and-gate');
        andgate.set(new Position(25, 25));
        andgate.set(new Rectangle(30, 30));

        var nandgate = uiElementFactory.create(Button, 'nand-gate');
        nandgate.set(new Position(65, 25));
        nandgate.set(new Rectangle(30, 30));

        var orgate = uiElementFactory.create(Button, 'or-gate');
        orgate.set(new Position(105, 25));
        orgate.set(new Rectangle(30, 30));

        var xorgate = uiElementFactory.create(Button, 'xor-gate');
        xorgate.set(new Position(145, 25));
        xorgate.set(new Rectangle(30, 30));

        var backNavigationButton = uiElementFactory.create(Button);
        backNavigationButton.set(new Position(840, 25));
        backNavigationButton.set(new Rectangle(100, 30));
        backNavigationButton.set(new Text('Menu'));
        backNavigationButton.set(function () {
            var MainMenu = modules.require('main-menu-scene');
            engine.getController(SceneController).setScene(MainMenu);
        });

        var designArea = uiElementFactory.create(Panel);
        designArea.set(new Position(450, 375));
        designArea.set(new Rectangle(900, 650));
        designArea.set(function () {
            andgate2.__$onplace();
        });

        labController.setDesignArea(designArea);

        var andgate2 = logicElementFactory.create(modules.require('and-gate'));
        andgate2.set(new Position(1450, 350));
        andgate2.set(new Rectangle(30, 30));
    };

    return LabScene;
});
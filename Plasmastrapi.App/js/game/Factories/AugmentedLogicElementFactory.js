define(['factory', 'utils', 'game-config'],
function (Factory, utils, config) {

    AugmentedLogicElementFactory.prototype = Object.create(Factory.prototype);
    AugmentedLogicElementFactory.prototype.constructor = AugmentedLogicElementFactory;
    function AugmentedLogicElementFactory(engine) {
        Factory.call(this, engine);
        this.__primitiveFactory = null;
        this.__displaySettingsFactory = null;
        this.__componentFactory = null;
        this.__logicElementFactory = null;
        this.__terminalFactory = null;
        this.__wireFactory = null;
        this.__labController = null;
        this.__cursorController = null;
        this.__assetMap = null;
    };
    // private methods
    AugmentedLogicElementFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__primitiveFactory = this.__engine.getFactory('primitive-factory');
        this.__displaySettingsFactory = this.__engine.getFactory('display-settings-factory');
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__logicElementFactory = this.__engine.getFactory('logic-element-factory');
        this.__terminalFactory = this.__engine.getFactory('augmented-terminal-factory');
        this.__wireFactory = this.__engine.getFactory('augmented-wire-factory');
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__assetMap = this.__engine.getAssetMap();
    };
    // public methods
    AugmentedLogicElementFactory.prototype.create = function (logicElementString) {
        var logicElement = this.__logicElementFactory.create(logicElementString);
        // add components
        logicElement.addComponent(this.__componentFactory.create('pose-component'));
        logicElement.addComponent(this.__componentFactory.createFromPrimitive('rectangle', [30, 30]));
        // add terminals
        var inputOffset = this.__primitiveFactory.create('position', [0, 35]);
        var inputAnchorOffset = this.__primitiveFactory.create('position', [0, -20]);
        var outputOffset = this.__primitiveFactory.create('position', [0, -35]);
        var outputAnchorOffset = this.__primitiveFactory.create('position', [0, 20]);
        this.addTerminal(logicElement, 'input-terminal', inputOffset, inputAnchorOffset);
        this.addTerminal(logicElement, 'output-terminal', outputOffset, outputAnchorOffset);
        // configure image
        var image = this.__assetMap.get(logicElementString);
        var displaySettings = this.__displaySettingsFactory.create('image-display-settings', [
            config.LogicElement.displayLayer,
            null,
            null,
            image.width,
            image.height,
            image.width,
            image.height
        ]);
        logicElement.addComponent(this.__componentFactory.createFromDataHandle('image-handle', [image, displaySettings]));
        // configure pick action
        var pickComponent = this.__componentFactory.create('pick-component');
        // *** closures ***
        var labController = this.__labController;
        var cursorController = this.__cursorController;
        function setTarget() {
            labController.setTarget(logicElement);
        };
        function onmouseenter() {
            cursorController.setPointer();
        };
        function onmouseleave() {
            cursorController.setDefault();
        };
        pickComponent.addEventListener('onpull', logicElement, setTarget);
        pickComponent.addEventListener('onpick', logicElement, setTarget);
        pickComponent.addEventListener('onmouseenter', logicElement, onmouseenter);
        pickComponent.addEventListener('onmouseleave', logicElement, onmouseleave);
        logicElement.addComponent(pickComponent);
        return logicElement;
    };
    AugmentedLogicElementFactory.prototype.addTerminal = function (logicElement, terminalString, terminalPositionOffset, wireAnchorPositionOffset) {
        utils.validator.validateInstanceType(this, logicElement, 'logic-element');
        var terminal = this.__terminalFactory.create(terminalString)
        logicElement.addTerminal(terminal);
        terminal.follow(logicElement, terminalPositionOffset);
        this.__wireFactory.createAnchorWiredToTerminal(terminal, wireAnchorPositionOffset);
    };

    return AugmentedLogicElementFactory;
});


//33FFAD
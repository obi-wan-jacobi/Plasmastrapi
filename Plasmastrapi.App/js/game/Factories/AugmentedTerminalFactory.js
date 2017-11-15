define(['factory', 'utils', 'game-config'],
function (Factory, utils, config) {

    AugmentedTerminalFactory.prototype = Object.create(Factory.prototype);
    AugmentedTerminalFactory.prototype.constructor = AugmentedTerminalFactory;
    function AugmentedTerminalFactory(engine) {
        Factory.call(this, engine);
        this.__displaySettingsFactory = null;
        this.__componentFactory = null;
        this.__terminalFactory = null;
        this.__labController = null;
        this.__cursorController = null;
        this.__assetMap = null;
    };
    // private methods
    AugmentedTerminalFactory.prototype.__oninit = function () {
        Factory.prototype.__oninit.call(this);
        this.__displaySettingsFactory = this.__engine.getFactory('display-settings-factory');
        this.__componentFactory = this.__engine.getFactory('component-factory');
        this.__terminalFactory = this.__engine.getFactory('terminal-factory');
        this.__labController = this.__engine.getController('lab-controller');
        this.__cursorController = this.__engine.getController('cursor-controller');
        this.__assetMap = this.__engine.getAssetMap();
    };
    // public methods
    AugmentedTerminalFactory.prototype.create = function (terminalString) {
        var terminalElement = this.__terminalFactory.create(terminalString);
        // add components
        terminalElement.addComponent(this.__componentFactory.create('pose-component'));
        terminalElement.addComponent(this.__componentFactory.createFromPrimitive('rectangle', [24, 24]));
        // configure image
        var image = this.__assetMap.get(terminalString);
        var displayArgs = [config.Terminal.displayLayer, null, null, image.width, image.height, image.width, image.height];
        var displaySettings = this.__displaySettingsFactory.create('image-display-settings', displayArgs);
        terminalElement.addComponent(this.__componentFactory.createFromDataHandle('image-handle', [image, displaySettings]));
        // configure pick action
        var pickComponent = this.__componentFactory.create('pick-component');
        // *** closures ***
        var labController = this.__labController;
        var cursorController = this.__cursorController;
        var hoverImage = this.__assetMap.get('terminal-hover');
        var hoverDisplayArgs = [config.Terminal.displayLayer, null, null, hoverImage.width, hoverImage.height, hoverImage.width, hoverImage.height];
        var hoverDisplaySettings = this.__displaySettingsFactory.create('image-display-settings', hoverDisplayArgs);
        function setTarget() {
            labController.setTarget(terminalElement);
        };
        function storeTarget() {
            labController.storeTarget(terminalElement);
        };
        function setHoverImage() {
            terminalElement.getComponent('image-component').setData(hoverImage);
            terminalElement.getComponent('image-component').setDisplaySettings(hoverDisplaySettings);
            cursorController.setPointer();
        };
        function revertHoverImage() {
            terminalElement.getComponent('image-component').setData(image);
            terminalElement.getComponent('image-component').setDisplaySettings(displaySettings);
            cursorController.setDefault();
        };
        pickComponent.addEventListener('onpull', terminalElement, setTarget);
        pickComponent.addEventListener('onpick', terminalElement, setTarget);
        pickComponent.addEventListener('onpet', terminalElement, storeTarget);
        pickComponent.addEventListener('onmouseenter', terminalElement, setHoverImage);
        pickComponent.addEventListener('onmouseleave', terminalElement, revertHoverImage);
        terminalElement.addComponent(pickComponent);
        return terminalElement;
    };
    AugmentedTerminalFactory.prototype.getInputTerminalContainer = function () {
        return this.__terminalFactory.getInputTerminalContainer();
    };
    AugmentedTerminalFactory.prototype.getOutputTerminalContainer = function () {
        return this.__terminalFactory.getOutputTerminalContainer();
    };

    return AugmentedTerminalFactory;
});


//33FFAD
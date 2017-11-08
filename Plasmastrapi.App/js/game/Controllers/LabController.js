define(['controller', 'logic-element-factory', 'input-controller', 'pick-component', 'placing-tool', 'panel', 'validator'],
function (Controller, LogicElementFactory, InputController, PickComponent, PlacingTool, Panel, validator) {

    LabController.prototype = Object.create(Controller.prototype);
    LabController.prototype.constructor = LabController;
    function LabController(engine) {
        Controller.call(this, engine);
        this.__logicElementFactory = this.__engine.getFactory(LogicElementFactory);
        this.__inputController = this.__engine.getController(InputController);
        this.__designArea = null;
        this.__state = null;
        this.__target = null;
    };
    // private methods
    LabController.prototype.__initDesignArea = function (panel) {
        this.__designArea = panel;
        var pickComponent = this.__designArea.getComponent(PickComponent);
        pickComponent.addEventListener('onmouseenter', this, function () {
            this.__activate();
        });
        pickComponent.addEventListener('onmouseleave', this, function () {
            this.idle();
            this.__activate();
        });
    };
    LabController.prototype.__set = function (state, target) {
        this.__state = state;
        this.__target = target;
        if (this.__designArea.getComponent(PickComponent).getHandle().isHovered) {
            this.__activate();
        }
    };
    LabController.prototype.__activate = function () {
        if (this.__state) {
            this[`__${this.__state}`](this.__target);
        }
    }
    LabController.prototype.__idle = function () {
        this.__inputController.setHandler();
    };
    LabController.prototype.__place = function (logicElement) {
        this.__inputController.setHandler(PlacingTool, [logicElement]);
    };
    LabController.prototype.__spawn = function (LogicElementType) {
        var logicElement = this.__logicElementFactory.create(LogicElementType);
        logicElement.unload();
        this.__place(logicElement);
    };
    // public methods
    LabController.prototype.setDesignArea = function (panel) {
        if (this.__designArea) {
            validator.throw(this, 'setDesignArea', 'A design area element has already been set');
        }
        validator.validateInstanceType(this, panel, Panel);
        this.__initDesignArea(panel);
    };
    LabController.prototype.getDesignArea = function () {
        return this.__designArea;
    };
    LabController.prototype.idle = function () {
        this.__set('idle', null);
    };
    LabController.prototype.place = function (logicElement) {
        this.__set('place', logicElement);
    };
    LabController.prototype.spawn = function (LogicElementType) {
        this.__set('spawn', LogicElementType);
    };
    LabController.prototype.setTarget = function (target) {
        if (this.__state === 'idle') {
            this.place(target);
        }
    };

    return LabController;
});
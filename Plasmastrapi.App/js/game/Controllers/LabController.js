define(['controller', 'utils'],
function (Controller, utils) {

    LabController.prototype = Object.create(Controller.prototype);
    LabController.prototype.constructor = LabController;
    function LabController(engine) {
        Controller.call(this, engine);
        this.__logicElementFactory = null;
        this.__inputController = null;
        this.__designArea = null;
        this.__designAreaPickComponent = null;
        this.__state = null;
        this.__previousState = null;
        this.__target = null;
        this.__wireConnectionCandidate = null;
        this.__hotkeys = {};
        this.__activeSelection = null;
    };
    // private methods
    LabController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__logicElementFactory = this.__engine.getFactory('logic-element-factory');
        this.__inputController = this.__engine.getController('input-controller');
    };
    LabController.prototype.__initDesignArea = function (panel) {
        this.__designArea = panel;
        this.__designAreaPickComponent = this.__designArea.getOrInitComponent('pick-component');
        this.__designAreaPickComponent.addEventListener('onmouseenter', this, this.__activate);
        this.__designAreaPickComponent.addEventListener('onmouseleave', this, this.__deactivate);
    };
    LabController.prototype.__activate = function () {
        if (!this.__state) {
            return this.__deactivate();
        }
        if (this.__state === this.__previousState) {
            return;
        }
        this[`__${this.__state}`](this.__target);
        this.__previousState = this.__state;
    }
    LabController.prototype.__deactivate = function () {
        this.__state = 'idle';
        this.__target = null;
        this.__activate();
    }
    LabController.prototype.__set = function (state, target) {
        this.__state = state;
        this.__target = target;
        if (this.__designAreaPickComponent.isHovered) {
            this.__activate();
        }
    };
    LabController.prototype.__idle = function () {
        if (this.__activeSelection) {
            this.__activeSelection.deselect();
            this.__activeSelection = null;
        }
        this.__inputController.setHandler('lab-hotkey-handler');
    };
    LabController.prototype.__place = function (logicElement) {
        this.__inputController.setHandler('placing-tool', [logicElement]);
    };
    LabController.prototype.__spawn = function (logicElementString) {
        var logicElement = this.__logicElementFactory.create(logicElementString);
        this.__place(logicElement);
    };
    LabController.prototype.__wire = function (terminal) {
        this.__target = null;
        this.__inputController.setHandler('wire-tool', [terminal]);
    };
    // public methods
    LabController.prototype.setSpawnerButton = function (button, typeString, hotkey) {
        var self = this;
        this.__hotkeys[hotkey] = function () {
            self.spawn(typeString);
            self.__activeSelection = button.getComponent('pick-component');
            self.__activeSelection.select();
        };
        button.set('pick-component:onpick', [this.__hotkeys[hotkey]]);

    };
    LabController.prototype.setDesignArea = function (panel) {
        if (this.__designArea) {
            utils.validator.throw(this, 'setDesignArea', 'A design area element has already been set');
        }
        utils.validator.validateInstanceType(this, panel, 'panel');
        this.__initDesignArea(panel);
    };
    LabController.prototype.getDesignArea = function () {
        return this.__designArea;
    };
    LabController.prototype.setTarget = function (target) {
        if (this.__state === 'idle') {
            if (utils.validator.isInstanceOfType(target, 'logic-element')) {
                this.place(target);
            }
            if (utils.validator.isInstanceOfType(target, 'terminal')) {
                this.wire(target);
            }
        } else if (this.__state === 'wire') {
            this.setWireConnectionCandidate(target);
        }
    };
    LabController.prototype.setWireConnectionCandidate = function (terminal) {
        if (this.__state === 'wire') {
            this.__wireConnectionCandidate = terminal;
        }
    };
    LabController.prototype.getWireConnectionCandidate = function () {
        var wireConnectionCandidate = this.__wireConnectionCandidate;
        this.__wireConnectionCandidate = null;
        return wireConnectionCandidate;
    };
    LabController.prototype.idle = function () {
        this.__set('idle', null);
    };
    LabController.prototype.place = function (logicElement) {
        utils.validator.validateInstanceType(this, logicElement, 'logic-element')
        this.__set('place', logicElement);
    };
    LabController.prototype.spawn = function (logicElementString) {
        utils.validator.validateClassType(this, logicElementString, 'logic-element');
        this.__set('spawn', logicElementString);
    };
    LabController.prototype.wire = function (terminal) {
        utils.validator.validateInstanceType(this, terminal, 'terminal');
        this.__set('wire', terminal);
    };
    LabController.prototype.hotkey = function (key) {
        if (this.__hotkeys[key]) {
            this.__hotkeys[key]();
        }
    };

    return LabController;
});
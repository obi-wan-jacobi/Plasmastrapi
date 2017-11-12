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
        this.__target = null;
        this.__hotkeys = {};
    };
    // private methods
    LabController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__logicElementFactory = this.__engine.getFactory('logic-element-factory');
        this.__inputController = this.__engine.getController('input-controller');
    };
    LabController.prototype.__initDesignArea = function (panel) {
        this.__designArea = panel;
        this.__designAreaPickComponent = this.__designArea.getComponent('pick-component');
        this.__designAreaPickComponent.addEventListener('onmouseenter', this, function () {
            this.__activate();
        });
        this.__designAreaPickComponent.addEventListener('onmouseleave', this, function () {
            this.__idle();
        });
    };
    LabController.prototype.__set = function (state, target) {
        this.__state = state;
        this.__target = target;
        if (this.__designAreaPickComponent.getHandle().isHovered) {
            this.__activate();
        }
    };
    LabController.prototype.__activate = function () {
        if (this.__state) {
            this[`__${this.__state}`](this.__target);
        } else {
            this.__idle();
        }
    }
    LabController.prototype.__idle = function () {
        this.__inputController.setHandler('lab-hotkey-handler');
    };
    LabController.prototype.__place = function (logicElement) {
        this.__inputController.setHandler('placing-tool', [logicElement]);
    };
    LabController.prototype.__spawn = function (logicElementString) {
        var logicElement = this.__logicElementFactory.create(logicElementString);
        this.__place(logicElement);
    };
    // public methods
    LabController.prototype.setSpawnerButton = function (button, typeString, hotkey) {
        var self = this;
        this.__hotkeys[hotkey] = function () {
            self.spawn(typeString);
            button.getComponent('pick-component').getHandle().select();
        };
        button.set('pick-action', this.__hotkeys[hotkey]);

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
            this.place(target);
        }
    };
    LabController.prototype.idle = function () {
        this.__set('idle', null);
    };
    LabController.prototype.place = function (logicElement) {
        this.__set('place', logicElement);
    };
    LabController.prototype.spawn = function (logicElementString) {
        this.__set('spawn', logicElementString);
    };
    LabController.prototype.hotkey = function (key) {
        if (this.__hotkeys[key]) {
            this.__hotkeys[key]();
        }
    };

    return LabController;
});
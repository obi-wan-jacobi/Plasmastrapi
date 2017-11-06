define(['controller', 'logic-element-factory', 'panel', 'validator'],
function (Controller, LogicElementFactory, Panel, validator) {

    LabController.prototype = Object.create(Controller.prototype);
    LabController.prototype.constructor = LabController;
    function LabController(engine) {
        Controller.call(this);
        this.__logicElementFactoryContainer = engine.getFactory(LogicElementFactory).getContainer();
        this.__designArea = null;
    };
    // private methods
    LabController.prototype.__initDesignArea = function (panel) {
        this.__designArea = panel;
        this.__logicElementFactoryContainer.addEventListener('onadd', this, function (logicElement) {
            logicElement.addEventListener('onplace', this.__designArea, function () {
                if (!this.contains(logicElement)) {
                    logicElement.destroy();
                }
            });
        });
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

    return LabController;
});
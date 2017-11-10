define(['controller', 'validator'],
function (Controller, CompatibilityFilter, validator) {

    PickController.prototype = Object.create(Controller.prototype);
    PickController.prototype.constructor = PickController;
    function PickController(engine) {
        Controller.call(this);
        this.__pickComponentContainer = engine.getFactory('component-factory').getContainer('pick-component');
    };
    // public methods
    PickController.prototype.setFilterByType = function () {

    };

    return PickController;
});
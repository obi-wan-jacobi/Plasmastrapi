define(['controller', 'validator'],
function (Controller, validator) {

    PickController.prototype = Object.create(Controller.prototype);
    PickController.prototype.constructor = PickController;
    function PickController(engine) {
        Controller.call(this);
        this.__pickComponentContainer = engine.getFactory('component-factory').getContainer('pick-component');
    };
    // public methods
    PickController.prototype.filter = function (fn, /* optional */ caller) {
        this.__pickComponentContainer.forEach(fn, caller);
    };
    PickController.prototype.filterByType = function () {

    };

    return PickController;
});
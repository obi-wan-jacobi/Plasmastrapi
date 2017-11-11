define(['controller', 'validator'],
function (Controller, validator) {

    PickController.prototype = Object.create(Controller.prototype);
    PickController.prototype.constructor = PickController;
    function PickController(engine) {
        Controller.call(this, engine);
        this.__pickComponentContainer = null;
    };
    // private methods
    PickController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__pickComponentContainer = this.__engine.getFactory('component-factory').getContainer('pick-component');
    };
    // public methods
    PickController.prototype.filter = function (fn, /* optional */ caller) {
        this.__pickComponentContainer.forEach(fn, caller);
    };
    PickController.prototype.filterByType = function () {

    };

    return PickController;
});
define(['controller', 'compatibility-filter', 'validator'],
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
    PickController.prototype.setFilterByCompatibility = function (filter) {
        validator.validateInstanceType(this, filter, CompatibilityFilter);
        this.__pickComponentContainer.forEach(function (pickComponent) {
            if (filter.evaluate(pickComponent)) {
                pickComponent.load();
            } else {
                pickComponent.unload();
            }
        });
    };

    return PickController;
});
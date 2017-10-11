define(['controller', 'component-factory', 'pick-component', 'tool-compatibility-filter', 'validator'],
function (Controller, ComponentFactory, PickComponent, ToolCompatibilityFilter, validator) {

    PickController.prototype = Object.create(Controller.prototype);
    PickController.prototype.constructor = PickController;
    function PickController(engine) {
        Controller.call(this);
        this.__pickComponentContainer = engine.getFactory(ComponentFactory).getContainer(PickComponent);
    };
    // public methods
    PickController.prototype.setFilter = function (filter) {
        validator.validateInstanceType(this, filter, ToolCompatibilityFilter);
        this.__pickComponentContainer.forEach(function (pickComponent) {
            if (filter.resolve(pickComponent)) {
                pickComponent.enable();
            } else {
                pickComponent.disable();
            }
        });
    };

    return PickController;
});
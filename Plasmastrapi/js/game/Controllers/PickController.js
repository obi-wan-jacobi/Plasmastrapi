define(['controller', 'component-factory', 'pick-component'],
function (Controller, ComponentFactory, PickComponent) {

    PickController.prototype = Object.create(Controller.prototype);
    PickController.prototype.constructor = PickController;
    function PickController(engine) {
        Controller.call(this);
        this.__pickComponentContainer = engine.getFactory(ComponentFactory).getContainer(PickComponent);
    };
    // public methods
    PickController.prototype.setCompatibilityFilter = function (filter) {
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
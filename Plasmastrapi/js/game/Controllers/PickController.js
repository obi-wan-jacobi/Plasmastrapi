define(['controller'], function (Controller) {

    PickController.prototype = Object.create(Controller.prototype);
    PickController.prototype.constructor = PickController;
    function PickController() {

    };
    ToolController.prototype.setCompatibilityFilter = function (filter) {
        this.__engine.pickablesContainer.forEach(function (pickComponent) {
            if (filter.resolve(pickComponent)) {
                pickComponent.enable();
            } else {
                pickComponent.disable();
            }
        });
    };

    return PickController;
});
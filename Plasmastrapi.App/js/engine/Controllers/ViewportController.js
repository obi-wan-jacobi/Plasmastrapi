define(['controller', 'validator'],
function (Controller, validator) {

    ViewportController.prototype = Object.create(Controller.prototype);
    ViewportController.prototype.constructor = ViewportController;
    function ViewportController(engine) {
        Controller.call(this, engine);
    };
    // public methods
    ViewportController.prototype.getViewport = function () {
        return this.__engine.getViewport();
    };

    return ViewportController;
});
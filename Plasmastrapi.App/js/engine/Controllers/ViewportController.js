define(['controller', 'validator'],
function (Controller, validator) {

    ViewportController.prototype = Object.create(Controller.prototype);
    ViewportController.prototype.constructor = ViewportController;
    function ViewportController(engine) {
        Controller.call(this);
        this.__viewport = engine.getViewport();
    };
    ViewportController.prototype.getViewport = function () {
        return this.__viewport;
    };

    return ViewportController;
});
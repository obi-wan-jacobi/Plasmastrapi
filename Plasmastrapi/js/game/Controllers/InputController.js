define(['controller', 'input-handler','validator'],
    function (Controller, InputHandler, validator) {

    // CLASS InputController
    InputController.prototype = Object.create(Controller.prototype);
    InputController.prototype.constructor = InputController;
    function InputController(engine) {
        Controller.call(this);
        this.__handler = null;
    };
        // public methods
    InputController.prototype.setHandler = function (handler) {
        validator.validateType(this, handler, InputHandler);
        if (this.__handler) {
            this.__handler.unload();
        }
        this.__handler = handler;
        this.__handler.load();
    };

    return InputController;
});
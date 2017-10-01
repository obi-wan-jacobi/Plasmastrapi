define(['controller', 'component-factory', 'keyboard-handle', 'mouse-handle', 'input-handler','validator'],
function (Controller, ComponentFactory, KeyboardHandle, MouseHandle, InputHandler, validator) {

    // CLASS InputHandlerController
    InputHandlerController.prototype = Object.create(Controller.prototype);
    InputHandlerController.prototype.constructor = InputHandlerController;
    function InputHandlerController(engine) {
        Controller.call(this);
        this.__keyboardComponent = engine.getFactory(ComponentFactory).createFromDataHandle(new KeyboardHandle());
        this.__mouseComponent = engine.getFactory(ComponentFactory).createFromDataHandle(new MouseHandle());
        this.__handler = null;
    };
    InputHandlerController.prototype.__updateHandlerEventSubscriptions = function (actionString) {
        // keyboard events
        this.__keyboardComponent[actionString + 'EventListener']('onkeydown', this.__handler, this.__handler.onkeydown);
        this.__keyboardComponent[actionString + 'EventListener']('onkeyup', this.__handler, this.__handler.onkeyup);
        this.__keyboardComponent[actionString + 'EventListener']('onkeypress', this.__handler, this.__handler.onkeypress);
        this.__keyboardComponent[actionString + 'EventListener']('onenter', this.__handler, this.__handler.onenter);
        this.__keyboardComponent[actionString + 'EventListener']('onescape', this.__handler, this.__handler.onescape);
        // mouse events
        this.__mouseComponent[actionString + 'EventListener']('onmousemove', this.__handler, this.__handler.onmousemove);
        this.__mouseComponent[actionString + 'EventListener']('onmousedown', this.__handler, this.__handler.onmousedown);
        this.__mouseComponent[actionString + 'EventListener']('onmouseup', this.__handler, this.__handler.onmouseup);
        this.__mouseComponent[actionString + 'EventListener']('onclick', this.__handler, this.__handler.onclick);
    };
    // public methods
    InputHandlerController.prototype.load = function () {
        this.__keyboardComponent.load();
        this.__mouseComponent.load();
        if (this.__handler) {
            this.__handler.load();
        }
    };
    InputHandlerController.prototype.unload = function () {
        this.__keyboardComponent.unload()
        this.__mouseComponent.unload();
        if (this.__handler) {
            this.__handler.unload();
        }
    };
    InputHandlerController.prototype.setHandler = function (handler) {
        validator.validateInstanceType(this, handler, InputHandler);
        if (this.__handler) {
            this.__updateHandlerEventSubscriptions('remove');
            this.__handler.unload();
        }
        this.__handler = handler;
        this.__updateHandlerEventSubscriptions('add');
        this.__handler.load();
    };

    return InputHandlerController;
});
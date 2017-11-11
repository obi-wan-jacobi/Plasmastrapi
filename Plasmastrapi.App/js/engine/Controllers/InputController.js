define(['controller', 'keyboard-handle', 'mouse-handle', 'input-handler', 'empty-handler', 'validator'],
function (Controller, KeyboardHandle, MouseHandle, InputHandler, EmptyHandler, validator) {

    // CLASS InputController
    InputController.prototype = Object.create(Controller.prototype);
    InputController.prototype.constructor = InputController;
    function InputController(engine) {
        Controller.call(this, engine);
        this.__keyboardComponent = null;
        this.__mouseComponent = null;
        this.__handler = null;
    };
    // private methods
    InputController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__keyboardComponent = this.__engine.getFactory('component-factory').createFromDataHandle(new KeyboardHandle());
        this.__mouseComponent = this.__engine.getFactory('component-factory').createFromDataHandle(new MouseHandle());
    };
    InputController.prototype.__onload = function () {
        Controller.prototype.__onload.call(this);
        this.__keyboardComponent.load();
        this.__mouseComponent.load();
        if (this.__handler) {
            this.__handler.load();
        }
    };
    InputController.prototype.__onunload = function () {
        Controller.prototype.__onunload.call(this);
        this.__keyboardComponent.unload();
        this.__mouseComponent.unload();
        if (this.__handler) {
            this.__handler.unload();
        }
    };
    InputController.prototype.__configureHandlerEventSubscriptions = function (actionString) {
        // keyboard events
        this.__keyboardComponent[`${actionString}EventListener`]('onkeydown', this.__handler, this.__handler.onkeydown);
        this.__keyboardComponent[`${actionString}EventListener`]('onkeyup', this.__handler, this.__handler.onkeyup);
        this.__keyboardComponent[`${actionString}EventListener`]('onkeypress', this.__handler, this.__handler.onkeypress);
        this.__keyboardComponent[`${actionString}EventListener`]('onenter', this.__handler, this.__handler.onenter);
        this.__keyboardComponent[`${actionString}EventListener`]('onescape', this.__handler, this.__handler.onescape);
        // mouse events
        this.__mouseComponent[`${actionString}EventListener`]('onmousemove', this.__handler, this.__handler.onmousemove);
        this.__mouseComponent[`${actionString}EventListener`]('onmousedown', this.__handler, this.__handler.onmousedown);
        this.__mouseComponent[`${actionString}EventListener`]('onmouseup', this.__handler, this.__handler.onmouseup);
        this.__mouseComponent[`${actionString}EventListener`]('onclick', this.__handler, this.__handler.onclick);
    };
    // public methods
    InputController.prototype.setHandler = function (HandlerType, args) {
        HandlerType = HandlerType || EmptyHandler;
        args = args || [];
        validator.validateClassType(this, HandlerType, InputHandler);
        validator.validateInstanceType(this, args, Array);
        if (this.__handler) {
            this.__configureHandlerEventSubscriptions('remove');
            this.__handler.dispose();
        }
        var args = [this.__engine].concat(args);
        this.__handler = new (HandlerType.bind.apply(HandlerType, [null].concat(args)))();
        this.__configureHandlerEventSubscriptions('add');
        this.__handler.load();
    };

    return InputController;
});
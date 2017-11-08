define(['controller', 'component-factory', 'keyboard-handle', 'mouse-handle', 'input-handler', 'empty-handler', 'validator'],
function (Controller, ComponentFactory, KeyboardHandle, MouseHandle, InputHandler, EmptyHandler, validator) {

    // CLASS InputController
    InputController.prototype = Object.create(Controller.prototype);
    InputController.prototype.constructor = InputController;
    function InputController(engine) {
        Controller.call(this);
        this.__engine = engine;
        this.__keyboardComponent = engine.getFactory(ComponentFactory).createFromDataHandle(new KeyboardHandle());
        this.__mouseComponent = engine.getFactory(ComponentFactory).createFromDataHandle(new MouseHandle());
        this.__handler = null;
    };
    // private methods
    InputController.prototype.__onload = function () {
        this.__keyboardComponent.load();
        this.__mouseComponent.load();
        if (this.__handler) {
            this.__handler.load();
        }
    };
    InputController.prototype.__onunload = function () {
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
        validator.validateClassType(this, HandlerType, InputHandler);
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
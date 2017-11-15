define(['controller', 'utils'],
function (Controller, utils) {

    // CLASS InputController
    InputController.prototype = Object.create(Controller.prototype);
    InputController.prototype.constructor = InputController;
    function InputController(engine) {
        Controller.call(this, engine);
        this.__keyboardComponent = null;
        this.__mousePosition = null;
        this.__handler = null;
        this.__storedHandler = null;
        this.__isClickCycleActive = false;
    };
    // private methods
    InputController.prototype.__oninit = function () {
        Controller.prototype.__oninit.call(this);
        this.__keyboardComponent = this.__engine.getFactory('component-factory').create('keyboard-component');
    };
    InputController.prototype.__onload = function () {
        Controller.prototype.__onload.call(this);
        this.__keyboardComponent.load();
        this.__engine.getSystem('pick-system').registerInputReceiver(this);
        if (this.__handler) {
            this.__handler.load();
        }
    };
    InputController.prototype.__onunload = function () {
        Controller.prototype.__onunload.call(this);
        this.__keyboardComponent.unload();
        this.__engine.getSystem('pick-system').unregisterInputReceiver(this);
        if (this.__handler) {
            this.__handler.unload();
        }
    };
    InputController.prototype.__setHandler = function (handler) {
        if (this.__handler) {
            this.__configureHandlerEventSubscriptions('remove');
            this.__handler.dispose();
        }
        this.__handler = handler;
        this.__configureHandlerEventSubscriptions('add');
        this.__handler.load();
    };
    InputController.prototype.__configureHandlerEventSubscriptions = function (actionString) {
        // keyboard events
        this.__keyboardComponent[`${actionString}EventListener`]('onkeydown', this.__handler, this.__handler.keydown);
        this.__keyboardComponent[`${actionString}EventListener`]('onkeyup', this.__handler, this.__handler.keyup);
        this.__keyboardComponent[`${actionString}EventListener`]('onenter', this.__handler, this.__handler.enter);
        this.__keyboardComponent[`${actionString}EventListener`]('onescape', this.__handler, this.__handler.escape);
    };
    InputController.prototype.__activate = function (actionString, argument) {
        if (this.__handler) {
            this.__handler[actionString](argument);
        }
    };
    // public methods
    InputController.prototype.setHandler = function (handlerString, args) {
        handlerString = handlerString || 'empty-handler';
        args = args || [];
        utils.validator.validateClassType(this, handlerString, 'input-handler');
        utils.validator.validateInstanceType(this, args, 'array');
        var args = [this.__engine].concat(args);
        var HandlerType = utils.modules.require(handlerString);
        var handler = new (HandlerType.bind.apply(HandlerType, [null].concat(args)))();
        if (this.__isClickCycleActive) {
            this.__storedHandler = handler;
        } else {
            this.__setHandler(handler);
        }
    };
    InputController.prototype.mousemove = function (position) {
        this.__mousePosition = position;
        this.__activate('mousemove', position);
    };
    InputController.prototype.mousedown = function (position) {
        this.__activate('mousedown', position);
    };
    InputController.prototype.mouseup = function (position) {
        this.__isClickCycleActive = true;
        this.__activate('mouseup', position);
    };
    InputController.prototype.click = function (position) {
        this.__activate('click', position);
        this.__isClickCycleActive = false;
        if (this.__storedHandler) {
            this.__setHandler(this.__storedHandler);
            this.__storedHandler = null;
        }
    };
    InputController.prototype.getMousePosition = function () {
        return this.__mousePosition;
    };

    return InputController;
});
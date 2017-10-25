define(['system', 'linked-list', 'component-factory', 'keyboard-component', 'position'],
function (System, LinkedList, ComponentFactory, KeyboardComponent, Position) {

    // CLASS KeyboardSystem
    KeyboardSystem.prototype = Object.create(System.prototype);
    KeyboardSystem.prototype.constructor = KeyboardSystem;
    function KeyboardSystem(engine) {
        System.call(this);
        this.__viewport = engine.getViewport();
        this.__inputBuffer = {
            'keydown': new LinkedList('number'),
            'keyup': new LinkedList('number')
        };
        this.__container = engine.getFactory(ComponentFactory).getContainer(KeyboardComponent);
    };
    // private methods
    KeyboardSystem.prototype.__onload = function () {
        this.__viewport.onkeydown = this.__buildInputEventCallback('keydown');
        this.__viewport.onkeyup = this.__buildInputEventCallback('keyup');
    };
    KeyboardSystem.prototype.__onunload = function () {
        this.__viewport.onkeydown = null;
        this.__viewport.onkeyup = null;
    };
    KeyboardSystem.prototype.__buildInputEventCallback = function (inputBufferKey) {
        return (function (ex) {
            this.__inputBuffer[inputBufferKey].push(this.__getMousePosition(ex));
        }).bind(this);
    };
    // public methods
    KeyboardSystem.prototype.loopOnce = function () {
        if (!this.__isLoaded) {
            return;
        }
        this.__inputBuffer['keydown'].forEach(function (keyCode) {
            this.__container.forEach(function (component) {
                component.getHandle().keydown(keyCode);
            }, this);
        }, this);
        this.__inputBuffer['keyup'].forEach(function (keyCode) {
            this.__container.forEach(function (component) {
                component.getHandle().keyup(keyCode);
            }, this);
        }, this);
        this.__inputBuffer = {
            'keydown': new LinkedList('number'),
            'keyup': new LinkedList('number')
        };
    };

    return KeyboardSystem;
});


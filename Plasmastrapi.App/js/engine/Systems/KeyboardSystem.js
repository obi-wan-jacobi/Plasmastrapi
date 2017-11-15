define(['system', 'linked-list', 'position'],
function (System, LinkedList, Position) {

    KeyboardSystem.prototype = Object.create(System.prototype);
    KeyboardSystem.prototype.constructor = KeyboardSystem;
    function KeyboardSystem(engine) {
        System.call(this, engine);
        this.__viewport = null;
        this.__container = null;
        this.__inputBuffer = {
            'keydown': new LinkedList('keyboard-event'),
            'keyup': new LinkedList('keyboard-event')
        };
    };
    // private methods
    KeyboardSystem.prototype.__oninit = function () {
        System.prototype.__oninit.call(this);
        this.__viewport = this.__engine.getController('viewport-controller').getViewport();
        this.__container = this.__engine.getFactory('component-factory').getContainer('keyboard-component');
    };
    KeyboardSystem.prototype.__onload = function () {
        System.prototype.__onload.call(this);
        this.__viewport.onkeydown = this.__buildInputEventCallback('keydown');
        this.__viewport.onkeyup = this.__buildInputEventCallback('keyup');
    };
    KeyboardSystem.prototype.__onunload = function () {
        System.prototype.__onunload.call(this);
        this.__viewport.onkeydown = null;
        this.__viewport.onkeyup = null;
    };
    KeyboardSystem.prototype.__buildInputEventCallback = function (inputBufferKey) {
        return (function (e) {
            this.__inputBuffer[inputBufferKey].push(e);
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
            'keydown': new LinkedList('keyboard-event'),
            'keyup': new LinkedList('keyboard-event')
        };
        return true;
    };

    return KeyboardSystem;
});


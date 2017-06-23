define(['system', 'linked-list', 'position'],
function (System, LinkedList, Position) {

    // CLASS KeyboardSystem
    KeyboardSystem.prototype = Object.create(System.prototype);
    KeyboardSystem.prototype.constructor = KeyboardSystem;
    function KeyboardSystem(canvas) {
        System.call(this);
        this.__canvas = canvas;
        this.__inputBuffer = {
            'keydown': new LinkedList('number'),
            'keyup': new LinkedList('number'),
            'keypress': new LinkedList('number')
        };
    };
    // private methods
    KeyboardSystem.prototype.__onload = function () {
        this.__canvas.onkeydown = this.__onkeydown.bind(this);
        this.__canvas.onkeyup = this.__onkeyup.bind(this);
    };
    KeyboardSystem.prototype.__onunload = function () {
        this.__canvas.onkeydown = null;
        this.__canvas.onkeyup = null;
    };
    KeyboardSystem.prototype.__onkeydown = function (e) {
        this.__inputBuffer['keydown'].push(e.keyCode);
    };
    KeyboardSystem.prototype.__onkeyup = function (e) {
        this.__inputBuffer['keyup'].push(e.keyCode);
    };
    KeyboardSystem.prototype.__onkeypress = function (e) {
        this.__inputBuffer['keypress'].push(e.keyCode);
    };
    // public methods
    KeyboardSystem.prototype.loopOnce = function () {
        this.__inputBuffer['keydown'].forEach(function (keyCode) {
            this.__container.forEach(function (component) {
                component.getHandle().keydown(keyCode);
            }, this);
        }, this);
        this.__inputBuffer['keyup'].forEach(function (keyCode) {
            this.__container.forEach(function (component) {
                component.getHandle().keydown(keyCode);
            }, this);
        }, this);
        this.__inputBuffer['keypress'].forEach(function (keyCode) {
            this.__container.forEach(function (component) {
                component.getHandle().keydown(keyCode);
            }, this);
        }, this);
    };
    return KeyboardSystem;
});


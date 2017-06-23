define(['component'],
function (Component) {

    // CLASS KeyboardComponent
    KeyboardComponent.prototype = Object.create(Component.prototype);
    KeyboardComponent.prototype.constructor = KeyboardComponent;
    function KeyboardComponent(keyboardHandle) {
        // inherits from
        Component.call(this, keyboardHandle, null, KeyboardHandle, null);
        // private variables
        this.__isHovered = false;
        // events
        this.__registerEvents(
            'onkeydown',
            'onkeyup',
            'onkeypress',
            'onenter',
            'onescape'
        );
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod('keydown', 'onkeydown');
        this.__attachEventTriggerToHandleMethod('keyup', 'onkeyup');
        this.__attachEventTriggerToHandleMethod('keypress', 'onkeypress');
        this.__attachEventTriggerToHandleMethod('enter', 'onenter');
        this.__attachEventTriggerToHandleMethod('escape', 'onescape');
    };

    return KeyboardComponent;
});
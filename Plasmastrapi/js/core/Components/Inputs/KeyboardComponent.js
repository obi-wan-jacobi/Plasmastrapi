define(['component'],
function (Component) {

    // CLASS KeyboardComponent
    KeyboardComponent.prototype = Object.create(Component.prototype);
    KeyboardComponent.prototype.constructor = KeyboardComponent;
    function KeyboardComponent(keyboardHandle) {
        // inherits from
        Component.call(this, keyboardHandle);
        // events
        this.registerEvents(
            'onkeydown',
            'onkeyup',
            'onkeypress',
            'onenter',
            'onescape'
        );
        // inject event callbacks into handle
        this.__attachEventTriggerToHandleMethod('keydown', 'onkeydown');
        this.__attachEventTriggerToHandleMethod('keyup', 'onkeyup');
        //this.__attachEventTriggerToHandleMethod('enter', 'onenter');
        //this.__attachEventTriggerToHandleMethod('escape', 'onescape');
    };

    return KeyboardComponent;
});
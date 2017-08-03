define(['ui-element', 'validator'],
function (UIElement, validator) {

    // CLASS Button
    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(fnActivate, callee) {
        validator.validateFunction(fnActivate);
        // inherits from
        UIElement.call(this);
        this.__activate = fnActivate.bind(callee);
        this.registerEvents(
            'onbeforeactivate',
            'onactivate'
        );
    };
    Button.prototype.activate = function () {
        this.emit('onbeforeactivate');
        this.__activate();
        this.emit('onactivate');
    };
    
    return Button;
});
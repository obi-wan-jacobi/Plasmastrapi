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
    };
    Button.prototype.activate = function () {
        this.__activate();
    };
    
    return Button;
});
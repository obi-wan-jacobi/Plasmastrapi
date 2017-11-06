define(['ui-element'],
function (UIElement) {

    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button() {
        UIElement.call(this);
    };

    return Button;
});
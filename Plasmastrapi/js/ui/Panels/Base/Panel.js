define(['ui-element'],
function (UIElement) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel() {
        // inherits from
        UIElement.call();
    };

    return Panel;
});
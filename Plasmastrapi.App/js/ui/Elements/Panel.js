define(['ui-element'],
function (UIElement) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel() {
        UIElement.call(this);
    };

    return Panel;
});
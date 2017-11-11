define(['ui-element'],
function (UIElement) {

    Panel.prototype = Object.create(UIElement.prototype);
    Panel.prototype.constructor = Panel;
    function Panel(engine) {
        UIElement.call(this, engine);
    };

    return Panel;
});
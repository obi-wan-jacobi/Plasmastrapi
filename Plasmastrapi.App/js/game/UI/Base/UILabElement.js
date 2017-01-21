define(["./UIElement"], function (UIElement) {

    UILabElement.prototype = Object.create(UIElement.prototype);
    UILabElement.prototype.constructor = UILabElement;
    function UILabElement() {
        UIElement.call(this);
    };

    return UILabElement;
});
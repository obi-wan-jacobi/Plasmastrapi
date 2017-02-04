define(["../Base/UIElement"], function (UIElement) {

    Area.prototype = Object.create(UIElement.prototype);
    Area.prototype.constructor = Area;
    function Area(x, y, imageHandle) {
        UIElement.call(this, x, y, imageHandle);
    };

    return Area;
});
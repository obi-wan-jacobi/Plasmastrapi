define(['ui-element'],
function (UIElement) {

    Button.prototype = Object.create(UIElement.prototype);
    Button.prototype.constructor = Button;
    function Button(engine) {
        UIElement.call(this, engine);
    };
    // private methods
    Button.prototype.__oninit = function () {
        UIElement.prototype.__oninit.call(this);
        var pickComponent = this.getOrInitComponent('pick-component');
        pickComponent.addEventListener('onmouseenter', this, this.__onmouseenter);
        pickComponent.addEventListener('onmouseleave', this, this.__onmouseleave);
        pickComponent.addEventListener('onpick', this, this.__onpick);
    };
    Button.prototype.__onmouseenter = function(){
        this.__engine.getController('cursor-controller').setPointer();
    };
    Button.prototype.__onmouseleave = function () {
        this.__engine.getController('cursor-controller').setDefault();
    };
    Button.prototype.__onpick = function () {
        this.__engine.getController('cursor-controller').setDefault();
    };

    return Button;
});
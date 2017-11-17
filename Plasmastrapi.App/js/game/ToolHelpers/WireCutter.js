define(['ui-element', 'container', 'utils'],
function (UIElement, Container, utils) {

    WireCutter.prototype = Object.create(UIElement.prototype);
    WireCutter.prototype.constructor = WireCutter;
    function WireCutter(engine) {
        UIElement.call(this, engine);
        this.__wireContainer = null;
        this.__contents = new Container('wire');
        this.__curveComponent = null;
    };
    // private methods
    WireCutter.prototype.__oninit = function () {
        UIElement.prototype.__oninit.call(this);
        this.__wireContainer = this.__engine.getFactory('wire-factory').getContainer();
        this.__curveComponent = this.set('curve-component');
    }
    WireCutter.prototype.__ondestroy = function () {
        if (this.__contents) {
            this.__contents.forEach(function (wire) {
                wire.destroy();
            }, this);
        }
    };
    // public methods
    WireCutter.prototype.lineTo = function (position) {
        this.__curveComponent.getHandle().lineTo(position);
    };

    return WireCutter;
});
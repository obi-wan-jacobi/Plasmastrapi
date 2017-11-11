define(['component-container', 'container'],
function (ComponentContainer, Container) {

    PickComponentContainer.prototype = Object.create(ComponentContainer.prototype);
    PickComponentContainer.prototype.constructor = PickComponentContainer;
    function PickComponentContainer() {
        ComponentContainer.call(this, 'pick-component');
        this.__contentsBuffer = [];
    };
    // private methods
    PickComponentContainer.prototype.__onComponentEnable = function (component) {
        if (component.isLoaded) {
            this.__contentsBuffer.push(component);
        }
        component.removeEventListener('onenable', this, this.__onComponentEnable.bind(this, component));
        component.addEventListener('ondisable', this, this.__onComponentDisable.bind(this, component));
    };
    // public methods
    PickComponentContainer.prototype.flushContentsBuffer = function () {
        while (this.__contentsBuffer.length > 0) {
            Container.prototype.add.call(this, this.__contentsBuffer.shift());
        }
    };

    return PickComponentContainer;
});
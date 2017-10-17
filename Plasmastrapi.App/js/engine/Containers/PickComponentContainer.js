define(['component-container'], function (ComponentContainer) {

    PickComponentContainer.prototype = Object.create(ComponentContainer.prototype);
    PickComponentContainer.prototype.constructor = PickComponentContainer;
    function PickComponentContainer(ComponentType) {
        ComponentContainer.call(this, ComponentType);
    };
    // private methods
    PickComponentContainer.prototype.__onComponentEnable = function (component) {
        this.add(component);
        this.__unloadBuffer.remove(component);
    };
    PickComponentContainer.prototype.__onComponentDisable = function (component) {
        this.remove(component);
        this.__unloadBuffer.add(component);
    };
    PickComponentContainer.prototype.__initEventCallbacks = function (component) {
        ComponentContainer.prototype.__initEventCallbacks.call(this, component);
        component.addEventListener('onenable', this, this.__onComponentEnable.bind(this, component));
        component.addEventListener('ondisable', this, this.__onComponentDisable.bind(this, component));
    };

    return PickComponentContainer;
});
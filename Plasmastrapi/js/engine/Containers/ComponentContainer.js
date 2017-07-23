define('container', 'component', 'validator', function (Container, Component, validator) {

    ComponentContainer.prototype = Object.create(Container.prototype);
    ComponentContainer.prototype.constructor = ComponentContainer;
    function ComponentContainer(ComponentType) {
        validator.validateType(this, ComponentType, Component);
        Container.call(this, ComponentType);
        this.__unloadBuffer = new Container(ComponentType);
    };
    // private methods
    ComponentContainer.prototype.__onComponentDestroy = function (component) {
        this.remove(component);
    };
    ComponentContainer.prototype.__onComponentLoad = function (component) {
        this.add(component);
        this.__unloadBuffer.remove(component);
    };
    ComponentContainer.prototype.__onComponentUnload = function (component) {
        this.remove(component);
        this.__unloadBuffer.add(component);
    };
    ComponentContainer.prototype.__initEventCallbacks = function (component) {
        component.addEventListener('ondestroy', this, this.__onComponentDestroy.bind(this, component));
        component.addEventListener('onload', this, this.__onComponentDestroy.bind(this, component));
        component.addEventListener('onunload', this, this.__onComponentDestroy.bind(this, component));
    };
    // public methods
    ComponentContainer.prototype.add = function (component) {
        this.__initEventCallbacks(component);
    };

    return ComponentContainer;
});
define(['container', 'component', 'validator'], function (Container, Component, validator) {

    ComponentContainer.prototype = Object.create(Container.prototype);
    ComponentContainer.prototype.constructor = ComponentContainer;
    function ComponentContainer(ComponentType) {
        validator.validateClassType(this, ComponentType, Component);
        Container.call(this, ComponentType);
        this.__unloadBuffer = new Container(ComponentType);
        //this.__disableBuffer = new Container(ComponentType);
    };
    // private methods
    ComponentContainer.prototype.__initEventCallbacks = function (component) {
        component.addEventListener('ondestroy', this, this.__onComponentDestroy.bind(this, component));
        component.addEventListener('onload', this, this.__onComponentLoad.bind(this, component));
        component.addEventListener('onunload', this, this.__onComponentUnload.bind(this, component));
        //component.addEventListener('onenable', this, this.__onComponentEnable.bind(this, component));
        //component.addEventListener('ondisable', this, this.__onComponentDisable.bind(this, component));
    };
    ComponentContainer.prototype.__onComponentDestroy = function (component) {
        this.remove(component);
        this.__unloadBuffer.remove(component);
        //this.__disableBuffer.remove(component);
    };
    ComponentContainer.prototype.__onComponentLoad = function (component) {
        Container.prototype.add.call(this, component);
        this.__unloadBuffer.remove(component);
    };
    ComponentContainer.prototype.__onComponentUnload = function (component) {
        this.remove(component);
        this.__unloadBuffer.add(component);
    };
    //ComponentContainer.prototype.__onComponentEnable = function (component) {
    //    if (component.isLoaded) {
    //        this.add(component);
    //    }
    //    this.__unloadBuffer.remove(component);
    //};
    //ComponentContainer.prototype.__onComponentDisable = function (component) {
    //    this.remove(component);
    //    this.__unloadBuffer.add(component);
    //};
    // public methods
    ComponentContainer.prototype.add = function (component) {
        this.__initEventCallbacks(component);
        if (component.isLoaded) {
            this.__onComponentLoad(component);
        }
    };

    return ComponentContainer;
});
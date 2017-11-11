define(['container'], function (Container) {

    ComponentContainer.prototype = Object.create(Container.prototype);
    ComponentContainer.prototype.constructor = ComponentContainer;
    function ComponentContainer(componentTypeString) {
        Container.call(this, componentTypeString);
    };
    // private methods
    ComponentContainer.prototype.__initEventCallbacks = function (component) {
        if (component.isLoaded) {
            component.addEventListener('onunload', this, this.__onComponentUnload.bind(this, component));
        } else {
            component.addEventListener('onload', this, this.__onComponentLoad.bind(this, component));
        }
        if (component.isEnabled) {
            component.addEventListener('ondisable', this, this.__onComponentDisable.bind(this, component));
        } else {
            component.addEventListener('onenable', this, this.__onComponentEnable.bind(this, component));
        }
    };
    ComponentContainer.prototype.__onComponentLoad = function (component) {
        if (component.isEnabled) {
            Container.prototype.add.call(this, component);
        }
        component.removeEventListener('onload', this, this.__onComponentLoad.bind(this, component));
        component.addEventListener('onunload', this, this.__onComponentUnload.bind(this, component));
    };
    ComponentContainer.prototype.__onComponentUnload = function (component) {
        Container.prototype.remove.call(this, component);
        component.removeEventListener('onunload', this, this.__onComponentUnload.bind(this, component));
        component.addEventListener('onload', this, this.__onComponentLoad.bind(this, component));
    };
    ComponentContainer.prototype.__onComponentEnable = function (component) {
        if (component.isLoaded) {
            Container.prototype.add.call(this, component);
        }
        component.removeEventListener('onenable', this, this.__onComponentEnable.bind(this, component));
        component.addEventListener('ondisable', this, this.__onComponentDisable.bind(this, component));
    };
    ComponentContainer.prototype.__onComponentDisable = function (component) {
        Container.prototype.remove.call(this, component);
        component.removeEventListener('ondisable', this, this.__onComponentDisable.bind(this, component));
        component.addEventListener('onenable', this, this.__onComponentEnable.bind(this, component));
    };
    // public methods
    ComponentContainer.prototype.add = function (component) {
        this.__initEventCallbacks(component);
        if (component.isLoaded && component.isEnabled) {
            Container.prototype.add.call(this, component);
        }
    };

    return ComponentContainer;
});
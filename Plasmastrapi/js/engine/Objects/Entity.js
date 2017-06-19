define(['emitter', 'component', 'dictionary'],
function (Emitter, Component, Dictionary) {

    // CLASS Entity
    Entity.prototype = Object.create(Emitter.prototype);
    Entity.prototype.constructor = Entity;
    function Entity() {
        // inherits from
        Emitter.call(this);
        // private variables
        this.__parent = null;
        this.__components = new Dictionary(Component);
        // apply mixins
        Emitter.Mixins.Loadable.call(this);
        Emitter.Mixins.Destructible.call(this);
    };
    // private methods
    Entity.prototype.__removeParent = function () {
        this.__parent = null;
        // unwire event subscriptions
        this.__parent.removeEventListener('onload', this, this.load);
        this.__parent.removeEventListener('onunload', this, this.unload);
        this.__parent.removeEventListener('ondestroy', this, this.destroy);
    };
    // public methods
    Entity.prototype.addParent = function (parent) {
        if (this.__parent) {
            validator.throw(this, 'addParent', 'This entity already has a parent');
        }
        validator.validateType(this, parent, Entity);
        this.__parent = parent;
        // wire up event subscriptions
        this.__parent.addEventListener('onload', this, this.load);
        this.__parent.addEventListener('onunload', this, this.unload);
        this.__parent.addEventListener('ondestroy', this, this.destroy);
    };
    Entity.prototype.addComponent = function(component) {
        this.__components.add(component.constructor.name, component);
        // TODO:
        if (this.isLoaded) {
            this.reload();
        }
    };
    Entity.prototype.removeComponent = function (component) {
        var removedComponent = this.__components.remove(component.constructor.name);
        if (removedComponent) {
            removedComponent.destroy();
        }
    };
    Entity.prototype.getComponent = function (ComponentType) {
        return this.__components.get(ComponentType.name);
    };
    Entity.prototype.hasComponent = function(componentClass) {
        return this.getComponent(componentClass) ? true : false;
    };

    return Entity;
});
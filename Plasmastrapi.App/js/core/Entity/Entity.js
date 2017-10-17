define(['emitter', 'component', 'dictionary', 'loadable-mixin', 'destructible-mixin'],
function (Emitter, Component, Dictionary, LoadableMixin, DestructibleMixin) {

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
        LoadableMixin.call(this);
        DestructibleMixin.call(this);
    };
    // public methods
    Entity.prototype.addDependency = function (dependency) {
        validator.validateInstanceType(this, dependency, Entity);
        // wire-up event subscriptions
        dependency.addEventListener('onload', this, this.load);
        dependency.addEventListener('onunload', this, this.unload);
        dependency.addEventListener('ondestroy', this, this.destroy);
    };
    Entity.prototype.addParent = function (parent) {
        if (this.__parent) {
            validator.throw(this, 'addParent', 'This entity already has a parent');
        }
        this.addDependency(parent);
        this.__parent = parent;
    };
    Entity.prototype.addComponent = function (component) {
        this.__components.add(component.constructor.name, component);
        component.setEntity(this);
        if (this.isLoaded) {
            this.reload();
        }
    };
    Entity.prototype.getComponent = function (ComponentType) {
        return this.__components.get(ComponentType.name);
    };
    Entity.prototype.getComponentByName = function (componentName) {
        return this.__components.get(componentName);
    };
    Entity.prototype.hasComponent = function (ComponentType) {
        return this.getComponent(ComponentType) ? true : false;
    };

    return Entity;
});